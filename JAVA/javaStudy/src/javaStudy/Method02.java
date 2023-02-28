package javaStudy;

class Car {
//	private String modelName = "소나타";
//	private int modelYear = 2016;
//	private String color = "파란색";
	private String modelName;
    private int modelYear;
    private String color;
    private int maxSpeed;
    private int currentSpeed;
    
    Car(String modelName, int modelYear, String color, int maxSpeed) {
    	this.modelName = modelName;
    	this.modelYear = modelYear;
    	this.color = color;
    	this.maxSpeed = maxSpeed;
    	this.currentSpeed = 0;
    }
    
   // this() 함수
    Car() {
    	this("소나타", 2012, "검정색", 160); // 다른 생성자 호출
    }

    public String getModel() {
		return this.modelYear + "년식 " + this.color + " " + this.modelName;
	}
}

public class Method02 {
	public static void main(String[] args) {
//		Car myCar = new Car(); // 기본 생성자 호출 -> 매개변수를 갖는 생성자가 정의 되었기 때문에 오류발생
		Car myCar = new Car("아반떼", 2016, "흰색", 200); // 매개변수를 갖는 생성자 호출
		
		System.out.println(myCar.getModel()); // 생성자에 의해 초기화 되었는지 확인
		
		Car tcpCar = new Car();
		System.out.println(tcpCar.getModel());
	}
}
