package javaStudy;
import java.util.Random;

public class method_math {
	public static void main(String[] args) {
		System.out.println((int)(Math.random() * 100));
		
		Random ran = new Random();
		System.out.println(ran.nextInt(100));
		
		System.out.println((int)(Math.random() * 6));
		System.out.println((int)(Math.random() * 6) + 1);
		System.out.println((int)(Math.random() * 6) + 3 + "\n");
		
		// abs()
		System.out.println(Math.abs(10));
		System.out.println(Math.abs(-10));
		System.out.println(Math.abs(-3.14) + "\n");
		
		// floor, ceil, round
		System.out.println(Math.ceil(10.0));
		System.out.println(Math.ceil(10.1));
		System.out.println(Math.ceil(10.0000001) + "\n");
		System.out.println(Math.floor(10.0));
		System.out.println(Math.floor(10.9) + "\n");
		System.out.println(Math.round(10.0));
		System.out.println(Math.round(10.4));
		System.out.println(Math.round(10.5) + "\n");
		
		// max, min
		System.out.println(Math.max(3.14, 3.14159));
		System.out.println(Math.min(3.14, 3.14159));
		System.out.println(Math.max(-10, -11));
		System.out.println(Math.min(-10, -11) + "\n");
		
		// pow, sqrt
		System.out.println(Math.pow(5, 2));
		System.out.println(Math.sqrt(25));
	}
}