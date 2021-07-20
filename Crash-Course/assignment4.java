public class calculateArea {
    private double width;
    private double length;
    private double radius;
    private double height;

    //getArea method for a rectangle
    public static double getArea(int length, int width) {
        return length * width;
    }

    //getArea method for a circle
    public static double getArea(double radius) {
        return Math.PI * radius * radius;
    }

    //getArea method for a cylinder
    public static double getArea(double radius, double height) {
        return Math.PI * radius * radius * height;
    }

    public void display() {
        System.out.println("L = "+length+ " W = "+width + " Area of a Rectangle = "+ getArea(5, 3));
        System.out.println("R = "+radius+ " Area of a Circle = "+ getArea(4));
        System.out.println("R = "+radius+ " H = "+height + " Area of a Cylinder = "+ getArea(3, 6));
    }

}