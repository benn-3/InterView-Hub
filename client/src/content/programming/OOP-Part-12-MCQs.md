# PART 12 — 100 OOP MCQs (Easy / Medium / Hard)

Designed for TCS, Infosys, Wipro, Cognizant, Accenture, Capgemini, HCL, Tech Mahindra, Deloitte, EY, IBM, Oracle, Microsoft, Amazon, Google.

---

# 🟢 EASY MCQs (1–30)

---

### Q1. Which of these is NOT an OOP concept?
A) Encapsulation
B) Inheritance
C) Compilation
D) Polymorphism

**Answer:** C
**Explanation:** Compilation is a build step, not an OOP concept.

---

### Q2. Which keyword is used to inherit a class in Java?
A) `implement`
B) `inherit`
C) `extends`
D) `super`

**Answer:** C
**Explanation:** `extends` is used for class inheritance.

---

### Q3. Which access modifier is most restrictive?
A) `public`
B) `protected`
C) default
D) `private`

**Answer:** D
**Explanation:** `private` is accessible only within the same class.

---

### Q4. Which of the following is used to achieve abstraction?
A) `final`
B) `static`
C) `abstract`
D) `this`

**Answer:** C
**Explanation:** `abstract` keyword defines abstract classes/methods.

---

### Q5. Can an abstract class have a constructor?
A) Yes
B) No
C) Only if no abstract method
D) Only `protected` constructor

**Answer:** A
**Explanation:** Abstract classes can have constructors for initialization by subclasses.

---

### Q6. Which is true about interfaces in Java 8+?
A) Cannot have methods
B) Can have default methods
C) Can have constructors
D) Can be instantiated

**Answer:** B
**Explanation:** Java 8 introduced `default` and `static` methods in interfaces.

---

### Q7. What is the default value of an `int` instance variable?
A) 0
B) null
C) undefined
D) 1

**Answer:** A
**Explanation:** Instance variables get default values; local variables do not.

---

### Q8. Which keyword refers to the parent class?
A) `this`
B) `parent`
C) `super`
D) `base`

**Answer:** C

---

### Q9. Which method is the entry point of a Java program?
A) `start()`
B) `main()`
C) `run()`
D) `init()`

**Answer:** B
**Explanation:** `public static void main(String[] args)`.

---

### Q10. Which of the following is NOT a primitive type?
A) `int`
B) `String`
C) `double`
D) `boolean`

**Answer:** B
**Explanation:** `String` is a class (object type), not a primitive.

---

### Q11. Which keyword makes a variable a constant?
A) `static`
B) `final`
C) `const`
D) `volatile`

**Answer:** B
**Explanation:** `final` makes a variable constant. Java has no `const` keyword.

---

### Q12. Where are objects stored in memory?
A) Stack
B) Heap
C) Cache
D) Register

**Answer:** B

---

### Q13. Which of these is true about `static` methods?
A) They can use `this`
B) They can be overridden
C) They belong to the class
D) They require an object to call

**Answer:** C
**Explanation:** Static methods belong to the class, not objects.

---

### Q14. Can we override a `private` method?
A) Yes
B) No
C) Only in same package
D) Only with `@Override`

**Answer:** B
**Explanation:** Private methods are not visible to subclasses.

---

### Q15. What does `new` keyword do?
A) Declares a class
B) Allocates memory and creates object
C) Imports a package
D) Extends a class

**Answer:** B

---

### Q16. Which is the parent of all classes in Java?
A) `Class`
B) `Object`
C) `Root`
D) `Main`

**Answer:** B
**Explanation:** `java.lang.Object`.

---

### Q17. Can a class be both `abstract` and `final`?
A) Yes
B) No
C) Only nested
D) Only if no methods

**Answer:** B
**Explanation:** Contradictory — abstract needs to be extended, final prevents it.

---

### Q18. Which OOP principle hides internal details?
A) Inheritance
B) Polymorphism
C) Encapsulation
D) Abstraction

**Answer:** C
**Explanation:** Encapsulation hides data with private + getters/setters.

---

### Q19. Which principle allows one interface, many implementations?
A) Inheritance
B) Polymorphism
C) Encapsulation
D) Composition

**Answer:** B

---

### Q20. Can an interface have a constructor?
A) Yes
B) No
C) Only with default
D) Only static

