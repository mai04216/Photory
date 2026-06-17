package com.photory.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.photory.entity.DiaryEntry;
import com.photory.entity.User;
import com.photory.repository.DiaryEntryRepository;

@Service
public class DiaryEntryService {

    private final DiaryEntryRepository diaryEntryRepository;

    public DiaryEntryService(DiaryEntryRepository diaryEntryRepository) {
        this.diaryEntryRepository = diaryEntryRepository;
    }

    // 指定月のエントリ一覧を取得
    public List<DiaryEntry> getEntriesByMonth(Long userId, int year, int month) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());
        return diaryEntryRepository.findByUserIdAndEntryDateBetween(
            userId, startDate, endDate);
    }
    
 // application.propertiesの画像保存先を読み込む
    @Value("${app.upload.dir}")
    private String uploadDir;

    // 日記エントリを登録する
    public DiaryEntry createEntry(User user, LocalDate entryDate,
                                   String title, String diaryText,
                                   byte[] imageData, String originalFileName)
                                   throws IOException {

        // 1. 画像を保存するフォルダを作成
        Path userDir = Paths.get(uploadDir, String.valueOf(user.getId()));
        Files.createDirectories(userDir);

        // 2. ファイル名を一意にする（重複防止）
        String extension = originalFileName.substring(
            originalFileName.lastIndexOf("."));
        String fileName = entryDate.toString() + "_" + UUID.randomUUID() + extension;
        Path filePath = userDir.resolve(fileName);

        // 3. 画像ファイルを保存
        Files.write(filePath, imageData);

        // 4. DBにエントリを保存
        DiaryEntry entry = new DiaryEntry();
        entry.setUser(user);
        entry.setEntryDate(entryDate);
        entry.setTitle(title);
        entry.setDiaryText(diaryText);
        entry.setImagePath(filePath.toString());

        return diaryEntryRepository.save(entry);
    }
    
//    指定日のデータを1件取得する
    public DiaryEntry getEntry(Long userId, LocalDate date) {
    	return diaryEntryRepository.findByUserIdAndEntryDate(userId,  date).orElse(null);
    }
    
//    データを削除する
    public void deleteEntry(Long userId, LocalDate date) {
    	DiaryEntry entry = diaryEntryRepository.findByUserIdAndEntryDate(userId, date).orElseThrow();
    	diaryEntryRepository.delete(entry);
    }
    
//    データを更新する
    public DiaryEntry updateEntry(Long userId, LocalDate date, String title, String diaryText,byte[] imageData, String originalFileName)
    throws IOException{
    	
    	DiaryEntry entry = diaryEntryRepository.findByUserIdAndEntryDate(userId, date).orElseThrow();
    	
//    	タイトルと日記を更新
    	entry.setTitle(title);
    	entry.setDiaryText(diaryText);
    	
//    	画像が新しく選択された場合のみ更新
    	if (imageData != null && imageData.length > 0) {
    		Path userDir = Paths.get(uploadDir, String.valueOf(userId));
    		Files.createDirectories(userDir);
    		
    		String extension = originalFileName.substring(
    	            originalFileName.lastIndexOf("."));
    	        String fileName = date.toString() + "_" + UUID.randomUUID() + extension;
    	        Path filePath = userDir.resolve(fileName);

    	        Files.write(filePath, imageData);
    	        entry.setImagePath(filePath.toString());
    	    }

    	    return diaryEntryRepository.save(entry);
    	}
    	
    	
    }
