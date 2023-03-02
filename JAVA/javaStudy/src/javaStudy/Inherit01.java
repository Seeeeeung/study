package javaStudy;

class Parent {
	private int a = 10; 
	public int b = 20;
}

class Child extends Parent {
	public int c = 30;
	void display() {
//		System.out.println(a); private 로 설정되어있어서 접근 불가함
		System.out.println(b);
		System.out.println(c);
	}
}

public class Inherit01 {
	public static void main(String[] args) {
		Child ch = new Child();
		ch.display();
	}
}
