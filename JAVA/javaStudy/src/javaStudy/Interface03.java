package javaStudy;

class Animal_04 {
	public void cry() {
		System.out.println("짖기");
	}
}

class Cat_04 extends Animal_04 {
	public void cry() {
		System.out.println("냥냥");
	}
}

class Dog_04 extends Animal_04 {
	public void cry() {
		System.out.println("월월");
	}
}

// 클래스 다중 상속 문제점
//class MyPet extends Cat_04, Dog_04 {} -> cat, dog 동시 상속으로 인해 main 클래스에서 호출한 p.cry 가 cat, dog 중 어떤 것에서 호출한것인지 모호해짐 -> error표시 자바에서 지원하지 않음
// 아래처럼 인터페이스를 이용하여 다중 상속해야 모호성을 방지 할 수 있다.

interface Animal_05 {public abstract void cry();}

interface Cat_05 extends Animal_05 {public abstract void cry();}
interface Dog_05 extends Animal_05 {public abstract void cry();}

class MyPet implements Cat_05, Dog_05 {
	public void cry() {
		System.out.println("멍멍, 냥냥냥");
	}
}


public class Interface03 {
	public static void main(String[] args) {
		MyPet p = new MyPet();
		MyPet p2 = new MyPet();
		p.cry();
		
		// Object 클래스
		System.out.println(p.toString());
		System.out.println(p2.toString());
		System.out.println(p.equals(p2)); // false
		
		p = p2;
		System.out.println(p.equals(p2)); // true
	}

}
