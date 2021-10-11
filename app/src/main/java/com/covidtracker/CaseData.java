/*
caseData holds all case informations. Will be the "value" of caseDict.
*/

package com.covidtracker;

import android.os.Build;

import androidx.annotation.RequiresApi;

import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvDate;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class CaseData implements Comparable<CaseData> {
    // Variables
    private String siteTitle;
    private String siteStreetaddress;
    private String suburb;
    private int sitePostcode;
    private String siteState;
    private String exposureDate;
    private String notes;
    private String addedDate;
    private int tier;
    private String adviceTitle;
    private String adviceInstruction;
    private String exposureTimeStart24;
    private String exposureTimeEnd24;
    private double latitude;
    private double longitude;
    private double distance;
    private String dhid;
    private String addedTime;
    private int id;
    private String exposureTime;
    private String addedDateDtm;
    private String exposureDateDtm;

    // Constructor
    public CaseData() {}

    // Getters
    public String getDhid() { return this.dhid; }
    public String getSiteTitle() { return this.siteTitle; }
    public String getSiteStreetaddress() { return this.siteStreetaddress; }
    public String getSiteState() { return this.siteState; }
    public int getSitePostcode() { return sitePostcode; }
    public String getSuburb() { return this.suburb; }
    public String getAddress() { return this.siteTitle + ", " + this.siteStreetaddress + " " + this.suburb + " " + this.siteState + " " + this.sitePostcode; }
    public double getLatitude() { return this.latitude; }
    public double getLat() { return this.latitude; }
    public double getLongitude() { return this.longitude; }
    public double getLon() { return this.longitude; }
    public double getTier() {
        if (this.tier == 0) {
            setTier();
        }
        return this.tier;
    }
    public String getNotes() { return this.notes; }
    public String getAdviceInstruction() { return this.adviceInstruction; }
    public String getAdviceTitle() { return adviceTitle; }
    public LocalDate getExposeDate() { return LocalDate.parse(this.exposureDate); }
    public LocalTime getExposureTimeStart24() { return LocalTime.parse(this.exposureTimeStart24); }
    public LocalTime getExposureTimeEnd24() { return LocalTime.parse(this.exposureTimeEnd24); }
    public LocalDate getAddedDate() { return LocalDate.parse(this.addedDate); }
    public LocalTime getAddedTime() { return LocalTime.parse(this.addedTime); }
    public double getDistance() { return this.distance; }
    public String getExposureDate() { return exposureDate; }
    public String getExposureTime() { return exposureTime; }
    public int getId() { return id; }
    public String getAddedDateDtm() { return addedDateDtm; }
    public String getExposureDateDtm() { return exposureDateDtm; }

    // Setters
    private void setTier() {
        for (int i = 0; i < this.adviceTitle.length(); i++) {
            char c = this.adviceTitle.charAt(i);
            if (Character.isDigit(c)) {
                this.tier = Character.getNumericValue(c);
            }
        }
    }
    public void setDistance(double distance){
        this.distance = distance;
    }
    public void setCaseID(String caseID) {
        this.dhid = caseID;
    }

    @Override
    public String toString() {
        if (this.tier == 0) {
            setTier();
        }
        return dhid + ", Tier " + tier + " @ "
                + siteTitle + ", " + siteStreetaddress + " " + suburb + " " + siteState + " " + sitePostcode
                + ". GPS: " + latitude + ", " + longitude + ". "
                + "\nAdvice: " + adviceTitle + ". " + adviceInstruction
                + "\nDistance: " + distance + " km\n";
    }

    @Override
    public int compareTo(CaseData otherCase) {
        if (this.distance < otherCase.getDistance()) {
            return -1;
        }
        else if (this.distance > otherCase.getDistance()) {
            return 1;
        }
        else{
            return 0;
        }
    }
}
