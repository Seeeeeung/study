package javaStudy;

public class StringBuffer_method {
	public static void main(String[] args) {
		// append
		StringBuffer appendStr = new StringBuffer("Java");
		System.out.println("원본 문자열 : " + appendStr);
		System.out.println(appendStr.append("수업"));
		System.out.println("append() 메소드 호출 후 원본 문자열 : " + appendStr + "\n");
		
		// capacity
		StringBuffer str01 = new StringBuffer();
		StringBuffer str02 = new StringBuffer("Java");
		
		System.out.println(str01.capacity());
		System.out.println(str02.capacity() + "\n"); // 기본문자크기 16 + java (4개추가)
		
		// delete
		StringBuffer deletStr = new StringBuffer("Java Oracle");
		System.out.println("원본 문자열 : " + deletStr);
		System.out.println(deletStr.delete(4,8));
		System.out.println(deletStr.deleteCharAt(1));
		System.out.println("deleteChartAt() 메소드 호출 후 원본 문자열 : " + deletStr + "\n");
		
		// insert
		StringBuffer insertStr = new StringBuffer("Java 만세!!");
		System.out.println("원본 문자열 : " + insertStr);
		System.out.println(insertStr.insert(4, "Script"));
		System.out.println("insert() 메소드 호출 후 원본 문자열 : " + insertStr + "\n");
	}
}
