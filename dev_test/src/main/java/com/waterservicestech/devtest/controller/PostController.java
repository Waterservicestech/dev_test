package com.waterservicestech.devtest.controller;

import com.waterservicestech.devtest.domain.service.PostService;
import com.waterservicestech.devtest.entity.Post;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public List<Post> listAll(){

        return postService.findAllPosts();
    }

    @GetMapping("/{postId}")
    public Post search(@PathVariable Integer postId){

        return postService.searchPostById(postId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Post add(@RequestBody Post post ) {
        return postService.add(post);
    }

    @PutMapping("/{postId}") // remover regra de negócio e jogar na camada de serviço
    public Post update(@PathVariable Integer postId,
                       @RequestBody Post post){
        Post correntPost = postService.searchPostById(postId);

        BeanUtils.copyProperties(post, correntPost, "id");

        return postService.add(correntPost);
    }

    @DeleteMapping("/{postId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(@PathVariable Integer postId){
        postService.remove(postId);
    }
}
