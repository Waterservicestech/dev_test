package com.waterservicestech.devtest.controller;

import com.waterservicestech.devtest.domain.repository.UserRepository;
import com.waterservicestech.devtest.domain.service.UserService;
import com.waterservicestech.devtest.entity.User;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> listAll(){
        return userRepository.findAll();
    }

    @GetMapping("/{userId}")
    public User search(@PathVariable Integer userId){
        return userService.searchOrFail(userId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User add(@RequestBody User user ) {
        return userService.add(user);
    }

    @PutMapping("/{userId}")
    public User update(@PathVariable Integer userId,
                            @RequestBody User user){
        User correntUser = userService.searchOrFail(userId);

        BeanUtils.copyProperties(user, correntUser, "id");

        return userService.add(correntUser);
    }

    @DeleteMapping("/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(@PathVariable Integer userId){
        userService.remove(userId);
    }
}
