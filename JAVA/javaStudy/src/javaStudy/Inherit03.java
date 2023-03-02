package javaStudy;

// 오버라이딩
class Parent03_1 {
	void display() {System.out.println("부모 클래스의 display()메소드 입니다.");}
}
class Child03_1 extends Parent03_1 {
	void display() {System.out.println("자식클래스의 display() 메소드 입니다.");}
}

// 오버라이딩 + 오버로딩
class Parent03_2 {
	void display() {System.out.println("부모 클래스의 display 메소드");}
}
class Child03_2 extends Parent03_2 {
	// 오버라이딩된 display 메소드
	void display() {System.out.println("자식클래스의 display 메소드");}
	
	// 오버로딩된 display 메솟드
	void display(String str) {System.out.println(str);}
}

// 타입변환
class Parent03_3 {}
class Child03_3 extends Parent03_3 {}
class Brother extends Parent03_3 {}

// 참조변수 확인
class Parent03_4 {}
class Child03_4 extends Parent03_4 {}



public class Inherit03 {
	public static void main(String[] args) {
		Parent03_1 pa = new Parent03_1();
		pa.display();
		Child03_1 ch = new Child03_1();
		ch.display();
		Parent03_1 pc = new Child03_1();
		pc.display();
//		Child03_1 cp = new Parent03_1(); -> 실제 인스턴스의 멤버 개수보다 많기때문에 오류....(?)
		
		System.out.println("\n");
		
		Child03_2 ch03_2 = new Child03_2();
		ch03_2.display();
		ch03_2.display("오버라이딩된 display 메소드");
		
//		// 타입변환
//		Parent03_3 pa01 = null;
//		Child03_3 ch03_3 = new Child03_3();
//		Parent03_3 pa02 = new Parent03_3();
//		Brother br = null;
//		
//		pa01 = ch03_3; // pa01 = (Parent03_3)ch03_3; 과 같으며 타입변환 생략가능
//		br = (Brother)pa02; // 타입변환 생략 불가능
////		br = (Brother)ch03_3; -> 형제이기때문에 서로 상속관계가 성립되지 않으므로 오류발생
		
		// 참조변수 확인 instanceof 연산자
		Parent03_4 p = new Parent03_4();
		System.out.println(p instanceof Object);
		System.out.println(p instanceof Parent03_4);
		System.out.println(p instanceof Child03_4);
		System.out.println();
		
		Parent03_4 c = new Child03_4();
		System.out.println(c instanceof Object);
		System.out.println(c instanceof Parent03_4);
		System.out.println(c instanceof Child03_4);
		
	}
}
