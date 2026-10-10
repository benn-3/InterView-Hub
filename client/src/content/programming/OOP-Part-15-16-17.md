# PART 15 — TOP 100 OOP INTERVIEW QUESTIONS (With Concise Answers)

Divided into Fresher / Junior / Intermediate / Tricky.

---

# 🟢 FRESHER LEVEL (Q1–Q30)

---

**Q1. What is OOP?**
OOP is a programming paradigm based on objects that bundle data and behavior, with four pillars: encapsulation, inheritance, polymorphism, abstraction.

**Q2. What is a class?**
A blueprint for creating objects, defining fields and methods.

**Q3. What is an object?**
A runtime instance of a class, occupying memory in heap.

**Q4. What is the difference between class and object?**
Class is the blueprint; object is the actual instance created from it.

**Q5. What is encapsulation?**
Wrapping data and methods in a class and controlling access via access modifiers and getters/setters.

**Q6. What is inheritance?**
Mechanism by which a class acquires properties and methods of another class using `extends`.

**Q7. What is polymorphism?**
Same name, different behavior — overloading (compile-time) and overriding (runtime).

**Q8. What is abstraction?**
Hiding implementation details and exposing only essential features.

**Q9. What is the `this` keyword?**
Refers to the current object instance.

**Q10. What is the `super` keyword?**
Refers to the parent class.

**Q11. What is a constructor?**
Special method to initialize an object, called via `new`.

**Q12. What is method overloading?**
Same method name, different parameter lists in the same class.

**Q13. What is method overriding?**
Child class provides specific implementation of a parent's method.

**Q14. What is an abstract class?**
A class that cannot be instantiated and may contain abstract methods.

**Q15. What is an interface?**
A pure abstract type defining a contract of methods.

**Q16. Can an abstract class have a constructor?**
Yes — used by subclasses via super().

**Q17. Can an interface have a constructor?**
No.

**Q18. Can an interface be instantiated?**
No.

**Q19. What is the default value of `int`?**
0.

**Q20. What is the default value of `boolean`?**
false.

**Q21. What is the default value of object references?**
null.

**Q22. Where are objects stored?**
Heap memory.

**Q23. Where are local variables stored?**
Stack memory.

**Q24. What is `static`?**
A keyword meaning the member belongs to the class, not any object.

**Q25. What is `final`?**
A keyword meaning the entity cannot be modified (variable), overridden (method), or extended (class).

**Q26. What is the difference between `==` and `.equals()`?**
`==` compares references; `.equals()` compares content (if overridden).

**Q27. What is the `new` keyword?**
Allocates memory and creates an object.

**Q28. What is a package?**
A namespace for organizing classes.

**Q29. What is `import`?**
Used to access classes from other packages.

**Q30. What is the entry point of a Java program?**
`public static void main(String[] args)`.

---

# 🔵 JUNIOR DEVELOPER (Q31–Q60)

---

**Q31. What is the difference between abstraction and encapsulation?**
Abstraction hides complexity (what's exposed); encapsulation hides data (how it's protected).

**Q32. What is the difference between overloading and overriding?**
Overloading is compile-time (same class, different params); overriding is runtime (parent-child, same signature).

**Q33. Can we override a static method?**
No — only hide it.

**Q34. Can we override a private method?**
No — not visible to subclasses.

**Q35. Can we override a final method?**
No.

**Q36. Can a constructor be inherited?**
No.

**Q37. Can a constructor be private?**
Yes — used in Singleton.

**Q38. Can a class be both abstract and final?**
No — contradictory.

**Q39. Can we have an abstract class without any abstract method?**
Yes.

**Q40. What is dynamic method dispatch?**
Resolving overridden methods at runtime based on actual object type.

**Q41. What is upcasting?**
Assigning a subclass object to a superclass reference (implicit, safe).

**Q42. What is downcasting?**
Assigning a superclass reference back to subclass (explicit, risky).

**Q43. What is the `instanceof` operator?**
Checks if an object is an instance of a specific class/interface.

**Q44. Can an interface extend another interface?**
Yes — multiple interfaces.

**Q45. Can a class implement multiple interfaces?**
Yes.

**Q46. Why doesn't Java support multiple inheritance with classes?**
To avoid the diamond problem.

**Q47. What is the diamond problem?**
Ambiguity when a class inherits from two parents with the same method.

**Q48. What is the default parent of every class?**
`java.lang.Object`.

**Q49. What is the `Object` class?**
The root class of all Java classes, providing `toString`, `equals`, `hashCode`, etc.

