package exampleProject;

import java.util.Arrays;

public class print {
	public static void main(String[] args) {
//		System.out.println("Hello Java!!");
//		System.out.println("2+3 = 5");
//		System.out.println(2+3);
		
		int a = 10;
		if (a == 10) {
			System.out.println("a의 값은 10 입니다.");
		} else if (a != 10) {
			System.out.println("a의 값은 10이 아닙니다.");
		}
		
		if (a > 10) {
			System.out.println("a 는 10 보다 크다");
		} else if (a < 10) {
			System.out.println("a는 10보다 작다");
		} else {
			System.out.println("a는 10이다");
		}
		
		System.out.println((1>2) ? "big" : "small");
		
		int n = 2;
		switch(n) { // break 가 없을땐 case 2 부터 아래로 전부 true로 판단하기때문에 true인 값 한개만 반환하려면 break를 사용해야함.
			case 1:
				System.out.println("값 = 1");
			break;
			case 2:
				System.out.println("값 = 2");
			break;
			case 3:
				System.out.println("값 = 3");
			break;
			default:
				System.out.println("3 이상의 다른 값");
		}
		
		/*
		// while 반복문
		int num = 1;
		
		while(num < 5) {
			System.out.println("'while' l like Java" + num); // 1~ 4 까지 실행 후
			num++; // 4+1 = 5 이기 때문에 5는 실행중단.
		}
		
		do {
			System.out.println("'do' l link Java" + num);
			num++;
		} while(num < 5); // 출력값 같음....
		
		for (int i=1; i<=10; i++) {
			System.out.println(i);
		}
		*/
		
		// 예제 0-4까지 출력
		int num = 0;
		while(num < 5) {
			System.out.println("while"+num);
			num++;
		}
		
		int num2 = 0;
		do {
			System.out.println("do"+num2);
			num2++;
		} while(num2<5);
		
		for(int i=0; i<5; i++) {
			System.out.println("for"+i);
		}
		
		// 배열
		int[] grade1 = new int[3];
		int[] grade2 = new int[3]; // 길이가 3인 int형 배열의 선언 및 생성
		grade1[0] = 85; // 인덱스를 이용한 배열의 초기화
		grade1[1] = 65;
		grade1[2] = 90;
		
		grade2[0] = 85; // 배열의 길이보다 적은 수의 배열 요소만 초기화
		
		for (int i = 0; i < grade1.length; i++) {
			System.out.println(grade1[i] + " ");
		}
		
		for (int i = 0; i <grade2.length; i++) {
			System.out.println(grade2[i] + " ");
		}
		
//		System.out.println(grade1[3]); // ArrayIndexOutOfBounds 예외발생오류
		
		// 배열의 초기화방법
		int[] grade3 = {70, 90, 80}; // 배열의 선언과 동시에 초기화
		int[] grade4 = new int[] {70, 90, 80}; // 배열의 선언과 동시에 초기화
		int[] grade5;
//		grade5 = {70, 90, 80}; 이미 선언된 배열을 이 방법으로 초기화하면 오류발생
		int[] grade6;
		grade6 = new int[]{70, 90, 80}; // 이미 선언된 배열은 이 방법으로만 초기화 가능
		
		// 예제
		int[] grade7 = new int[] {85, 65, 90};
		int sum = 0;
		
		for (int i=0; i<grade7.length; i++) {
			sum += grade7[i];
		}
		System.out.println(sum);
		System.out.println(sum / grade7.length);
		

		// 다차원 배열
		int[][] arr = new int[2][3];
		int k = 10;
		for (int i = 0; i < arr.length; i++) {
//			System.out.println(arr.length + "arr"); // 2
			for (int j = 0; j < arr[i].length; j++) {
				arr[i][j] = k;
				k += 10;
//				System.out.println(arr[i].length + "arr"); // 3
			}
		}
		
		for (int i=0; i<arr.length; i++) {
			for (int j=0; j<arr[i].length; j++) {
				System.out.print(arr[i][j] + " ");
			}
			System.out.println();
		}
		
		// 가변배열
		int[][] arr2 = {
				{10, 20},
				{10, 20, 30, 40},
				{10}
		};
		
		// 배열의 복사
		int[] arr3 = new int[] {1,2,3,4,5};
		int newLen = 10;
		
		// arraycopy()
		int[] arr4 = new int[newLen];
		System.arraycopy(arr3, 0, arr4, 0, arr3.length);

		for(int i = 0; i<arr4.length; i++) {
			System.out.print(arr4[i]+" ");
		}
		System.out.println(" ");
		
		// copyOf()
		int[] arr5 = Arrays.copyOf(arr3, 10);
		for(int i = 0; i<arr5.length; i++) {
			System.out.print(arr5[i]+" ");
		}
		System.out.println(" ");
		
		// clone()
		int[] arr6 = (int[])arr3.clone();
		for(int i = 0; i<arr6.length; i++) {
			System.out.print(arr6[i]+" ");
		}
		System.out.println(" ");
		
		// for문, 인덱스 이용 복사
		int[] arr7 = new int[newLen];
		for (int i=0; i<arr3.length; i++) {
			arr7[i] = arr3[i];
		}
		for(int i = 0; i<arr7.length; i++) {
			System.out.print(arr7[i]+" ");
		}
		System.out.println(" end ");
		
		// Enhanced for
		int[] arr8 = new int[]{1,2,3,4,5};
		int[] arr9 = new int[]{1,2,3,4,5};
		
		for (int e : arr8) {
			System.out.print(e + " ");
		}
		System.out.println(" end ");
		
		// 예제 : 모든 배열요소에 10을 더함
		for(int i = 0; i<arr8.length; i++) {
			arr8[i] += 10;
			// 출력
			System.out.print(arr8[i] + " ");
		}
		System.out.println(" end ");
		
		for (int e:arr9) {
			e += 10;
		}
		for(int i = 0; i<arr9.length; i++) {
			// 출력
			System.out.print(arr9[i] + " ");
		} // 배열 끝
		
		// 클래스
		

		
	} // Main
	
} // print