**Answer:** B
**Explanation:** Interfaces cannot be instantiated, so no constructors.

---

### Q21. Which is true about method overloading?
A) Same name, different parameters
B) Different name, same parameters
C) Same name, same parameters
D) Must be in different classes

**Answer:** A

---

### Q22. Which is true about method overriding?
A) Same name, different parameters
B) Same name, same parameters in different classes
C) Different return types only
D) Only in abstract classes

**Answer:** B

---

### Q23. Can we overload the `main` method?
A) Yes
B) No

**Answer:** A
**Explanation:** Yes, but JVM only calls the standard signature.

---

### Q24. What is a `final` class?
A) Cannot be instantiated
B) Cannot be inherited
C) Cannot have methods
D) Cannot have variables

**Answer:** B

---

### Q25. Which is NOT a feature of OOP?
A) Modularity
B) Reusability
C) Compilation
D) Encapsulation

**Answer:** C

---

### Q26. What is the default value of a `boolean`?
A) `true`
B) `false`
C) `null`
D) 0

**Answer:** B

---

### Q27. Which keyword prevents method overriding?
A) `static`
B) `final`
C) `abstract`
D) `volatile`

**Answer:** B

---

### Q28. Can abstract methods be `static`?
A) Yes
B) No

**Answer:** B
**Explanation:** Abstract methods need to be overridden; static methods are not overridden.

---

### Q29. What is a `static` variable?
A) Belongs to an object
B) Belongs to a class
C) Cannot be changed
D) Local variable

**Answer:** B

---

### Q30. Can a constructor be `private`?
A) Yes
B) No

**Answer:** A
**Explanation:** Used in Singleton pattern.

---

# 🟡 MEDIUM MCQs (31–70)

---

### Q31. What is the output?
```java
class A { A() { System.out.println("A"); } }
class B extends A { B() { System.out.println("B"); } }
class Test { public static void main(String[] a) { new B(); } }
```
A) A B
B) B A
C) Compile error
D) Runtime error

**Answer:** A
**Explanation:** Parent constructor runs first.

---

### Q32. Which is true about multiple inheritance in Java?
A) Supported with classes
B) Supported with interfaces
C) Both
D) Not supported at all

**Answer:** B
**Explanation:** Java avoids diamond problem by allowing multiple inheritance only via interfaces.

---

### Q33. What is the output?
```java
class A { int x = 10; }
class B extends A { int x = 20; }
class Test { public static void main(String[] a) { System.out.println(new B().x); } }
```
A) 10
B) 20
C) Compile error
D) 0

**Answer:** B
**Explanation:** Reference is B, so B's x is used.

---

### Q34. Which is the correct way to call a parent constructor?
A) `parent()`
B) `super()`
C) `base()`
D) `this()`

**Answer:** B

---

### Q35. Can `this()` and `super()` be in the same constructor?
A) Yes
B) No

**Answer:** B
**Explanation:** Both must be first statement.

---

### Q36. What is the output?
```java
class A { void m() { System.out.println("A"); } }
class B extends A { static void m() { System.out.println("B"); } }
class Test { public static void main(String[] a) { A obj = new B(); obj.m(); } }
```
A) A
B) B
C) Compile error
D) Runtime error

**Answer:** A
**Explanation:** Static methods are hidden, not overridden. Reference type A decides.

---

### Q37. Which is true about `String`?
A) Mutable
B) Immutable
C) Primitive
D) `final` class

**Answer:** B & D
**Explanation:** String is both immutable and a final class.

---

### Q38. What is the output?
```java
public class Test {
    public static void main(String[] a) {
        String s1 = "hi";
        String s2 = "hi";
        System.out.println(s1 == s2);
    }
}
```
A) true
B) false

**Answer:** A
**Explanation:** Both are from string pool, same reference.

---

### Q39. Which collection uses `hashCode()` and `equals()`?
A) `ArrayList`
B) `HashMap`
C) `Vector`
D) `LinkedList`

**Answer:** B

---

### Q40. What is the output?
```java
public class Test {
    public static void main(String[] a) {
        String s1 = new String("hi");
        String s2 = new String("hi");
        System.out.println(s1.equals(s2));
    }
}
```
A) true
B) false

**Answer:** A
**Explanation:** String overrides equals to compare content.

