package net.androidsquad.tiktakapp.Model;

public class Resturant {

    private String Name;
    private String Password;
    private String Mail;
    private String PhoneNumber;
//    private OpeningHours;
//    private Menu;


    public Resturant() {
    }

    public Resturant(String name, String password) {
        Name = name;
        Password = password;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getMail() {
        return Mail;
    }

    public void setMail(String mail) {
        Mail = mail;
    }

    public String getPhoneNumber() {
        return PhoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        PhoneNumber = phoneNumber;
    }
}

