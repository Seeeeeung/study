package javaStudy;

public class class_wrapper {
	public static void main(String[]args) {
		Integer num = new Integer(17); // 박싱
		int n = num.intValue(); // 언박싱
		System.out.println(n);
		
		Character ch = 'X'; // 오토박싱
		char c= ch; // 오토언박싱
		System.out.println(c);
		
		Integer num1 = new Integer(7);
		Integer num2 = new Integer(3);
		
		int int1 = num1.intValue();
		int int2 = num2.intValue();
		
		Integer result1 = num1 + num2;
		Integer result2 = int1 - int2;
		int result3 = num1 * int2;
		
		System.out.println(result1 + "," +  result2 + "," + result3);
		
		Integer num3 = new Integer(10);
		Integer num4 = new Integer(20);
		Integer num5 = new Integer(10);
		
		System.out.println(num3 < num4);
		System.out.println(num3 == num5);
		System.out.println(num3.equals(num5));
	}
}
