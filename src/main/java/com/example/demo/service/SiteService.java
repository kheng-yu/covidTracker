package com.example.demo.service;

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
    public List<ExposureSite> getSiteDetailsk() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Iterable<DocumentReference> documentReferences = dbFirestore.collection(COLLECTION_NAME).listDocuments();
        Iterator<DocumentReference> iterator = documentReferences.iterator();

        List<ExposureSite> exposureSiteList = new ArrayList<>();
        ExposureSite exposureSite = null;
        int i = 10;
//        while (iterator.hasNext()){
        while ( i-- > 0 && iterator.hasNext()){
            DocumentReference documentReference = iterator.next();
            ApiFuture<DocumentSnapshot> future = documentReference.get();
            DocumentSnapshot document = future.get();
            exposureSite = document.toObject(ExposureSite.class);
            exposureSiteList.add(exposureSite);
        }
        return exposureSiteList;
    }

}
