# PART 18 — MOCK INTERVIEW SCRIPT

This part is **interactive** — paste this into your Notion and practice with a friend, OR read the questions out loud and answer them yourself as if in a real interview. The structure mimics a real MNC technical interview (40–60 minutes).

---

## Interview Format

- **Rounds:** 5 conceptual + 3 coding/output + 2 scenario + 2–3 follow-ups
- **Difficulty progression:** basic → intermediate → tricky
- **For each question, you should:** answer in 1–3 minutes, give a definition + example + edge case.

---

## ROUND 1 — Conceptual Basics (Warm-up)

---

### Q1. What is OOP and why do we use it?

**Wait for answer.**

**Score guide (out of 10):**
- 0–3: Vague answer, no pillars mentioned
- 4–6: Mentions objects, some pillars
- 7–8: All 4 pillars + clear advantage
- 9–10: Adds real-world example + comparison to procedural

**Ideal answer (for self-comparison):**
"OOP is a paradigm where we model software as objects that combine data and behavior. It has four pillars — encapsulation, abstraction, inheritance, polymorphism. We use it because it gives us modularity, reusability, and maintainability. For example, a banking system can be modeled with classes like `Account`, `Customer`, `Transaction` that mirror the real world. Compared to procedural programming, OOP keeps data and behavior together, making large codebases easier to manage."

---

### Q2. What is the difference between a class and an object?

**Wait for answer.**

**Score guide:**
- 0–3: "Class is a class..."
- 4–6: Mentions blueprint/instance
- 7–8: Adds memory/heap mention
- 9–10: Example + multiple objects from one class

**Ideal:** "Class is a blueprint — defines structure and behavior. Object is an instance — actual data in heap. You can create many objects from one class. Each object has its own state."

---

### Q3. Explain the four pillars of OOP.

**Wait for answer.**

**Score guide:**
- 0–3: Lists 1–2
- 4–6: Lists all 4 but vague
- 7–8: Each with one-line meaning
- 9–10: Each with example + benefit

**Ideal:** "Encapsulation hides data and exposes controlled access. Inheritance allows code reuse via IS-A. Polymorphism lets one interface have many implementations. Abstraction hides complexity, shows essentials."

---

## ROUND 2 — Intermediate Concepts

---

### Q4. What is the difference between method overloading and method overriding?

**Wait for answer.**

**Score guide:**
- 0–3: "Same name"
- 4–6: Mentions parameters/classes
- 7–8: Compile vs runtime
- 9–10: Full table (binding, signature, return, access, exceptions)

**Ideal:** "Overloading is in same class, different parameter lists, resolved at compile time. Overriding is in parent-child, same signature, resolved at runtime. Overriding enables polymorphism."

---

### Q5. Abstract class vs interface — when to use which?

**Wait for answer.**

**Score guide:**
- 0–3: "Both abstract"
- 4–6: Tables differences
- 7–8: Adds "when" criteria
- 9–10: Concrete scenario for each

**Ideal:** "Abstract class for shared code + state (IS-A, e.g., `Animal`). Interface for pure contract / multiple capabilities (CAN-DO, e.g., `Swimmable`). Choose interface for unrelated classes needing same behavior; abstract class for closely related hierarchy."

---

### Q6. Why doesn't Java support multiple inheritance with classes?

**Wait for answer.**

**Score guide:**
- 0–3: Vague
- 4–6: Mentions diamond
- 7–8: Explains diamond clearly
- 9–10: Adds how Java resolves it (interfaces + rules)

**Ideal:** "Diamond problem — if D extends B and C, both extending A, and A has a method, D is confused about which version. Java avoids this by allowing multiple inheritance only via interfaces, where default method conflicts are resolved by rules: class wins over interface, more specific interface wins."

---

### Q7. What is the difference between == and .equals()?

**Wait for answer.**

**Score guide:**
- 0–3: "Both compare"
- 4–6: Reference vs content
- 7–8: Mentions String override
- 9–10: hashCode contract + String pool

**Ideal:** "`==` compares references (or values for primitives). `.equals()` compares content if overridden. For String, `new String("a") == new String("a")` is false, but `.equals()` is true. Default `.equals()` from Object behaves like `==`."

---

## ROUND 3 — Output-Based / Code Reading

---

### Q8. What is the output?
```java
class A { A() { show(); } void show() { System.out.println("A"); } }
class B extends A { void show() { System.out.println("B"); } }
public class Test { public static void main(String[] args) { new B(); } }
```

**Wait for answer.**

**Score guide:**
- 0–3: Says "A"
- 4–6: Says "B" without explanation
- 7–8: Says "B" with reasoning (dynamic dispatch)
- 9–10: Mentions it can cause issues (calling overridable methods from constructor is bad practice)

**Ideal:** "B. Even though A's constructor is executing, dynamic method dispatch calls B's overridden `show()`. This is a classic trap — calling overridable methods from constructors is dangerous because the subclass fields aren't yet initialized."

