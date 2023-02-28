package exampleProject;

import java.util.Arrays;

public class init {
	int a;
	String b;
	Boolean c;
	
	// 메소드
	public String test_method(String send) {
	// 접근제어자 반환형 메소드명 (매개변수)
	// 반환형에 void 를 사용하면 아무것도 반환하지 않는다.
		System.out.println("method inside");
		
		String send_value = send + "값 들어옴";
		
		return send_value; // 이 값을 반환 (String 타입으로 반환)
	}
	
	public static void main(String[] args) {
		System.out.println((int)Math.log10(12400)+1);
		
		String str = "a";
		System.out.println(Character.isUpperCase(str.charAt(0))); // 대문자 확인
		System.out.println(Character.isLowerCase(str.charAt(0))); // 소문자 확인
		
		// 배열복사
		int[] arr = new int[] {1,2,3,4};
		int[] copyArr = Arrays.copyOf(arr, 2); // 복사할 배열, 배열길이만큼의 것
		int[] copyArr2 = Arrays.copyOfRange(arr, 1, 3); // 복사할 배열, 배열시작에있는 것, 배열끝에있는것
		
		for (int i = 0; i<copyArr.length; i++) {
			System.out.println(copyArr[i]);
		}
		System.out.println("아래부터 copyofRange");
		
		for (int i=0; i<copyArr2.length; i++) {
			System.out.println(copyArr2[i]);
		}
		
		// 문자열 비교
		String a = "A";
		String b = new String("A");
		String c = "A";
		
		if (a==b) {
			System.out.println("SAME");
		} else {
			System.out.println("not Same");
		} // not same
		
		if (a==c) {
			System.out.println("Same");
		} else {
			System.out.println("not same");
		} // same
		
		if (a.equals(b)) {
			System.out.println("same");
		} else {
			System.out.println("not same");
		} // same
		
		// -> == 은 메모리의 위치가 같은지를 비교하는 것이고, 문자열이 같은 텍스트인지 비교하려면 .equals() 를 사용해야함
		
		
		// 메소드
		init me = new init(); // init 라는 객체를 me 라는 이름으로 새로 정의해서 사용하겠다고 선언
		System.out.println(me.test_method("SEND")); // 메소드로 사용가능
		
		
		init it = new init();
		System.out.println(it.a);
		System.out.println(it.b);
		System.out.println(it.c);
		
		
	}

}
