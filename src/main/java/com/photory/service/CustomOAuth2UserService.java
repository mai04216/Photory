package com.photory.service;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.photory.entity.OauthAccount;
import com.photory.entity.User;
import com.photory.repository.OauthAccountRepository;
import com.photory.repository.UserRepository;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final OauthAccountRepository oauthAccountRepository;

    public CustomOAuth2UserService(UserRepository userRepository,
                                    OauthAccountRepository oauthAccountRepository) {
        this.userRepository = userRepository;
        this.oauthAccountRepository = oauthAccountRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest)
            throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId();
        String providerUserId = oAuth2User.getAttribute("sub");
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        // OAuth連携済みか確認
        OauthAccount oauthAccount = oauthAccountRepository
                .findByProviderAndProviderUserId(provider, providerUserId)
                .orElse(null);

        if (oauthAccount == null) {
            // 初回Googleログイン → ユーザーとOAuth連携を作成
            User user = userRepository.findByEmail(email).orElse(null);

            if (user == null) {
                user = new User();
                user.setUserName(name);
                user.setEmail(email);
                user.setPassword("");  // Googleログインはパスワード不要
                user = userRepository.save(user);
            }

            oauthAccount = new OauthAccount();
            oauthAccount.setUser(user);
            oauthAccount.setProvider(provider);
            oauthAccount.setProviderUserId(providerUserId);
            oauthAccount.setProviderEmail(email);
            oauthAccountRepository.save(oauthAccount);
        }

        return new DefaultOAuth2User(
                new ArrayList<>(),
                oAuth2User.getAttributes(),
                "email");
    }
}