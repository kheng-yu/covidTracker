package com.covidtracker;

import com.opencsv.CSVReader;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.exceptions.CsvException;

import java.io.*;
import java.util.*;

public class App 
{
    public static void main( String[] args ) throws IllegalStateException, FileNotFoundException
    {
        // Set file path
        File dataFile = new File("backend\\src\\main\\java\\com\\covidtracker\\hotspots.csv");
        // System.out.println(dataFile.getAbsolutePath());

        List<CaseID> beans = new CsvToBeanBuilder<CaseID>(new FileReader(
                dataFile.getAbsolutePath())).withType(CaseID.class)
                        .build().parse();
                
        // Go from List to Dict
        Map<String, CaseData> caseDict = new HashMap<String, CaseData>();
        for (CaseID caseID : beans)
        {
            caseID.getCaseData().setCaseID(caseID.getCaseID()); // Long winded method, can probably do better
            caseDict.put(caseID.getCaseID(), caseID.getCaseData());
        }

        // Test Dict
        System.out.println("Before initializing mapInfo, distance is 0");
        System.out.println(caseDict.get("E8X5"));
        
        // Make MapInfo
        MapInfo mapInfo = new MapInfo(caseDict);

        // Test Distance
        System.out.println("Direct straight line distance to E8X5 from Unimelb is about 36km if check from Google Maps");
        System.out.println(caseDict.get("E8X5"));

        // Test Closest Distance
        List<CaseData> closestCase = MapInfo.getClosestCase();
        // top 10 closest
        System.out.println("Top 10 closest to Unimelb");
        for (int i = 0; i < 10; i++) {
            System.out.println(closestCase.get(i));
        }
    }
}
