package javaStudy;


public class String_charAt {
	
	public static void main(String[] args) {
		String str = new String("Jave");
		System.out.println("원본 문자열 : " + str);
		
		for (int i = 0; i < str.length(); i++) {
			System.out.print(str.charAt(i) + " ");
		}
		
		System.out.println("\ncharAt() 메소드 호출 후 원본 문자열 : " + str);
		
		String compareStr = new String("abcd");
		System.out.println("\n원본 문자열" + compareStr);
		
		System.out.println(compareStr.compareTo("bcef"));
		System.out.println(compareStr.compareTo("abcd") + "\n");
		
		System.out.println(compareStr.compareTo("Abcd"));
		System.out.println(compareStr.compareToIgnoreCase("Abcd"));
		System.out.println("compareTo() 메소드 호출 후 원본 문자열 : " + compareStr);
	}
	
}
