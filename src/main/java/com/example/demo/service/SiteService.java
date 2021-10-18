package com.example.demo.service;

import com.example.demo.model.Coords;
import com.example.demo.model.ExposureSite;
import com.example.demo.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class SiteService {
    private static final String COLLECTION_NAME = "Exposure Sites";

    //    distance constants
    private final int R = 6371;
    private final double SENSITIVITY = 100.0;

    public ExposureSite getSiteDetailsById(String dhid) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<DocumentSnapshot> future = dbFirestore.collection(COLLECTION_NAME).document(dhid).get();

        DocumentSnapshot document = future.get();

        ExposureSite exposureSite = null;
        if(document.exists()){
            exposureSite = document.toObject(ExposureSite.class);
            return exposureSite;

        }else {
            return null;
        }
    }
    public List<ExposureSite> getSiteDetails() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Iterable<DocumentReference> documentReferences = dbFirestore.collection(COLLECTION_NAME).listDocuments();
        Iterator<DocumentReference> iterator = documentReferences.iterator();

        List<ExposureSite> exposureSiteList = new ArrayList<>();
        ExposureSite exposureSite = null;
        int i = 10;
        while (iterator.hasNext()){
//        while ( i-- > 0 && iterator.hasNext()){
            DocumentReference documentReference = iterator.next();
            ApiFuture<DocumentSnapshot> future = documentReference.get();
            DocumentSnapshot document = future.get();
            exposureSite = document.toObject(ExposureSite.class);
            exposureSiteList.add(exposureSite);
        }
        return exposureSiteList;
    }

    public List<ExposureSite> getCloseSites(Coords coords) throws ExecutionException, InterruptedException {

        List<ExposureSite> allExposureSiteList = new ArrayList<>();
        List<ExposureSite> closeExposureSiteList = new ArrayList<>();
        allExposureSiteList = getSiteDetails();
        for(ExposureSite site : allExposureSiteList){
            double dis = calcDist(site.getCoords(), coords);
            if(dis <  SENSITIVITY/1000){
                closeExposureSiteList.add(site);
                System.out.println("this distance is " + dis);
            }
        }

        return closeExposureSiteList;

    }

    public double calcDist(Coords loc1, Coords loc2)
    {
        double lat1 = loc1.getLatitude();
        double lon1 = loc1.getLongitude();
        double lat2 = loc2.getLatitude();
        double lon2 = loc2.getLongitude();

        double dLat = Math.toRadians(lat1 - lat2);
        double dLon = Math.toRadians(lon1 - lon2);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(Math.toRadians(lat1))
                * Math.cos(Math.toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // in km
    }

}
