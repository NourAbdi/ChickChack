package net.androidsquad.tiktakapp.Model;

public class City {

    private String Name;
    private Resturant[] resturants;

    public City() {
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public Resturant[] getResturants() {
        return resturants;
    }

    public void setResturants(Resturant[] resturants) {
        this.resturants = resturants;
    }

//    public void addResturants(Resturant resturants) {
//        this.resturants = resturants;
//    }
}