---

### Q41. What is the output?
```java
class A { static { System.out.println("A"); } }
class B extends A { static { System.out.println("B"); } }
class Test { public static void main(String[] a) { new B(); } }
```
A) A
B) B
C) A B
D) B A

**Answer:** C
**Explanation:** Parent static block runs first.

---

### Q42. Which is true about an abstract class?
A) Can be instantiated
B) Cannot have concrete methods
C) Can have constructors
D) Cannot be inherited

**Answer:** C

---

### Q43. Can interfaces have variables?
A) No
B) Yes, all are public static final
C) Yes, any modifier
D) Only static

**Answer:** B

---

### Q44. What is the output?
```java
interface I { default void m() { System.out.println("I"); } }
class A implements I { public void m() { System.out.println("A"); } }
class Test { public static void main(String[] a) { new A().m(); } }
```
A) I
B) A
C) Compile error
D) Both

**Answer:** B
**Explanation:** Class overrides default method.

---

### Q45. Can we have an abstract class with no abstract method?
A) Yes
B) No

**Answer:** A

---

### Q46. What is the output?
```java
class A {
    A() { show(); }
    void show() { System.out.println("A"); }
}
class B extends A {
    void show() { System.out.println("B"); }
}
class Test { public static void main(String[] a) { new B(); } }
```
A) A
B) B
C) A B
D) B A

**Answer:** B
**Explanation:** Dynamic dispatch — B's show() is called even from A's constructor. ⚠️ Classic trap.

---

### Q47. Which is the Liskov Substitution Principle?
A) Subclass must be substitutable for parent
B) Use many small interfaces
C) One class, one responsibility
D) Depend on abstractions

**Answer:** A

---

### Q48. What is the output?
```java
public class Test {
    public static void main(String[] a) {
        Integer a = 127, b = 127;
        System.out.println(a == b);
    }
}
```
A) true
B) false

**Answer:** A
**Explanation:** Integer cache for -128 to 127.

---

### Q49. What is the output?
```java
public class Test {
    public static void main(String[] a) {
        Integer a = 200, b = 200;
        System.out.println(a == b);
    }
}
```
A) true
B) false

**Answer:** B
**Explanation:** Outside Integer cache range, different objects.

---

### Q50. Which is a marker interface?
A) `Runnable`
B) `Serializable`
C) `Comparable`
D) `Iterable`

**Answer:** B
**Explanation:** Marker interface has no methods. Serializable, Cloneable, Remote are markers.

---

### Q51. What is polymorphism?
A) One name, many forms
B) One class, one method
C) Hiding data
D) Creating objects

**Answer:** A

---

### Q52. Can we have private constructor?
A) Yes
B) No

**Answer:** A
**Explanation:** Used in Singleton.

---

### Q53. Which is the correct way to call a parent's overridden method from a child class?
A) `parent.m()`
B) `super.m()`
C) `this.m()`
D) `base.m()`

**Answer:** B

---

### Q54. What is the output?
```java
class Test {
    static int x = 10;
    public static void main(String[] a) {
        Test.x = 20;
        System.out.println(Test.x);
    }
}
```
A) 10
B) 20
C) Compile error
D) 0

**Answer:** B
**Explanation:** Static variables can be modified.

---

### Q55. What is the output?
```java
class Test {
    final int x = 10;
    Test() { x = 20; }
    public static void main(String[] a) { System.out.println(new Test().x); }
}
```
A) 10
B) 20
C) Compile error
D) 0

**Answer:** C
**Explanation:** `final` variable cannot be reassigned.

---

### Q56. Which is true about method overloading?
A) Return type matters
B) Parameter list must differ
C) Must be in different classes
D) Cannot have access modifier

**Answer:** B

---

### Q57. Which is NOT a SOLID principle?
A) Single Responsibility
B) Open/Closed
C) Liskov Substitution
D) Multiple Inheritance

**Answer:** D

---

### Q58. Which pattern ensures only one instance?
A) Factory
B) Builder
C) Singleton
D) Observer

**Answer:** C

---

### Q59. Which is true about composition?
A) Weak HAS-A
B) Strong HAS-A
C) IS-A
D) No relationship

**Answer:** B

---

### Q60. Which is true about aggregation?
A) Strong HAS-A
B) Weak HAS-A
C) IS-A
D) No relationship

