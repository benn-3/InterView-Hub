# PART 4 — ABSTRACT CLASS AND INTERFACE

---

## 4.1 ABSTRACT CLASS

### ✅ Definition
A class declared with the `abstract` keyword that **cannot be instantiated** and may contain **abstract methods** (methods without a body) that subclasses must implement.

### 🧠 Real-World Analogy
A **Vehicle blueprint** that says "every vehicle must have an engine-start method" but doesn't define exactly how. A car uses a key, a bike uses a kick — both satisfy the contract.

### Syntax
```java
abstract class Shape {
    String color;

    abstract double area();          // no body — must be implemented
    abstract double perimeter();

    void displayColor() {            // concrete method
        System.out.println("Color: " + color);
    }
}
```

### Key Rules
1. Declared with `abstract` keyword.
2. **Cannot be instantiated** (you cannot do `new Shape()`).
3. Can have **0 or more abstract methods**.
4. Can have **concrete methods** (with body).
5. Can have **constructors** (used by subclasses via super).
6. Can have **static methods, final methods, instance variables**.
7. A class extending abstract class must implement **all abstract methods**, OR be declared abstract itself.

### Can an abstract class have a constructor?
**Yes.** It is called when a subclass object is created (via `super()`). Useful to initialize common fields.

### Can an abstract class have a concrete (non-abstract) method?
**Yes.** In fact, abstract classes can have:
- Abstract methods
- Concrete methods
- Static methods
- Final methods
- Instance variables (any access)
- Static variables
- Constructors

### Can an abstract class be `final`?
**No.** `final` and `abstract` are contradictory — final means "cannot extend," abstract means "must extend."

### Can an abstract class be `static`?
Top-level abstract classes cannot be `static`. Nested abstract classes can be `static` (static nested class).

### Example
```java
abstract class Animal {
    String name;
    Animal(String name) { this.name = name; }
    abstract void sound();
    void sleep() { System.out.println(name + " is sleeping"); }
}

class Dog extends Animal {
    Dog() { super("Dog"); }
    void sound() { System.out.println("Bark"); }
}
```

### Common Interview Questions
- Can an abstract class have no abstract methods? (Yes — then it just cannot be instantiated.)
- Can a class be both abstract and final? (No — contradictory.)
- Can abstract class have main()? (Yes — for testing.)
- Can we declare an abstract class without any abstract method? (Yes.)

---

## 4.2 INTERFACE

### ✅ Definition
An interface is a **pure abstract type** (traditionally) that defines a **contract** — a set of method signatures a class must implement. From Java 8, interfaces can also have `default` and `static` methods.

### 🧠 Real-World Analogy
A **power socket** — it defines the contract (plug shape, voltage). Any device — fan, laptop, charger — that fits can use it. The contract is fixed; implementations vary.

### Syntax
```java
interface Payment {
    void pay(double amount);       // implicitly public abstract

    default void receipt() {       // default method (Java 8+)
        System.out.println("Receipt printed");
    }

    static void validate() {       // static method (Java 8+)
        System.out.println("Validating...");
    }

    private void log() { }         // private method (Java 9+)
}
```

### Rules
1. All methods are **implicitly public abstract** (until Java 8).
2. All variables are **implicitly public static final** (constants).
3. A class uses `implements` to adopt an interface.
4. A class can implement **multiple interfaces**.
5. An interface can `extend` multiple interfaces.
6. Cannot have constructors.
7. Cannot be instantiated.

### Multiple Interfaces
```java
interface Flyable { void fly(); }
interface Swimmable { void swim(); }
class Duck implements Flyable, Swimmable {
    public void fly() { }
    public void swim() { }
}
```

### Functional Interface
An interface with **exactly one abstract method**. Used with lambdas.
```java
@FunctionalInterface
interface Runnable2 {
    void run();
}

// lambda
Runnable2 r = () -> System.out.println("Running");
```

Common examples: `Runnable`, `Callable`, `Comparator`, `Consumer`, `Supplier`, `Function`, `Predicate`.

