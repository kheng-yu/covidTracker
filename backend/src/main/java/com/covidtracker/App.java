package com.covidtracker;

import com.opencsv.CSVReader;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.exceptions.CsvException;

import java.io.*;
import java.util.*;

/**
 * Hello world!
 *
 */
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
            caseDict.put(caseID.getCaseID(), caseID.getCaseData());
        }

        // // Test Dict
        // System.out.println(caseDict.get("E8X5"));
    }
}