**Answer:** B
**Explanation:** Aggregation = weak HAS-A; Composition = strong HAS-A.

---

### Q61. What is the output?
```java
class Test {
    public static void main(String[] a) {
        String s = "hello";
        s.concat(" world");
        System.out.println(s);
    }
}
```
A) hello world
B) hello
C) Compile error
D) helloworld

**Answer:** B
**Explanation:** Strings are immutable; concat returns a new string, doesn't modify s.

---

### Q62. Can a `final` method be overloaded?
A) Yes
B) No

**Answer:** A
**Explanation:** `final` only prevents overriding, not overloading.

---

### Q63. What is the output?
```java
class A { void m(int... x) { System.out.println(x.length); } }
class Test { public static void main(String[] a) { new A().m(1, 2, 3); } }
```
A) 1
B) 3
C) Compile error
D) 0

**Answer:** B
**Explanation:** Varargs collect into an array.

---

### Q64. Which is true about `==` for primitives?
A) Compares references
B) Compares values
C) Compares types
D) Compares classes

**Answer:** B

---

### Q65. What is the output?
```java
class Test {
    public static void main(String[] a) {
        int x = 5;
        System.out.println(x++ + ++x);
    }
}
```
A) 10
B) 11
C) 12
D) Compile error

**Answer:** C
**Explanation:** x++ = 5 (returns 5, then x=6), ++x = 7. 5+7=12.

---

### Q66. Which is used to compare two objects by content?
A) `==`
B) `equals()`
C) `compareTo()`
D) `hashCode()`

**Answer:** B

---

### Q67. What is the output?
```java
class Test {
    public static void main(String[] a) {
        String s1 = "abc";
        String s2 = new String("abc");
        String s3 = s2.intern();
        System.out.println(s1 == s3);
    }
}
```
A) true
B) false

**Answer:** A
**Explanation:** `intern()` returns the pool reference.

---

### Q68. Which is the default access modifier for a class?
A) `public`
B) `private`
C) `protected`
D) package-private (default)

**Answer:** D
**Explanation:** Top-level classes are either public or package-private.

---

### Q69. What is the output?
```java
class A { A() { System.out.println("1"); } }
class B extends A { B() { System.out.println("2"); } }
class C extends B { C() { System.out.println("3"); } }
class Test { public static void main(String[] a) { new C(); } }
```
A) 1 2 3
B) 3 2 1
C) Compile error
D) 1 3 2

**Answer:** A
**Explanation:** Constructor chain from top to bottom.

---

### Q70. What is the output?
```java
class Test {
    public static void main(String[] a) {
        try {
            System.out.println("A");
            return;
        } finally {
            System.out.println("B");
        }
    }
}
```
A) A
B) B
C) A B
D) Compile error

**Answer:** C
**Explanation:** `finally` runs even after return.

---

# 🔴 HARD MCQs (71–100)

---

### Q71. What is the output?
```java
class A { void m() throws Exception { throw new Exception("A"); } }
class B extends A { void m() { System.out.println("B"); } }
class Test { public static void main(String[] a) { new B().m(); } }
```
A) B
B) Exception
C) Compile error
D) Runtime error

**Answer:** A
**Explanation:** Overriding method can throw fewer/narrower exceptions.

---

### Q72. Which is the Liskov Substitution violation?
A) `Square extends Rectangle`
B) `Dog extends Animal`
C) `Car extends Vehicle`
D) `Student extends Person`

**Answer:** A
**Explanation:** Square's behavior conflicts with Rectangle (e.g., setWidth vs setHeight).

---

### Q73. What is the output?
```java
class A { int x = 10; }
class B extends A { int x = 20; }
class Test { public static void main(String[] a) {
    A a = new B();
    System.out.println(((B) a).x);
}}
```
A) 10
B) 20
C) Compile error
D) ClassCastException

**Answer:** B
**Explanation:** After downcast, B's x is accessed.

---

### Q74. Can we override `equals()` with a different parameter type?
A) Yes
B) No, it's overloading, not overriding

**Answer:** B
**Explanation:** equals must take Object, otherwise it doesn't override.

---

