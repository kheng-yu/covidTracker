/*
caseID holds the unique case ID for each case. Will be the "key" of caseDict.
*/

package com.covidtracker;

import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvRecurse;

public class CaseID {
    @CsvBindByName(column = "dhid")
    private String caseID;

    @CsvRecurse
    private CaseData caseData;

    // Constructor
    public CaseID() {}

    // Getters
    public String getCaseID() { return caseID; }
    public CaseData getCaseData() { return caseData; }
    
    @Override
    public String toString() {
        return caseID + ": " + caseData;
    }
}