### Marker Interface
An interface with **no methods** — used to mark a class for special behavior.
Examples: `Serializable`, `Cloneable`, `Remote`.

### default methods (Java 8+)
- Have a body.
- Allow interfaces to evolve without breaking implementations.
- Can be overridden by implementing class.

### static methods (Java 8+)
- Belong to interface, called via interface name.
- Cannot be overridden by implementing class.

### private methods (Java 9+)
- Used as helpers inside default methods.
- Cannot be called from outside the interface.

### Common Interview Questions
- Can an interface have a constructor? (No.)
- Can an interface have private methods? (Yes — Java 9+.)
- Can we instantiate an interface? (No.)
- Can an interface extend a class? (No — only other interfaces.)
- What is the difference between `abstract` and `interface`? (See table below.)

---

## 4.3 ABSTRACT CLASS vs INTERFACE — Detailed Comparison

| Feature | Abstract Class | Interface |
|---|---|---|
| Keyword | `abstract class` | `interface` |
| Methods | Abstract + concrete | Abstract, default, static, private |
| Variables | Any (instance/static) | public static final only |
| Access modifiers | Any | public (mostly) |
| Inheritance | `extends` (single) | `implements` (multiple) |
| Constructor | Yes | No |
| `main()` | Yes | Yes (Java 8+) |
| Instantiation | No | No |
| When to use | Shared code + contract | Pure contract |
| Speed | Slightly faster | Slightly slower (default methods) |
| IS-A / CAN-DO | IS-A relationship | CAN-DO (capability) |
| Example | `abstract class Animal` | `interface Flyable` |

---

## 4.4 When to Choose Abstract Class over Interface?

### Use **Abstract Class** when:
1. You want to share **code** (concrete methods, fields) among related classes.
2. Classes are **closely related** (IS-A relationship).
3. You need to declare **non-public** members.
4. You want to control how subclasses are instantiated (via constructors).

### Use **Interface** when:
1. You want to define a **pure contract** without implementation.
2. Unrelated classes should implement (e.g., `Comparable`, `Serializable`).
3. You need **multiple inheritance of type** (a class can implement many interfaces).
4. You want to specify **capability** (CAN-DO), not identity.

### Real Example
- `AbstractList` (abstract class) — provides common list code, requires subclasses to implement `get()`.
- `List` (interface) — defines the list contract (add, remove, get, etc.).

A class: `class ArrayList extends AbstractList implements List`

### Common Interview Question
**"If Java 8 allows default methods in interfaces, why do we still need abstract classes?"**

Answer: Default methods in interfaces can't hold state (only static final). Abstract classes can have instance fields, constructors, and any access modifier. Interfaces still represent a pure contract; abstract classes are for shared implementation.

---

## 4.5 DIAMOND PROBLEM in Interfaces (Java 8+)

With default methods, the diamond problem can occur. Java resolves it with these rules:
1. Class wins over interface.
2. Sub-interface wins over super-interface.
3. If conflict remains, class must explicitly override.

```java
interface A { default void m() { System.out.println("A"); } }
interface B { default void m() { System.out.println("B"); } }
interface C extends A, B { }   // B wins (more specific)
class D implements C { }       // C inherits B.m()
new D().m();  // prints "B"
```

---
---

# PART 5 — RELATIONSHIPS BETWEEN OBJECTS

---

## 5.1 IS-A Relationship (Inheritance)
- Implemented via `extends` (class) or `implements` (interface).
- Example: `Dog IS-A Animal`. `Square IS-A Shape`.

```java
class Dog extends Animal { }
```

---

## 5.2 HAS-A Relationship (Association)
- One class **has** a reference to another.
- Three flavors: Association, Aggregation, Composition.

---

## 5.3 ASSOCIATION
**General relationship** where two classes are connected, but neither owns the other. Both can exist independently.

```java
class Teacher {
    Student[] students;  // teacher knows students
}
class Student {
    Teacher[] teachers;  // student knows teachers
}
```

