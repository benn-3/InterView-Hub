# PART 10 — 50+ TRICKY OOP INTERVIEW QUESTIONS

Each question has a short answer + explanation. These are the questions interviewers ask to test depth, not textbook knowledge.

---

### Q1. Can we overload a method by changing only the return type?
**No.** Compiler cannot decide based on return type alone. Methods must differ in **parameter list**.

```java
int show(int x);
double show(int x);  // Compile error
```

---

### Q2. Can static methods be overridden?
**No.** They are hidden, not overridden. The reference type (not the object type) decides which static method is called.

```java
class A { static void m() { System.out.println("A"); } }
class B extends A { static void m() { System.out.println("B"); } }
A a = new B();
a.m();  // prints "A"
```

---

### Q3. Can private methods be overridden?
**No.** Private methods are not visible to subclasses, so they can't be overridden (but a child can define its own with the same name — that's a new method, not overriding).

---

### Q4. Can final methods be overridden?
**No.** `final` means the method's implementation is final and cannot be changed.

---

### Q5. Can constructors be inherited?
**No.** Constructors are not members of a class — they are not inherited. But a child's constructor can call the parent's via `super()`.

---

### Q6. Can constructors be overridden?
**No.** Same reason — they aren't inherited, so they can't be overridden. They can be overloaded.

---

### Q7. Can an abstract class have a constructor?
**Yes.** It is used to initialize common fields and is called by subclasses via `super()`. You cannot directly instantiate the abstract class.

---

### Q8. Can an interface have variables?
**Yes.** But all interface variables are **implicitly public static final** (constants). They must be initialized at declaration.

```java
interface A { int X = 10; }  // public static final
```

---

### Q9. Can an interface have a constructor?
**No.** Interfaces cannot be instantiated, and they have no state to initialize.

---

### Q10. Can an abstract class be instantiated?
**No.** You cannot create an object of an abstract class. But you can have abstract class references pointing to subclass objects (upcasting).

```java
Shape s = new Circle();  // OK — abstract reference to concrete object
Shape s2 = new Shape();  // ERROR
```

---

### Q11. Can we create an object of an interface?
**No directly.** You can have an interface reference pointing to an implementing class object.

```java
Runnable r = new MyRunnable();  // OK
Runnable r2 = new Runnable();   // ERROR
```

---

### Q12. Why doesn't Java support multiple inheritance with classes?
To avoid the **diamond problem** — ambiguity when two parents have the same method. Java allows multiple inheritance via interfaces (with rules to resolve conflicts).

---

### Q13. What happens when parent and child have the same variable?
The **reference type** decides which variable is accessed (no polymorphism for variables — only for methods).

```java
class A { int x = 10; }
class B extends A { int x = 20; }
A a = new B();
System.out.println(a.x);  // 10
B b = new B();
System.out.println(b.x);  // 20
```

---

### Q14. What happens when a constructor calls an overridden method?
The **overridden method in the child class is called**, even though the parent constructor is executing. This is because of dynamic method dispatch.

```java
class A {
    A() { show(); }
    void show() { System.out.println("A"); }
}
class B extends A {
    void show() { System.out.println("B"); }
}
new B();  // prints "B"
```

This is a classic interview trap. (See output Q for details.)

---

### Q15. What is dynamic method dispatch?
The mechanism by which a call to an **overridden method is resolved at runtime** based on the actual object type, not the reference type.

```java
A a = new B();
a.show();  // B's show() — even though reference is A
```

---

### Q16. What is upcasting?
Assigning a subclass object to a superclass reference. **Implicit and safe**.

```java
Animal a = new Dog();
```

---

### Q17. What is downcasting?
Assigning a superclass reference back to a subclass. **Explicit and risky** (ClassCastException possible).

```java
Animal a = new Dog();
Dog d = (Dog) a;
```

---

### Q18. Why is String immutable?
1. **Security** — used in class loading, networking, file paths.
2. **String pool** — pooling requires immutability.
3. **Thread safety** — automatically thread-safe.
4. **Hashcode caching** — `String` caches its hash.

---

### Q19. Difference between `==` and `.equals()`?
- `==` compares **references (memory addresses)**.
- `.equals()` compares **content** (if overridden).

For primitives, `==` compares values.

---

