package javaStudy;

class call {
	// 재귀호출
	int sum(int n) {
		int result = 0;
		
		for (int i=1; i<=n; i++) {
			result += i;
		}
		
		return result;
	}
	
	static int recursiveSum(int n) {
		if (n == 1) { // n이 1이면, 그냥 1 반환
			return 1;
		}
		
		return n + recursiveSum(n-1); // n이 1이 아니면, n 을 1부터 (n-1)의 합과 더한 값을 반환
	}
}
public class Recursive {
	public static void main(String[] arge) {
		System.out.println(call.recursiveSum(10));
	}
}
