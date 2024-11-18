package com.waterservicestech.devtest.domain.service;

import com.waterservicestech.devtest.domain.exception.EntidadeEmUsoException;
import com.waterservicestech.devtest.domain.exception.EntidadeNaoEncontradaException;
import com.waterservicestech.devtest.domain.repository.UserRepository;
import com.waterservicestech.devtest.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private static final String MSG_USUARIO_EM_USO
            = "Usuário de código %d não pode ser removido, pois está em uso";

    private static final String MSG_USUARIO_NAO_ENCONTRADO
            = "Não existe um cadastro de usuário com código %d";

    @Autowired
    private UserRepository userRepository;

    public User add (User user) {
        return userRepository.save(user);
    }

    public void remove(Integer userId) {
        try {
            if (!userRepository.existsById(userId)) {
                throw new EntidadeNaoEncontradaException(
                        String.format(MSG_USUARIO_NAO_ENCONTRADO, userId));

            }
            userRepository.deleteById(userId);

        } catch (DataIntegrityViolationException e) {
            throw new EntidadeEmUsoException(
                    String.format(MSG_USUARIO_EM_USO, userId));
        }
    }

    public User searchOrFail(Integer userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        String.format(MSG_USUARIO_NAO_ENCONTRADO, userId)));
    }
}