**Q50. Why override `toString()`?**
For meaningful, readable object representation.

**Q51. Why override `equals()`?**
For logical content-based comparison.

**Q52. Why override `hashCode()`?**
For correct behavior in hash-based collections (HashMap, HashSet).

**Q53. What is the contract between `equals` and `hashCode`?**
Equal objects must have equal hashCodes.

**Q54. What is a `final` variable?**
A constant — cannot be reassigned.

**Q55. What is a `final` method?**
Cannot be overridden.

**Q56. What is a `final` class?**
Cannot be inherited (e.g., String, Math).

**Q57. What is a static block?**
Code that runs once when a class is loaded.

**Q58. What is an instance block?**
Code that runs each time an object is created, before the constructor.

**Q59. Can static methods access instance variables?**
Not directly — need an object.

**Q60. Why can't static methods use `this`?**
Because `this` refers to an instance, but static has no instance.

---

# 🟡 INTERMEDIATE (Q61–Q85)

---

**Q61. What is the String pool?**
A special heap area that reuses string literals for memory efficiency.

**Q62. Why is String immutable?**
Security, string pool, thread safety, hashCode caching.

**Q63. What is `intern()`?**
Returns the canonical (pool) representation of a String.

**Q64. Difference between `String`, `StringBuilder`, `StringBuffer`?**
String is immutable; StringBuilder is mutable and not thread-safe; StringBuffer is mutable and thread-safe.

**Q65. What is a wrapper class?**
Object representation of a primitive (e.g., `Integer` for `int`).

**Q66. What is autoboxing?**
Automatic conversion of primitive to wrapper (e.g., `int` → `Integer`).

**Q67. What is unboxing?**
Wrapper to primitive (e.g., `Integer` → `int`).

**Q68. What is composition?**
Strong HAS-A: part cannot exist without the whole (Car–Engine).

**Q69. What is aggregation?**
Weak HAS-A: part can exist without the whole (Department–Employee).

**Q70. What is association?**
General relationship between two classes (Teacher–Student).

**Q71. What is dependency?**
One class uses another temporarily (method parameter).

**Q72. What is coupling?**
Degree of dependency between classes. Loose is better.

**Q73. What is cohesion?**
How focused a class is. High is better.

**Q74. What is the difference between abstract class and interface?**
Abstract: state + code; Interface: pure contract (mostly). See detailed table.

**Q75. What are default methods?**
Interface methods with a body, introduced in Java 8.

**Q76. What are static methods in interfaces?**
Interface methods that belong to the interface, not implementation.

**Q77. What is a functional interface?**
Interface with exactly one abstract method (used with lambdas).

**Q78. What is a marker interface?**
Interface with no methods, used to mark a class (Serializable, Cloneable).

**Q79. What is covariant return type?**
Returning a subtype of the parent's return type when overriding.

**Q80. What is method hiding?**
Static methods with same name in parent and child — child's hides parent's.

**Q81. What is the order of constructor execution in inheritance?**
Parent first, then child.

**Q82. What is the order of static block execution?**
Parent static → child static → parent instance/ctor → child instance/ctor.

**Q83. What is an anonymous class?**
A class without a name, defined and instantiated in one expression.

**Q84. What is a lambda expression?**
A concise way to implement a functional interface.

**Q85. What is garbage collection?**
Automatic memory management — JVM reclaims unreferenced objects.

---

# 🔴 TRICKY (Q86–Q100)

---

**Q86. What is the output of `new B()` if A's constructor calls an overridden method?**
B's overridden method is called (dynamic dispatch), even from A's constructor. ⚠️ Classic trap.

**Q87. Can a `final` variable be a reference to a mutable object?**
Yes. Reference is final; object can change.

**Q88. What is the difference between shallow copy and deep copy?**
Shallow: shared references; Deep: independent copies.

**Q89. How to make a class immutable?**
final class, private final fields, no setters, defensive copy.

**Q90. Why is `HashMap` not thread-safe?**
It's not synchronized. Use `ConcurrentHashMap` for thread safety.

**Q91. What is the difference between `HashMap` and `Hashtable`?**
Hashtable is synchronized and legacy; HashMap is not synchronized and modern.

**Q92. What is the `equals()` method's default behavior?**
Same as `==` — reference comparison.

**Q93. What happens if you override `equals` but not `hashCode`?**
HashMap/HashSet will not find equal objects.