### Q20. Why override hashCode when overriding equals?
Because the **contract** requires equal objects to have equal hashCodes. Otherwise, HashMap/HashSet fail to find the object.

---

### Q21. Can we override static methods in Java?
**No.** They can only be hidden. The reference type decides which one is called.

---

### Q22. Can a class be both abstract and final?
**No.** `abstract` means "must extend"; `final` means "cannot extend" — contradictory.

---

### Q23. Can a constructor be private?
**Yes.** Used in Singleton pattern. A private constructor prevents external instantiation.

---

### Q24. Can we have a try-catch inside a finally block?
**Yes.** But it can shadow the original exception.

---

### Q25. What is the default value of a local variable?
**No default.** Local variables must be initialized before use, else compile error.

---

### Q26. Can an interface extend another interface?
**Yes.** An interface can extend multiple interfaces.

```java
interface A { void m(); }
interface B extends A { void n(); }
```

---

### Q27. Can an interface extend a class?
**No.** Interfaces can only extend other interfaces.

---

### Q28. Can a class implement multiple interfaces?
**Yes.** This is how Java achieves multiple inheritance.

```java
class A implements B, C, D { }
```

---

### Q29. What is the default parent of every class in Java?
`java.lang.Object`. Every class directly or indirectly extends Object.

---

### Q30. Can we have a constructor in an enum?
**Yes.** Enums have constructors (package-private by default) used to initialize enum constants.

```java
enum Day {
    MONDAY(1), TUESDAY(2);
    private int n;
    Day(int n) { this.n = n; }
}
```

---

### Q31. Can we override `main()`?
**No.** `main` is `static` — only hidden. JVM only calls `public static void main(String[] args)`.

---

### Q32. Can an abstract method be static?
**No.** Static methods belong to the class, abstract methods need to be overridden by instance — contradictory.

---

### Q33. Can an abstract method be final?
**No.** `final` means cannot override; `abstract` means must override — contradictory.

---

### Q34. Can an abstract method be private?
**No.** Private methods are not visible to subclasses, but abstract methods must be visible to be implemented.

---

### Q35. Can we have abstract constructors?
**No.** Constructors cannot be abstract.

---

### Q36. What is the difference between `super` and `this()`?
- `this()` calls another constructor in the **same class**.
- `super()` calls a constructor in the **parent class**.

Both must be the first statement in a constructor, and you can use only one.

---

### Q37. Can static methods use `this`?
**No.** `this` refers to current object. Static methods have no object context.

---

### Q38. Can static methods be overloaded?
**Yes.** Static methods follow all overloading rules.

---

### Q39. Can we override an overloaded method?
**Yes.** If a child overrides one overload, the other overloads are inherited normally (not overridden unless you override them too).

---

### Q40. Can we overload `main()`?
**Yes.** But JVM only calls the signature `public static void main(String[] args)`. Other `main` methods are just regular static methods.

---

### Q41. What happens if a parent class has a parameterized constructor but no default?
The child class **must** explicitly call `super(args)`, else compile error.

```java
class A { A(int x) { } }
class B extends A {
    B() { super(5); }  // required
}
```

---

### Q42. Can we use `this()` and `super()` in the same constructor?
**No.** Both must be the first statement — only one can be.

---

### Q43. What is the order of execution in inheritance?
1. Static blocks of parent
2. Static blocks of child
3. Instance blocks + constructor of parent
4. Instance blocks + constructor of child

---

### Q44. Can we instantiate an abstract class anonymously?
**No.** You can extend an abstract class with an anonymous subclass, but you cannot write `new AbstractClass() { }` if the abstract methods aren't implemented.

Actually, you CAN — but you must provide implementations of all abstract methods in the anonymous class:
```java
Shape s = new Shape() {  // anonymous class extending abstract
    double area() { return 0; }
};
```

---

### Q45. Why use `ArrayList` instead of `Vector`?
Vector is synchronized (slower); ArrayList is not. For single-threaded code, ArrayList is preferred.

---

### Q46. What is the difference between `String`, `StringBuilder`, and `StringBuffer`?
- `String` — immutable.
- `StringBuilder` — mutable, not thread-safe (fast).
- `StringBuffer` — mutable, thread-safe (slow, synchronized).

---

### Q47. Can we make an abstract class without any abstract method?
**Yes.** It just means the class cannot be instantiated directly. Useful when you want to prevent direct instantiation.

