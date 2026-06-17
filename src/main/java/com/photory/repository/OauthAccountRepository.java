package com.photory.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.photory.entity.OauthAccount;

@Repository
public interface OauthAccountRepository extends JpaRepository <OauthAccount, Long> {
	
//	検索条件がprovider_user_idとproviderの２つ
	Optional<OauthAccount>findByProviderAndProviderUserId(String provider, String providerUserId);
}
