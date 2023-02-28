package exampleProject;

import java.util.*;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;

class myObject {
	int id;
	String description;
	
	myObject(int id, String description) {
		this.id = id;
		this.description = description;
	}
}

public class arrayInpa {
	public static void main(String[] args) {
		int[] iArr = {100, 95, 80, 70, 60};
		
		for (int i = 0; i<iArr.length; i++) {
			System.out.println(iArr[i]);
		}
		
		System.out.println(Arrays.toString(iArr)); 
		// import 로 얻은 패키지로 Arrays.toString 을 사용하여 배열을 for문 없이 바로 얻을수 있다.
		
		
		// 배열 정렬
		int[] arr = {3,2,0,1,4};
		Integer[] arr2 = {3,2,0,1,4};
		
		// 오름차순 정렬
		Arrays.sort(arr); // 자기 자신 배열을 정렬 (정렬된 배열을 반환하는것이 아님)
		System.out.println(Arrays.toString(arr));
		
		// 내림차순 정렬
		Arrays.sort(arr2, Collections.reverseOrder()); 
		// int 타입은 작동하지 않음. integer 로 변환해야함....
		System.out.println(Arrays.toString(arr2));
		
		// 일부만 정렬
		int[] arr3 = {3,2,0,1,4};
		Arrays.sort(arr3, 0, 3); // 0,1,2만 정렬
		System.out.println(Arrays.toString(arr3));
		
		// 배열비교
		String[] str1 = {"홍길동", "임꺽정", "박혁거세", "주몽", "고담덕"};
		String[] str2 = {"홍길동", "임꺽정", "박혁거세", "주몽", "고담덕"};
		String[] str3 = {"홍길동", "임꺽정", "박혁거세", "주몽"};
		
		System.out.println("str1 == str2 : " + Arrays.equals(str1, str2));
		System.out.println("Str1 == str3 : " + Arrays.equals(str1, str3));
		
		// 다차원배열 한번에 추출
		int[] arr4 = {0,1,2,3,4};
		System.out.println(Arrays.toString(arr4));
		
		int[][] arr5 = {
				{10,20,30},
				{40,50,60},
				{70,80,90},
				{100,200,300}
		};
		
		System.out.println(Arrays.deepToString(arr5));
		
		// 다차원배열 비교
		  String[][] strA1 = { 
				  { "홍길동", "임꺽정" },
				  { "박혁거세", "주몽", "고담덕" }
	      };
	      String[][] strA2 = { 
	    		  { "홍길동", "임꺽정" },
	    		  { "박혁거세", "주몽", "고담덕" }
	      };
	      String[][] strA3 = { 
	    		  { "홍길동" },
	    		  { "주몽", "고담덕" }
	      };
	      
	      System.out.println("strA1 == strA2 : " + Arrays.deepEquals(strA1, strA2));
	      System.out.println("strA1 == strA3 : " + Arrays.deepEquals(strA1, strA3));
	      
	      // 객체배열
	      myObject[] arrayObj = new myObject[3];
	      
	      arrayObj[0] = new myObject(101, "first");
	      arrayObj[1] = new myObject(102, "second");
	      arrayObj[2] = new myObject(103, "third");
	      
	      System.out.println(arrayObj[0].description);
	      
	      myObject[] arrayObj2 = {
	    		  new myObject(101, "first"),
	    		  new myObject(101, "second"),
	    		  new myObject(101, "third")
	      };
	      
	      System.out.println(arrayObj2[1].description);
	      
	      // 객체배열 복사
	      // 배열 내용물 객체는 참조복사됨(주소복사)
	      // 복사한 객체의 멤버를 변경하면 원본객체도 변경되니 주의
	      System.out.println(Arrays.toString(arrayObj2)); // 주소반환
	      
	      myObject[] arrayObj3; // 복사할 배열
	      
	      arrayObj3 = arrayObj2.clone(); // 배열복사 == 객체의 주소는 원본과 같음
	      System.out.println(Arrays.toString(arrayObj3)); // arryaObj2 와 주소가 같다
	      
//	      System.out.println(arrayObj2[0].id);  // 101
//	      arrayObj3[0].id = 999; // 복사한 배열의 멤버변경
//	      System.out.println(arrayObj3[0].id); // 999 (clone)
//	      System.out.println(arrayObj2[0].id); // 999 원본
	      
	      // 완전히 깊은 복사를 이행하기 위해서는 for 문으로 수동변경해야함
	      System.out.println(Arrays.toString(arrayObj2)); // 원본주소
	      
	      myObject[] arrayObj4 = new myObject[3];
	      for (int i=0; i<arrayObj2.length; i++) {
	    	  arrayObj4[i] = new myObject(arrayObj2[i].id, arrayObj2[i].description);
	      }
	      
	      System.out.println(Arrays.toString(arrayObj4)); //  주소 달라짐
	      
	      System.out.println(arrayObj2[0].id); // 101
	      arrayObj4[0].id = 999;
	      System.out.println(arrayObj4[0].id); // 999
	      System.out.println(arrayObj2[0].id); // 101
	      
	      // 객체 배열 정렬
	      class User {
	    	  String name;
	    	  int age;
	    	  
	    	  User(String name, int age) {
	    		  this.name = name;
	    		  this.age = age;
	    	  }
	      }
	      
	      User[] users = {
	    		  new User("홍길동", 32),
	    		  new User("김춘추", 64),
	    		  new User("임꺽정", 48),
	    		  new User("박혁거세", 14),
	      };
	      
	      // 같은 타입의 인스턴스를 서로 비교해야 할 때 Comparable 인터페이스 구현 -> compareTo() 메소드 오버라이딩으로 정의후 사용
	      // 기본타입, Boolean을 제외한 래퍼 클래스나 , String, Time, Date 와 같은 클래스의 인스턴스는 모두 정렬 가능
	      
	      // 클래스에 Comparable<> 인터페이스 구현
	      class User2 implements Comparable<User2> {
	    	  String name;
	    	  int age;
	    	  
	    	  User2(String name, int age) {
	    		  this.name = name;
	    		  this.age = age;
	    	  }
	    	  
	    	  @Override
	    	  public int compareTo(User2 user) {
	    		  // 비교로직 구현
	    		  if (this.age < user.age) {
	    			  return -1;
	    		  } else if (this.age == user.age) {
	    			  return 0;
	    		  } else {
	    			  return 1;
	    		  }
	    	  }
	      }

	      User2[] users2 = {
	    		  new User2("홍길동", 32),
	    		  new User2("김춘추", 64),
	    		  new User2("임꺽정", 48),
	    		  new User2("박혁거세", 14),
	      };
	      
	      Arrays.sort(users2); // 나이순 정렬
//	      Arrays.sort(users, Collections.reverseOrder()); // 역순정렬
	      
	      for (User2 u : users2) {
	    	  System.out.println(u.name + " " + u.age + "세");
	      }
	      
	      // Comparator 사용
	      // 객체를 정렬하는데 사용되는 인터페이스 -> 익명객체를 이용해 좀더 유기적으로 다양하게 속성을 받아 정렬가능, 좀더 간편하게 객체 비교 정렬 가능
	      Arrays.sort(users, new Comparator<User>() {
	    	 @Override
	    	 public int compare(User u1, User u2) {
	    		 return Integer.compare(u1.age, u2.age); // Integer 클래스에 정의된 compare 함수로 두 가격 정수 원시값 비교?
	    	 }
	      });
	      
	      // java 8 람다식으로 다음과 같이 축약 가능
//	      Arrays.sort(users, (u1, u2) -> Integer.compare(u1.age, u2.age)); // 나이순 정렬
	      
	      // 출력
	      for (User u : users) {
	    	  System.out.println(u.name + " " + u.age + "세");
	      }
    	  System.out.println("end");
	      
	      // 나이순이 아닌 문자열순으로 정렬하려면 compare() 대신 compareTo() 메서드로 가능
//	      Arrays.sort(users, new Comparator<User>() {
//	    	  @Override
//	    	  public int compare(User u1, User u2) {
//	    		  return u1.name.compareTo(u2.name);
//	    	  }
//	      });
	      
	      //  람다식으로 축약
	      Arrays.sort(users, (u1,u2) -> u1.name.compareTo(u2.name));
	      
	      // 출력
	      for (User u : users) {
	    	  System.out.println(u.name + " " + u.age + "세");
	      }
	      
	      
	      
	} // main
}