### 🧠 Analogy
A **teacher and student** — a teacher can teach many students, a student can have many teachers. Neither owns the other.

---

## 5.4 AGGREGATION (Weak HAS-A)
- A **whole–part** relationship where the **part can exist without the whole**.
- Represented by a reference, not ownership.

```java
class Department {
    String name;
    List<Employee> employees;  // employees exist even without department
}
```

### 🧠 Analogy
A **Department and Employees** — if the department is closed, the employees still exist (they can be moved to another department).

### In Code
- No `final` ownership.
- Lifecycle is independent.

---

## 5.5 COMPOSITION (Strong HAS-A)
- A **whole–part** relationship where the **part cannot exist without the whole**.
- The whole creates/destroys the parts.

```java
class Car {
    private final Engine engine;  // Engine is part of Car

    Car() {
        engine = new Engine();   // Car creates its Engine
    }
}
```

### 🧠 Analogy
A **Car and its Engine** — if the car is destroyed, the engine goes with it. Engine has no meaning without the car.

### In Code
- Part is created inside the whole's constructor.
- Part is `private` and often `final`.
- Lifecycle tied to the whole.

---

## 5.6 Comparison Table

| Feature | Association | Aggregation | Composition |
|---|---|---|---|
| Relationship | General | Whole–Part (weak) | Whole–Part (strong) |
| Ownership | None | No | Yes |
| Lifecycle | Independent | Independent | Dependent |
| Example | Teacher–Student | Department–Employee | Car–Engine |
| UML | Plain line | Hollow diamond | Filled diamond |

---

## 5.7 DEPENDENCY
A class **uses** another class temporarily (as a method parameter or local variable), but does not hold it as a field.

```java
class ReportGenerator {
    void generate(PdfExporter exporter) {  // uses PdfExporter temporarily
        exporter.export(this);
    }
}
```

### 🧠 Analogy
A **customer and a shopkeeper** — the customer depends on the shopkeeper for a transaction, but doesn't own them.

---

## 5.8 COUPLING

### Tight Coupling
Classes are highly dependent on each other. Changes in one break the other.

```java
class A {
    B b = new B();  // A is tightly coupled to concrete B
}
```

### Loose Coupling
Classes depend on abstractions (interfaces), not concrete implementations.

```java
class A {
    I b;  // depends on interface I
    A(I b) { this.b = b; }
}
```

### Why loose coupling is better?
- Easier to test.
- Easier to change implementations.
- Better maintainability.

---

## 5.9 COHESION
**Cohesion** measures how closely the responsibilities of a single class are related.

- **High cohesion** = class does one thing well (good).
- **Low cohesion** = class does many unrelated things (bad).

```java
// High cohesion
class EmailValidator {
    boolean isValid(String email) { /* ... */ }
}

// Low cohesion
class EmailAndReportAndMath {
    boolean isValid(String email) { }
    void generateReport() { }
    int add(int a, int b) { }
}
```

### 🎯 Golden Rule
**High cohesion + Loose coupling = Good design.**

---
---

# PART 6 — MEMORY AND OBJECT CONCEPTS

---

## 6.1 STACK vs HEAP

| Feature | Stack | Heap |
|---|---|---|
| Stores | Local variables, method calls, references | Objects, instance variables |
| Thread | One per thread | Shared across threads |
| Order | LIFO | No order |
| Speed | Faster | Slower |
| Size | Small | Large |
| Lifecycle | Method scope | Until garbage collected |
| Errors | StackOverflowError | OutOfMemoryError |
| Thread-safe | Yes (per thread) | No (needs synchronization) |

