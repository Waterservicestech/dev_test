package com.waterservicestech.devtest.domain.repository;

import com.waterservicestech.devtest.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Integer> {
}
