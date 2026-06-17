package com.photory.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "username", nullable = false, length = 50)
	private String userName;

	@Column(name = "email", nullable = false, length = 255, unique = true)
	private String email;

	@Column(name = "password", nullable = false, length = 255)
	private String password;

	@Column(name = "profile_image_path", length = 500)
	private String profileImagePath;

	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;

	@Column(name = "updated_at", nullable = false)
	private LocalDateTime updatedAt;
	
	@Column(name = "failed_attempts", nullable = false)
	private Integer failedAttempts = 0;

	@Column(name = "locked_until")
	private LocalDateTime lockedUntil;

//	自動設定
	@PrePersist
	public void prePersist() {
		this.createdAt = LocalDateTime.now();
		this.updatedAt = LocalDateTime.now();
	}

	@PreUpdate
	public void preUpdate() {
		this.updatedAt = LocalDateTime.now();
	}

//	getter
	public Long getId() {
		return id;
	}
	
	public String getUserName() {
		return userName;
	}
	
	public String getEmail() {
		return email;
	}
	
	public String getPassword() {
		return password;
	}
	
	public String getProfileImagePath() {
		return profileImagePath;
	}
	
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	
	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}
	
//	setter
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public void setProfileImagePath(String profileImagePath) {
		this.profileImagePath = profileImagePath;
	}
	
	public Integer getFailedAttempts() {
	    return failedAttempts;
	}

	public void setFailedAttempts(Integer failedAttempts) {
	    this.failedAttempts = failedAttempts;
	}

	public LocalDateTime getLockedUntil() {
	    return lockedUntil;
	}

	public void setLockedUntil(LocalDateTime lockedUntil) {
	    this.lockedUntil = lockedUntil;
	}
	
}
