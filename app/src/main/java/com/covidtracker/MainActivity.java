package com.covidtracker;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import com.opencsv.bean.CsvToBeanBuilder;
import java.io.*;
import java.util.*;


public class MainActivity extends AppCompatActivity {
    // Variables
    MapInfo mapInfo;
    Map<String, CaseData> caseDict;
    List<CaseData> closestCase;
    List<CaseData> infectedCase;

    // UI
    TextView testView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mapInfo = new MapInfo();

        testView = (TextView) findViewById(R.id.textView);
        testView.setText("Waiting...");
//        testView.setText(closestCase.get(0).getAddress());
    }

    public void findCase(View view) {
        testView.setText("Updating...");
        caseDict = mapInfo.getCaseDict();
        closestCase = mapInfo.getCloseSites();
        testView.setText(closestCase.get(0).toString() + "\n" + closestCase.get(1).toString()
                + "\n" + closestCase.get(2).toString() + "\n" + closestCase.get(3).toString()
                + "\n" + closestCase.get(4).toString());
    }

    public void findInfect(View view) {
        infectedCase = mapInfo.getInfect();
        if (infectedCase.isEmpty()) {
            testView.setText("You're safe!");
        }
        else {
            String print = "";
            for (CaseData infect : infectedCase) {
                print += infect.getSiteTitle() + " was infected on " + infect.getExposureDate() + "\n";
            }
            testView.setText("You're not safe!\n" + print);
        }
    }
}