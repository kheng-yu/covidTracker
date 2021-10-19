package com.covidtracker;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentReference;


public class firebase{
     public static void main( String[] args ) {
        // Use the application default credentials
        GoogleCredentials credentials = GoogleCredentials.getApplicationDefault();
        FirebaseOptions options = new FirebaseOptions.Builder()
            .setCredentials(credentials)
            .setProjectId(covid-app-a03d8)
            .build();
        FirebaseApp.initializeApp(options);

        Firestore db = FirestoreClient.getFirestore();

        

        String url = "https://discover.data.vic.gov.au/datastore/dump/afb52611-6061-4a2b-9110-74c920bede77"
        URL content = new URL(url);
        InputStream stream = content.openStream();

        Scanner inputStream = new Scanner(stream);
        while (inputStream.hasNext()) {
            String data = inputStream.next();
            String[] values = data.split(",");
        }
        inputStream.close();

        Map<String, Object> docData = new HashMap<>();
        for(int i = 1; i < length(values); i++){
        docData.put("test", values[i]);
        ApiFuture<WriteResult> result = db.collection("tests").document("%d",i).set(docData);
        }
        


        

        
        }
    }
