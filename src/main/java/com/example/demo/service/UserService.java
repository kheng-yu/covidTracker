package com.example.demo.service;

import com.example.demo.model.Coords;
import com.example.demo.model.ExposureSite;
import com.example.demo.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static com.example.demo.service.Util.SENSITIVITY;

@Service
public class UserService {

    private static final String COLLECTION_NAME = "users";
    DecimalFormat df = new DecimalFormat("#.###");

    @Autowired
    private SiteService siteService;

    public String saveUser(User user) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture= dbFirestore.collection(COLLECTION_NAME).document(String.valueOf(user.getTime())).set(user);

        return collectionApiFuture.get().getUpdateTime().toString();
    }

    public User getUserDetailsByName(String name) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(name);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();

        User user = null;
        if(document.exists()){
            user = document.toObject(User.class);
            return user;

        }else {
            return null;
        }
    }
    public List<User> getUserDetails() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Iterable<DocumentReference> documentReferences = dbFirestore.collection(COLLECTION_NAME).listDocuments();
        Iterator<DocumentReference> iterator = documentReferences.iterator();

        List<User> userList = new ArrayList<>();
        User user = null;

        while (iterator.hasNext()){
            DocumentReference documentReference = iterator.next();
            ApiFuture<DocumentSnapshot> future = documentReference.get();
            DocumentSnapshot document = future.get();
            user = document.toObject(User.class);
            userList.add(user);
        }
        return userList;
    }

    public String updateUser(User user) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture= dbFirestore.collection(COLLECTION_NAME).document(user.getName()).set(user);

        return collectionApiFuture.get().getUpdateTime().toString();
    }


    public String deleteUser(String name) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture= dbFirestore.collection(COLLECTION_NAME).document(name).delete();

        return name +"has been delete successfully";
    }

    public List<ExposureSite> getUserExposureSites(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Iterable<DocumentReference> documentReferences = dbFirestore.collection(COLLECTION_NAME).listDocuments();
        Iterator<DocumentReference> iterator = documentReferences.iterator();

        List<ExposureSite> exposureSiteList = new ArrayList<>();
        User user = null;
        List<ExposureSite> ExposureSites = siteService.getSiteDetails();

        while (iterator.hasNext()){
            DocumentReference documentReference = iterator.next();
            ApiFuture<DocumentSnapshot> future = documentReference.get();
            DocumentSnapshot document = future.get();
            user = document.toObject(User.class);


            if(user.getId().equals(id)){
                Coords userCoords = new Coords(user.getLat(), user.getLng());
                for(ExposureSite site: ExposureSites){

                    if(user.getTime().after(site.getStartTime()) && user.getTime().before(site.getEndTime())) {
                        double dist = Util.calcDist(userCoords, site.getCoords());
                        if ( dist < SENSITIVITY / 1000) {
                            site.setDist(Double.parseDouble(df.format(dist)));
                            if(!exposureSiteList.contains(site)){
                                exposureSiteList.add(site);
                            }

                        }
                    }
                }
            }
        }
        return exposureSiteList;
    }

}
