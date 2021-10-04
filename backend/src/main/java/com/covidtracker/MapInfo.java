/*
MapInfo holds information of the Map.
*/

package com.covidtracker;

import java.util.*;
import org.javatuples.Pair;

public class MapInfo {
    // Constants
    private final int R = 6371; // Mean radius of Earth in km from https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html


    // Variables
    // Let 0 be lat, 1 be lon
    private Pair<Double, Double> userLoc;
    private Pair<Double, Double> destinationLoc;
    private static List<CaseData> closestCase;
    // Constructor
    public MapInfo(Map<String, CaseData> caseDict)
    {
        // Initialize userLocation
        updateUserLoc();

        // Set Distance value into caseDict based on userLoc
        for (String caseID : caseDict.keySet()) {
            caseDict.get(caseID).setDistance(
                    calcDist(this.userLoc, Pair.with(caseDict.get(caseID).getLat(), caseDict.get(caseID).getLon())));
        }

        // Initialize closestCase
        MapInfo.closestCase = new ArrayList<>(caseDict.values());
        Collections.sort(MapInfo.closestCase);
    }
    
    // Getters
    public static List<CaseData> getClosestCase() { return closestCase; }

    // Setters
    public void setDestination(double lat, double lon) {
        this.destinationLoc = Pair.with(lat, lon);
    }
    public void updateUserLoc() {
        // ToDo, use Unimelb for now
        this.userLoc = Pair.with(-37.79812546095852, 144.96096326974035);
    }

    // Function
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

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }
    
    // // Get caseID,Distance Tuple for closest distance
    // public Pair<String,Double> getClosest()
    // {

    // }


}
