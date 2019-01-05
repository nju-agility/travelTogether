package com.agile.nju.traveltogether.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class detailController {
    @RequestMapping("/detail")
    public String toActivityDetail(){
        return "details";
    }

    @RequestMapping("/main")
    public String toMainPage(){
        return "main";
    }
}
