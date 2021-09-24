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
        // Set file path from CLI for now, it is relative to where this file would be
        File dataFile = new File("backend\\src\\main\\java\\com\\covidtracker\\hotspots.csv");
        // File fileDir = new File(args[0]);s
        System.out.println(dataFile.getAbsolutePath());
        
        // Create empty caseDict for nows
        // // CaseData caseData = new CaseData();
        // Map<String, CaseData> caseDict = new HashMap<String, CaseData>();

        List<CaseDict> beans = new CsvToBeanBuilder<CaseDict>(new FileReader(
                dataFile.getAbsolutePath())).withType(CaseDict.class)
                .build().parse();

        System.out.println(beans);
        
        // // Read csv file
        // String line = "";  
        // String splitBy = ",";  
        // try {  
        //     //parsing a CSV file into BufferedReader class constructor  
        //     BufferedReader br = new BufferedReader(new FileReader(fileDir));  
        //     while ((line = br.readLine()) != null)   //returns a Boolean value  
        //     {
        //         // System.out.println(line);
        //         String[] firstSplit = line.split("\"");
        //         if (firstSplit.length == 1) // all in one, just split by ',' and it'll work
        //         {
        //             String[] secondSplit = firstSplit[0].split(",");
        //             String ID = secondSplit[secondSplit.length-1];
        //             CaseData value = new CaseData(secondSplit);
        //             caseDict.put(ID, value);
        //         }
        //         else if (firstSplit.length == 3)
        //         {

        //         }
        //         else if (firstSplit.length == 5)
        //         {

        //         }
        //         else
        //         {
        //             for (int i = 0; i < firstSplit.length; i++) {
        //                 System.out.print("index" + i + ": ");
        //                 System.out.println(firstSplit[i]);
        //             }
        //         }
        //         // String[] employee = line.split(splitBy);    // use comma as separator  
        //         // System.out.println("Employee [First Name=" + employee[0] + ", Last Name=" + employee[1] + ", Designation=" + employee[2] + ", Contact=" + employee[3] + ", Salary= " + employee[4] + ", City= " + employee[5] +"]");  
        //     }
        //     br.close();
        // }
        // catch (IOException e)   
        // {
        //     e.printStackTrace();
        // }
        // }  

        // Scanner sc;
        // try {
        //     sc = new Scanner(fileDir);
        //     sc.useDelimiter(","); // sets the delimiter pattern
            
        //     boolean header = true;
        //     List<String> tmpList = new ArrayList<String>();

        //     while (sc.hasNext()) // keep reading until EoF
        //     {
        //         String tmp = sc.next();
        //         // System.out.print(tmp));
        //         // System.out.print("@");
        //         if(tmp.contains("\n") && header) // Reading header, ignore
        //         {
        //             header = false;
        //         }
                
        //         // System.out.print(header);
        //         else if(!header) // Save data into CaseData
        //         {
        //             if(tmp.contains("\n")) // one data entry
        //             {
        //                 // contains uniqueID
        //                 String ID = tmp.replace("\n", "").replace("\r", "");
        //                 CaseData caseData = new CaseData(tmpList);
        //                 System.out.println("CASE " + tmpList.get(0));
        //                 tmpList.clear();e
        //             }
        //             else
        //             {
        //                 tmpList.add(tmp);
        //                 // System.out.print(tmpList.get(0));
        //             }
        //         }
        //     }
        //     sc.close(); // closes the scanner
        // } catch (FileNotFoundException e) {
        //     System.out.println("Can't find .csv data file!");
        //     e.printStackTrace();
        // }   
    }
}
