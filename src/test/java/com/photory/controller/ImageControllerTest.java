package com.photory.controller;

import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.photory.entity.DiaryEntry;
import com.photory.entity.User;
import com.photory.repository.DiaryEntryRepository;
import com.photory.repository.UserRepository;

@SpringBootTest
@AutoConfigureMockMvc
class ImageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private DiaryEntryRepository diaryEntryRepository;

    @MockitoBean
    private UserRepository userRepository;

    @TempDir
    static Path tempDir;

    // テスト用のアップロードディレクトリとDB接続をオーバーライドする
    @DynamicPropertySource
    static void overrideProperties(DynamicPropertyRegistry registry) {
        registry.add("app.upload.dir", () -> tempDir.toString());
        registry.add("spring.datasource.url", () -> "jdbc:h2:mem:testdb");
        registry.add("spring.datasource.driver-class-name", () -> "org.h2.Driver");
        registry.add("spring.jpa.hibernate.ddl-auto", () -> "create-drop");
        registry.add("spring.security.oauth2.client.registration.google.client-id", () -> "test-client-id");
        registry.add("spring.security.oauth2.client.registration.google.client-secret", () -> "test-client-secret");
    }

    private User ownerUser;
    private User otherUser;
    private DiaryEntry entry;

    // テストデータ（ユーザー・エントリ・画像ファイル）を準備する
    @BeforeEach
    void setUp() throws IOException {
        ownerUser = new User();
        ownerUser.setId(1L);
        ownerUser.setEmail("owner@example.com");
        ownerUser.setUserName("Owner");
        ownerUser.setPassword("password");

        otherUser = new User();
        otherUser.setId(2L);
        otherUser.setEmail("other@example.com");
        otherUser.setUserName("Other");
        otherUser.setPassword("password");

        Path imageFile = tempDir.resolve("test.jpg");
        Files.write(imageFile, new byte[]{(byte) 0xFF, (byte) 0xD8, (byte) 0xFF});

        entry = new DiaryEntry();
        entry.setId(1L);
        entry.setUser(ownerUser);
        entry.setImagePath(imageFile.toString());

        when(userRepository.findByEmail("owner@example.com")).thenReturn(Optional.of(ownerUser));
        when(userRepository.findByEmail("other@example.com")).thenReturn(Optional.of(otherUser));
        when(diaryEntryRepository.findById(1L)).thenReturn(Optional.of(entry));
        when(diaryEntryRepository.findById(999L)).thenReturn(Optional.empty());
    }

    // Spring Securityフィルタチェーンを通過する認証済みトークンを生成する
    private UsernamePasswordAuthenticationToken createAuth(String email) {
        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername(email)
                .password("password")
                .roles("USER")
                .build();
        return new UsernamePasswordAuthenticationToken(
                userDetails, "password", userDetails.getAuthorities());
    }

    // 正常系: 所有者が自分の画像にアクセスすると200が返る
    @Test
    void getImage_ownerAccess_returns200() throws Exception {
        mockMvc.perform(get("/api/images/1")
                .with(authentication(createAuth("owner@example.com"))))
                .andExpect(status().isOk());
    }

    // 異常系: 他ユーザーの画像にアクセスすると403が返る（IDOR対策）
    @Test
    void getImage_otherUserAccess_returns403() throws Exception {
        mockMvc.perform(get("/api/images/1")
                .with(authentication(createAuth("other@example.com"))))
                .andExpect(status().isForbidden());
    }

    // 異常系: 存在しないエントリIDにアクセスすると404が返る
    @Test
    void getImage_nonExistentEntry_returns404() throws Exception {
        mockMvc.perform(get("/api/images/999")
                .with(authentication(createAuth("owner@example.com"))))
                .andExpect(status().isNotFound());
    }

    // 異常系: 未認証のリクエストはログインページへリダイレクトされる
    @Test
    void getImage_unauthenticated_returns302() throws Exception {
        mockMvc.perform(get("/api/images/1"))
                .andExpect(status().is3xxRedirection());
    }

    // ファイル拡張子ホワイトリストの正常系テスト
    @Test
    void isAllowedExtension_validExtensions_returnsTrue() {
        assert ImageController.isAllowedExtension("photo.jpg");
        assert ImageController.isAllowedExtension("photo.jpeg");
        assert ImageController.isAllowedExtension("photo.png");
        assert ImageController.isAllowedExtension("photo.gif");
        assert ImageController.isAllowedExtension("photo.webp");
        assert ImageController.isAllowedExtension("photo.JPG");
    }

    // ファイル拡張子ホワイトリストの異常系テスト
    @Test
    void isAllowedExtension_invalidExtensions_returnsFalse() {
        assert !ImageController.isAllowedExtension("script.php");
        assert !ImageController.isAllowedExtension("malware.exe");
        assert !ImageController.isAllowedExtension("page.html");
        assert !ImageController.isAllowedExtension(null);
        assert !ImageController.isAllowedExtension("noextension");
    }
}
