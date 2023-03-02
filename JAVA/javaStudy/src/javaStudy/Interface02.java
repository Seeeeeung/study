package javaStudy;

interface Animal_03 {public abstract void cry();}
interface Pet {public abstract void play();}

class Cat_03 implements Animal_03, Pet {
	public void cry() {
		System.out.println("양옹야옹");
	}
	
	public void play() {
		System.out.println("사냥놀이-");
	}
}

class Dog_03 implements Animal_03, Pet {
	public void cry() {
		System.out.println("멍멍멍");
	}
	public void play() {
		System.out.println("산책산책");
	}
}

public class Interface02 {
	public static void main(String[] args) {
		Cat_03 c = new Cat_03();
		Dog_03 d = new Dog_03();
		
		c.cry();
		c.play();
		d.cry();
		d.play();
	}
}
