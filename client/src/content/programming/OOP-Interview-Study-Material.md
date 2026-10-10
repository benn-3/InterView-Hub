# 🎯 MASTER OOP INTERVIEW STUDY MATERIAL
### Complete Object-Oriented Programming Guide for Service-Based Companies & MNCs
#### (TCS | Infosys | Wipro | Cognizant | Accenture | Capgemini | HCL | Tech Mahindra | LTIMindtree | EY | Deloitte | IBM | Oracle | Microsoft | Amazon | Google | Zoho | Freshworks | Guidewire)

> **Java is the primary language used for all examples.**
> **Format:** Ready to paste into Notion (uses headings, code blocks, tables, callouts, dividers).

---

# 📘 TABLE OF CONTENTS

- **PART 1** — OOP Fundamentals
- **PART 2** — Java OOP Concepts (Constructors, this, super, Access Modifiers, static, final)
- **PART 3** — Polymorphism Deep Dive
- **PART 4** — Abstract Class & Interface
- **PART 5** — Relationships (Association, Aggregation, Composition, etc.)
- **PART 6** — Memory & Object Concepts
- **PART 7** — Important Object Class Methods
- **PART 8** — SOLID Principles
- **PART 9** — Design Patterns (Singleton, Factory, Builder, Observer, Strategy)
- **PART 10** — 50+ Tricky Interview Questions
- **PART 11** — 30+ Output-Based Questions
- **PART 12** — 100 MCQs (Easy/Medium/Hard)
- **PART 13** — 30+ Scenario-Based Questions
- **PART 14** — 30 Coding Questions (Easy/Medium/Hard)
- **PART 15** — Top 100 OOP Interview Questions
- **PART 16** — One-Day Rapid Revision Sheet
- **PART 17** — Interview Answering Technique (Bad/Good/Excellent answers for 20 questions)
- **PART 18** — Mock Interview (start when ready)
- **FINAL** — Top 30 MUST-STUDY OOP Concepts

---
---

# PART 1 — OOP FUNDAMENTALS

---

## 1.1 What is OOP (Object-Oriented Programming)?

### ✅ Simple Definition
OOP is a programming paradigm built around **objects** that combine **data (attributes)** and **behavior (methods)** together, instead of separating logic from data like in procedural programming.

### 🧠 Real-World Analogy
Think of a **Car**:
- **Data:** color, model, speed, fuel level
- **Behavior:** start(), accelerate(), brake()

The car is one entity. You don't keep speed in one file and the brake function in another — they belong together. That's the OOP mindset.