### ASCII Diagram
```
     STACK                            HEAP
  ┌────────────┐                 ┌─────────────────────┐
  │ main()     │                 │                     │
  │  int x=10; │                 │  ┌──────────────┐   │
  │  ref s1 ───┼────────┐        │  │ Student obj  │   │
  ├────────────┤        │        │  │ name: "Aman" │   │
  │ method()   │        └───────▶│  │ age : 20     │   │
  │  int y=5;  │                 │  └──────────────┘   │
  └────────────┘                 │                     │
                                 │  ┌──────────────┐   │
                                 │  │ String "Aman"│   │
                                 │  │  (String Pool)│  │
                                 │  └──────────────┘   │
                                 └─────────────────────┘
```

---

## 6.2 OBJECT MEMORY CONCEPT
- Object is always in **heap**.
- Reference variable (which holds address) is in **stack**.
- Static variables are in the **method area** (part of heap, but logically separate).

---

## 6.3 REFERENCE VARIABLE
- Holds the **address** of an object in heap, not the object itself.
- `Student s = new Student();` — `s` is a reference, not the object.
- Multiple references can point to the same object.

```java
Student s1 = new Student();
Student s2 = s1;        // same object
s1.name = "Aman";
System.out.println(s2.name);  // "Aman"
```

---

## 6.4 GARBAGE COLLECTION (GC)
- Java automatically reclaims memory of unreferenced objects.
- `System.gc()` is a *request* — JVM may ignore.
- Eligible for GC when no live reference points to the object.
- Algorithms: Serial, Parallel, G1 (default since Java 9), ZGC, Shenandoah.

### Object eligibility example
```java
Student s1 = new Student();  // object1
s1 = new Student();          // object1 now has no reference — eligible for GC
```

### finalize() (Deprecated in Java 9+)
- Called by GC before destroying object.
- Unreliable — don't use it for cleanup.
- Use try-with-resources instead.

### Common Interview Questions
- When is an object eligible for GC? (When no live reference reaches it.)
- Can you force GC? (No — only request.)
- What is a memory leak in Java? (Objects still referenced but no longer needed — common with collections, listeners.)

---

## 6.5 `new` KEYWORD
- Allocates memory in heap.
- Calls constructor.
- Returns reference to the object.

```java
Student s = new Student("Aman");
```

### What `new` does internally:
1. Class is loaded if not already.
2. Memory allocated in heap.
3. Instance variables initialized to defaults.
4. Constructor is called.
5. Reference returned.

---

## 6.6 STRING POOL (String Interning)
- A special memory area in heap for **String literals**.
- Reuses strings to save memory.

```java
String s1 = "hello";       // goes to pool
String s2 = "hello";       // reuses same object
String s3 = new String("hello");  // creates new object in heap

System.out.println(s1 == s2);  // true
System.out.println(s1 == s3);  // false
System.out.println(s1.equals(s3));  // true
```

### intern() method
`String.intern()` adds a string to the pool (or returns existing pool reference).

### Why is String immutable?
1. **Security** — Strings are used in class loading, networking, file paths. Mutable strings = risk.
2. **String pool** — pooling requires immutability.
3. **Thread safety** — immutable objects are automatically thread-safe.
4. **Caching hashCode** — `String` caches its hash on first call.

### Final fields in String
- `private final char[] value` (or byte[] in Java 9+)
- `private final int hash`

---

## 6.7 IMMUTABLE OBJECTS
An object whose state **cannot change after construction**.

### How to create an immutable class:
1. Make class `final` (cannot extend).
2. Make all fields `private final`.
3. No setter methods.
4. Defensive copy in constructor for mutable fields.

```java
public final class ImmutableStudent {
    private final String name;
    private final int age;

    public ImmutableStudent(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public int getAge() { return age; }
}
```

### Why immutable?
- Thread-safe by default.
- Can be cached/shared safely.
- Good for keys in HashMap.

---

## 6.8 `==` vs `.equals()`

| Feature | `==` | `.equals()` |
|---|---|---|
| Compares | Reference (memory address) | Content (logical equality) |
| For primitives | Compares value | N/A |
| For objects | Compares address | Overridden to compare content |
| Default (Object.equals) | — | Same as `==` |