---

### Q9. What is the output?
```java
class A { int x = 10; }
class B extends A { int x = 20; }
public class Test { public static void main(String[] args) {
    A a = new B();
    System.out.println(a.x);
}}
```

**Wait for answer.**

**Score guide:**
- 0–3: Says "20"
- 4–6: Says "10" but no reason
- 7–8: Says "10" with reason (variables are not polymorphic)
- 9–10: Adds the rule — fields are resolved at compile time, not runtime

**Ideal:** "10. Variables are not polymorphic — they are resolved at compile time based on reference type, not the actual object. Only methods participate in runtime polymorphism."

---

### Q10. Can we override a static method?

**Wait for answer.**

**Score guide:**
- 0–3: "Yes"
- 4–6: "No"
- 7–8: "No — only hidden"
- 9–10: Example + code

**Ideal:** "No, static methods cannot be overridden — they are hidden. If subclass defines a static method with the same signature, the parent's is hidden, not overridden. The reference type decides which one is called. This is also why static methods participate in static (compile-time) binding, not dynamic dispatch."

---

## ROUND 4 — Tricky / Follow-up

---

### Q11. (Follow-up to Q10) What will this print?
```java
class A { static void m() { System.out.println("A"); } }
class B extends A { static void m() { System.out.println("B"); } }
public class Test { public static void main(String[] args) {
    A a = new B();
    a.m();
}}
```

**Wait for answer.**

**Score guide:**
- 0–3: Says "B"
- 4–6: Says "A" without reason
- 7–8: Says "A" with reason
- 9–10: Mentions compiler behavior + casting doesn't help

**Ideal:** "A. Static methods are bound at compile time. Reference type A decides, even though actual object is B. Even a downcast `((B) a).m()` would still print 'A'."

---

### Q12. What is the diamond problem and how does Java handle it in interfaces?

**Wait for answer.**

**Score guide:**
- 0–3: Vague
- 4–6: Mentions ambiguity
- 7–8: Explains with diagram
- 9–10: Mentions resolution rules

**Ideal:** "When a class inherits from two parents that both have a method with the same signature, it's ambiguous which one to use. Java avoids it for classes (no multiple inheritance) and resolves it for interfaces with these rules: (1) class implementation wins over interface default; (2) more specific interface wins; (3) if unresolved, class must override explicitly using `InterfaceName.super.method()`."

---

### Q13. What happens if you only override equals but not hashCode?

**Wait for answer.**

**Score guide:**
- 0–3: "Nothing"
- 4–6: "Equals doesn't work"
- 7–8: Mentions HashMap/HashSet
- 9–10: Explains bucket lookup mechanism

**Ideal:** "Hash-based collections break. HashMap/HashSet use hashCode to find a bucket, then equals to confirm. Different hashCodes mean the object won't be found, even if equals returns true. This is a contract violation."

---

## ROUND 5 — Scenario-Based

---

### Q14. Design a payment system using OOP. Walk me through the classes.

**Wait for answer.**

**Score guide:**
- 0–3: "Use a class"
- 4–6: Mentions 1–2 classes
- 7–8: Mentions interface + polymorphism
- 9–10: Identifies Strategy pattern, lists all classes + relationships

**Ideal:** "Use a `Payment` interface with `pay()` method. Implementations: `CardPayment`, `UPIPayment`, `WalletPayment`. A `Cart` or `Order` has a `Payment` reference (composition). At runtime, set the strategy: `cart.setPayment(new UPIPayment()); cart.checkout();`. This uses polymorphism + Strategy pattern, easy to extend (OCP)."

---

### Q15. How would you design a notification system that can send Email, SMS, and Push notifications?

**Wait for answer.**

**Score guide:**
- 0–3: Just one class
- 4–6: Switch/if-else
- 7–8: Interface + implementations
- 9–10: Adds Observer pattern for fan-out

**Ideal:** "Use `Notification` interface with `send()` method. Implementations: `EmailNotification`, `SMSNotification`, `PushNotification`. A `NotificationService` holds a list of subscribers and broadcasts. This is the Observer pattern + Strategy. Each new channel is a new class, no modification of existing code (OCP)."

---

## ROUND 6 — Design Principles (RAPID FIRE)

---

### Q16. What is the Liskov Substitution Principle?

**Wait for answer.**

**Ideal:** "Subclasses must be substitutable for their parents without breaking behavior. If your code works with `Bird`, it must work with any subclass like `Sparrow`. A classic violation is `Square extends Rectangle` — square's invariants break rectangle's behavior."

---

### Q17. What is Dependency Inversion?

**Wait for answer.**

**Ideal:** "High-level modules should not depend on low-level modules. Both should depend on abstractions. So a `Switch` class should depend on a `Switchable` interface, not on a concrete `Bulb` class. This enables easy swapping and mocking."

