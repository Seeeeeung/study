package javaStudy;

abstract class Animal { 
	abstract void cry(); // 추상 메소드 
} // 추상 클래스

// 상속 자식
class Cat extends Animal { void cry() {System.out.println("야옹");} } // 추상메소드인 cry 오버라이딩
class Dog extends Animal { void cry() {System.out.println("멍");} }

public class Abstract01 {
	public static void main(String[] args) {
//		Animal a = new Animal(); -> 추상 클래스는 인스턴스 생성불가능
		Cat c = new Cat(); // 인스턴스 생성
		Dog d = new Dog();
		
		c.cry();
		d.cry();
	}
}
