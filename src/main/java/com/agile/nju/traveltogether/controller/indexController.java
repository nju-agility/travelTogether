package com.agile.nju.traveltogether.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class IndexController {
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