---

### Q48. Can an interface have a `main()` method?
**Yes** (since Java 8). But it cannot be called directly. Used for testing.

```java
interface A {
    public static void main(String[] args) { System.out.println("Hi"); }
}
// Run: java A
```

---

### Q49. Can you have a `final` method in an abstract class?
**Yes.** Final methods in abstract classes cannot be overridden by subclasses, but they can be used normally.

---

### Q50. Can a `final` variable be a reference to a mutable object?
**Yes.** The reference cannot change, but the object's state can.

```java
final List<String> list = new ArrayList<>();
list.add("A");  // OK
list = new ArrayList<>();  // ERROR
```

---

### Q51. What is the difference between shallow copy and deep copy?
- **Shallow** — copies fields, but referenced objects are shared.
- **Deep** — copies everything recursively, so all objects are independent.

---

### Q52. What is a marker interface?
An interface with **no methods** that marks a class as having a property. Examples: `Serializable`, `Cloneable`, `Remote`.

---

### Q53. Can a constructor throw an exception?
**Yes.** Constructors can throw exceptions, but subclasses must handle or declare them.

---

### Q54. What is the use of `finalize()`?
Called by GC before destroying an object. **Deprecated** — avoid using it. Use try-with-resources for cleanup.

---

### Q55. Why are strings stored in a separate pool?
To save memory by reusing common string literals. `"hello"` is stored once and reused.

---

### Q56. Can we change the value of a `final` variable in a constructor?
**Yes**, but only via assignment in the constructor — the `final` field must be assigned exactly once (in declaration, init block, or constructor).

```java
class A {
    final int x;
    A(int v) { x = v; }  // OK
}
```

---

### Q57. What is covariant return type?
When an overridden method returns a **subtype** of the parent's return type.

```java
class A { Animal get() { return null; } }
class B extends A { @Override Dog get() { return null; } }  // Dog is-a Animal
```

---

### Q58. Can an interface inherit from Object's methods?
**No.** Interfaces don't inherit from Object, but a class implementing the interface still inherits Object's methods.

---

### Q59. Why can't we override `equals()` with different parameter types?
Because overriding requires the **same signature**. Different parameters = overloading, not overriding.

```java
public boolean equals(Student s) { }  // overloading, NOT overriding
// Correct: public boolean equals(Object o) { }
```

---

### Q60. What is the diamond problem?
In multiple inheritance, when class D inherits from B and C, both of which inherit from A, and A has a method that B and C override differently — D is confused about which version to inherit.

Java avoids this with classes (no multiple inheritance) and resolves it in interfaces via specific rules.

---
---

# PART 11 — 30+ OUTPUT-BASED OOP QUESTIONS

Each question has code → output → explanation → concept tested. Difficulty increases gradually.

---

### Q1. Basic Inheritance
```java
class A {
    void show() { System.out.println("A"); }
}
class B extends A {
    void show() { System.out.println("B"); }
}
public class Test {
    public static void main(String[] args) {
        A obj = new B();
        obj.show();
    }
}
```
**Output:** `B`
**Explanation:** Dynamic method dispatch — actual object is B, so B's show() is called.
**Concept:** Runtime polymorphism, upcasting.

---

### Q2. Static Method Hiding
```java
class A { static void show() { System.out.println("A"); } }
class B extends A { static void show() { System.out.println("B"); } }
public class Test {
    public static void main(String[] args) {
        A obj = new B();
        obj.show();
    }
}
```
**Output:** `A`
**Explanation:** Static methods are bound at compile time. Reference type A decides.
**Concept:** Static binding vs dynamic binding.

---

### Q3. Variable Hiding
```java
class A { int x = 10; }
class B extends A { int x = 20; }
public class Test {
    public static void main(String[] args) {
        A obj = new B();
        System.out.println(obj.x);
    }
}
```
**Output:** `10`
**Explanation:** Variables are not polymorphic. Reference type decides.
**Concept:** Variable hiding vs method overriding.

---

### Q4. Constructor Order
```java
class A {
    A() { System.out.println("A"); }
}
class B extends A {
    B() { System.out.println("B"); }
}
public class Test {
    public static void main(String[] args) {
        new B();
    }
}
```
**Output:**
```
A
B
```
**Explanation:** Parent constructor always called first.
**Concept:** Constructor chaining, super().

