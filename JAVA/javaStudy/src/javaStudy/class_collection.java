package javaStudy;
import java.util.*;

public class class_collection {
	public static void main(String[] args) {
		// 리스트 생성
		ArrayList<String> arrList = new ArrayList<String>();
		
		// 리스트에 요소의 저장
		arrList.add("넷");
		arrList.add("둘");
		arrList.add("셋");
		arrList.add("하나");
		
		// 리스트 요소의 출력
		for (int i = 0; i < arrList.size(); i++) {
			System.out.println(arrList.get(i));
		}
	}
}
