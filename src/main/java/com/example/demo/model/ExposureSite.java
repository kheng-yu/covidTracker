package com.example.demo.model;

import com.fasterxml.jackson.annotation.*;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Component
@JsonPropertyOrder({ "_id", "title", "date", "time", "tier", "coords" })
public class ExposureSite {

    @JsonIgnore
    private String siteStreetaddress;
    @JsonIgnore
    private String suburb;
    @JsonIgnore
    private int sitePostcode;
    @JsonIgnore
    private String siteState;

    @JsonIgnore
    private String notes;
    @JsonIgnore
    private String addedDate;
    @JsonIgnore
    private String adviceInstruction;
    @JsonIgnore
    private String exposureTimeStart24;
    @JsonIgnore
    private String exposureTimeEnd24;
    @JsonIgnore
    private double distance;
    @JsonIgnore
    private String dhid;
    @JsonIgnore
    private String addedTime;
    @JsonIgnore
    private String addedDateDtm;
    @JsonIgnore
    private String exposureDateDtm;
    @JsonIgnore
    private double latitude;
    @JsonIgnore
    private double longitude;
    @JsonIgnore
    private String adviceTitle;

    @JsonProperty("_id")
    private int id;
    @JsonProperty("title")
    private String siteTitle;
    @JsonProperty("date")
    private String exposureDate;
    @JsonProperty("time")
    private String exposureTime;
    private String tier;
    private Coords coords;


    public ExposureSite() {

        coords = new Coords(latitude, longitude);
    }

    public String getSiteTitle() {
        return siteTitle;
    }

    public void setSiteTitle(String siteTitle) {
        this.siteTitle = siteTitle;
    }

    public String getSiteStreetaddress() {
        return siteStreetaddress;
    }

    public void setSiteStreetaddress(String siteStreetaddress) {
        this.siteStreetaddress = siteStreetaddress;
    }

    public String getSuburb() {
        return suburb;
    }

    public void setSuburb(String suburb) {
        this.suburb = suburb;
    }

    public int getSitePostcode() {
        return sitePostcode;
    }

    public void setSitePostcode(int sitePostcode) {
        this.sitePostcode = sitePostcode;
    }

    public String getSiteState() {
        return siteState;
    }

    public void setSiteState(String siteState) {
        this.siteState = siteState;
    }

    public String getExposureDate() {
        return exposureDate;
    }

    public void setExposureDate(String exposureDate) {
        this.exposureDate = exposureDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(String addedDate) {
        this.addedDate = addedDate;
    }

    public String getTier() {
        return tier;
    }

    public void setTier(String tier) {
        this.tier = tier;
    }

    public String getAdviceTitle() {
        return adviceTitle;
    }

    public void setAdviceTitle(String adviceTitle) {
        tier = adviceTitle.substring(0, 6);
        this.adviceTitle = adviceTitle;
    }

    public String getAdviceInstruction() {
        return adviceInstruction;
    }

    public void setAdviceInstruction(String adviceInstruction) {
        this.adviceInstruction = adviceInstruction;
    }

    public String getExposureTimeStart24() {
        return exposureTimeStart24;
    }

    public void setExposureTimeStart24(String exposureTimeStart24) {
        this.exposureTimeStart24 = exposureTimeStart24;
    }

    public String getExposureTimeEnd24() {
        return exposureTimeEnd24;
    }

    public void setExposureTimeEnd24(String exposureTimeEnd24) {
        this.exposureTimeEnd24 = exposureTimeEnd24;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.coords.setLatitude(latitude);
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.coords.setLongitude(longitude);
        this.longitude = longitude;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public String getDhid() {
        return dhid;
    }

    public void setDhid(String dhid) {
        this.dhid = dhid;
    }

    public String getAddedTime() {
        return addedTime;
    }

    public void setAddedTime(String addedTime) {
        this.addedTime = addedTime;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getExposureTime() {
        return exposureTime;
    }

    public void setExposureTime(String exposureTime) {
        this.exposureTime = exposureTime;
    }

    public String getAddedDateDtm() {
        return addedDateDtm;
    }

    public void setAddedDateDtm(String addedDateDtm) {
        this.addedDateDtm = addedDateDtm;
    }

    public String getExposureDateDtm() {
        return exposureDateDtm;
    }

    public void setExposureDateDtm(String exposureDateDtm) {
        this.exposureDateDtm = exposureDateDtm;
    }

    public Coords getCoords() {
        return coords;
    }

    public void setCoords(Coords coords) {
        this.coords = coords;
    }

    @Override
    public String toString() {
        return "ExposureSite{" +
                "_id:" + id +
                "title:'" + siteTitle + '\'' +
                ", exposureDate:'" + exposureDate + '\'' +
                ", exposureTime:'" + exposureTime + '\'' +
                ", tier:" + tier +
                ",coords:{latitude:" + latitude +
                ":" + longitude +
                "}}";
    }
}
