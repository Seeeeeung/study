package javaStudy;

public class modifier {
	private String var = "같은 클래스만 허용";
	private String getVar() {
		return this.var;
	}
	
	public String publicVar = "누구든지 허용";
	public String getPublicVar() {
		return this.publicVar;
	}
	
	String defaultVar = "다른패키지 접근 불가";	
	public static void main(String[] args) {
		SamePackage sp = new SamePackage();
		System.out.println(sp.sameVar); // 같은 패키지 허용 -> SamePackage.java
	}
}
