package com.photory.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.photory.entity.DiaryEntry;

@Repository
public interface DiaryEntryRepository extends JpaRepository<DiaryEntry, Long> {

//	今月の登録済み一覧を取得
	List<DiaryEntry> findByUserIdAndEntryDateBetween(Long userId, LocalDate startDate, LocalDate endDate);

//	特定の日の情報を1件だけ取得
	Optional<DiaryEntry> findByUserIdAndEntryDate(Long userId, LocalDate entryDate);

//	登録済みかどうかを確認
	boolean existsByUserIdAndEntryDate(Long userId, LocalDate entryDate);

}