**Q94. What is the `hashCode()` contract?**
Equal objects → equal hashes. Unequal hashes → unequal objects. Equal hashes → may be equal.

**Q95. Can we override `Object.clone()`?**
Yes, and class must implement `Cloneable`.

**Q96. What is the difference between `final`, `finally`, `finalize`?**
`final` = modifier; `finally` = block; `finalize` = GC method (deprecated).

**Q97. Can we have `try` without `catch`?**
Yes — with `finally` or as try-with-resources.

**Q98. What is a checked vs unchecked exception?**
Checked: compile-time (must handle). Unchecked: RuntimeException, no compile-time check.

**Q99. Can an interface have a `main()` method?**
Yes (Java 8+) — used for testing.

**Q100. What is the output of `System.out.println(null + "test")`?**
`nulltest` — string concatenation with null prints "null".

---
---

# PART 16 — ONE-DAY RAPID REVISION SHEET

Last-minute revision before interview. Skim, don't read.

---

## 🎯 KEY DEFINITIONS (memorize)

- **Class** — blueprint
- **Object** — instance
- **Encapsulation** — data hiding + controlled access
- **Inheritance** — IS-A, code reuse
- **Polymorphism** — many forms (overloading/overriding)
- **Abstraction** — hide implementation, show essentials
- **Composition** — strong HAS-A
- **Aggregation** — weak HAS-A
- **Association** — general relationship
- **Coupling** — dependency between classes
- **Cohesion** — focus of a class
- **Solid** — 5 design principles

---

## 🎯 KEY DIFFERENCES (high-frequency)

| Concept A | vs | Concept B |
|---|---|---|
| Class | vs | Object |
| Overloading | vs | Overriding |
| Abstract class | vs | Interface |
| == | vs | .equals() |
| Composition | vs | Aggregation |
| Stack | vs | Heap |
| String | vs | StringBuilder |
| Encapsulation | vs | Abstraction |
| Compile-time | vs | Runtime polymorphism |
| Upcasting | vs | Downcasting |
| final | vs | finally |
| Hashtable | vs | HashMap |
| Checked | vs | Unchecked exception |

---

## 🎯 KEY JAVA KEYWORDS (must know)

`class`, `object` (implicit), `extends`, `implements`, `abstract`, `interface`, `public`, `private`, `protected`, `static`, `final`, `this`, `super`, `new`, `instanceof`, `try`, `catch`, `finally`, `throw`, `throws`, `return`, `void`, `null`, `true`, `false`, `package`, `import`

---

## 🎯 KEY SYNTAX PATTERNS

```java
// Class
class A { }

// Inheritance
class B extends A { }

// Interface
interface I { void m(); }
class C implements I { public void m() {} }

// Abstract
abstract class A { abstract void m(); }

// Constructor
A() { }

// this/super
this.x = x;
super.m();

// Static
static int x;

// Final
final int X = 10;
```

---

## 🎯 IMPORTANT RULES (top 20)

1. Abstract class cannot be instantiated.
2. Interface cannot have constructors.
3. Static methods cannot be overridden (only hidden).
4. Private methods cannot be overridden.
5. Final methods cannot be overridden.
6. Constructors cannot be inherited.
7. Constructors cannot be overridden.
8. Return type alone cannot overload a method.
9. Reference type decides which static method runs.
10. Reference type decides which variable is accessed.
11. Overridden method cannot have more restrictive access.
12. Overridden method cannot throw broader checked exceptions.
13. `this()` and `super()` must be first statement.
14. Parent constructor runs before child constructor.
15. Interface variables are public static final.
16. Interface methods are public abstract (pre-Java 8).
17. Strings are immutable.
18. `==` compares references; `.equals()` compares content.
19. Equal objects must have equal hash codes.
20. `finally` runs even after return.

---

## 🎯 COMMON TRAPS (top 10)