---

### Q18. Why is the Single Responsibility Principle important?

**Wait for answer.**

**Ideal:** "Each class should have one reason to change. If a class does many things (e.g., user data, email sending, report generation), changes in one area break others. SRP makes classes focused, testable, and reusable."

---

## CLOSING

---

### Q19. Do you have any questions for me?

**Always have 2–3 questions ready:**
- "What does a typical day look like for this role?"
- "What's the team structure / codebase like?"
- "How do you measure success in the first 6 months?"
- "What technologies are you using?"

**What NOT to ask:** salary (HR phase), vacation, "do you hire freshers" (they know).

---

## MOCK INTERVIEW SCORING SUMMARY

After completing all questions, calculate your average score.

| Avg score | Verdict |
|---|---|
| 0–4 | Need significant prep. Focus on Parts 1–4. |
| 5–6 | Solid foundation. Polish tricky areas. |
| 7–8 | Interview-ready for most service companies. |
| 9–10 | Strong candidate for top MNCs. |

---
---

# 🏆 FINAL — TOP 30 MUST-STUDY OOP CONCEPTS

These 30 are the highest-yield topics for service-based + MNC interviews. If you know these deeply, you will answer ~90% of OOP questions.

---

1. **Class vs Object** — blueprint vs instance, heap memory.
2. **Four pillars of OOP** — encapsulation, inheritance, polymorphism, abstraction.
3. **Encapsulation + access modifiers** — private, default, protected, public; getter/setter pattern.
4. **Inheritance basics** — `extends`, IS-A, types (single, multilevel, hierarchical).
5. **Why no multiple inheritance with classes** — diamond problem; interface solution.
6. **Method overloading** — compile-time polymorphism, parameter rules, return type alone invalid.
7. **Method overriding** — runtime polymorphism, dynamic dispatch, rules.
8. **Overloading vs Overriding** — full table comparison.
9. **Abstract class** — abstract methods, concrete methods, constructors, can have state.
10. **Interface** — methods (default, static, private since Java 9), variables (public static final).
11. **Abstract class vs Interface** — when to use which.
12. **`this` keyword** — current object, this(), instance vs parameter disambiguation.
13. **`super` keyword** — parent reference, super(), field access, method call.
14. **Constructor** — types, chaining (this, super), rules (no return type, not inherited).
15. **Static keyword** — variable, method, block; class-level shared state.
16. **Final keyword** — variable, method, class; final vs finally vs finalize.
17. **Upcasting and Downcasting** — implicit vs explicit, instanceof.
18. **== vs .equals()** — reference vs content.
19. **String immutability** — why, benefits, String pool.
20. **equals and hashCode contract** — why override both, HashMap/HashSet impact.
21. **Stack vs Heap memory** — what goes where.
22. **Garbage collection** — when eligible, finalize deprecated.
23. **Object class methods** — toString, equals, hashCode, getClass, clone.
24. **Composition vs Aggregation vs Association** — HAS-A flavors.
25. **SOLID principles** — all 5 with one-line meaning.
26. **Singleton pattern** — implementation, use cases.
27. **Factory, Builder, Observer, Strategy patterns** — basic knowledge.
28. **Dynamic method dispatch** — runtime polymorphism mechanism.
29. **Common traps** — static hiding, variable hiding, constructor calling overridable method, String pool.
30. **Code reading** — be able to predict output of inheritance / polymorphism / constructor / static / final snippets.

---

# 📚 HOW TO USE THIS MATERIAL

1. **First read:** Parts 1–5 in order. Take notes.
2. **Practice:** Parts 11 (output), 12 (MCQs), 14 (coding).
3. **Drill:** Part 10 (tricky), Part 13 (scenarios).
4. **Final day:** Part 16 (revision sheet) + Part 17 (answering technique).
5. **Mock:** Part 18 with a friend.

---

# 🎓 YOU ARE READY

You now have a complete OOP interview study material covering:
- 18 detailed parts
- 100 MCQs
- 100+ interview questions
- 50+ tricky questions
- 30+ output questions
- 30+ scenario questions
- 30 coding problems
- Top 30 must-study list
- One-day revision sheet
- Answering technique with bad/good/excellent examples
- Full mock interview script

**Good luck with your interviews! 🚀**

---

## 📂 FILE INDEX

The material is split into these files in `/root/study-materials/`:

1. `OOP-Interview-Study-Material.md` — Parts 1–3
2. `OOP-Part-4-to-9.md` — Parts 4–9
3. `OOP-Part-10-and-11.md` — Parts 10–11
4. `OOP-Part-12-MCQs.md` — Part 12
5. `OOP-Part-13-and-14.md` — Parts 13–14
6. `OOP-Part-15-16-17.md` — Parts 15–17
7. `OOP-Part-18-and-Final.md` — Part 18 + Final (this file)

To combine into one Notion page: copy each file's content in order into a single Notion page.
