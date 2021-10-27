package com.example.demo.controller;

import com.example.demo.model.ExposureSite;
import com.example.demo.service.UserService;
import com.example.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
public class userController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String hello() {
        return "hello world! This is a default page";
    }

    @PostMapping("/users")
    public String saveUser(@RequestBody User user) throws ExecutionException, InterruptedException {
        return userService.saveUser(user);
    }

    @GetMapping("/users/{name}")
    public User getUser(@PathVariable String name) throws ExecutionException, InterruptedException {
        return userService.getUserDetailsByName(name);
    }

    @GetMapping("/users")
    public List<User> getAllUser() throws ExecutionException, InterruptedException {
        return userService.getUserDetails();
    }

    @PutMapping("/users")
    public String updateUser(@RequestBody User user) throws ExecutionException, InterruptedException {
        return userService.updateUser(user);
    }

    @DeleteMapping("/users/{name}")
    public String deleteUser(@PathVariable String name) throws ExecutionException, InterruptedException {
        return userService.deleteUser(name);
    }

    @GetMapping("/getExposureSitesByUserID/{id}")
    public List<ExposureSite> getUserExposureSites(@PathVariable String id) throws ExecutionException, InterruptedException {

        return userService.getUserExposureSites(id);
    }





}