### Q75. What is the output?
```java
class Test {
    public static void main(String[] a) {
        String s = "Java";
        s = s.toUpperCase();
        System.out.println(s);
    }
}
```
A) Java
B) JAVA
C) Compile error
D) jaVA

**Answer:** B
**Explanation:** toUpperCase returns new String; reassigned to s.

---

### Q76. Which is true about covariant return types?
A) Subtype of parent's return allowed
B) Supertype of parent's return allowed
C) Any return type
D) Same return type only

**Answer:** A

---

### Q77. What is the output?
```java
class A { static void m() { System.out.println("A"); } }
class B extends A { static void m() { System.out.println("B"); } }
class Test { public static void main(String[] a) { ((A) new B()).m(); } }
```
A) A
B) B
C) Compile error
D) Runtime error

**Answer:** A
**Explanation:** Cast doesn't change static binding; reference type A decides.

---

### Q78. What is the output?
```java
class Test {
    public static void main(String[] a) {
        char c = 'A';
        c++;
        System.out.println(c);
    }
}
```
A) A
B) B
C) 66
D) Compile error

**Answer:** B
**Explanation:** Char supports arithmetic. A (65) + 1 = B (66).

---

### Q79. Which is the OCP principle?
A) Open for modification, closed for extension
B) Open for extension, closed for modification
C) Both
D) Neither

**Answer:** B

---

### Q80. What is the output?
```java
class Test {
    public static void main(String[] a) {
        int a = 10, b = 20;
        System.out.println(a + b + "Sum" + a + b);
    }
}
```
A) 30Sum1020
B) 30Sum30
C) Sum1020
D) Compile error

**Answer:** A
**Explanation:** Once string is hit, everything is concatenated as string.

---

### Q81. What is the output?
```java
class Test {
    public static void main(String[] a) {
        StringBuffer sb = new StringBuffer("A");
        sb.append("B");
        System.out.println(sb);
    }
}
```
A) A
B) AB
C) B
D) Compile error

**Answer:** B
**Explanation:** StringBuffer is mutable.

---

### Q82. Which is the difference between `==` and `.equals()` for primitives?
A) `==` compares values; `.equals()` not applicable
B) Both same
C) `.equals()` compares values
D) `==` compares types

**Answer:** A
**Explanation:** Primitives only use `==`; they have no methods.

---

### Q83. What is the output?
```java
class A { A() { System.out.println("A"); } }
class Test { public static void main(String[] a) {
    A a = new A();
    a = null;
    System.gc();
}}
```
A) A then nothing
B) Compile error
C) GC runs
D) A then "GC"

**Answer:** A
**Explanation:** System.gc() is a request; may or may not run.

---

### Q84. What is the output?
```java
class Test {
    public static void main(String[] a) {
        Integer i1 = 100;
        Integer i2 = 100;
        System.out.println(i1.equals(i2));
    }
}
```
A) true
B) false

**Answer:** A
**Explanation:** Integer overrides equals.

---

### Q85. What is the output?
```java
class Test {
    public static void main(String[] a) {
        String s1 = "abc";
        String s2 = "a" + "bc";
        System.out.println(s1 == s2);
    }
}
```
A) true
B) false

**Answer:** A
**Explanation:** Compile-time constant concatenation goes to pool.

---

### Q86. What is the output?
```java
class Test {
    public static void main(String[] a) {
        String s1 = "ab";
        String s2 = "c";
        String s3 = s1 + s2;
        String s4 = "abc";
        System.out.println(s3 == s4);
    }
}
```
A) true
B) false

**Answer:** B
**Explanation:** s1+s2 is runtime concatenation, not pool.

---

### Q87. Can a class be `static`?
A) Yes, top-level
B) Only nested
C) No
D) Only abstract

**Answer:** B
**Explanation:** Only nested classes can be `static`.

---

### Q88. What is the output?
```java
abstract class A { abstract void m(); }
class B extends A { void m() { System.out.println("B"); } }
class Test { public static void main(String[] a) { A a = new B(); a.m(); } }
```
A) Compile error
B) B
C) Runtime error
D) Nothing

**Answer:** B
**Explanation:** Polymorphism with abstract.

---

### Q89. What is the output?
```java
class A { final void m() { System.out.println("A"); } }
class B extends A { void m() { System.out.println("B"); } }  // line 3
class Test { public static void main(String[] a) { new B().m(); } }
```
A) B
B) A
C) Compile error at line 3
D) Runtime error

