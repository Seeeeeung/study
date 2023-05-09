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

		System.out.println();

		// copyOfRange()
		int[] arr4 = Arrays.copyOfRange(arr1, 2, 4);
		for (int i = 0; i < arr4.length; i++) {
			System.out.print(arr4[i] + " ");
		}

		System.out.println();

		// fill()
		int[] arr5 = new int[10];
		Arrays.fill(arr5,7);
		for (int i = 0; i < arr5.length; i++) {
			System.out.print(arr5[i] + " ");
		}
		
		System.out.println();
		
		int[] arr6 = {5, 3, 4, 1, 2};
		Arrays.sort(arr6);
		for(int i = 0; i < arr6.length; i++) {
			System.out.print(arr6[i] + " ");
		}
		
		System.out.println();
		
		
	}
}
