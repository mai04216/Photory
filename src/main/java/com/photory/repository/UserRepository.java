package com.photory.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.photory.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
//	EmailをDBから探す　結果があるかないか分からない場合はOptional<User>を使用する
	Optional<User> findByEmail(String email);

//　あるかないかだけ知りたいとき　boolean
	boolean existsByEmail(String email);
	
}
