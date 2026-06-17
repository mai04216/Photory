package com.photory.controller;

import java.time.LocalDate;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.photory.entity.DiaryEntry;
import com.photory.entity.User;
import com.photory.repository.UserRepository;
import com.photory.service.DiaryEntryService;

@Controller
public class DiaryController {

    private final DiaryEntryService diaryEntryService;
    private final UserRepository userRepository;

    public DiaryController(DiaryEntryService diaryEntryService,
                           UserRepository userRepository) {
        this.diaryEntryService = diaryEntryService;
        this.userRepository = userRepository;
    }

    // ログイン中のユーザーを取得するヘルパーメソッド
    private User getLoginUser(java.security.Principal principal) {
        String email;
        if (principal instanceof org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken oauthToken) {
            email = oauthToken.getPrincipal().getAttribute("email");
        } else {
            email = ((org.springframework.security.core.userdetails.UserDetails)
                    ((org.springframework.security.authentication.UsernamePasswordAuthenticationToken) principal)
                    .getPrincipal()).getUsername();
        }
        return userRepository.findByEmail(email).orElseThrow();
    }

    @GetMapping("/diary/new")
    public String showNewForm(@RequestParam("date") String date, Model model) {
        model.addAttribute("date", LocalDate.parse(date));
        return "diary-new";
    }

    @PostMapping("/diary/new")
    public String createEntry(java.security.Principal principal,
                              @RequestParam("date") String date,
                              @RequestParam("title") String title,
                              @RequestParam("diaryText") String diaryText,
                              @RequestParam("image") MultipartFile image) throws Exception {

        User user = getLoginUser(principal);
        LocalDate entryDate = LocalDate.parse(date);
        diaryEntryService.createEntry(user, entryDate, title, diaryText,
            image.getBytes(), image.getOriginalFilename());
        return "redirect:/";
    }

    @GetMapping("/diary/view")
    public String showEntry(java.security.Principal principal,
                            @RequestParam("date") String date, Model model) {

        User user = getLoginUser(principal);
        LocalDate entryDate = LocalDate.parse(date);
        DiaryEntry entry = diaryEntryService.getEntry(user.getId(), entryDate);
        model.addAttribute("entry", entry);
        model.addAttribute("date", entryDate);
        model.addAttribute("imageUrl", "/" + entry.getImagePath().replace("\\", "/"));
        return "diary-view";
    }

    @GetMapping("/diary/edit")
    public String showEditForm(java.security.Principal principal,
                               @RequestParam("date") String date, Model model) {

        User user = getLoginUser(principal);
        LocalDate entryDate = LocalDate.parse(date);
        DiaryEntry entry = diaryEntryService.getEntry(user.getId(), entryDate);
        model.addAttribute("entry", entry);
        model.addAttribute("date", entryDate);
        model.addAttribute("imageUrl", "/" + entry.getImagePath().replace("\\", "/"));
        return "diary-edit";
    }

    @PostMapping("/diary/edit")
    public String updateEntry(java.security.Principal principal,
                              @RequestParam("date") String date,
                              @RequestParam("title") String title,
                              @RequestParam("diaryText") String diaryText,
                              @RequestParam("image") MultipartFile image) throws Exception {

        User user = getLoginUser(principal);
        LocalDate entryDate = LocalDate.parse(date);
        diaryEntryService.updateEntry(user.getId(), entryDate, title, diaryText,
            image.isEmpty() ? null : image.getBytes(),
            image.isEmpty() ? null : image.getOriginalFilename());
        return "redirect:/diary/view?date=" + date;
    }

    @PostMapping("/diary/delete")
    public String deleteEntry(java.security.Principal principal,
                              @RequestParam("date") String date) {

        User user = getLoginUser(principal);
        diaryEntryService.deleteEntry(user.getId(), LocalDate.parse(date));
        return "redirect:/";
    }
}