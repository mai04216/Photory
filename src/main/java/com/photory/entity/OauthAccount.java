package com.photory.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "oauth_accounts", uniqueConstraints = @UniqueConstraint(columnNames = { "provider", "provider_user_id" }))
public class OauthAccount {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Column(name = "provider", nullable = false, length = 20)
	private String provider;

	@Column(name = "provider_user_id", nullable = false, length = 255)
	private String providerUserId;

	@Column(name = "provider_email", length = 255)
	private String providerEmail;

	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;

//	登録日　自動設定
	@PrePersist
	public void prePersist() {
		this.createdAt = LocalDateTime.now();
	}
	
//	getter
	public Long getId() {
		return id;
	}
	
	public User getUser() {
		return user;
	}
	
	public String getProvider() {
		return provider;
	}
	
	public String getProviderUserId() {
		return providerUserId;
	}
	
	public String getProviderEmail() {
		return providerEmail;
	}
	
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	
//	setter
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
	
	public void setProvider(String provider) {
		this.provider = provider;
	}
	
	public void setProviderUserId(String providerUserId) {
		this.providerUserId = providerUserId;
	}
	
	public void setProviderEmail(String providerEmail) {
		this.providerEmail = providerEmail;
	}
}
