package javaStudy;

class MethodOut {
	static int x = 100, y = 200; // 클래스 변수
	
	int a = 10, b = 20; // 인스턴스 변수
	
	int add() { // 인스턴스 메소드
		return this.a + this.b; // 인스턴스 변수끼리 합
	}
	
	static int addStatic() { // 클래스메소드
		return MethodOut.x + MethodOut.y; // 클래스 변수끼리 합
	}
}

class Test {
	// 메소드 원형
	void display(int num1) {
		System.out.println(num1);
	}
	
	// 메소드 오버로딩 : 매개변수 객수가 다른 유형
	void display(int num1, int num2) {
		System.out.println(num1 * num2);
	}
	
	// 메소드 오버로딩 : 매개변수는 같지만, 매개변수 타입이 다른 유형
	void display(int num1, double num2) {
		System.out.println(num1 + num2);
	}
	
	// 매개변수는 같지만, 메서드 반환 타입이 다른 유형은 오버로딩되지 않는다.
	// 따라서 정수 타입을 반환하는 메서드를 작성하고 싶다면 그냥 새로 메서드를 만들면 된다.
	int display2(int num1, int num2) {
		return num1 + num2;
	}
}

public class Method {
	public static void main(String[] args) {
		System.out.println(MethodOut.addStatic()); // 클래스 메소드 호출 : 300
		
		MethodOut myMethodOut = new MethodOut(); // 인스턴스 생성
		System.out.println(myMethodOut.add()); // 인스턴스 메소드 호출 : 30
		
		System.out.println("\n");
		
		// 오버로딩
//		public static void println() {	} -> 메소드 원형
		Test myfunc = new Test();
		
		myfunc.display(10);
		myfunc.display(10,20);
		myfunc.display(10, 3.14);
		myfunc.display(10, 'a');
		
	} // main
}
