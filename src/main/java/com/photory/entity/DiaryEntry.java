package com.photory.entity;

import java.time.LocalDate;
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
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "diary_entries")
public class DiaryEntry {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

//	ユーザーID(FK)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

//	データ
	@Column(name = "entry_date", nullable = false)
	private LocalDate entryDate;

//	タイトルは100字以内
	@Column(name = "title", length = 100)
	private String title;

//	日記は150字以内
	@Column(name = "diary_text", length = 150)
	private String diaryText;

//	画像パス
	@Column(name = "image_path", nullable = false, length = 500)
	private String imagePath;

//	登録日
	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;

//	更新日
	@Column(name = "updated_at", nullable = false)
	private LocalDateTime updatedAt;

//	登録日・更新日　自動設定
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

	public User getUser() {
		return user;
	}

	public LocalDate getEntryDate() {
		return entryDate;
	}

	public String getTitle() {
		return title;
	}

	public String getDiaryText() {
		return diaryText;
	}

	public String getImagePath() {
		return imagePath;
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

	public void setUser(User user) {
		this.user = user;
	}

	public void setEntryDate(LocalDate entryDate) {
		this.entryDate = entryDate;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setDiaryText(String diaryText) {
		this.diaryText = diaryText;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

}
