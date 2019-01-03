package com.agile.nju.traveltogether.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TestController {
    @RequestMapping("/")
    public String index(Model model) {
        String name = "jiangbei";
        model.addAttribute("name", name);
        return "index";
    }
}