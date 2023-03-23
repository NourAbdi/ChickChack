package net.androidsquad.tiktakapp;

//import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.Toast;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;

import net.androidsquad.tiktakapp.Model.Resturant;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {

    FirebaseFirestore firestore ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        firestore = FirebaseFirestore.getInstance();

//        Resturant resturant1 = new Resturant();
//        Resturant resturant2 = new Resturant();
//        Resturant resturant3 = new Resturant();
//        Resturant resturant4 = new Resturant();
//        Resturant resturant5 = new Resturant();
//
//        resturant1.setName("resturant1 Name");
//        resturant1.setMail("resturant1 Mail");
//        resturant1.setPassword("resturant1 Password");
//        resturant1.setPhoneNumber("resturant1 Phone");
//
//        resturant2.setName("resturant2 Name");
//        resturant2.setMail("resturant2 Mail");
//        resturant2.setPassword("resturant2 Password");
//        resturant2.setPhoneNumber("resturant2 Phone");
//
//        resturant3.setName("resturant3 Name");
//        resturant3.setMail("resturant3 Mail");
//        resturant3.setPassword("resturant3 Password");
//        resturant3.setPhoneNumber("resturant3 Phone");
//
//        resturant4.setName("resturant4 Name");
//        resturant4.setMail("resturant4 Mail");
//        resturant4.setPassword("resturant4 Password");
//        resturant4.setPhoneNumber("resturant4 Phone");
//
//        resturant5.setName("resturant5 Name");
//        resturant5.setMail("resturant5 Mail");
//        resturant5.setPassword("resturant5 Password");
//        resturant5.setPhoneNumber("resturant5 Phone");
//
//
//        firestore.collection("Resturant").add(resturant1);
//        firestore.collection("Resturant").add(resturant2);
//        firestore.collection("Resturant").add(resturant3);
//        firestore.collection("Resturant").add(resturant4);
//        firestore.collection("Resturant").add(resturant5);


//        Map<String,Object> user = new HashMap<>();
//        user.put("userName","Nour Abdi" );
//        user.put("phoneNumber","0525473646" );
//        user.put("password","Nour" );
//        user.put("mail","nour.mail" );
//
//        firestore.collection("user").add(user).addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
//            @Override
//            public void onSuccess(DocumentReference documentReference) {
//                Toast.makeText(getApplicationContext(),"SUCCESS",Toast.LENGTH_LONG).show();
//            }
//        }).addOnFailureListener(new OnFailureListener() {
//            @Override
//            public void onFailure(@NonNull Exception e) {
//                Toast.makeText(getApplicationContext(),"FAILED",Toast.LENGTH_LONG).show();
//            }
//        });
    }
}