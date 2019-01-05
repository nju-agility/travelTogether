package com.agile.nju.traveltogether.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {
//    @PostMapping(value = "/login")
    @RequestMapping("/login")
    public String login(){
        return "main";
    }
//    public String login(@RequestParam("username") String username,
//                        @RequestParam("pass") String password){
//        System.out.println("username:" + username + "-----" + "password:" + password);
//        return "main";
//    }
}
