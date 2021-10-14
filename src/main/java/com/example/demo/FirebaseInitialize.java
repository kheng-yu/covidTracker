package com.example.demo;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.apache.catalina.core.ApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import javax.servlet.ServletContext;

@Service
public class FirebaseInitialize {


    @Autowired
    ServletContext servletContext;

    @PostConstruct
    public void initialize() {
//            FileInputStream serviceAccount = null;
        try {
//            ServletContext servletContext = getServletContext();
            FileInputStream serviceAccount = new FileInputStream("AccountKey.json");
//            System.out.println(serviceAccount);
//            InputStream serviceAccount= this.getClass().getClassLoader().getResourceAsStream("./serviceAccountKey.json");
//            serviceAccount = new FileInputStream("./serviceAccountKey.json");
            FirebaseOptions options = new FirebaseOptions.Builder()
//                    .setCredentials(FixedCredentialsProvider.create(credntails))
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//                    .setProjectId("fir-b1fc6")
//                    .setDatabaseUrl("https://fir-b1fc6.firebaseio.com/")
                    .build();
//            if(FirebaseApp.getApps().isEmpty()){
                FirebaseApp.initializeApp(options);
//               System.out.println(app.getName());


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Firestore getFirebase(){
        return FirestoreClient.getFirestore();
    }
}