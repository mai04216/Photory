package com.photory.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.photory.entity.DiaryEntry;
import com.photory.entity.User;
import com.photory.repository.DiaryEntryRepository;
import com.photory.repository.UserRepository;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    private static final Set<String> ALLOWED_EXTENSIONS = Set.of(
        ".jpg", ".jpeg", ".png", ".gif", ".webp"
    );

    private final DiaryEntryRepository diaryEntryRepository;
    private final UserRepository userRepository;

    @Value("${app.upload.dir}")
    private String uploadDir;

    public ImageController(DiaryEntryRepository diaryEntryRepository,
                           UserRepository userRepository) {
        this.diaryEntryRepository = diaryEntryRepository;
        this.userRepository = userRepository;
    }

    // 認証済みユーザーのみがアクセスでき、所有者チェックを行った上で画像を返す
    @GetMapping("/{entryId}")
    public ResponseEntity<byte[]> getImage(
            java.security.Principal principal,
            @PathVariable Long entryId) {

        // リクエスト元のログインユーザーをDBから取得
        User user = getLoginUser(principal);

        // エントリIDからDB経由で画像情報を取得（IDの存在チェック）
        DiaryEntry entry = diaryEntryRepository.findById(entryId).orElse(null);
        if (entry == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // 画像の所有者とリクエストユーザーが一致するか検証（IDOR対策の核心部分）
        if (!entry.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        // DB上のパスからファイルを読み込み、パストラバーサル攻撃を防ぐ
        Path filePath = Paths.get(entry.getImagePath()).toAbsolutePath().normalize();
        Path baseDir = Paths.get(uploadDir).toAbsolutePath().normalize();
        if (!filePath.startsWith(baseDir)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        if (!Files.exists(filePath)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // Content-Typeをファイル拡張子から判定して安全に返す
        try {
            byte[] imageData = Files.readAllBytes(filePath);
            MediaType mediaType = determineMediaType(filePath.toString());
            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .body(imageData);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // ファイル拡張子からMIMEタイプを判定する（未知の拡張子はoctet-streamで返す）
    private MediaType determineMediaType(String filePath) {
        String lower = filePath.toLowerCase();
        if (lower.endsWith(".png")) return MediaType.IMAGE_PNG;
        if (lower.endsWith(".gif")) return MediaType.IMAGE_GIF;
        if (lower.endsWith(".webp")) return MediaType.parseMediaType("image/webp");
        return MediaType.IMAGE_JPEG;
    }

    // ログイン中のユーザーをPrincipalから取得する（OAuth2・フォーム両対応）
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

    // アップロード時にファイル拡張子が許可リストに含まれるか検証する
    public static boolean isAllowedExtension(String fileName) {
        if (fileName == null || !fileName.contains(".")) {
            return false;
        }
        String extension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
        return ALLOWED_EXTENSIONS.contains(extension);
    }
}
