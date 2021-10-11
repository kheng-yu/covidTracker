/*
MapInfo should be the main one the app interacts with
*/

package com.covidtracker;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.util.Log;
import android.widget.TextView;

import androidx.annotation.NonNull;

import org.javatuples.Pair;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;
import com.opencsv.bean.CsvToBeanBuilder;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//extends ReactContextBaseJavaModule
public class MapInfo {
//    // React
//    @Override
//    public String getName() {
//        return "MapInfo";
//    }
//    @ReactMethod
    public List<CaseData> getCloseSites() {
        Log.d(TAG, "Returning sorted List<CaseData> by distance.");

        // Update location
        updateUserLoc();

        // Calculate new Distance value based on new userLoc
        for (String caseID : this.caseDict.keySet()) {
            this.caseDict.get(caseID).setDistance(
                    calcDist(this.userLoc, Pair.with(
                            this.caseDict.get(caseID).getLat(),
                            this.caseDict.get(caseID).getLon())));
        }

        // Update and return closestCase
        this.closestCase = new ArrayList<>(caseDict.values());
        Collections.sort(this.closestCase);
        Log.d(TAG, String.valueOf(closestCase));
        return this.closestCase;
    }

    public Map<String, CaseData> getCaseDict() {
        Log.d(TAG, "Returning caseDict of size " + caseDict.size());
        return this.caseDict;
    }

    // Constants
    private final String TAG = "MapInfo";
    private final int R = 6371; // Mean radius of Earth in km from https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html
    private CollectionReference DB = FirebaseFirestore.getInstance().collection("Exposure Sites");

    // Variables
    private Map<String, CaseData> caseDict;
    // Let 0 be lat, 1 be lon
    private Pair<Double, Double> userLoc;
    private Pair<Double, Double> destinationLoc;
    private List<CaseData> closestCase;

    public MapInfo() {
        // Initialize caseDict
        this.caseDict = new HashMap<String, CaseData>();
        updateCaseDict();

    }

    // Setters
    public void setDestination(double lat, double lon) {
        this.destinationLoc = Pair.with(lat, lon);
    }
    public void updateUserLoc() {
        // ToDo, use Unimelb for now
        this.userLoc = Pair.with(-37.79812546095852, 144.96096326974035);
    }

    // Function
    // Update or Initialize caseDict
    public void updateCaseDict() {
        DB.get().addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
            @Override
            public void onComplete(@NonNull Task<QuerySnapshot> task) {
                if (task.isSuccessful()) {
                    for (QueryDocumentSnapshot document : task.getResult()) {
                        Log.d(TAG, document.getId() + " => " + document.getData());
                        if (!document.getData().isEmpty()) {
                            CaseData tmp = document.toObject(CaseData.class);
                            caseDict.put(tmp.getDhid(), tmp);
                            Log.d(TAG, String.valueOf(caseDict.get(tmp.getDhid())));
                        }
                        Log.d(TAG, "size of caseDict is " + caseDict.size());
                    }
                    getCloseSites();
                } else {
                    Log.d(TAG, "Error getting documents: ", task.getException());
                }
            }
        });

        Log.d(TAG, "Update Complete! Final caseDict size is " + caseDict.size());
    }

    // LatLong distance calc https://www.movable-type.co.uk/scripts/latlong.html
    // Use Haversine Formula to calculate distance
    public double calcDist(Pair<Double,Double> loc1, Pair<Double,Double> loc2)
    {
        double lat1 = loc1.getValue0();
        double lon1 = loc1.getValue1();
        double lat2 = loc2.getValue0();

        double lon2 = loc2.getValue1();

        double dLat = Math.toRadians(lat1 - lat2);
        double dLon = Math.toRadians(lon1 - lon2);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(Math.toRadians(lat1))
                * Math.cos(Math.toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }


}