1. Calling overridden method from parent constructor → child version runs.
2. Variable hiding — reference type decides, not actual object.
3. Static method "overriding" is actually hiding.
4. String `==` works only with literals (pool).
5. Integer cache: -128 to 127 are cached.
6. `Math.round(1.5)` = 2 (banker's rounding in some cases).
7. `new String("x") != "x"` (new object, not pool).
8. `Integer.parseInt(null)` → NumberFormatException.
9. `Arrays.asList(...)` returns fixed-size list.
10. `null instanceof X` → false (no NPE).

---

## 🎯 TOP INTERVIEW QUESTIONS (memorize answers)

1. What is OOP?
2. Four pillars of OOP?
3. Difference between overloading and overriding?
4. Abstract class vs interface?
5. Why no multiple inheritance?
6. What is polymorphism?
7. Encapsulation benefits?
8. String is immutable why?
9. == vs equals?
10. Why override hashCode with equals?

---

## 🎯 TOP CODE PATTERNS (memorize)

```java
// Singleton
class S { private static final S I = new S(); private S(){} public static S get(){return I;} }

// Immutable
public final class X { private final int v; public X(int v){this.v=v;} public int getV(){return v;} }

// Builder
new X.Builder(a).b(b).c(c).build();

// equals + hashCode
@Override public boolean equals(Object o) { /* ... */ }
@Override public int hashCode() { return Objects.hash(a, b); }

// try-with-resources
try (BufferedReader br = new BufferedReader(new FileReader("f"))) { }
```

---
---

# PART 17 — INTERVIEW ANSWERING TECHNIQUE (20 Most-Asked Questions)

For each: ❌ Bad / ✅ Good / 🌟 Excellent answer.

---

## Q1. What is OOP?

**❌ Bad:** "OOP is a way of programming using objects."

**✅ Good:** "OOP is a paradigm based on objects that combine data and methods. The four pillars are encapsulation, inheritance, polymorphism, and abstraction."

**🌟 Excellent:** "OOP is a programming paradigm that models software as a collection of objects, each bundling state and behavior. Its four pillars — encapsulation, abstraction, inheritance, and polymorphism — together enable modular, reusable, and maintainable code. For example, in a banking system, a `SavingsAccount` class encapsulates balance, inherits from `Account`, abstracts the interest-calculation contract, and allows polymorphic treatment through the parent type."

---

## Q2. What is the difference between a class and an object?

**❌ Bad:** "Class is a class and object is an object."

**✅ Good:** "A class is a blueprint; an object is an instance of that blueprint occupying memory."

**🌟 Excellent:** "A class is a logical template defining fields and methods, but consumes no per-instance memory. An object is a concrete instance allocated in heap, with its own copy of instance variables. For example, `Student` is a class; `new Student("Aman")` is an object. We can create many objects from one class, each with independent state."

---

## Q3. What is polymorphism?

**❌ Bad:** "It means many forms."

**✅ Good:** "Polymorphism lets one interface represent different underlying forms — overloading at compile time, overriding at runtime."

**🌟 Excellent:** "Polymorphism allows a single name to invoke different behavior based on context. In Java, compile-time polymorphism is achieved through method overloading resolved by the compiler, while runtime polymorphism is achieved through method overriding, where the JVM uses dynamic dispatch to call the actual object's method. For example, `Animal a = new Dog(); a.sound();` calls `Dog`'s `sound()` at runtime, even though the reference is `Animal`."

---

## Q4. What is encapsulation? Why is it important?

**❌ Bad:** "Wrapping data in a class."

**✅ Good:** "Encapsulation hides data with private fields and exposes controlled access via getters/setters. It protects object state and decouples internals from callers."

**🌟 Excellent:** "Encapsulation is bundling data and the methods that operate on it within a class, and restricting direct external access through access modifiers. It protects invariants — for example, a bank account's balance cannot be set to -1000 directly; it must go through `deposit()` and `withdraw()`. It also enables changing internals without breaking callers, achieving loose coupling and maintainability."

---

## Q5. What is the difference between method overloading and overriding?

**❌ Bad:** "Both have the same name."

**✅ Good:** "Overloading is in the same class with different parameters; overriding is between parent and child with the same signature."

**🌟 Excellent:**
| Aspect | Overloading | Overriding |
|---|---|---|
| Where | Same class | Parent-child |
| Signature | Different params | Same params |
| Binding | Compile time | Runtime |
| Polymorphism | Static | Dynamic |
| Return type | Can differ | Same or covariant |

"For example, `add(int, int)` and `add(double, double)` are overloads; `Animal.sound()` overridden by `Dog.sound()` is polymorphism in action."

---

## Q6. What is the difference between abstract class and interface?

**❌ Bad:** "Both are abstract."

**✅ Good:** "Abstract class can have both abstract and concrete methods with any state; interface traditionally has only abstract methods (Java 8+ allows default)."

**🌟 Excellent:** "An abstract class represents an IS-A relationship with shared code and state — for example, `abstract class Animal` with a concrete `sleep()` method. An interface represents a CAN-DO capability contract — for example, `interface Swimmable`. Abstract classes support constructors, instance fields, and any access modifier; interfaces support multiple inheritance and (since Java 8) default and static methods. Choose abstract class for shared implementation; choose interface for pure contracts or to mix capabilities."

---

## Q7. Why doesn't Java support multiple inheritance with classes?

**❌ Bad:** "Java doesn't allow it."

**✅ Good:** "To avoid the diamond problem — ambiguity when two parents have the same method."

**🌟 Excellent:** "Java avoids the diamond problem: if class D inherits from B and C, both inheriting from A with a method `m()`, D would not know which version to use. To prevent this ambiguity, Java allows only single inheritance with classes but supports multiple inheritance through interfaces, where conflicts in default methods are resolved by explicit rules — class wins over interface, and the more specific interface wins."

---

## Q8. What is the difference between == and .equals()?

**❌ Bad:** "Both compare things."

**✅ Good:** "`==` compares references; `.equals()` compares content if overridden."

**🌟 Excellent:** "`==` compares memory addresses (references) for objects, and values for primitives. `.equals()` is a method that, when overridden (as in `String`, `Integer`, `Date`), compares logical content. For example, `new String("a") == new String("a")` is `false` (different objects), but `new String("a").equals(new String("a"))` is `true` (same content). The `String` class overrides `equals()` to compare character sequences."

---

## Q9. Why is String immutable in Java?

**❌ Bad:** "It is what it is."

**✅ Good:** "For security, string pool, thread safety, and hashCode caching."

**🌟 Excellent:** "String immutability is critical for four reasons. First, security: Strings are used in class loading, file paths, URLs, and database connections — mutability would be a security risk. Second, the String pool relies on immutability to safely reuse literals. Third, immutable strings are inherently thread-safe. Fourth, the hashCode can be cached on first call, making Strings excellent keys in HashMap. Additionally, all String fields are `private final`, and the class itself is `final`."

---

## Q10. Why must we override hashCode when overriding equals?

**❌ Bad:** "Because Java says so."

**✅ Good:** "Because of the contract — equal objects must have equal hashCodes."

**🌟 Excellent:** "The contract between equals and hashCode states that if two objects are equal according to `equals()`, they must return the same `hashCode()`. Hash-based collections (HashMap, HashSet) first use hashCode to locate a bucket, then use equals to confirm. If you override only equals, the hashCode will differ, and the object will never be found in the bucket — your HashMap lookups will silently fail. Use `Objects.hash(field1, field2)` or generate with your IDE, and always override both or neither."

---

## Q11. What is the difference between composition and aggregation?

**❌ Bad:** "Both are HAS-A."

**✅ Good:** "Composition is strong HAS-A (part dies with whole); aggregation is weak HAS-A (part can exist independently)."

**🌟 Excellent:** "Composition represents a strong HAS-A relationship where the part's lifecycle depends on the whole — a `Car` owns its `Engine`; if the car is destroyed, the engine goes with it. Aggregation represents a weak HAS-A where parts can exist independently — a `Department` has `Employees`, but if the department closes, employees still exist and can join another department. In code: composition usually has the part as `private final`, created in the constructor; aggregation holds a reference but doesn't own it."

---

## Q12. What is a constructor? Can it be inherited?

**❌ Bad:** "Yes, constructors are inherited."

**✅ Good:** "No, constructors are not inherited. They can be overloaded but not overridden."

**🌟 Excellent:** "A constructor is a special method with the same name as the class, no return type, called by `new` to initialize the object. Constructors are not members of a class in the inheritance sense — they are not inherited, but a child's constructor calls the parent's via implicit or explicit `super()`. They can be overloaded (multiple signatures) but cannot be overridden. If a parent has only a parameterized constructor, the child must explicitly call `super(args)`."

---

## Q13. What is the difference between stack and heap memory?

**❌ Bad:** "Stack and heap are memory areas."

**✅ Good:** "Stack stores local variables and method calls; heap stores objects."

**🌟 Excellent:** "The stack is per-thread, LIFO-ordered, and stores method frames, local variables, and references. It is fast but small. The heap is shared across threads, stores objects and instance variables, and is larger but slower. Stack memory is reclaimed when methods return; heap memory is reclaimed by garbage collection. Primitive local variables live on the stack; objects always live in the heap. References on the stack point to objects in the heap."

---

## Q14. What are the SOLID principles?

**❌ Bad:** "Some design principles."

**✅ Good:** "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion."

**🌟 Excellent:** "SOLID is a set of five design principles for maintainable OOP code:
- **S**ingle Responsibility: a class should have one reason to change.
- **O**pen/Closed: open for extension, closed for modification.
- **L**iskov Substitution: subclasses must be substitutable for their parents.
- **I**nterface Segregation: prefer many small interfaces over one fat one.
- **D**ependency Inversion: depend on abstractions, not on concrete classes.

For example, applying SRP, a `UserService` should not also send emails — split into `UserService` and `EmailService`."

---

## Q15. What is the Singleton pattern?

**❌ Bad:** "A class with one instance."

**✅ Good:** "Singleton ensures a class has only one instance and provides a global point of access."

**🌟 Excellent:** "Singleton is a creational design pattern that restricts a class to a single instance. The standard implementation uses a `private static final` instance, a `private` constructor to prevent external instantiation, and a `public static` getter. It's used for things that must have a single source of truth — loggers, configuration managers, database connection pools, the Java `Runtime` class. Modern Java best practice uses an `enum` to defend against reflection and serialization-based attacks."

---

## Q16. What is the difference between an abstract class and a regular class?

**❌ Bad:** "Abstract is more complex."

**✅ Good:** "An abstract class cannot be instantiated and may have abstract (unimplemented) methods."

**🌟 Excellent:** "A regular class is complete and can be instantiated. An abstract class is incomplete — declared with the `abstract` keyword, may declare abstract methods (signatures only, no body), and cannot be instantiated directly. Subclasses must implement all abstract methods or be declared abstract themselves. Abstract classes can still have constructors, instance fields, concrete methods, and static members. They are used to capture shared code and contract among related classes."

---

## Q17. What is the difference between compile-time and runtime polymorphism?

**❌ Bad:** "One is at compile, one at runtime."

**✅ Good:** "Compile-time = overloading (resolved by compiler). Runtime = overriding (resolved by JVM at runtime)."

**🌟 Excellent:** "Compile-time polymorphism (static binding) is resolved by the compiler based on the method signature — used for method overloading, where the same name has multiple parameter lists. Runtime polymorphism (dynamic binding) is resolved by the JVM at runtime based on the actual object type — used for method overriding, where the JVM looks up the method in the object's class. Dynamic binding enables the powerful substitution principle: a parent reference can invoke child-specific behavior."

---

## Q18. What is the difference between an interface and an abstract class in Java 8+?

**❌ Bad:** "Same thing now."

**✅ Good:** "Interfaces can have default and static methods now, but still no constructors or instance fields."

**🌟 Excellent:** "Since Java 8, interfaces can have `default` methods (with body), `static` methods, and (since Java 9) `private` helper methods. This blurs the line with abstract classes. However, key differences remain: interfaces still cannot have constructors or non-final instance fields; their variables are implicitly `public static final`. Abstract classes can have any access modifier, instance fields, and constructors. Use interfaces for pure contracts and multiple capabilities; use abstract classes for shared code and state."

---

## Q19. What is the `final` keyword? Can a final variable be changed?

**❌ Bad:** "Final means final."

**✅ Good:** "Final means non-modifiable. A final variable cannot be reassigned, but its referenced object can change."

**🌟 Excellent:** "The `final` keyword has three uses: final variables cannot be reassigned after initialization; final methods cannot be overridden; final classes cannot be extended. A common confusion: a `final` reference variable cannot point to a new object, but the object itself can still be mutated. For example, `final List<String> list = new ArrayList<>(); list.add("A");` is fine, but `list = new ArrayList<>();` would not compile. For true immutability, the class itself must be `final` and all fields `private final`."

---

## Q20. Why is `main()` declared `public static void`?

**❌ Bad:** "Because Java needs it."

**✅ Good:** "Public so JVM can access it; static so it can be called without an object; void because it returns nothing."

**🌟 Excellent:** "The `main` method must be `public` so the JVM (outside our code) can call it; `static` so it can be invoked without creating an instance of the class (the JVM may not know how to instantiate it before main runs); `void` because the JVM doesn't read any return value. The parameter `String[] args` holds command-line arguments. We can overload `main` with different signatures, but the JVM specifically looks for `public static void main(String[] args)`."

---
---

# 📍 PROGRESS CHECKPOINT 6

**Completed so far:**
- ✅ Parts 1–17 (entire study material)

**Final remaining:**
- PART 18 — Mock Interview (interactive, I'll start when you say "start interview")
- FINAL — Top 30 Must-Study OOP Concepts

**Next message will contain PART 18 and the FINAL Top 30 list.**

Reply "next" to continue.