**Answer:** C

---

### Q90. What is the output?
```java
class Test {
    public static void main(String[] a) {
        int[] a = {1, 2, 3};
        System.out.println(a.length());
    }
}
```
A) 3
B) Compile error
C) Runtime error
D) 0

**Answer:** B
**Explanation:** Array uses `.length` (property), not `.length()` (method).

---

### Q91. What is the output?
```java
class Test {
    public static void main(String[] a) {
        String s = "test";
        switch (s) {
            case "test": System.out.println("A"); break;
            default: System.out.println("B");
        }
    }
}
```
A) A
B) B
C) Compile error
D) Nothing

**Answer:** A
**Explanation:** Java 7+ supports String in switch.

---

### Q92. What is the output?
```java
class A { static int x = 10; }
class B extends A { }
class Test { public static void main(String[] a) { System.out.println(B.x); } }
```
A) 10
B) 0
C) Compile error
D) Runtime error

**Answer:** A
**Explanation:** Static variable is inherited.

---

### Q93. What is the output?
```java
class Test {
    public static void main(String[] a) {
        try {
            int x = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("AE");
        } catch (Exception e) {
            System.out.println("E");
        }
    }
}
```
A) AE
B) E
C) Both
D) Compile error

**Answer:** A
**Explanation:** More specific exception caught first.

---

### Q94. What is the output?
```java
class Test {
    public static void main(String[] a) {
        int x = 5;
        x = x++ + ++x;
        System.out.println(x);
    }
}
```
A) 11
B) 12
C) 13
D) 10

**Answer:** B
**Explanation:** x++ = 5 (x=6), ++x = 7. 5+7=12.

---

### Q95. Which is true about `super()`?
A) Can be anywhere in constructor
B) Must be first statement
C) Called automatically always
D) Cannot be called explicitly

**Answer:** B

---

### Q96. What is the output?
```java
class A { A() { System.out.println("A"); } }
class B extends A { B(int x) { System.out.println("B" + x); } }
class Test { public static void main(String[] a) { new B(5); } }
```
A) A B5
B) B5
C) A
D) Compile error

**Answer:** A
**Explanation:** Parent constructor runs first.

---

### Q97. What is the output?
```java
class A { void m() { System.out.println("A"); } }
class B extends A { void m() { System.out.println("B"); } }
class Test { public static void main(String[] a) {
    A a = new A();
    a = new B();
    ((B) a).m();
}}
```
A) A
B) B
C) Compile error
D) Runtime error

**Answer:** B
**Explanation:** Downcast works because actual object is B.

---

### Q98. What is the output?
```java
class A { void m(int x) { System.out.println("A"); } }
class B extends A { void m(long x) { System.out.println("B"); } }
class Test { public static void main(String[] a) { new B().m(5); } }
```
A) A
B) B
C) Both
D) Compile error

**Answer:** A
**Explanation:** B's m(long) is overload, not override. m(int) from A is inherited.

---

### Q99. What is the output?
```java
class Test {
    public static void main(String[] a) {
        String s = null;
        System.out.println(s + "test");
    }
}
```
A) nulltest
B) null
C) Compile error
D) NullPointerException

**Answer:** A
**Explanation:** String concatenation with null prints "null".

---

### Q100. What is the output?
```java
class Test {
    public static void main(String[] a) {
        String s = "Java";
        s.replace('J', 'K');
        System.out.println(s);
    }
}
```
A) Java
B) Kava
C) Compile error
D) kaVa

**Answer:** A
**Explanation:** String is immutable; replace returns a new string.

---
---

# 📍 PROGRESS CHECKPOINT 4

**Completed so far:**
- ✅ Parts 1–11 (OOP fundamentals, Java concepts, polymorphism, abstract/interface, relationships, memory, Object methods, SOLID, design patterns, tricky + output questions)
- ✅ Part 12 (100 MCQs)

**Next:**
- PART 13 — 30+ Scenario-Based Questions
- PART 14 — 30 Coding Problems
- PART 15 — Top 100 Interview Questions
- PART 16 — Revision Sheet
- PART 17 — Interview Answering Technique
- PART 18 — Mock Interview
- FINAL — Top 30 Must-Study

**Reply "next" to continue.**
