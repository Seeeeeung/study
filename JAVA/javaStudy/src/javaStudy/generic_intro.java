package javaStudy;
import java.util.*;

class LandAnimal {public void crying() {System.out.println("육지동물");}}
class CCat extends LandAnimal {public void crying() {System.out.println("냐오오오오옹");}}
class DDog extends LandAnimal {public void crying() {System.out.println("월으르르르릉");}}
class Sparrow {public void crying() {System.out.println("짹");}}

// type01
class AnimalList<T> {
	ArrayList<T> al = new ArrayList<T>();
	
	void add(T animal) {al.add(animal);}
	T get(int index) {return al.get(index);}
	boolean remove(T animal) {return al.remove(animal);}
	int size() {return al.size();}
}

//type02
class AnimalList2<T extends LandAnimal> {
	ArrayList<T> al2 = new ArrayList<T>();
	
	void add(T animal) {al2.add(animal);}
	T get(int index) {return al2.get(index);}
	boolean remove(T animal) {return al2.remove(animal);}
	int size() {return al2.size();}
}

//type03
class AnimalList3<T> {
	ArrayList<T> al3 = new ArrayList<T>();
	
	public static void cryingAnimalList(AnimalList3<? extends LandAnimal> al3) {
		LandAnimal la = al3.get(0);
		la.crying();
	}
	
	void add(T animal) {al3.add(animal);}
	T get(int index) {return al3.get(index);}
	boolean remove(T animal) {return al3.remove(animal);}
	int size() {return al3.size();}
}

public class generic_intro {
	public static void main(String[] args) {
		// type 01
		AnimalList<LandAnimal> landAnimal = new AnimalList<>();
		
		landAnimal.add(new LandAnimal());
		landAnimal.add(new CCat());
		landAnimal.add(new DDog());
//		landAnimal.add(new Sparrow()); // 오류 == 상속받지 않은 다른 타입으로 추가할 수 없다.
		
		for (int i=0; i<landAnimal.size(); i++) {
			landAnimal.get(i).crying();
		}
		System.out.println();
		
		// type02
		AnimalList2<LandAnimal> landAnimal2 = new AnimalList2<>();
		landAnimal2.add(new LandAnimal());
		landAnimal2.add(new CCat());
		landAnimal2.add(new DDog());
		
		for (int j = 0; j < landAnimal2.size(); j++) {
			landAnimal2.get(j).crying();
		}
		System.out.println();
		
		// type03
		AnimalList3<CCat> catList = new AnimalList3<CCat>();
		catList.add(new CCat());
		AnimalList3<DDog> dogList = new AnimalList3<DDog>();
		dogList.add(new DDog());
		
		AnimalList3.cryingAnimalList(catList);
		AnimalList3.cryingAnimalList(dogList);
	}
}
