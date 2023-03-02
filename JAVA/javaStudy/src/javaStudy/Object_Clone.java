package javaStudy;

import java.util.*;

class AA implements Cloneable {
	private String name;
	private ArrayList<String> owners = new ArrayList<String>();
	
	public String getName() {return this.name;} // name 값 반환
	public void setName(String name) {this.name = name;} // name값 설정
	
	public ArrayList getOwners() {return this.owners;} // owners 값 반환
	public void setOwners(String ownerName) {this.owners.add(ownerName);} // owners 값 추가
	
	public Object clone() {
		try {
			AA clonedAA = (AA)super.clone(); //  -> 부모 클래스의 clone() 메소드를 호출하여 오버라이딩
//			clonedAA.owners = (ArrayList)owners.clone();
			return clonedAA;
		} catch (CloneNotSupportedException ex) {
			ex.printStackTrace();
			return null;
		}
	}
}


public class Object_Clone {
	public static void main(String[] args) {
		AA aa01 = new AA(); // AA클래스의 인스턴스인 aa01 생성
		aa01.setName("나나");
		aa01.setOwners("홍길동");
		System.out.println("aa01: " + aa01.getName() + ", " + aa01.getOwners() + "\n");
		
		AA aa02 = (AA)aa01.clone(); // 오더라이딩한 clone()메소드 호출하여 복제 수행
		aa02.setOwners("이순신"); // 복제된 인스턴스인 aa02의 owners 필드에 새로운 값 추가
		System.out.println("aa01 : " + aa01.getName() + ", " + aa01.getOwners()); // 위의 aa01 의 결과와 달리 새로운 값이 추가되었음을 확인할 수 있다.
		// 이처럼 단순히 부모클래스의 clone() 메소드를 호출하여 clone() 메소드를 재정의하면, 복제되는 것이 아닌 해당 배열이나 인스턴스를 가리키는 주소값만 복제된다.
		// 정확한 복제를 위해서는 try 함수 내부 주석을 지운 배열, 인스턴스인 필드에 대해서 별도로 clone() 메소드를 구현하여 호출해야 한다.
		System.out.println("aa02 : " + aa02.getName() + ", " + aa02.getOwners());
	}
}
