package com.example.demo.controller;

import com.example.demo.model.Coords;
import com.example.demo.model.ExposureSite;
import com.example.demo.model.User;
import com.example.demo.service.SiteService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
public class siteController {

    @Autowired
    private SiteService siteService;

    @GetMapping("/sites/{id}")
    public ExposureSite getExposureSite(@PathVariable String id) throws ExecutionException, InterruptedException {
        System.out.println(id);
        return siteService.getSiteDetailsById(id);
    }

    @GetMapping("/sites")
    public List<ExposureSite> getAllExposureSite() throws ExecutionException, InterruptedException {
        return siteService.getSiteDetails();
    }

    @PostMapping ("/getCloseSites")
    public List<ExposureSite> getCloseSites(@RequestBody Coords coords) throws ExecutionException, InterruptedException {
        List<ExposureSite> list = siteService.getCloseSites(coords);
        return list;
    }

}
