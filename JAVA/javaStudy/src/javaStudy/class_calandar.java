package javaStudy;

import java.util.Calendar;

//import java.util.Calendar

public class class_calandar {
	public static void main(String[] args) {
		// add()
		System.out.println("add()");
		Calendar time = Calendar.getInstance();
		System.out.println(time.getTime());
		
		time.add(Calendar.SECOND, 120);
		System.out.println(time.getTime());
		
		// before(), after()
		System.out.println("before(), after()");
		Calendar time1 = Calendar.getInstance();
		Calendar time2 = Calendar.getInstance();
		Calendar time3 = Calendar.getInstance();
		
		time2.set(1982, 2, 19);
		time3.set(2025, 2, 19);
		
		System.out.println(time1.before(time2));
		System.out.println(time1.before(time3));
		
		// get()
		System.out.println("get()");
		Calendar time4 = Calendar.getInstance();
		System.out.println(time4.getTime() + " : 현재날짜,시간");
		System.out.println(time4.get(Calendar.DAY_OF_WEEK) + " : 열거형 일자표시 1:일요일,2:월요일...");
		System.out.println(time4.get(Calendar.MONTH) + 1 + " : 이번달 + 1(1월 == 0)");
		System.out.println(time4.get(Calendar.DAY_OF_MONTH) + " : 선택된 날의 정수 반환(오늘이 2일 ==> 2 반환)");
		System.out.println(time4.get(Calendar.HOUR_OF_DAY) + " : 현재 시 반환");
		System.out.println(time4.get(Calendar.MINUTE) + " : 현재 분 반환");
		System.out.println(time4.get(Calendar.SECOND) + " : 현재 초 반환");
		System.out.println(time4.get(Calendar.YEAR) + " : 현재 년도 반환");
		
		// roll()
		System.out.println("roll()");
		Calendar time5 = Calendar.getInstance();
		Calendar time6 = Calendar.getInstance();
		System.out.println(time5.getTime());
		
		time5.add(Calendar.SECOND, 60);
		System.out.println(time5.getTime());
		time6.roll(Calendar.SECOND, 20);
		System.out.println(time6.getTime()); // 60으로 설정했을경우 분단위가 움직이기때문에 결과값이 변화지 않게 보일뿐 실제 second 값은 변화가 있다 (최대 초를 넘어가지 않는 범위에서 확인가능)
		
		// set()
		System.out.println("set()");
		Calendar time7 = Calendar.getInstance();
		System.out.println(time7.getTime() + " : default\n");
		
		time7.set(Calendar.YEAR, 2020);
		System.out.println(time7.getTime() + " : year");
		
		time7.set(1982, 1, 19); // 1 == 2월
		System.out.println(time7.getTime() + ": year,month, day");
		
		time7.set(1982, 1, 19, 12, 34, 56);
		System.out.println(time7.getTime() + " : year, month, day, h,m,s");
		
	}
}
