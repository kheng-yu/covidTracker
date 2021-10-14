package com.example.demo.model;

import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class User {
    private String id;
    private String name;
    private double lat;
    private double lng;
    private Date time;

    public User() {
    }

    public User(String id, String name, double lat, double lng, Date time) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.time = time;

    }



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", lat=" + lat +
                ", lng=" + lng +
                ", time=" + time +
                '}';
    }
}
