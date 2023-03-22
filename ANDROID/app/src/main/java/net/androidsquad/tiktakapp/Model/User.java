package net.androidsquad.tiktakapp.Model;

public class User {

    private String Name;
    private String Password;
    private String mail;
    private String PhoneNumber;


    public User() {
    }

    public User(String name, String password) {
        Name = name;
        Password = password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getPassword() {
        return Password;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPhoneNumber() {
        return PhoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        PhoneNumber = phoneNumber;
    }
}