---

### Q5. this() Chaining
```java
class Student {
    Student() { this("Aman"); System.out.println("no-arg"); }
    Student(String n) { System.out.println("name: " + n); }
}
public class Test {
    public static void main(String[] args) {
        new Student();
    }
}
```
**Output:**
```
name: Aman
no-arg
```
**Explanation:** `this()` calls another constructor. Original constructor continues after.
**Concept:** Constructor chaining with this().

---

### Q6. super() call
```java
class A { A() { System.out.println("A"); } }
class B extends A {
    B() { super(); System.out.println("B"); }
}
public class Test { public static void main(String[] a) { new B(); } }
```
**Output:**
```
A
B
```
**Explanation:** `super()` is called even if explicit.
**Concept:** Implicit super().

---

### Q7. Method Overloading
```java
class A {
    void m(int x) { System.out.println("int"); }
    void m(double x) { System.out.println("double"); }
}
public class Test {
    public static void main(String[] a) {
        A obj = new A();
        obj.m(5);
        obj.m(5.0);
    }
}
```
**Output:**
```
int
double
```
**Explanation:** Compiler picks the most specific matching overload.
**Concept:** Method overloading, compile-time polymorphism.

---

### Q8. Auto-promotion in overloading
```java
class A {
    void m(int x) { System.out.println("int"); }
    void m(long x) { System.out.println("long"); }
}
public class Test {
    public static void main(String[] a) {
        A obj = new A();
        obj.m(5);
        obj.m(5L);
    }
}
```
**Output:**
```
int
long
```
**Explanation:** Exact match wins; otherwise promotion.
**Concept:** Overloading with type promotion.

---

### Q9. Overloading with null
```java
class A {
    void m(String s) { System.out.println("String"); }
    void m(Object o) { System.out.println("Object"); }
}
public class Test {
    public static void main(String[] a) {
        A obj = new A();
        obj.m(null);
    }
}
```
**Output:** `String`
**Explanation:** More specific type (String) wins over Object.
**Concept:** Most-specific-method rule.

---

### Q10. Overloading ambiguity
```java
class A {
    void m(String s) { System.out.println("String"); }
    void m(Integer i) { System.out.println("Integer"); }
}
public class Test {
    public static void main(String[] a) {
        A obj = new A();
        obj.m(null);
    }
}
```
**Output:** Compile error (ambiguous).
**Explanation:** String and Integer are unrelated; compiler can't decide.
**Concept:** Ambiguity in overloading.

---

### Q11. Abstract class instantiation
```java
abstract class A { abstract void m(); }
public class Test {
    public static void main(String[] a) {
        A obj = new A();
    }
}
```
**Output:** Compile error.
**Explanation:** Cannot instantiate abstract class.
**Concept:** Abstract class rules.

---

### Q12. Anonymous class with abstract
```java
abstract class A { abstract void m(); }
public class Test {
    public static void main(String[] a) {
        A obj = new A() {
            void m() { System.out.println("Hi"); }
        };
        obj.m();
    }
}
```
**Output:** `Hi`
**Explanation:** Anonymous subclass implements abstract method.
**Concept:** Anonymous inner class.

---

### Q13. Interface reference
```java
interface I { void m(); }
class A implements I {
    public void m() { System.out.println("A"); }
}
public class Test {
    public static void main(String[] a) {
        I obj = new A();
        obj.m();
    }
}
```
**Output:** `A`
**Explanation:** Interface reference, concrete object.
**Concept:** Polymorphism with interfaces.

---

### Q14. Default method in interface
```java
interface I {
    default void m() { System.out.println("I"); }
}
class A implements I {
    public void m() { System.out.println("A"); }
}
public class Test {
    public static void main(String[] a) {
        I obj = new A();
        obj.m();
    }
}
```
**Output:** `A`
**Explanation:** Class implementation overrides default.
**Concept:** Default methods (Java 8).

---

### Q15. final variable
```java
public class Test {
    public static void main(String[] a) {
        final int x = 10;
        x = 20;  // line 4
        System.out.println(x);
    }
}
```
**Output:** Compile error at line 4.
**Explanation:** Final variable cannot be reassigned.
**Concept:** `final` variable.

---

