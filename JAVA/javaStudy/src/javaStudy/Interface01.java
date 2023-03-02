package javaStudy;

interface Animal_02 {public abstract void cry();}

class Cat_02 implements Animal_02 {
	public void cry() {
		System.out.println("야옹");
	}
}

class Dog_02 implements Animal_02 {
	public void cry() {
		System.out.println("멍멍");
	}
}

public class Interface01 {
	public static void main(String[] args) {
		Cat_02 c = new Cat_02();
		Dog_02 d = new Dog_02();
		
		c.cry();
		d.cry();
	}

}
