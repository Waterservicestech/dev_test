package com.waterservicestech.devtest.domain.repository;

import com.waterservicestech.devtest.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