### 📜 Why was OOP introduced?
Procedural languages (C, Pascal) worked fine for small programs, but as software grew:
1. Code became hard to maintain.
2. The same data was being passed to many functions.
3. There was no way to model real-world entities naturally.
4. Reuse was limited (you couldn't easily extend existing code).

OOP solved these by grouping data + behavior into **classes** and letting classes **inherit** and **interact** like real-world objects.

### ⚔️ Procedural vs OOP

| Feature | Procedural | OOP |
|---|---|---|
| Focus | Functions / procedures | Objects / data |
| Data | Passed around freely | Hidden inside objects |
| Reuse | Functions | Inheritance, composition |
| Real-world modeling | Difficult | Natural |
| Security | Low | High (encapsulation) |
| Examples | C, Pascal | Java, C++, Python |
| Code organization | Top-down | Bottom-up |

### 🌟 Advantages of OOP
1. **Modularity** – Each class is a self-contained module.
2. **Reusability** – Inheritance lets you reuse existing code.
3. **Maintainability** – Bugs are easier to localize and fix.
4. **Security** – Data hiding via encapsulation.
5. **Modeling** – Real-world entities map naturally to classes.
6. **Extensibility** – New features can be added with minimal change (Open/Closed Principle).

### 🌍 Real-World Applications
- Banking systems (Account, Customer, Transaction)
- E-commerce (Product, Cart, Order, User)
- Games (Player, Enemy, Weapon, Level)
- UI frameworks (Button, Window, Event)
- Operating systems (File, Process, Thread)

### 🧩 Object-Oriented Thinking
Before writing code, ask:
- What are the **nouns** in the problem? → Classes (Student, Course, Teacher)
- What are the **verbs**? → Methods (enroll(), assign(), teach())
- What is shared across classes? → Inheritance or abstraction

---

## 1.2 CLASS

### ✅ What is a class?
A **class is a blueprint** for creating objects. It defines what data (fields) and behavior (methods) an object will have, but the class itself is not an object.

### 🧠 Analogy
A **class is the architectural plan** of a house. The **object is the actual house** built from that plan. You can build many houses from one plan.

### 📐 Syntax
```java
class Student {
    // Instance variables (data)
    String name;
    int age;

    // Method (behavior)
    void display() {
        System.out.println(name + " is " + age + " years old");
    }

    // Constructor
    Student(String n, int a) {
        name = n;
        age = a;
    }
}
```

### Line-by-line explanation
- `class Student` → Declares a class named Student.
- `String name; int age;` → These are **instance variables** — each object gets its own copy.
- `void display()` → A method that uses the data.
- `Student(String n, int a)` → A **constructor** that initializes the object.

### 📦 Parts of a Class
1. **Instance variables** – Belong to each object. Created in heap when object is `new`-ed.
2. **Methods** – Define behavior.
3. **Constructors** – Special methods to initialize objects.
4. **Static members** – Belong to the class, shared by all objects.
5. **Blocks** – Code that runs when class is loaded (static block) or per object (instance block).

### Class vs Object

| Class | Object |
|---|---|
| Blueprint/template | Real instance |
| Declared once | Can be created many times |
| No memory allocated for fields | Memory allocated in heap |
| Loaded once by classloader | Each `new` creates one |

---

## 1.3 OBJECT

### ✅ What is an object?
An **object is an instance of a class**. It occupies memory, holds actual values, and can call methods.

### 🧠 Analogy
Class = Recipe, Object = The actual dish cooked from the recipe.

### Creating Objects
```java
public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Aman", 21);  // s1 is a reference
        Student s2 = new Student("Riya", 22);
        s1.display();  // Aman is 21 years old
        s2.display();  // Riya is 22 years old
    }
}
```

### 🔑 Reference Variable
- `s1` is NOT the object. It is a **reference** (a pointer) that points to the object in heap memory.
- `Student s1;` → just a reference, no object yet (null).
- `s1 = new Student(...)` → object is created; reference now points to it.

### 🧠 Memory Concept (ASCII)
```
   STACK                          HEAP
  ┌──────────┐                ┌──────────────────┐
  │  s1 ─────┼───────────────▶│ name: "Aman"     │
  └──────────┘                │ age : 21         │
  ┌──────────┐                └──────────────────┘
  │  s2 ─────┼───────────────▶┌──────────────────┐
  └──────────┘                │ name: "Riya"     │
                              │ age : 22         │
                              └──────────────────┘
```

### ♻️ Object Lifecycle
1. **Created** → `new Student()` (memory allocated in heap)
2. **Used** → reference variables call methods
3. **Unreferenced** → no reference points to it
4. **Garbage collected** → JVM GC frees the memory

### Multiple Objects from One Class
You can create as many objects as you want from one class. Each has its own independent state.

```java
Student s1 = new Student("A", 20);
Student s2 = new Student("B", 21);
// s1 and s2 are completely independent
s1.age = 25;  // does not affect s2
```

### 💡 Common Interview Questions
1. What is the difference between a class and an object?
2. Where is an object stored — stack or heap? (Heap)
3. What is a reference variable? (A variable that holds the address of an object in heap)
4. Can you create an object without the `new` keyword? (Yes — via reflection `Class.newInstance()`, `clone()`, deserialization, `newInstance()` on Constructor)

### 🎤 Interview-Ready Answer
> "A class is a blueprint that defines the structure and behavior, while an object is a runtime instance of that blueprint occupying actual memory in the heap. Multiple objects can be created from a single class, each with its own state, and they communicate via method calls through references."

---

## 1.4 THE FOUR PILLARS OF OOP

The four pillars are: **Encapsulation, Inheritance, Polymorphism, Abstraction**.

---

### 🟢 1.4.1 ENCAPSULATION

#### ✅ Definition
Encapsulation is the practice of **wrapping data and methods into a single unit (class)** and **restricting direct access to some of the object's components** — typically by making fields `private` and exposing controlled access through getters/setters.

#### 🧠 Real-World Analogy
A **capsule medicine** — the drug is hidden inside, and you only interact with it through the outer shell. You cannot directly touch the chemical inside.

#### Why is it required?
- To **protect data** from invalid states.
- To **hide internal implementation** (e.g., a List may be ArrayList inside, but you only use `add()`).
- To allow changing internals without breaking callers.

#### Getters and Setters
```java
class Account {
    private double balance;  // hidden data

    public double getBalance() {        // controlled read
        return balance;
    }

    public void deposit(double amount) { // controlled write
        if (amount > 0) balance += amount;
        else System.out.println("Invalid amount");
    }
}
```

**Line-by-line:**
- `private double balance` → cannot be accessed directly from outside.
- `getBalance()` → read access only.
- `deposit()` → write access with validation.

#### Data Hiding
Data hiding is the goal; encapsulation is the mechanism. By making fields private, you hide them from outside.

#### Access Modifiers (Quick View)
| Modifier | Same class | Same package | Subclass | Everywhere |
|---|---|---|---|---|
| `private` | ✅ | ❌ | ❌ | ❌ |
| default | ✅ | ✅ | ❌ | ❌ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| `public` | ✅ | ✅ | ✅ | ✅ |

#### Real-World Example
A bank account: you can check balance, deposit, withdraw — but you cannot directly set balance to -1000.

#### Common Interview Questions
- Is encapsulation just data hiding? (No — it's data hiding + controlled access + bundling)
- Can encapsulation be achieved without `private`? (Yes — using interfaces or package-private with discipline)
- Why use getters/setters instead of public fields? (Validation, change tracking, future flexibility)

#### 💡 Important Keywords
private, getter, setter, data hiding, access control, validation, immutability

#### 🎤 Interview-Ready Answer
> "Encapsulation is bundling data and the methods that operate on that data within a class, and controlling external access through access modifiers. It protects object state from invalid modifications and decouples the internal implementation from external callers."

---

### 🔵 1.4.2 INHERITANCE

#### ✅ Definition
Inheritance is the mechanism by which one class (subclass/child) **acquires the properties and methods** of another class (superclass/parent) using the `extends` keyword.

#### 🧠 Real-World Analogy
A **child inherits traits from parents** — eye color, last name, behavior patterns — but also has their own.

#### Why use it?
- **Code reuse** — common logic goes in parent.
- **Polymorphism** — child can be treated as parent.
- **Logical hierarchy** — reflects real-world IS-A relationship.

#### Syntax
```java
class Animal {                    // Parent
    void eat() { System.out.println("eating"); }
}

class Dog extends Animal {        // Child
    void bark() { System.out.println("barking"); }
}

Dog d = new Dog();
d.eat();   // inherited
d.bark();  // own
```

#### Types of Inheritance

| Type | Diagram | Supported in Java? |
|---|---|---|
| **Single** | A → B | ✅ |
| **Multilevel** | A → B → C | ✅ |
| **Hierarchical** | A → B, A → C | ✅ |
| **Multiple** | A, B → C | ❌ with classes, ✅ with interfaces |
| **Hybrid** | Mix of above | ❌ directly |

#### Why doesn't Java support multiple inheritance with classes? — **The Diamond Problem**
```java
class A { void show() { System.out.println("A"); } }
class B extends A { void show() { System.out.println("B"); } }
class C extends A { void show() { System.out.println("C"); } }
// class D extends B, C { }  // ERROR — which show() do we inherit?
```
Java avoids ambiguity by disallowing it. Use **interfaces** instead (with default methods resolved by rules).

#### `extends` keyword
Used for class-to-class inheritance.

#### `super` keyword
- `super.field` → access parent's field.
- `super.method()` → call parent's method.
- `super()` → call parent's constructor (must be first line).

#### Constructor Behavior in Inheritance
When a child object is created, the **parent's constructor is called first** (implicit `super()`).
```java
class A { A() { System.out.println("A"); } }
class B extends A { B() { System.out.println("B"); } }
// new B() prints: A then B
```

#### Method Inheritance
- All `public` and `protected` methods are inherited.
- `private` methods are NOT inherited (but are accessible internally).
- Constructors are NOT inherited.

#### Common Interview Questions
- Why no multiple inheritance? (Diamond problem)
- What is the default parent of every class? (`java.lang.Object`)
- Can a child class access private members of parent? (No, not directly)

#### 💡 Important Keywords
`extends`, `super`, IS-A, single, multilevel, hierarchical, diamond problem, Object class

#### 🎤 Interview-Ready Answer
> "Inheritance lets a child class reuse and extend the behavior of a parent class, modeling an IS-A relationship. Java supports single, multilevel, and hierarchical inheritance with classes, but disallows multiple inheritance to avoid the diamond problem. The child can override parent methods, and the parent's constructor is invoked before the child's."

---

### 🟡 1.4.3 POLYMORPHISM

#### ✅ Definition
Polymorphism means **"many forms"** — the same interface or method name behaves differently based on the actual object type or the arguments passed.

#### 🧠 Real-World Analogy
The word **"draw"**:
- A painter draws with a brush.
- A student draws a diagram.
- A bank draws money (withdraws).

Same word, different actions depending on context. Same in Java.

#### Two Types
1. **Compile-time polymorphism** (Static binding) — Method overloading
2. **Runtime polymorphism** (Dynamic binding) — Method overriding

#### Example
```java
class Animal { void sound() { System.out.println("Animal sound"); } }
class Dog extends Animal { void sound() { System.out.println("Bark"); } }
class Cat extends Animal { void sound() { System.out.println("Meow"); } }

Animal a = new Dog();  // upcasting
a.sound();  // prints "Bark"  — runtime polymorphism
```

#### Upcasting
Assigning a child object to a parent reference. Implicit and safe.
```java
Animal a = new Dog();  // Dog is automatically treated as Animal
```

#### Downcasting
Assigning a parent reference back to a child type. Must be explicit and safe.
```java
Animal a = new Dog();
Dog d = (Dog) a;  // explicit cast
```
Fails with `ClassCastException` if object is not actually a Dog.

#### Dynamic Method Dispatch
JVM decides at runtime which overridden method to call based on the **actual object type**, not the reference type.

#### Static vs Dynamic Binding
- **Static (early) binding** — resolved at compile time (overloading, static methods, private methods, final methods).
- **Dynamic (late) binding** — resolved at runtime (overridden instance methods).

#### Common Interview Questions
- Can static methods be overridden? (No, only hidden.)
- Can private methods be overridden? (No.)
- Difference between overloading and overriding?

#### 💡 Important Keywords
polymorphism, overloading, overriding, upcasting, downcasting, dynamic dispatch, static binding, dynamic binding

#### 🎤 Interview-Ready Answer
> "Polymorphism allows one interface to represent different underlying forms. In Java, compile-time polymorphism is achieved through method overloading based on parameter lists, while runtime polymorphism is achieved through method overriding, where the JVM uses dynamic dispatch to call the overridden method based on the actual object type, not the reference type."

---

### 🟣 1.4.4 ABSTRACTION

#### ✅ Definition
Abstraction is the practice of **hiding complex implementation details** and **exposing only the essential features** of an object.

#### 🧠 Real-World Analogy
When you **drive a car**, you use the steering wheel, accelerator, brake. You don't need to know how the engine, transmission, or fuel injection works internally. The car abstracts away the complexity.

#### Why is it needed?
- Reduces complexity for the user.
- Decouples "what" from "how".
- Makes systems easier to extend.

#### Two ways to achieve abstraction in Java
1. **Abstract class** (0–100% abstraction)
2. **Interface** (100% abstraction traditionally; with default methods, not 100% anymore)

#### Abstract Class Example
```java
abstract class Shape {
    abstract double area();   // no body — contract

    void display() {           // concrete method
        System.out.println("I am a shape");
    }
}

class Circle extends Shape {
    double radius;
    Circle(double r) { radius = r; }
    double area() { return Math.PI * radius * radius; }
}
```

#### Interface Example
```java
interface Payment {
    void pay(double amount);  // implicitly public abstract
}

class UpiPayment implements Payment {
    public void pay(double amount) { System.out.println("Paid " + amount + " via UPI"); }
}
```

#### Abstract Class vs Interface (Quick)
| Feature | Abstract class | Interface |
|---|---|---|
| Methods | Abstract + concrete | Abstract (pre-Java 8) |
| Variables | Any | public static final only |
| Inheritance | `extends` (one) | `implements` (many) |
| Constructor | Yes | No |
| Access | Any | public (pre-Java 9) |

(Detailed comparison in PART 4.)

#### Common Interview Questions
- Can an abstract class have no abstract methods? (Yes)
- Can an interface have a constructor? (No)
- Can a class be both abstract and final? (No — contradictory)

#### 💡 Important Keywords
abstract, interface, hides implementation, contract, abstract method, concrete class

#### 🎤 Interview-Ready Answer
> "Abstraction focuses on what an object does rather than how it does it. In Java, abstraction is achieved using abstract classes, which can hold both abstract and concrete methods, and interfaces, which define a contract of methods a class must implement. It reduces complexity and makes code more maintainable."

---
---

# PART 2 — JAVA OOP CONCEPTS

---

## 2.1 CONSTRUCTORS

### ✅ What is a constructor?
A constructor is a **special method** that is called automatically when an object is created. It is used to **initialize** the object's state.

### 🧠 Analogy
Like a **registration form** — when you join a new platform, you must fill in initial details before you can use it. The constructor sets those initial details.

### Rules
1. Constructor name = class name.
2. No return type (not even `void`).
3. Called automatically with `new`.
4. If you write no constructor, Java provides a default no-arg one.

### Types

#### 1. Default (No-arg) Constructor
```java
class Student {
    String name;
    // implicit: Student() {}
}
Student s = new Student();  // name = null
```

#### 2. Parameterized Constructor
```java
class Student {
    String name;
    Student(String n) { name = n; }
}
Student s = new Student("Aman");
```

#### 3. Constructor Overloading
Multiple constructors with different parameter lists.
```java
class Student {
    String name; int age;
    Student() { name = "Unknown"; age = 0; }
    Student(String n) { name = n; }
    Student(String n, int a) { name = n; age = a; }
}
```

#### 4. Constructor Chaining
Calling one constructor from another using `this()` or `super()`.

```java
class Student {
    String name; int age; String course;
    Student() { this("Unknown", 0, "None"); }          // chain to 3-arg
    Student(String n, int a) { this(n, a, "None"); }    // chain to 3-arg
    Student(String n, int a, String c) {                // main
        name = n; age = a; course = c;
    }
}
```

### `this()` and `super()` Rules
- Must be the **first statement** in a constructor.
- Cannot both be used in the same constructor.
- `this()` calls another constructor in the same class.
- `super()` calls a constructor in the parent class.

### Constructor vs Method

| Feature | Constructor | Method |
|---|---|---|
| Name | Same as class | Any |
| Return type | None (not even void) | void or any |
| Called | At object creation | Anytime |
| Inheritance | Not inherited | Inherited |
| Overloading | Yes | Yes |
| Overriding | No | Yes |

### Tricky Questions
- **Can constructors be inherited?** No.
- **Can constructors be overridden?** No (they aren't inherited).
- **Can constructors be overloaded?** Yes.
- **Can a constructor be private?** Yes — for Singleton pattern.
- **Can constructor call itself recursively?** No — would cause compile error (recursive constructor invocation).

### Common Interview Questions
- What happens if you don't define any constructor? (Java provides default no-arg.)
- What if parent has only parameterized constructor? (Child must explicitly call `super(args)`; else compile error.)

### 🎤 Interview-Ready Answer
> "A constructor is a special method with the same name as the class and no return type, used to initialize an object at creation. Java provides a default no-arg constructor if none is defined. Constructors can be overloaded but not inherited or overridden, and can be chained using this() and super()."

---

## 2.2 `this` KEYWORD

`this` refers to the **current object** — the one on which the method or constructor is being called.

### Uses

#### 1. Differentiate instance variable from parameter
```java
class Student {
    String name;
    Student(String name) {
        this.name = name;  // this.name = instance, name = parameter
    }
}
```

#### 2. Call current object's method
```java
class A {
    void m1() { System.out.println("m1"); this.m2(); }
    void m2() { System.out.println("m2"); }
}
```

#### 3. Call another constructor in same class — `this()`
```java
Student() { this("Aman", 20); }  // call 2-arg constructor
Student(String n, int a) { name = n; age = a; }
```

#### 4. Pass current object as argument
```java
class Helper {
    void process(A a) { /* ... */ }
}
class A {
    void m() { new Helper().process(this); }
}
```

#### 5. Return current object (used in Builder pattern)
```java
class A {
    A setName(String n) {
        this.name = n;
        return this;
    }
}
```

### Common Mistakes
- `this` cannot be used in `static` context (no current object).
- `this()` must be the first statement in constructor.

### Common Interview Questions
- Can `this` refer to a static variable? (No — `this` is for instance context.)
- Can you assign `this`? (No — `this` is a final reference.)

---

## 2.3 `super` KEYWORD

`super` refers to the **parent class** (superclass).

### Uses

#### 1. Call parent constructor — `super()`
```java
class Animal { Animal() { System.out.println("Animal"); } }
class Dog extends Animal {
    Dog() {
        super();  // explicit call (also implicit)
        System.out.println("Dog");
    }
}
```

#### 2. Access parent field
```java
class A { int x = 10; }
class B extends A { int x = 20;
    void show() { System.out.println(super.x); }  // 10
}
```

#### 3. Call parent method
```java
class A { void show() { System.out.println("A"); } }
class B extends A {
    void show() { super.show(); System.out.println("B"); }
}
```

### Rules
- `super()` must be the first statement.
- If parent has no default constructor, child must call `super(args)`.
- `super` cannot be used in static context.

### Common Interview Questions
- What if you don't call super()? (Java inserts implicit `super()` calling parent's no-arg constructor; compile error if no such constructor exists.)
- Can you use both `this()` and `super()` in one constructor? (No — both must be first statement.)

---

## 2.4 ACCESS MODIFIERS

Access modifiers control **visibility** of classes, methods, and fields.

### Detailed Comparison

| Modifier | Same class | Same package | Subclass (different pkg) | Other packages |
|---|---|---|---|---|
| `private` | ✅ | ❌ | ❌ | ❌ |
| default (no keyword) | ✅ | ✅ | ❌ | ❌ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| `public` | ✅ | ✅ | ✅ | ✅ |

### Notes
- **`private`** → most restrictive. Only the same class can access.
- **default** → package-private. Available to any class in the same package.
- **`protected`** → package + subclasses anywhere.
- **`public`** → accessible from anywhere.

### Common Interview Questions
- Why not make everything public? (Loses encapsulation; allows invalid states.)
- Can a class be private? (Top-level classes cannot be private. Nested classes can.)
- Can a class be protected? (Only nested classes can.)

### 🎤 Interview-Ready Answer
> "Java has four access modifiers — private, default, protected, and public — providing increasing levels of visibility. Private is the most restrictive, only allowing access within the same class, while public is accessible everywhere. The choice depends on encapsulation needs and API design."

---

## 2.5 `static` KEYWORD

`static` means **belonging to the class**, not to any individual object.

### Static Variable (Class Variable)
- Shared by all instances.
- Single copy in memory (method area).
- Accessed via `ClassName.variableName`.

```java
class Employee {
    static int count = 0;  // shared
    Employee() { count++; }
}
```

### Static Method
- Can be called without an object: `ClassName.method()`.
- Cannot use `this` or `super`.
- Cannot directly access non-static members.

```java
class MathUtil {
    static int square(int x) { return x * x; }
}
// MathUtil.square(5);  → 25
```

### Static Block
Runs **once** when the class is loaded.
```java
class DB {
    static {
        System.out.println("DB initialized");
    }
}
```

### Static vs Instance

| Feature | Static | Instance |
|---|---|---|
| Belongs to | Class | Object |
| Memory | One copy | One per object |
| Accessed via | Class name | Object reference |
| Can access instance? | No (without object) | Yes |
| Can be overridden? | No (only hidden) | Yes |

### Why static methods cannot directly access non-static variables?
Because static methods belong to the class, but non-static variables belong to a specific object. There's no `this` reference. You'd need an object to access them.

```java
class A {
    int x = 10;
    static void m() {
        System.out.println(x);  // ERROR
        A a = new A();
        System.out.println(a.x);  // OK
    }
}
```

### Common Interview Questions
- Can a static method be overloaded? (Yes.)
- Can a static method be overridden? (No — only hidden.)
- Can we have static constructor? (No — constructor is for object init.)

---

## 2.6 `final` KEYWORD

`final` means **cannot be changed**.

### 1. final Variable
- Constant; cannot reassign.
- Must be initialized once (in declaration, init block, or constructor).

```java
final int MAX = 100;
// MAX = 200;  // ERROR
```

### 2. final Method
- Cannot be overridden by subclasses.

```java
class A { final void show() { System.out.println("A"); } }
class B extends A { /* void show() {}  ERROR */ }
```

### 3. final Class
- Cannot be extended (no inheritance).

```java
final class String { /* ... */ }
// class MyString extends String { }  // ERROR
```

### `final` vs `finally` vs `finalize`

| Keyword | Type | Purpose |
|---|---|---|
| `final` | Modifier | Restrict change |
| `finally` | Block | Always runs after try-catch |
| `finalize()` | Method | Called by GC before object destruction (deprecated in Java 9+) |

### Common Interview Questions
- Can a final variable be a reference? (Yes — the reference cannot change, but the object's state can.)
- Is final the same as immutable? (No — final is one piece; immutable means nothing changes.)
- Can we have a final abstract class? (No — contradictory.)

---
---

# PART 3 — POLYMORPHISM DEEP DIVE

---

## 3.1 METHOD OVERLOADING (Compile-time Polymorphism)

### ✅ Definition
Multiple methods in the same class share the **same name** but have **different parameter lists** (different number, types, or order of parameters).

### 🧠 Analogy
A calculator's `+` button: it can add 2 numbers, 3 numbers, or decimals — same action, different inputs.

### Rules
1. Must differ in parameter list.
2. May differ in return type.
3. May differ in access modifier.
4. May differ in exception type.
5. **Return type alone is NOT enough** for overloading.

### Examples

#### Different number of parameters
```java
class Math {
    int add(int a, int b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
}
```

#### Different types
```java
class Math {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
}
```

#### Different order
```java
class Math {
    void show(int a, String b) { }
    void show(String a, int b) { }
}
```

### Return Type and Overloading
```java
int show(int x);
double show(int x);  // ERROR — same parameters, only return type differs
```

### Static Method Overloading
Yes, static methods can be overloaded just like instance methods.

### Constructor Overloading
Yes — covered in PART 2.

### Common Interview Questions
- Can you overload by changing only access modifier? (Yes — but unusual.)
- Can you overload `main`? (Yes — but JVM only calls `public static void main(String[] args)`.)

### 🎤 Interview-Ready Answer
> "Method overloading allows multiple methods with the same name but different parameter signatures in the same class. It's resolved at compile time based on the argument types, which is why it's called compile-time or static polymorphism. Return type alone is not sufficient to overload a method."

---

## 3.2 METHOD OVERRIDING (Runtime Polymorphism)

### ✅ Definition
A subclass provides a **specific implementation** of a method that is already defined in its parent class.

### 🧠 Analogy
A parent's rule: "Make a sound." Child Dog says "Bark", child Cat says "Meow". Same rule, different behavior.

### Rules
1. Same method name.
2. Same parameter list (signature).
3. **Covariant return type** allowed (subtype of parent's return).
4. Access modifier cannot be more restrictive (e.g., parent `protected` → child cannot be `private`).
5. Cannot override `static`, `final`, or `private` methods.
6. Cannot throw new or broader checked exceptions.

### Example
```java
class Animal {
    void sound() { System.out.println("Animal sound"); }
}
class Dog extends Animal {
    @Override
    void sound() { System.out.println("Bark"); }
}
```

### Access Modifiers in Overriding
- Parent `public` → child can be `public` only.
- Parent `protected` → child can be `protected` or `public`.
- Cannot reduce visibility.

### Return Types
- Same type, or
- **Covariant return type** (subtype of parent's return).

```java
class Animal { Animal clone() { return new Animal(); } }
class Dog extends Animal {
    @Override Dog clone() { return new Dog(); }  // covariant
}
```

### static methods
Cannot be overridden. Only **hidden**.
```java
class A { static void m() { System.out.println("A"); } }
class B extends A { static void m() { System.out.println("B"); } }
A a = new B();
a.m();  // prints "A" — reference type decides
```

### final methods
Cannot be overridden. Compile error.

### private methods
Cannot be overridden (not even visible to child). Child can define its own with same name (not overriding).

### constructors
Cannot be inherited, so cannot be overridden.

### exceptions
- Can throw fewer or narrower checked exceptions.
- Cannot throw new or broader checked exceptions.
- Can throw any unchecked (RuntimeException) freely.

### @Override Annotation
Best practice — compiler checks that you are actually overriding.

### Common Interview Questions
- Can you override a static method? (No, only hide.)
- Can you override `main`? (No — it's static.)
- Can you override and change return type? (Yes — covariant return type only.)

---

## 3.3 OVERLOADING vs OVERRIDING — Detailed Comparison

| Feature | Overloading | Overriding |
|---|---|---|
| Binding time | Compile time | Runtime |
| Where | Same class (or child) | Parent & child classes |
| Parameters | Must differ | Must be same |
| Return type | Can differ (any) | Same or covariant |
| Inheritance needed | No | Yes |
| Access modifier | Can be anything | Cannot reduce visibility |
| static | Yes | No (only hidden) |
| final | Yes | No |
| private | Yes | No |
| Polymorphism type | Compile-time | Runtime |
| Performance | Slightly faster (static binding) | Slightly slower (dynamic dispatch) |
| Exception rules | Any | Restricted |
| Constructor | Can overload | Cannot override |

### Quick Memory Trick
- **Overloading** = Same name, **different signature** (compile-time, same class).
- **Overriding** = Same name, **same signature**, different class (runtime).

---

## 3.4 STATIC vs DYNAMIC BINDING

### Static Binding (Early Binding)
- Resolved at compile time.
- Used for: overloaded methods, static methods, private methods, final methods.

```java
class A { void m(int x) {} void m(double x) {} }
A a = new A();
a.m(5);  // compile-time: m(int) chosen
```

### Dynamic Binding (Late Binding)
- Resolved at runtime.
- Used for: overridden instance methods.

```java
class A { void m() { System.out.println("A"); } }
class B extends A { void m() { System.out.println("B"); } }
A a = new B();
a.m();  // runtime: B's m() called
```

### Why does it matter?
- Dynamic binding enables runtime polymorphism.
- Static binding is faster because no lookup at runtime.

### Common Interview Questions
- Which is faster? (Static binding.)
- Can `final` participate in dynamic binding? (No — final methods are statically bound.)

---

## 3.5 UPCASTING vs DOWNCASTING

### Upcasting (Implicit)
Assigning a subclass object to a superclass reference. Always safe.
```java
Animal a = new Dog();  // Dog → Animal
a.sound();  // Dog's sound() if overridden
```

### Downcasting (Explicit)
Assigning a superclass reference back to subclass. Risky — needs explicit cast.
```java
Animal a = new Dog();
Dog d = (Dog) a;  // explicit downcast
```
Fails with `ClassCastException` if object is not actually a Dog.

```java
Animal a = new Animal();
Dog d = (Dog) a;  // RUNTIME ERROR — ClassCastException
```

### Safe Downcasting
Use `instanceof`:
```java
if (a instanceof Dog) {
    Dog d = (Dog) a;
}
```

### Common Interview Questions
- Is upcasting automatic? (Yes.)
- Why is downcasting unsafe? (Because the actual object may not be of the target type.)

---
---

# ✅ PROGRESS CHECKPOINT

**You have now received:**
- ✅ PART 1 — OOP Fundamentals (OOP intro, Class, Object, Four Pillars)
- ✅ PART 2 — Java OOP Concepts (Constructors, this, super, Access Modifiers, static, final)
- ✅ PART 3 — Polymorphism Deep Dive (Overloading, Overriding, Binding, Casting)

**Coming next (in subsequent messages — paste in order to build the full Notion page):**
- PART 4 — Abstract Class & Interface
- PART 5 — Relationships
- PART 6 — Memory & Objects
- PART 7 — Object Class Methods
- PART 8 — SOLID Principles
- PART 9 — Design Patterns
- PART 10 — 50+ Tricky Questions
- PART 11 — 30+ Output Questions
- PART 12 — 100 MCQs
- PART 13 — 30+ Scenarios
- PART 14 — 30 Coding Problems
- PART 15 — Top 100 Questions
- PART 16 — Revision Sheet
- PART 17 — Answering Technique
- PART 18 — Mock Interview
- FINAL — Top 30 Must-Study

**Reply "continue" or "next" to receive the next part. Reply with a specific part name (e.g. "give me PART 8") to jump there.**
