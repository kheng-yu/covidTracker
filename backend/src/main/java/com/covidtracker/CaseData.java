package com.covidtracker;

import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvDate;

import java.util.*;
import java.time.LocalDate; // https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html
import java.time.LocalTime; // https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html

public class CaseData {
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

    @CsvBindByName(column = "Advice_title")
    private String tierAdvice;

    // @CsvBindByName(column = "Advice_title")
    // private String tier;

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

    // // Variables
    // private String name;
    // private String address;
    // private LocalDate exposureDate;
    // private LocalTime exposureTimeStart;
    // private LocalTime exposureTimeEnd;
    // private int tier;
    // private String notes;
    // private LocalDate    dateAdded;

    // // Data Index
    // private static final int SUBURB = 1;
    // private static final int NAME = 2;
    // private static final int ADDRESS = 3;
    // private static final int STATE = 4;
    // private static final int POSTCODE = 5;
    // private static final int EXDATE = 6;
    // private static final int NOTES1 = 9;
    // private static final int NOTES2 = 10;
    // private static final int NOTES3 = 11;
    // private static final int EXSTART = 16;
    // private static final int EXEND = 17;
    // private static final int TIER = 12;
    // private static final int DATEADDED = 10;

    // // Constructor
    // public CaseData() {
    //     System.out.println("Empty Case Data Initialized");
    // }
    // public CaseData(String[] data) {
    //     this.name = data[NAME];
    //     this.address = data[ADDRESS] + data[SUBURB] + data[STATE] + data[POSTCODE];
    //     System.out.println(EXDATE + ", " + data[EXDATE]);
    //     System.out.println(EXSTART + ", " + data[EXSTART]);
    //     System.out.println(EXEND + ", " + data[EXEND]);
    //     System.out.println(DATEADDED + ", " + data[DATEADDED]);
    //     // this.exposureDate = exposureDate.parse(data[EXDATE).replace("/","-"));
    //     // this.exposureTimeStart = exposureTimeStart.parse(data[EXSTART));
    //     // this.exposureTimeEnd = exposureTimeEnd.parse(data[EXEND));
    //     // this.tier = Integer.parseInt(data[TIER).replaceAll("[^0-9]", ""));
    //     this.notes = data[NOTES1] + data[NOTES2] + data[NOTES3];
    //     // this.dateAdded = dateAdded.parse(data[DATEADDED));s
    // }
    // Constructor
    public CaseData() {}

    public CaseData(String name, String address, LocalDate exposureDate, LocalTime exposureTimeStart,
            LocalTime exposureTimeEnd, int tier, String notes, LocalDate dateAdded) {
        this.name = name;
        this.address = address;
        this.exposureDate = exposureDate;
        this.exposureTimeStart = exposureTimeStart;
        this.exposureTimeEnd = exposureTimeEnd;
        // this.tier = tier;
        this.notes = notes;
        // this.dateAdded = dateAdded;
    }

    @Override
    public String toString() {
        return name + ", " + address + " " + suburb + " " + state + " " + postcode + ", " + tierAdvice + "\n";
    }
}
