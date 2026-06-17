package com.photory.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.photory.entity.DiaryEntry;
import com.photory.entity.User;
import com.photory.repository.UserRepository;
import com.photory.service.DiaryEntryService;

@Controller
public class TopController {

	private final DiaryEntryService diaryEntryService;
	private final UserRepository userRepository;

	public TopController(DiaryEntryService diaryEntryService, UserRepository userRepository) {
		this.diaryEntryService = diaryEntryService;
		this.userRepository = userRepository;
	}

	@GetMapping("/")
	public String showTop(java.security.Principal principal,
			@RequestParam(value = "year", required = false) Integer year,
			@RequestParam(value = "month", required = false) Integer month, Model model) {

		// ログイン中のユーザーをDBから取得
		String email;
		if (principal instanceof org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken oauthToken) {
		    email = oauthToken.getPrincipal().getAttribute("email");
		} else {
		    email = ((org.springframework.security.core.userdetails.UserDetails)
		            ((org.springframework.security.authentication.UsernamePasswordAuthenticationToken) principal)
		            .getPrincipal()).getUsername();
		}
		
		// Googleログインでユーザーが未登録の場合、ここで作成
		if (principal instanceof org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken) {
		    org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken oauthToken2 =
		        (org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken) principal;
		    if (userRepository.findByEmail(email).isEmpty()) {
		        String name = oauthToken2.getPrincipal().getAttribute("name");
		        User newUser = new User();
		        newUser.setUserName(name != null ? name : "Google User");
		        newUser.setEmail(email);
		        newUser.setPassword("");
		        userRepository.save(newUser);
		    }
		}
		User user = userRepository.findByEmail(email).orElseThrow();

		// 年月の指定がなければ今月
		LocalDate today = LocalDate.now();
		if (year == null)
			year = today.getYear();
		if (month == null)
			month = today.getMonthValue();

		// 今月の登録済みエントリを取得
		List<DiaryEntry> entries = diaryEntryService.getEntriesByMonth(user.getId(), year, month);

		// 登録済みの日にちをSetに変換（HTML側で判定しやすくするため）
		Set<Integer> registeredDays = entries.stream().map(e -> e.getEntryDate().getDayOfMonth())
				.collect(Collectors.toSet());

		// カレンダー表示用のデータ
		LocalDate firstDay = LocalDate.of(year, month, 1);
		int daysInMonth = firstDay.lengthOfMonth();
		int startDayOfWeek = firstDay.getDayOfWeek().getValue() % 7;
		// 日曜=0, 月曜=1, ... 土曜=6

		// HTMLに渡すデータ
		model.addAttribute("user", user);
		model.addAttribute("year", year);
		model.addAttribute("month", month);
		model.addAttribute("today", today);
		model.addAttribute("daysInMonth", daysInMonth);
		model.addAttribute("startDayOfWeek", startDayOfWeek);
		model.addAttribute("registeredDays", registeredDays);
		
		// 登録済みの日の画像URLマップを準備
		java.util.Map<Integer, String> imageMap = new java.util.HashMap<>();
		for (DiaryEntry entry : entries) {
		    int day = entry.getEntryDate().getDayOfMonth();
		    String imageUrl = "/" + entry.getImagePath().replace("\\", "/");
		    imageMap.put(day, imageUrl);
		}
		model.addAttribute("imageMap", imageMap);
		// 日付文字列のMapを準備（HTML側で使うため）
		java.util.Map<Integer, String> dateMap = new java.util.HashMap<>();
		for (int d = 1; d <= daysInMonth; d++) {
		    dateMap.put(d, String.format("%04d-%02d-%02d", year, month, d));
		}
		model.addAttribute("dateMap", dateMap);

		return "top";
	}
}