### Example
```java
String s1 = new String("hello");
String s2 = new String("hello");
s1 == s2;           // false (different objects)
s1.equals(s2);      // true (same content)
```

### String class overrides .equals() to compare content.
### Other classes (like Integer, Double) also override it.

---

## 6.9 `hashCode()` method
- Returns an int representing the object.
- Used by hash-based collections (HashMap, HashSet, Hashtable).
- Contract:
  1. If `equals(a, b)` is true, then `a.hashCode() == b.hashCode()`.
  2. If hashCodes differ, objects are definitely not equal.
  3. If hashCodes are equal, objects *may* be equal (collision).

---

## 6.10 Why override `hashCode()` when overriding `equals()`?

Because the contract requires: **equal objects must have equal hash codes.**

If you only override `equals()`:
```java
Set<Student> set = new HashSet<>();
set.add(new Student("Aman", 20));
set.contains(new Student("Aman", 20));  // false! Because hashCode differs.
```

HashMap/HashSet use hashCode to find a bucket, then equals to confirm. If hashCodes differ, the object will never be found.

### Best Practice
Always override both together, OR neither.

### IntelliJ / Eclipse generate them automatically.

---
---

# PART 7 — IMPORTANT OBJECT CLASS METHODS

`java.lang.Object` is the **parent of all classes** in Java. Every class implicitly extends `Object`.

---

## 7.1 `toString()`
- Returns a string representation of the object.
- Default: `ClassName@hexHashcode` (e.g., `Student@1540e19d`).
- **Override** to return meaningful info.

```java
class Student {
    String name; int age;
    Student(String n, int a) { name = n; age = a; }

    @Override
    public String toString() {
        return "Student{name=" + name + ", age=" + age + "}";
    }
}
```

### Why override?
- Debugging: print objects usefully.
- Logging.
- Default is useless.

### When is it called automatically?
- `System.out.println(obj)` calls `obj.toString()`.
- String concatenation: `"obj=" + obj` calls `obj.toString()`.

---

## 7.2 `equals(Object obj)`
- Compares two objects for equality.
- Default: same as `==` (reference equality).
- **Override** for content equality.

```java
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Student)) return false;
    Student s = (Student) o;
    return age == s.age && name.equals(s.name);
}
```

### Rules
- Reflexive: `x.equals(x)` → true.
- Symmetric: `x.equals(y)` iff `y.equals(x)`.
- Transitive: if x=y and y=z, then x=z.
- Consistent: multiple calls return same result.
- `x.equals(null)` → false.

---

## 7.3 `hashCode()`
- Returns int hash of object.
- Used in HashMap, HashSet.
- Must be consistent: if equals, same hashCode.

```java
@Override
public int hashCode() {
    return Objects.hash(name, age);
}
```

---

## 7.4 `getClass()`
- Returns the runtime class of the object.
- `final` method, cannot be overridden.

```java
Student s = new Student();
System.out.println(s.getClass().getName());  // "Student"
```

---

## 7.5 `clone()`
- Creates and returns a **copy** of the object.
- Class must implement `Cloneable` marker interface, else `CloneNotSupportedException`.
- Default: **shallow copy**.

```java
class Student implements Cloneable {
    String name;
    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```

### Shallow vs Deep Copy
- **Shallow**: copies fields, but shared references are still shared.
- **Deep**: copies everything recursively, so all references are independent.

```java
// Shallow
class A { int[] arr; }
A a1 = new A(); a1.arr = new int[]{1,2,3};
A a2 = (A) a1.clone();  // a2.arr is the same array as a1.arr

// Deep
class A implements Cloneable {
    int[] arr;
    public A deepClone() {
        A copy = new A();
        copy.arr = this.arr.clone();
        return copy;
    }
}
```

### Why override toString, equals, hashCode?
- **toString**: For readable output, debugging, logging.
- **equals**: For logical content comparison.
- **hashCode**: For correct behavior in HashMap/HashSet.

These three are so common that IDEs auto-generate them, and most interview questions test them.

---

