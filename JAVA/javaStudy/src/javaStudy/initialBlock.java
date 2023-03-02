package javaStudy;

class initialField {
	// 명시적 초기화
	static int classVar =  10; // 클래스 변수
	int instanceVar = 20; // 인스턴스 변수
	
	// 인스턴스 초기화 블록
	private String name;
	private int year;
	private String color;
	private int max;
	private int current;
	
	{ // 중괄호만을 이용해 초기화한다.
		this.current = 0;
	}
	
	initialField() {}
	initialField(String name, int year, String color, int max) {
		this.name = name;
		this.year = year;
		this.color = color;
		this.max = max;
	}
	
	public int getMax() {
		return current;
	}
	
	// 클래스 초기화 블록
	static {
		classVar = 10;
	}
	
	// 초기화 순서
	static int classVar1 = 10; // 클래스 변수의 명시적 초기화
	int instanceVar1 = 10; // 인스턴스 변수의 명시적 초기화
	static { classVar1 = 20; } // 클래스 초기화 블록을 이용한 초기화
	{ instanceVar1 = 30; } // 생성자를 이용한 초기화
}

public class initialBlock {
	public static void main(String[] args) {
		// 인스턴스 초기화
		initialField myinitialField = new initialField(); // 인스턴스 생성
		System.out.println(myinitialField.getMax()); // 인스턴스 메소드 생성 -> 0
		
		// 클래스 초기화
		System.out.println(initialField.classVar); // 클래스 변수에 접근 -> 10;
		
		// 초기화 순서
		System.out.println(initialField.classVar1);
		initialField myInit = new initialField(); // 20
		System.out.println(myInit.instanceVar1); // 30
	}
}