### Q16. final with reference
```java
import java.util.*;
public class Test {
    public static void main(String[] a) {
        final List<String> list = new ArrayList<>();
        list.add("A");
        System.out.println(list);
        list = new ArrayList<>();  // line 5
    }
}
```
**Output:** Compile error at line 5.
**Explanation:** Reference is final, but content can change.
**Concept:** final reference.

---

### Q17. final method
```java
class A { final void m() { System.out.println("A"); } }
class B extends A {
    void m() { System.out.println("B"); }  // line 4
}
public class Test {
    public static void main(String[] a) {
        new B().m();
    }
}
```
**Output:** Compile error at line 4.
**Explanation:** Cannot override final method.
**Concept:** final method.

---

### Q18. static variable
```java
class A { static int x = 10; }
class B extends A { static int x = 20; }
public class Test {
    public static void main(String[] a) {
        System.out.println(new B().x);
    }
}
```
**Output:** `20`
**Explanation:** Reference type is B (no polymorphism for static).
**Concept:** Static variable hiding.

---

### Q19. Static block order
```java
class A {
    static { System.out.println("A-static"); }
    A() { System.out.println("A-ctor"); }
}
class B extends A {
    static { System.out.println("B-static"); }
    B() { System.out.println("B-ctor"); }
}
public class Test {
    public static void main(String[] a) {
        new B();
    }
}
```
**Output:**
```
A-static
B-static
A-ctor
B-ctor
```
**Explanation:** Static blocks run once when class is loaded. Parents first.
**Concept:** Class loading order.

---

### Q20. Instance block order
```java
class A {
    { System.out.println("A-instance"); }
    A() { System.out.println("A-ctor"); }
}
class B extends A {
    { System.out.println("B-instance"); }
    B() { System.out.println("B-ctor"); }
}
public class Test {
    public static void main(String[] a) {
        new B();
    }
}
```
**Output:**
```
A-instance
A-ctor
B-instance
B-ctor
```
**Explanation:** Instance blocks run before constructor. Parent first.
**Concept:** Instance initializer block.

---

### Q21. Constructor calling overridden method
```java
class A {
    A() { show(); }
    void show() { System.out.println("A"); }
}
class B extends A {
    void show() { System.out.println("B"); }
}
public class Test {
    public static void main(String[] a) {
        new B();
    }
}
```
**Output:** `B`
**Explanation:** Even inside A's constructor, B's show() is called because the actual object is B. ⚠️ Classic trap.
**Concept:** Dynamic method dispatch in constructor.

---

### Q22. private method "overriding"
```java
class A {
    private void m() { System.out.println("A"); }
    void callM() { m(); }
}
class B extends A {
    public void m() { System.out.println("B"); }
}
public class Test {
    public static void main(String[] a) {
        new B().callM();
    }
}
```
**Output:** `A`
**Explanation:** A's m() is private — B's m() is a new method, not override. callM() calls A's m().
**Concept:** Private methods are not inherited.

---

### Q23. Downcasting
```java
class A { }
class B extends A { }
public class Test {
    public static void main(String[] a) {
        A obj = new A();
        B b = (B) obj;  // line 6
    }
}
```
**Output:** Runtime exception `ClassCastException` at line 6.
**Explanation:** obj is actually A, not B — unsafe downcast.
**Concept:** Downcasting safety.

---

### Q24. instanceof
```java
class A { }
class B extends A { }
public class Test {
    public static void main(String[] a) {
        A obj = new B();
        System.out.println(obj instanceof B);
        System.out.println(obj instanceof A);
    }
}
```
**Output:**
```
true
true
```
**Explanation:** B IS-A A, so both true.
**Concept:** instanceof operator.

---

### Q25. == with String pool
```java
public class Test {
    public static void main(String[] a) {
        String s1 = "hello";
        String s2 = "hello";
        String s3 = new String("hello");
        System.out.println(s1 == s2);
        System.out.println(s1 == s3);
    }
}
```
**Output:**
```
true
false
```
**Explanation:** s1 and s2 are from pool (same reference). s3 is a new object.
**Concept:** String pool, ==.

---

### Q26. equals vs ==
```java
public class Test {
    public static void main(String[] a) {
        String s1 = new String("hi");
        String s2 = new String("hi");
        System.out.println(s1 == s2);
        System.out.println(s1.equals(s2));
    }
}
```
**Output:**
```
false
true
```
**Explanation:** Different objects but equal content.
**Concept:** equals() override in String.

