---
title: Polymorphism
subject: OOP
category: Java
difficulty: medium
importance: high
tags:
  - oop
  - java
  - polymorphism
  - method overriding
  - method overloading
---

# Polymorphism in Object-Oriented Programming

Polymorphism is derived from the Greek words **Poly** (many) and **Morph** (forms). In OOP, polymorphism allows an entity such as a variable, function, or object to have more than one form.

---

## 1. Types of Polymorphism

In Java and modern OOP languages, polymorphism is classified into two distinct types:

1. **Compile-Time Polymorphism** (Static Binding / Early Binding)
2. **Runtime Polymorphism** (Dynamic Binding / Late Binding)

```
                 Polymorphism
                /            \
    Compile-Time              Runtime
    (Static Binding)          (Dynamic Binding)
          |                          |
   Method Overloading         Method Overriding
```

---

## 2. Compile-Time Polymorphism (Method Overloading)

Method overloading allows a class to have more than one method having the same name, if their argument lists are different.

### Rules for Method Overloading:
- Number of parameters can differ.
- Data types of parameters can differ.
- Sequence/order of parameters can differ.
- **Note:** Return type alone cannot be used to overload a method.

### Java Example:
```java
public class Calculator {
    // Overloaded method: 2 integers
    public int add(int a, int b) {
        return a + b;
    }

    // Overloaded method: 3 integers
    public int add(int a, int b, int c) {
        return a + b + c;
    }

    // Overloaded method: 2 doubles
    public double add(double a, double b) {
        return a + b;
    }
}
```

---

## 3. Runtime Polymorphism (Method Overriding)

Runtime polymorphism is a process in which a call to an overridden method is resolved at runtime rather than compile-time. This is accomplished via **Dynamic Method Dispatch**.

### Rules for Method Overriding:
- Method name must be identical to parent class.
- Parameter arguments must match parent class.
- Return type must be the same or covariant (sub-type).
- Access modifier cannot be more restrictive than the parent method.
- `private`, `static`, and `final` methods cannot be overridden.

### Java Example:
```java
class Payment {
    public void processPayment(double amount) {
        System.out.println("Processing general payment of $" + amount);
    }
}

class CreditCardPayment extends Payment {
    @Override
    public void processPayment(double amount) {
        System.out.println("Charging credit card: $" + amount + " with 2% processing fee");
    }
}

class UpiPayment extends Payment {
    @Override
    public void processPayment(double amount) {
        System.out.println("Instant UPI transfer of $" + amount);
    }
}

public class Main {
    public static void main(String[] args) {
        // Upcasting: Superclass reference, Subclass object
        Payment payment = new CreditCardPayment();
        payment.processPayment(150.0); // Dispatches to CreditCardPayment at runtime

        payment = new UpiPayment();
        payment.processPayment(200.0); // Dispatches to UpiPayment at runtime
    }
}
```

---

## 4. Key Differences Summary

| Feature | Method Overloading | Method Overriding |
| :--- | :--- | :--- |
| **Binding Time** | Compile-Time (Static) | Runtime (Dynamic) |
| **Location** | Within the same class | Between Parent and Child classes |
| **Method Signature** | Must be different | Must be identical |
| **Return Type** | Can be different | Must be same or covariant |
| **Private/Final Methods** | Can be overloaded | Cannot be overridden |

---

## 5. Tricky Interview Questions

### Q1: Can we overload the main() method in Java?
**Yes.** You can have multiple `main()` methods with different parameter signatures, but the JVM will only execute the standard signature `public static void main(String[] args)`.

### Q2: Why can't static methods be overridden?
Static methods are bound to the Class at compile-time, not to any object instance in heap memory. Defining a static method with the same signature in a child class is called **Method Hiding**, not overriding.
