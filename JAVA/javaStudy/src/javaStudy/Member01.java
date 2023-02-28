package javaStudy;

// 변수
class Field {
	  static int classVar = 10; // 클래스/스태틱 변수선언
	  int instanceVar = 20; // 인스턴스 변수선언
	  
	  int method() {
		  int localVar = 30; // 지역변수 선언
		  return localVar;
	  }
}


public class Member01 {
	public static void main(String[] args) {
		System.out.println(Field.classVar); // 클래스/스태틱 변수참조
		
		Field myField1 = new Field(); // 인스턴스 생성
		
		System.out.println(myField1.instanceVar); // 인스턴스 변수 참조
		System.out.println(myField1.method()); // 메소드 안의 지역변수 출력
		
		System.out.println("\n");
		
		Field myField2 = new Field(); // 인스턴스 생성
		Field myField3 = new Field(); // 인스턴스 생성
		Field myField4 = new Field(); // 인스턴스 생성
		
		// 인스턴스 변수는 각 객체마다 개별적으로 저장
		myField2.instanceVar = 10;
		myField3.instanceVar = 20;
		myField4.instanceVar = 30;
		
		System.out.println(myField2.instanceVar);
		System.out.println(myField3.instanceVar);
		System.out.println(myField4.instanceVar);
		
		// 클래스 변수는 하나의 클래스 값으로 공유되어 고정으로 저장된다.
		myField2.classVar = 100;
		myField3.classVar = 200;
		myField4.classVar = 300;
		
		System.out.println(myField2.classVar);
		System.out.println(myField3.classVar);
		System.out.println(myField4.classVar);
		// 실행은 되지만 컴파일 경고를 한다 (노란줄)
		
		// 클래스 변수에 접근하려면 field.classVar 식으로 클래스 명으로 바로 접근해야함
		System.out.println(Field.classVar); 
	}
}
