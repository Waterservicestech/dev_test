package com.waterservicestech.devtest.domain.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class ErroBancoDeDadosException extends RuntimeException{

    private static final long serialVersionUID = 1L;

    public ErroBancoDeDadosException(String mensagem) {
        super(mensagem);
    }
}
