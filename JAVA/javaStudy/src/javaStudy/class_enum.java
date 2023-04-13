package javaStudy;

public class class_enum {
	public static void main(String[]args) {
		// 문법
		enum Rainbow {RED, ORANGE, YELLOW, GREEN, BLUE, INDIGO, VIOLET};
		// 사용방법
		System.out.println(Rainbow.RED + "\n");
		
		// 불규칙한 특정 값 상숫값으로 명시
		enum Alpabet {
			AAA(3), BBB(10), CCC(21), DDD(5), EEE(1), FFF(-1), GGG(-11);

			private final int value;
			Alpabet(int value) {this.value = value;}
			public int getValue() {return value;}
		}

		// values()
		Rainbow[] arr = Rainbow.values();
		for (Rainbow rb : arr) {
			System.out.println(rb);
		}
		System.out.println();

		// valueOf()
		Rainbow rb2 = Rainbow.valueOf("GREEN");
		System.out.println(rb2 + "\n");

		// ordinal()
		int idx = Rainbow.YELLOW.ordinal();
		System.out.println(idx + "\n");
		
		// 불규칙한 상수를 가진 열거체에서 사용한 예제
		System.out.println(Alpabet.DDD.ordinal());
	}
}