## 7.6 Other Object Methods
- `wait()`, `notify()`, `notifyAll()` — for thread synchronization.
- `finalize()` — called by GC (deprecated).

---
---

# PART 8 — SOLID PRINCIPLES

SOLID are 5 object-oriented design principles that make software **understandable, flexible, and maintainable**.

---

## 8.1 S — Single Responsibility Principle (SRP)

### ✅ Definition
A class should have **only one reason to change** — i.e., one responsibility.

### 🧠 Analogy
A **chef** cooks. A **waiter** serves. A person doing both has two reasons to change (menu changes, table arrangement changes). Split them.

### Bad Code
```java
class Employee {
    void calculateSalary() { }
    void saveToDatabase() { }
    void generateReport() { }
}
```
This class has 3 responsibilities: salary logic, persistence, reporting.

### Improved Code
```java
class EmployeeSalary { void calculateSalary() { } }
class EmployeeRepository { void save() { } }
class EmployeeReport { void generate() { } }
```

### Interview Explanation
SRP reduces coupling. Changes in one responsibility don't affect others. Easier to test, reuse, and maintain.

### Common Interview Question
"Doesn't SRP lead to too many small classes?" — Yes, but each is simple and focused, which is better than one large complex class.

---

## 8.2 O — Open/Closed Principle (OCP)

### ✅ Definition
Software entities should be **open for extension but closed for modification**.

### 🧠 Analogy
A **power strip with multiple sockets** — you can plug in new devices without rewiring the strip.

### Bad Code
```java
class Shape {
    String type;
    double area() {
        if (type.equals("circle")) { /* ... */ }
        else if (type.equals("rectangle")) { /* ... */ }
        return 0;
    }
}
```
Adding a new shape requires **modifying** this class.

### Improved Code
```java
abstract class Shape { abstract double area(); }
class Circle extends Shape { double area() { return Math.PI * r * r; } }
class Rectangle extends Shape { double area() { return w * h; } }
```
Adding a new shape = adding a new class. Original code unchanged.

### Interview Explanation
OCP reduces risk. Existing tested code is not modified; new functionality comes from new classes.

---

## 8.3 L — Liskov Substitution Principle (LSP)

### ✅ Definition
Objects of a superclass should be **replaceable with objects of a subclass without breaking** the program.

