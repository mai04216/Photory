package com.photory.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.photory.entity.User;
import com.photory.repository.UserRepository;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

//	このクラスで使用する変数
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
//		passwordEncoderを作り方を教える必要がある【Bean定義】@Configurationで作成
		this.passwordEncoder = passwordEncoder;
	}

//	このUserはDBテーブルのこと
	public User registerUser(String username, String email, String password) {

//　指示①　メールアドレスの重複チェック
		if (userRepository.existsByEmail(email)) {
			throw new RuntimeException("このメールアドレスは既に登録されています");
		}

//	指示②　パスワードをハッシュ化
		String hashedPassword = passwordEncoder.encode(password);

//	指示③　Userを作ってDBへ保存する
		User user = new User();
		user.setUserName(username);
		user.setEmail(email);
		user.setPassword(hashedPassword);

		return userRepository.save(user);
	}
}
