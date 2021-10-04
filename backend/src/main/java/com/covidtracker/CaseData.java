/*
caseData holds all case informations. Will be the "value" of caseDict.
*/

package com.covidtracker;

import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvDate;

import java.util.*;
import java.time.LocalDate; // https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html
import java.time.LocalTime; // https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html

public class CaseData implements Comparable<CaseData> {
    // Variables 
    @CsvBindByName(column = "Site_title")
    private String name;

    @CsvBindByName(column = "Site_streetaddress")
    private String address;

    @CsvBindByName(column = "Suburb")
    private String suburb;

    @CsvBindByName(column = "Site_postcode")
    private int postcode;

    @CsvBindByName(column = "Site_state")
    private String state;

    @CsvBindByName(column = "Exposure_date")
    @CsvDate("d/MM/yyyy")
    private LocalDate exposureDate;

    @CsvBindByName(column = "Notes")
    private String notes;

    @CsvBindByName(column = "Added_date")
    @CsvDate("d/MM/yyyy")
    private LocalDate addedDate;

    private int tier;
    @CsvBindByName(column = "Advice_title")
    private String tierAdvice;

    @CsvBindByName(column = "Advice_instruction")
    private String tierInstruction;

    @CsvBindByName(column = "Exposure_time_start_24")
    @CsvDate("H:mm:ss")
    private LocalTime exposureTimeStart;

    @CsvBindByName(column = "Exposure_time_end_24")
    @CsvDate("H:mm:ss")
    private LocalTime exposureTimeEnd;

    @CsvBindByName(column = "Latitude")
    private double latitude;

    @CsvBindByName(column = "Longitude")
    private double longitude;

    private double distance;

    private String caseID;

    // Constructor
    public CaseData() {}
    
    // Getters
    public String getAddress() { return this.name + ", " + this.address + " " + this.suburb + " " + this.state + " " + this.postcode; }
    public double getLat() { return this.latitude; }
    public double getLon() { return this.longitude; }
    public double getTier() {
        if (this.tier == 0) {
            setTier();
        }
        return this.tier;
    }
    public String getNotes() { return this.notes; }
    public String getInstruction() { return this.tierInstruction; }
    public LocalDate getExposeDate() { return this.exposureDate; }
    public LocalTime getExposeTimeStart() { return this.exposureTimeStart; }
    public LocalTime getExposeTimeEnd() { return this.exposureTimeEnd; }
    public LocalDate getAddedDate() { return this.addedDate; }
    public double getDistance() { return this.distance; }
    
    // Setters
    private void setTier() {
        for (int i = 0; i < this.tierAdvice.length(); i++) {
            char c = this.tierAdvice.charAt(i);
            if (Character.isDigit(c)) {
                this.tier = Character.getNumericValue(c);
            }
        }
    }
    public void setDistance(double distance){
        this.distance = distance;
    }

    public void setCaseID(String caseID) {
        this.caseID = caseID;
    }

    @Override
    public String toString() {
        if (this.tier == 0) {
            setTier();
        }   
        return caseID + ", Tier " + tier + " @ "
                + name + ", " + address + " " + suburb + " " + state + " " + postcode
                + ". GPS: " + latitude + ", " + longitude + ". "
                + "\nAdvice: " + tierAdvice + ". " + tierInstruction 
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