### 🧠 Analogy
If a function expects a `Bird` and you pass a `Penguin`, it should still work correctly. (Note: penguin can't fly — so a `fly()` method violates LSP.)

### Bad Code
```java
class Bird { void fly() { } }
class Penguin extends Bird {
    @Override void fly() { throw new UnsupportedOperationException(); }
}
```

### Improved Code
```java
abstract class Bird { abstract void move(); }
class Sparrow extends Bird { void move() { /* fly */ } }
class Penguin extends Bird { void move() { /* swim */ } }
```

### Interview Explanation
LSP ensures inheritance is used correctly. Subclasses must honor the contract of the parent.

### Classic Violation
`Square extends Rectangle` — square breaks rectangle's invariants.

---

## 8.4 I — Interface Segregation Principle (ISP)

### ✅ Definition
Clients should not be forced to depend on methods they do not use. **Many small interfaces are better than one big one.**

### 🧠 Analogy
A **multi-function printer** interface with `print()`, `scan()`, `fax()` — a basic printer is forced to implement `scan()` and `fax()` even if it can't.

### Bad Code
```java
interface Machine {
    void print();
    void scan();
    void fax();
}
class SimplePrinter implements Machine {
    public void print() { } public void scan() { }  // unused!
    public void fax() { }                            // unused!
}
```

### Improved Code
```java
interface Printer { void print(); }
interface Scanner { void scan(); }
interface Fax { void fax(); }
class SimplePrinter implements Printer { public void print() { } }
class MultiFunctionPrinter implements Printer, Scanner, Fax { }
```

### Interview Explanation
ISP keeps interfaces focused. Easy to implement, easy to test, no unused methods.

---

## 8.5 D — Dependency Inversion Principle (DIP)

### ✅ Definition
High-level modules should not depend on low-level modules. **Both should depend on abstractions.** Abstractions should not depend on details; details should depend on abstractions.

### 🧠 Analogy
A **light switch** depends on a "switchable device" abstraction, not a specific bulb. Same switch works for bulbs, fans, or LEDs.

### Bad Code
```java
class Switch {
    private Bulb bulb = new Bulb();  // depends on concrete class
    void operate() { bulb.turnOn(); }
}
```

### Improved Code
```java
interface Switchable { void turnOn(); void turnOff(); }
class Bulb implements Switchable { /* ... */ }
class Fan implements Switchable { /* ... */ }

class Switch {
    private Switchable device;
    Switch(Switchable d) { device = d; }  // depends on abstraction
    void operate() { device.turnOn(); }
}
```

### Interview Explanation
DIP enables loose coupling. You can swap implementations easily (e.g., mock objects in testing).

### Key takeaway
**"Depend on abstractions, not on concrete classes."**

---

## 8.6 SOLID Quick Reference

| Letter | Principle | Key Idea |
|---|---|---|
| S | Single Responsibility | One class, one job |
| O | Open/Closed | Extend, don't modify |
| L | Liskov Substitution | Subclass must be substitutable |
| I | Interface Segregation | Small, focused interfaces |
| D | Dependency Inversion | Depend on abstractions |

---
---

# PART 9 — DESIGN PATTERNS (Intro for Interviews)

Design patterns are **reusable solutions** to common software design problems.

---

## 9.1 SINGLETON PATTERN

### Problem
Ensure a class has **only one instance**, and provide a global point of access.

### 🧠 Analogy
A **country's president** — only one at a time, and everyone refers to the same person.

### Implementation (Thread-safe)
```java
class Singleton {
    private static final Singleton INSTANCE = new Singleton();
    private Singleton() {}
    public static Singleton getInstance() { return INSTANCE; }
}
```

### Lazy Initialization
```java
class Singleton {
    private static Singleton instance;
    private Singleton() {}
    public static synchronized Singleton getInstance() {
        if (instance == null) instance = new Singleton();
        return instance;
    }
}
```

### Real-World Use
- Logger classes.
- Database connection pools.
- Configuration managers.
- Runtime environment (`Runtime` class in Java).

### Interview Question
"How do you break Singleton?" — Reflection (`setAccessible(true)`), Serialization, Cloning. Defend with `readResolve()`, `enum Singleton`, etc.

---

## 9.2 FACTORY PATTERN

### Problem
Object creation logic is complex or varies. Encapsulate it in a **factory method**.

### 🧠 Analogy
A **vehicle factory** — you ask for a vehicle, you get a Car, Bike, or Truck depending on input. The client doesn't know how it's created.

### Implementation
```java
interface Shape { void draw(); }
class Circle implements Shape { public void draw() { System.out.println("Circle"); } }
class Square implements Shape { public void draw() { System.out.println("Square"); } }

class ShapeFactory {
    public static Shape getShape(String type) {
        if (type.equals("circle")) return new Circle();
        if (type.equals("square")) return new Square();
        return null;
    }
}

// Client
Shape s = ShapeFactory.getShape("circle");
s.draw();
```

### Real-World Use
- `Calendar.getInstance()`
- `NumberFormat.getInstance()`
- JDBC `DriverManager.getConnection()`

---

## 9.3 BUILDER PATTERN

### Problem
Constructing a complex object with many optional parameters leads to **telescoping constructors** or many setters.

### 🧠 Analogy
Ordering a **custom pizza** — step by step: size, crust, toppings, cheese. The pizza is built piece by piece.

### Implementation
```java
class Pizza {
    private String size; private boolean cheese; private boolean pepperoni;
    private Pizza(Builder b) {
        this.size = b.size; this.cheese = b.cheese; this.pepperoni = b.pepperoni;
    }
    public static class Builder {
        private String size; private boolean cheese; private boolean pepperoni;
        public Builder(String size) { this.size = size; }
        public Builder cheese(boolean v) { this.cheese = v; return this; }
        public Builder pepperoni(boolean v) { this.pepperoni = v; return this; }
        public Pizza build() { return new Pizza(this); }
    }
}

// Usage
Pizza p = new Pizza.Builder("Large").cheese(true).pepperoni(true).build();
```

### Real-World Use
- `StringBuilder`
- `Stream.Builder`
- Lombok `@Builder`
- HTTP request builders

---

## 9.4 OBSERVER PATTERN

### Problem
When one object's state changes, **many other objects** need to be notified.

### 🧠 Analogy
**YouTube channel** — when a channel uploads a video, all subscribers are notified automatically.

### Implementation
```java
interface Observer { void update(String msg); }
class Subscriber implements Observer {
    private String name;
    Subscriber(String n) { name = n; }
    public void update(String msg) { System.out.println(name + " got: " + msg); }
}

class Channel {
    private List<Observer> subs = new ArrayList<>();
    public void subscribe(Observer o) { subs.add(o); }
    public void upload(String title) {
        for (Observer o : subs) o.update("New video: " + title);
    }
}
```

### Real-World Use
- Event listeners (Swing, JavaFX)
- Pub/Sub systems (Kafka, RabbitMQ)
- Java's `PropertyChangeListener`

---

## 9.5 STRATEGY PATTERN

### Problem
You have **multiple algorithms** for a task and want to switch between them at runtime.

### 🧠 Analogy
**Google Maps** — you choose a strategy: car, bike, walking, transit. Each computes the route differently.

### Implementation
```java
interface PaymentStrategy { void pay(int amount); }
class CardPayment implements PaymentStrategy { public void pay(int a) { System.out.println("Card: " + a); } }
class UpiPayment implements PaymentStrategy { public void pay(int a) { System.out.println("UPI: " + a); } }

class ShoppingCart {
    private PaymentStrategy strategy;
    void setStrategy(PaymentStrategy s) { strategy = s; }
    void checkout(int amt) { strategy.pay(amt); }
}

// Usage
ShoppingCart cart = new ShoppingCart();
cart.setStrategy(new UpiPayment());
cart.checkout(500);
```

### Real-World Use
- `Comparator` in Java (different sorting strategies).
- Compression algorithms.
- Sorting strategies.

---

## 9.6 Quick Reference

| Pattern | Purpose | Example |
|---|---|---|
| Singleton | One instance | Logger, Runtime |
| Factory | Object creation | Calendar, NumberFormat |
| Builder | Complex object construction | StringBuilder, Pizza |
| Observer | Notify dependents | Event listeners, YouTube |
| Strategy | Swappable algorithms | Comparator, Payment |

---
---

# 📍 PROGRESS CHECKPOINT 2

**You have now received:**
- ✅ PART 1 — OOP Fundamentals
- ✅ PART 2 — Java OOP Concepts
- ✅ PART 3 — Polymorphism Deep Dive
- ✅ PART 4 — Abstract Class & Interface
- ✅ PART 5 — Relationships
- ✅ PART 6 — Memory & Objects
- ✅ PART 7 — Object Class Methods
- ✅ PART 8 — SOLID Principles
- ✅ PART 9 — Design Patterns

**Next parts (will be delivered in subsequent messages — paste in order):**
- PART 10 — 50+ Tricky Interview Questions
- PART 11 — 30+ Output-Based Questions
- PART 12 — 100 MCQs
- PART 13 — 30+ Scenario-Based Questions
- PART 14 — 30 Coding Problems
- PART 15 — Top 100 Interview Questions
- PART 16 — Revision Sheet
- PART 17 — Interview Answering Technique
- PART 18 — Mock Interview
- FINAL — Top 30 Must-Study

**Reply "continue" or "next" to get the next chunk. To skip ahead, just say e.g. "give me PART 12 MCQs".**
