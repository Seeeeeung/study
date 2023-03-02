package javaStudy;

class Parent2 {int a = 10;}

class Child2 extends Parent2 {
	void display() {
		System.out.println(a);
		System.out.println(this.a);
		System.out.println(super.a);
	}
}

class Child3 extends Parent2 {
	int a = 20;
	
	void display() {
		System.out.println(a);
		System.out.println(this.a);
		System.out.println(super.a);
	}
}

//super()
class Parent3 {
	int a;
	Parent3() {a = 10;}
	Parent3(int n) { a = n; }
}

class Child4 extends Parent3 {
	int b;
	
	Child4() {
//		super(40); -> 생성자가 재정의되어 40 반환
		b = 20;
	}
	
	void display() {
		System.out.println(a);
		System.out.println(b);
	}
}

public class Inherit02 {
	public static void main(String[] args) {
		Child2 ch2 = new Child2();
		ch2.display(); // int 형 변수는 부모클래스에만 선언되어 있기때문에 this, super 참조 모두 같은 값을 출력함
		
		System.out.println("\n");
		
		Child3 ch3 = new Child3();
		ch3.display(); // 자식 클래스에서도 선언되어 있어서 this와 지역변수는 자식클래스에서 대입된 값을 출력 / super 는 부모 클래스에서 대입된 값 출력

		System.out.println("\n");
		
		Child4 ch4 = new Child4();
		ch4.display();

		System.out.println("\n");
	}
}
