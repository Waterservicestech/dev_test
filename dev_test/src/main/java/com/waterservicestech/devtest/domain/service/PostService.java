package com.waterservicestech.devtest.domain.service;

import com.waterservicestech.devtest.domain.exception.EntidadeNaoEncontradaException;
import com.waterservicestech.devtest.domain.exception.ErroBancoDeDadosException;
import com.waterservicestech.devtest.domain.repository.PostRepository;
import com.waterservicestech.devtest.entity.Post;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class PostService {

    private static final String MSG_POST_NAO_ENCONTRADO
            = "Não existe um post de usuário com código %d";

    @Autowired
    private PostRepository postRepository;

    public Post add (Post post) {
        log.info("Executando a adicionar um post");
        try {
            return postRepository.save(post);
        } catch (Exception e) {
            log.error("Erro ao salvar Post no Banco de Dados - Erro:{}", e.getMessage());
            throw new ErroBancoDeDadosException(e.getMessage());
        }

    }
    public void remove(Integer postId) {
        var isExists = true;
        try {
             isExists = postRepository.existsById(postId);
        } catch (Exception e) {
            log.error("Erro ao buscar Post no Banco de Dados - Erro:{}", e.getMessage());
            throw new ErroBancoDeDadosException(e.getMessage());
        }
        if (!isExists) {
            throw new EntidadeNaoEncontradaException(
                    String.format(MSG_POST_NAO_ENCONTRADO, postId));
        }
        postRepository.deleteById(postId);
    }

    public Post searchPostById(Integer postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        String.format(MSG_POST_NAO_ENCONTRADO, postId)));
    }

    public List<Post> findAllPosts() {
        return postRepository.findAll();
    }
}
