package javaStudy;
import java.util.Arrays;

public class class_arrays {
	public static void main(String[]args) {
		// binarySearch()
		int[] arr = new int[1000];
		for(int i = 0; i < arr.length; i++) {
			arr[i] = i;
		}

		System.out.println(Arrays.binarySearch(arr, 437));

		// copyOf()
		int[] arr1 = {1,2,3,4,5};
		int[] arr2 = Arrays.copyOf(arr1, 3);
		
		for (int i = 0; i < arr2.length; i++) {
			System.out.print(arr2[i] + " ");
		}
		
		System.out.println();
		int[] arr3 = Arrays.copyOf(arr1,  10);
		for (int i = 0; i < arr3.length; i++) {
			System.out.print(arr3[i] + " ");
		}
	}
}