---

### Q27. equals not overridden
```java
class Student { String name; Student(String n) { name = n; } }
public class Test {
    public static void main(String[] a) {
        Student s1 = new Student("A");
        Student s2 = new Student("A");
        System.out.println(s1.equals(s2));
    }
}
```
**Output:** `false`
**Explanation:** No equals() override; uses default (==).
**Concept:** Default equals.

---

### Q28. Covariant return
```java
class Animal { Animal get() { return this; } }
class Dog extends Animal {
    @Override Dog get() { return this; }
}
public class Test {
    public static void main(String[] a) {
        Animal a = new Dog();
        System.out.println(a.get().getClass().getSimpleName());
    }
}
```
**Output:** `Dog`
**Explanation:** Covariant return type allowed.
**Concept:** Covariant return.

---

### Q29. Access modifier
```java
class A { protected void m() { System.out.println("A"); } }
class B extends A { void m() { System.out.println("B"); } }  // line 3
public class Test {
    public static void main(String[] a) { new B().m(); }
}
```
**Output:** Compile error at line 3.
**Explanation:** Cannot reduce visibility from protected to default.
**Concept:** Overriding access modifier rules.

---

### Q30. static + final
```java
class A {
    static final int X = 10;
    static { X = 20; }  // line 4
}
public class Test {
    public static void main(String[] a) { System.out.println(A.X); }
}
```
**Output:** Compile error at line 4.
**Explanation:** static final is a compile-time constant; cannot reassign in static block.
**Concept:** static final.

---

### Q31. this and super
```java
class A {
    A() { System.out.println("A"); }
}
class B extends A {
    B() {
        this(5);
        System.out.println("B-noarg");
    }
    B(int x) {
        super();
        System.out.println("B-int: " + x);
    }
}
public class Test {
    public static void main(String[] a) { new B(); }
}
```
**Output:**
```
A
B-int: 5
B-noarg
```
**Explanation:** `this(5)` chains to B(int). super() calls A(). Then B-int finishes. B-noarg continues.
**Concept:** this() and super() chaining.

---

### Q32. Polymorphic array
```java
class A { void m() { System.out.println("A"); } }
class B extends A { void m() { System.out.println("B"); } }
class C extends A { void m() { System.out.println("C"); } }
public class Test {
    public static void main(String[] a) {
        A[] arr = { new A(), new B(), new C() };
        for (A x : arr) x.m();
    }
}
```
**Output:**
```
A
B
C
```
**Explanation:** Polymorphic array — actual type decides.
**Concept:** Polymorphism.

---

### Q33. Multiple interface inheritance
```java
interface I1 { default void m() { System.out.println("I1"); } }
interface I2 { default void m() { System.out.println("I2"); } }
class A implements I1, I2 {
    public void m() { I1.super.m(); }  // line 5
}
public class Test {
    public static void main(String[] a) { new A().m(); }
}
```
**Output:** `I1`
**Explanation:** Use `InterfaceName.super.method()` to disambiguate.
**Concept:** Diamond problem resolution in interfaces.

---

### Q34. Interface constants
```java
interface I { int X = 10; }
public class Test {
    public static void main(String[] a) {
        I.X = 20;  // line 4
    }
}
```
**Output:** Compile error at line 4.
**Explanation:** Interface variables are final.
**Concept:** Interface variables.

---

### Q35. Abstract method must be overridden
```java
abstract class A { abstract void m(); }
class B extends A { }  // line 2
public class Test {
    public static void main(String[] a) { new B(); }
}
```
**Output:** Compile error at line 2.
**Explanation:** B must implement m() or be abstract.
**Concept:** Abstract class inheritance rules.

---
---

# 📍 PROGRESS CHECKPOINT 3

**You have received Parts 1–11 so far.**

**Next (in upcoming messages):**
- PART 12 — 100 MCQs (Easy/Medium/Hard)
- PART 13 — 30+ Scenario-Based Questions
- PART 14 — 30 Coding Problems
- PART 15 — Top 100 Interview Questions
- PART 16 — One-Day Revision Sheet
- PART 17 — Interview Answering Technique
- PART 18 — Mock Interview
- FINAL — Top 30 Must-Study

**Reply "next" to continue.**
