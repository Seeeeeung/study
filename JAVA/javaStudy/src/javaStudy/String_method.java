package javaStudy;


public class String_method {
	
	public static void main(String[] args) {
		// charAt
		String str = new String("Jave");
		System.out.println("원본 문자열 : " + str);
		
		for (int i = 0; i < str.length(); i++) {
			System.out.print(str.charAt(i) + " ");
		}
		
		System.out.println("\ncharAt() 메소드 호출 후 원본 문자열 : " + str);
		
		// compareTo
		String compareStr = new String("abcd");
		System.out.println("\n원본 문자열" + compareStr);
		
		System.out.println(compareStr.compareTo("bcef"));
		System.out.println(compareStr.compareTo("abcd") + "\n");
		
		System.out.println(compareStr.compareTo("Abcd"));
		System.out.println(compareStr.compareToIgnoreCase("Abcd"));
		System.out.println("compareTo() 메소드 호출 후 원본 문자열 : " + compareStr + "\n");
		
		
		// concat()
		String concatStr = new String("Java");
		System.out.println("원본 문자열 : " + concatStr);
		System.out.println(concatStr.concat("수업"));
		System.out.println("concat() 메소드 호출 후 원본 문자열 : " + concatStr + "\n");
		
		// indexOf()
		String indexOfStr = new String("Oracle Java");
		System.out.println("원본 문자열 : " + indexOfStr);
		
		System.out.println(indexOfStr.indexOf('o'));
		System.out.println(indexOfStr.indexOf('a'));
		System.out.println(indexOfStr.indexOf("Java"));
		System.out.println("indexOf() 메소드 호출 후 원본 문자열 : " + indexOfStr + "\n");
		
		// trim()
		String trimStr = new String("Java    ");
		System.out.println("원본 문자열 : " + trimStr);
		System.out.println(trimStr + '|');
		System.out.println(trimStr.trim() + '|');
		System.out.println("trim() 메소드 호출 후 원본 문자열 : " + trimStr + "\n");
		
		// 대소문자 변환
		String toStr = new String("Java");
		System.out.println("원본 문자열 : " + toStr);
		System.out.println(toStr.toLowerCase());
		System.out.println(toStr.toUpperCase());
		System.out.println("두 메소드 호출 후 원본 문자열 : " + toStr + "\n");
	}
	
}
