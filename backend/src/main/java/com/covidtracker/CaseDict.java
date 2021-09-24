package com.covidtracker;

/*
caseData holds all case informations. Will be the "value" of caseDict.
*/

import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvRecurse;

public class CaseDict {
    @CsvBindByName(column = "dhid")
    private String caseID;

    @CsvRecurse
    private CaseData caseData;

    // Constructor
    public CaseDict() {}

    // Getters
    public String getCaseID() { return caseID; }
    public CaseData getCaseData() { return caseData; }
    
    @Override
    public String toString() {
        return caseID + ": " + caseData;
    }
}