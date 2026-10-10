# PART 13 — 30+ SCENARIO-BASED OOP INTERVIEW QUESTIONS

For each scenario: identify classes, objects, relationships, OOP principles used. Suitable for fresher/junior interviews.

---

### S1. Design a Banking System

### Classes
- `Bank`, `Account` (abstract or base), `SavingsAccount`, `CurrentAccount`, `Customer`, `Transaction`

### Relationships
- Bank HAS-A Customer (aggregation — customers exist without bank)
- Customer HAS-A Account (composition — if customer removed, accounts may close)
- Account IS-A Savings/Current (inheritance)
- Account HAS-A Transaction (composition)

### OOP Concepts
- **Encapsulation**: balance is private; access via deposit/withdraw
- **Inheritance**: SavingsAccount, CurrentAccount extend Account
- **Polymorphism**: different `calculateInterest()` for each account type
- **Abstraction**: Account can be abstract with `calculateInterest()` contract

### Skeleton
```java
abstract class Account {
    private String accNo;
    private double balance;
    private Customer customer;

    public void deposit(double amt) { balance += amt; }
    public abstract double calculateInterest();
}

class SavingsAccount extends Account {
    public double calculateInterest() { return getBalance() * 0.04; }
}

class CurrentAccount extends Account {
    public double calculateInterest() { return getBalance() * 0.02; }
}
```

### Why this design?
Reflects real-world structure. Easy to add new account types without changing core code (OCP). Interest logic varies by type (polymorphism).

---

### S2. Design a Library Management System

### Classes
- `Library`, `Book`, `Magazine` (extends Book or separate), `Member`, `Librarian`, `Loan`

### Relationships
- Library HAS-A Book (aggregation)
- Library HAS-A Member
- Member HAS-A Loan (composition — loan exists for the duration)

### OOP Concepts
- Inheritance: Book → EBook, PrintedBook
- Polymorphism: `getReadingFormat()` differs
- Encapsulation: book availability hidden

### Skeleton
```java
abstract class Book {
    private String title;
    private String author;
    private boolean available = true;
    public abstract String getType();
}
class EBook extends Book {
    public String getType() { return "E-Book"; }
}
class PrintedBook extends Book {
    public String getType() { return "Printed"; }
}
```

---

### S3. Design an Employee Management System

### Classes
- `Employee` (abstract), `Manager`, `Engineer`, `Intern`, `Department`, `Payroll`

### Relationships
- Department HAS-A Employee (aggregation)
- Manager IS-A Employee (inheritance)
- Employee HAS-A Payroll (composition)

### OOP Concepts
- Abstraction: `calculateBonus()` is abstract
- Polymorphism: each role has different bonus
- Encapsulation: salary is private

---

### S4. Design a Vehicle Management System

### Classes
- `Vehicle` (abstract), `Car`, `Bike`, `Truck`, `Engine`

### Relationships
- Car HAS-A Engine (composition)
- Car IS-A Vehicle

### OOP Concepts
- Inheritance: Car, Bike, Truck
- Polymorphism: `startEngine()` differs
- Composition: each car has its own engine

```java
abstract class Vehicle {
    abstract void startEngine();
}
class Car extends Vehicle {
    private Engine engine;  // composition
    public void startEngine() { engine.start(); }
}
```

---

### S5. Design a Food Delivery System

### Classes
- `User` (abstract or base), `Customer`, `DeliveryPartner`, `Restaurant`, `Order`, `FoodItem`, `Payment`

### Relationships
- Customer HAS-A Order
- Restaurant HAS-A FoodItem
- Order HAS-A Payment (composition)
- Order references Restaurant and DeliveryPartner

### OOP Concepts
- Inheritance: User → Customer, DeliveryPartner
- Polymorphism: each user has different `displayInfo()`
- Encapsulation: order state protected

---

### S6. Design a Notification System

### Classes
- `Notification` (abstract), `EmailNotification`, `SMSNotification`, `PushNotification`, `User`

### Relationships
- User HAS-A Notification (composition)

### OOP Concepts
- Abstraction: `send()` is abstract
- Polymorphism: each notification sends differently
- **Strategy pattern**: send behavior varies at runtime

```java
abstract class Notification {
    abstract void send(String msg);
}
class EmailNotification extends Notification {
    public void send(String msg) { /* send email */ }
}
class SMSNotification extends Notification {
    public void send(String msg) { /* send SMS */ }
}
```

---

### S7. Design a Shopping Cart

### Classes
- `Cart`, `CartItem`, `Product`, `Customer`, `Order`

### Relationships
- Cart HAS-A CartItem (composition)
- CartItem HAS-A Product (aggregation)
- Customer HAS-A Cart (composition)

### OOP Concepts
- Encapsulation: cart total computed, not stored
- Composition: cart owns its items
- Polymorphism: `Product` may have subtypes (Book, Electronics)

---

### S8. Design a Payment System

### Classes
- `Payment` (interface), `CardPayment`, `UPIPayment`, `WalletPayment`, `Order`

### Relationships
- Order HAS-A Payment (composition)

### OOP Concepts
- **Interface**: Payment defines contract
- **Strategy pattern**: choose payment method at runtime
- Polymorphism: each payment type processes differently

```java
interface Payment {
    void pay(double amount);
}
class UPIPayment implements Payment {
    public void pay(double amount) { /* UPI logic */ }
}
class CardPayment implements Payment {
    public void pay(double amount) { /* Card logic */ }
}
```

---

### S9. Design a Hospital Management System

### Classes
- `Person` (abstract), `Patient`, `Doctor`, `Nurse`, `Hospital`, `Appointment`, `MedicalRecord`

### Relationships
- Hospital HAS-A Doctor, Patient (aggregation)
- Doctor HAS-A Appointment
- Patient HAS-A MedicalRecord (composition)

---

### S10. Design an E-commerce Product Catalog

### Classes
- `Product` (abstract), `ElectronicProduct`, `ClothingProduct`, `GroceryProduct`, `Category`, `Review`

### OOP Concepts
- Inheritance for product types
- Polymorphism: `calculateDiscount()` varies
- Each product has different tax rules

---

### S11. Design a Parking Lot System

### Classes
- `ParkingLot`, `ParkingSpot`, `Vehicle`, `Ticket`, `Payment`

### Relationships
- ParkingLot HAS-A ParkingSpot
- ParkingSpot HAS-A Vehicle (when occupied)
- Vehicle IS-A Car, Bike, Truck (inheritance)

### OOP Concepts
- Polymorphism: `calculateFee()` differs by vehicle
- Encapsulation: spot availability hidden

---

### S12. Design a Social Media Platform

### Classes
- `User`, `Post`, `Comment`, `Like`, `Follow`

### Relationships
- User HAS-A Post (composition)
- Post HAS-A Comment, Like
- User follows User (association)

### OOP Concepts
- Composition: posts belong to user
- Association: followers are not owned
- Encapsulation: profile data private

---

### S13. Design an Online Course Platform

### Classes
- `Course`, `Lesson`, `VideoLesson`, `QuizLesson`, `Student`, `Instructor`, `Enrollment`

### Relationships
- Course HAS-A Lesson (composition)
- Student HAS-A Enrollment
- Course taught-by Instructor (aggregation)

### OOP Concepts
- Inheritance: Lesson → VideoLesson, QuizLesson
- Polymorphism: `getDuration()` differs
- Encapsulation: progress tracking

---

### S14. Design a Movie Ticket Booking System

### Classes
- `Theater`, `Screen`, `Show`, `Movie`, `Seat`, `Booking`, `Customer`

### Relationships
- Theater HAS-A Screen
- Screen HAS-A Seat
- Show references Movie
- Booking references Customer and Show

### OOP Concepts
- Aggregation: seats exist independently
- Composition: bookings own seat reservations
- Encapsulation: seat status protected

---

### S15. Design a Music Streaming Service

### Classes
- `Song`, `Album`, `Artist`, `Playlist`, `User`, `Subscription`

### Relationships
- Album HAS-A Song
- Artist HAS-A Album
- User HAS-A Playlist
- Playlist HAS-A Song (composition)

---

### S16. Design a Ride-Sharing App (like Uber)

### Classes
- `User`, `Driver`, `Ride`, `Vehicle`, `Location`, `Payment`, `Rating`

### Relationships
- Driver HAS-A Vehicle (composition)
- User requests Ride
- Ride HAS-A Driver, User, Payment

### OOP Concepts
- Strategy pattern for pricing
- Polymorphism for vehicle types
- Encapsulation for user/driver data

---

### S17. Design a Hotel Reservation System

### Classes
- `Hotel`, `Room`, `Suite`, `StandardRoom`, `Booking`, `Guest`, `Payment`

### Relationships
- Hotel HAS-A Room
- Room subtypes via inheritance
- Booking HAS-A Room, Guest

---

### S18. Design an Inventory Management System

### Classes
- `Inventory`, `Product`, `StockItem`, `Supplier`, `Order`

### Relationships
- Inventory HAS-A StockItem
- Product supplied-by Supplier
- Order placed-to Supplier

### OOP Concepts
- Encapsulation: stock levels
- Polymorphism: product types
- Composition: orders contain items

---

### S19. Design a Chess Game

### Classes
- `Game`, `Board`, `Piece`, `King`, `Queen`, `Rook`, `Bishop`, `Knight`, `Pawn`, `Player`, `Move`

### Relationships
- Game HAS-A Board
- Board HAS-A Piece
- Piece IS-A King, Queen, etc.
- Game HAS-A Player

### OOP Concepts
- Inheritance: Piece → all piece types
- Polymorphism: `canMove()` differs for each piece
- **Strategy pattern**: AI moves
- **State pattern**: game state (PLAYING, CHECKMATE, STALEMATE)

```java
abstract class Piece {
    abstract boolean canMove(int toX, int toY);
}
class King extends Piece {
    public boolean canMove(int toX, int toY) { /* king logic */ return true; }
}
class Knight extends Piece {
    public boolean canMove(int toX, int toY) { /* knight logic */ return true; }
}
```

---

### S20. Design a File System

### Classes
- `FileSystemNode` (abstract), `File`, `Directory`, `FileSystem`

### Relationships
- Directory HAS-A FileSystemNode (composition)
- FileSystem HAS-A Directory

### OOP Concepts
- Inheritance: File vs Directory
- Polymorphism: `getSize()` differs
- **Composite pattern**: Directory contains Files and other Directories

```java
abstract class FileSystemNode {
    String name;
    abstract long getSize();
    abstract void print(String indent);
}
class File extends FileSystemNode {
    public long getSize() { return 100; }
}
class Directory extends FileSystemNode {
    private List<FileSystemNode> children = new ArrayList<>();
    public long getSize() { return children.stream().mapToLong(FileSystemNode::getSize).sum(); }
}
```

---

### S21. Design a University Course Registration

### Classes
- `Student`, `Course`, `Professor`, `Department`, `Registration`, `Grade`

### Relationships
- Student HAS-A Registration
- Course taught-by Professor
- Department HAS-A Course, Professor

---

### S22. Design a Weather Monitoring System

### Classes
- `WeatherStation`, `Sensor`, `TemperatureSensor`, `HumiditySensor`, `Observer`

### OOP Concepts
- **Observer pattern**: stations notify displays
- Polymorphism: `readValue()` per sensor
- Encapsulation: sensor data

---

### S23. Design a Stock Trading System

### Classes
- `Order`, `BuyOrder`, `SellOrder`, `Stock`, `Trader`, `Portfolio`, `Transaction`

### OOP Concepts
- Inheritance: Order → Buy/Sell
- Polymorphism: `execute()` differs
- Encapsulation: portfolio data

---

### S24. Design a Multi-Player Game Lobby

### Classes
- `Lobby`, `Player`, `Game`, `GameSession`, `ChatMessage`

### OOP Concepts
- Aggregation: Lobby HAS-A Player
- Composition: GameSession HAS-A Player (during game)
- Polymorphism: different game types

---

### S25. Design a Car Rental System

### Classes
- `RentalAgency`, `Car`, `Bike`, `Customer`, `Rental`, `Insurance`

### OOP Concepts
- Inheritance: Vehicle → Car, Bike
- Polymorphism: `calculateRentalCost()` differs
- Composition: Rental owns its period

---

### S26. Design an Email System

### Classes
- `Email`, `Attachment`, `Folder`, `User`, `Inbox`, `Sent`

### OOP Concepts
- Composition: Folder HAS-A Email
- Encapsulation: email content
- Polymorphism: Attachment types

---

### S27. Design a School Management System

### Classes
- `Person` (abstract), `Student`, `Teacher`, `Class`, `Subject`, `Exam`, `Result`

### OOP Concepts
- Inheritance: Person → Student, Teacher
- Polymorphism: roles
- Composition: Class has Students, Subjects

---

### S28. Design a Travel Booking System

### Classes
- `Trip`, `Flight`, `Hotel`, `CarRental`, `Traveler`, `Booking`

### OOP Concepts
- Inheritance: Booking → Flight, Hotel, Car
- Polymorphism: `calculatePrice()` differs
- Composition: Booking has Traveler

---

### S29. Design an IoT Home Automation System

### Classes
- `Device` (abstract), `Light`, `Thermostat`, `Camera`, `Sensor`, `Controller`

### OOP Concepts
- Inheritance: Device types
- Polymorphism: `turnOn()`, `turnOff()`
- **Observer pattern**: devices notify controller

---

### S30. Design a Quiz Application

### Classes
- `Quiz`, `Question`, `MultipleChoiceQuestion`, `TrueFalseQuestion`, `User`, `Score`

### OOP Concepts
- Inheritance: Question types
- Polymorphism: `checkAnswer()` differs
- Encapsulation: score

---

### S31. Design a Logistics/Shipping System

### Classes
- `Shipment`, `Package`, `Container`, `Truck`, `Ship`, `Warehouse`, `Address`

### OOP Concepts
- Composition: Shipment HAS-A Package
- Polymorphism: delivery methods
- Aggregation: Warehouse HAS Shipment

---

# PART 14 — 30 CODING PROBLEMS (Easy / Medium / Hard)

For each: problem statement, approach, OOP concepts, Java solution, explanation, complexity.

---

# 🟢 EASY (10 Problems)

---

### E1. Student Class with Constructor

**Problem:** Create a `Student` class with name and age. Add a method to display details.

**OOP Concepts:** Class, object, constructor, encapsulation

```java
class Student {
    private String name;
    private int age;

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void display() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}
```

**Complexity:** O(1)

---

### E2. Bank Account with Deposit/Withdraw

**Problem:** Create `Account` with private balance. Provide deposit, withdraw, getBalance.

**OOP Concepts:** Encapsulation, validation

```java
class Account {
    private double balance = 0;

    public void deposit(double amt) {
        if (amt > 0) balance += amt;
    }

    public void withdraw(double amt) {
        if (amt > 0 && amt <= balance) balance -= amt;
    }

    public double getBalance() { return balance; }
}
```

---

### E3. Area Calculator using Polymorphism

**Problem:** Create abstract `Shape` with `area()`. Subclasses: `Circle`, `Rectangle`.

**OOP Concepts:** Abstraction, polymorphism, inheritance

```java
abstract class Shape {
    abstract double area();
}
class Circle extends Shape {
    double r;
    Circle(double r) { this.r = r; }
    double area() { return Math.PI * r * r; }
}
class Rectangle extends Shape {
    double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }
    double area() { return w * h; }
}
```

---

### E4. Method Overloading

**Problem:** Create `MathUtil` with overloaded `add` for int, double, three ints.

**OOP Concepts:** Overloading (compile-time polymorphism)

```java
class MathUtil {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
}
```

---

### E5. Inheritance with Animal

**Problem:** `Animal` base with `sound()`. `Dog`, `Cat` override.

**OOP Concepts:** Inheritance, overriding, polymorphism

```java
class Animal {
    void sound() { System.out.println("Animal sound"); }
}
class Dog extends Animal {
    @Override void sound() { System.out.println("Bark"); }
}
class Cat extends Animal {
    @Override void sound() { System.out.println("Meow"); }
}
```

---

### E6. Singleton Pattern

**Problem:** Implement thread-safe Singleton.

**OOP Concepts:** Private constructor, static method, design pattern

```java
class Singleton {
    private static final Singleton INSTANCE = new Singleton();
    private Singleton() {}
    public static Singleton getInstance() { return INSTANCE; }
}
```

---

### E7. Interface Implementation

**Problem:** `Drawable` interface with `draw()`. `Circle`, `Square` implement.

**OOP Concepts:** Interface, polymorphism

```java
interface Drawable {
    void draw();
}
class Circle implements Drawable {
    public void draw() { System.out.println("Drawing Circle"); }
}
class Square implements Drawable {
    public void draw() { System.out.println("Drawing Square"); }
}
```

---

### E8. Constructor Chaining

**Problem:** `Employee` with chained constructors.

**OOP Concepts:** this(), constructor overloading

```java
class Employee {
    private String name;
    private int id;
    private double salary;

    Employee() { this("Unknown", 0, 0); }
    Employee(String name, int id) { this(name, id, 0); }
    Employee(String name, int id, double salary) {
        this.name = name; this.id = id; this.salary = salary;
    }
}
```

---

### E9. Method Overriding with super

**Problem:** `Vehicle` has `start()`. `Car` overrides and calls super.

**OOP Concepts:** super, overriding

```java
class Vehicle {
    void start() { System.out.println("Vehicle starting"); }
}
class Car extends Vehicle {
    @Override
    void start() {
        super.start();
        System.out.println("Car starting");
    }
}
```

---

### E10. Static Counter

**Problem:** Track how many `Person` objects are created using static variable.

**OOP Concepts:** static variable, shared state

```java
class Person {
    static int count = 0;
    Person() { count++; }
}
```

---

# 🟡 MEDIUM (15 Problems)

---

### M1. Employee Hierarchy

**Problem:** `Employee` (base), `Manager` (with bonus), `Developer` (with tech). Calculate salary differently.

**OOP Concepts:** Inheritance, polymorphism, encapsulation

```java
abstract class Employee {
    String name;
    double baseSalary;
    abstract double calculateSalary();
}
class Manager extends Employee {
    double bonus;
    Manager(String n, double s, double b) { name = n; baseSalary = s; bonus = b; }
    double calculateSalary() { return baseSalary + bonus; }
}
class Developer extends Employee {
    String tech;
    Developer(String n, double s, String t) { name = n; baseSalary = s; tech = t; }
    double calculateSalary() { return baseSalary + 5001; }
}
```

---

### M2. Banking System with Overdraft

**Problem:** `Account` (base), `SavingsAccount` (no overdraft), `CurrentAccount` (with overdraft).

**OOP Concepts:** Inheritance, polymorphism, encapsulation

```java
class Account {
    protected double balance;
    public void deposit(double amt) { balance += amt; }
    public boolean withdraw(double amt) { return amt <= balance; }
    public double getBalance() { return balance; }
}
class CurrentAccount extends Account {
    private double overdraftLimit = 1000;
    @Override
    public boolean withdraw(double amt) {
        if (amt <= balance + overdraftLimit) {
            balance -= amt;
            return true;
        }
        return false;
    }
}
```

---

### M3. Shape with Composition (Drawing)

**Problem:** `Shape` HAS-A `DrawingTool`. Compose relationship.

**OOP Concepts:** Composition

```java
class DrawingTool {
    void draw(String shape) { System.out.println("Drawing " + shape); }
}
abstract class Shape {
    DrawingTool tool = new DrawingTool();
    abstract void render();
}
class Circle extends Shape {
    public void render() { tool.draw("Circle"); }
}
```

---

### M4. Observer Pattern Implementation

**Problem:** Implement a simple observer (channel-subscribers).

**OOP Concepts:** Observer pattern, loose coupling

```java
import java.util.*;
interface Subscriber {
    void update(String msg);
}
class Channel {
    private List<Subscriber> subs = new ArrayList<>();
    void subscribe(Subscriber s) { subs.add(s); }
    void upload(String v) {
        for (Subscriber s : subs) s.update("New: " + v);
    }
}
class User implements Subscriber {
    String name;
    User(String n) { name = n; }
    public void update(String msg) { System.out.println(name + " - " + msg); }
}
```

---

### M5. Strategy Pattern: Payment

**Problem:** Different payment strategies at runtime.

**OOP Concepts:** Strategy pattern, interface

```java
interface Payment {
    void pay(double amount);
}
class Card implements Payment { public void pay(double a) { System.out.println("Card: " + a); } }
class UPI implements Payment { public void pay(double a) { System.out.println("UPI: " + a); } }

class Cart {
    private Payment method;
    void setMethod(Payment p) { method = p; }
    void checkout(double amt) { method.pay(amt); }
}
```

---

### M6. Abstract Class with Template Method

**Problem:** `Game` template. Subclasses `ChessGame`, `CricketGame` define steps.

**OOP Concepts:** Abstract class, template method pattern

```java
abstract class Game {
    final void play() { init(); start(); end(); }
    abstract void init();
    abstract void start();
    void end() { System.out.println("Game over"); }
}
class ChessGame extends Game {
    void init() { System.out.println("Setup chess board"); }
    void start() { System.out.println("Chess started"); }
}
```

---

### M7. Custom Exception

**Problem:** `InsufficientFundsException` thrown by BankAccount.

**OOP Concepts:** Exception handling, custom exceptions

```java
class InsufficientFundsException extends Exception {
    InsufficientFundsException(String msg) { super(msg); }
}
class BankAccount {
    double balance;
    void withdraw(double amt) throws InsufficientFundsException {
        if (amt > balance) throw new InsufficientFundsException("Not enough");
        balance -= amt;
    }
}
```

---

### M8. equals and hashCode Override

**Problem:** Override equals and hashCode in `Employee` class.

**OOP Concepts:** Object methods, contract

```java
import java.util.Objects;
class Employee {
    String name;
    int id;
    Employee(String n, int i) { name = n; id = i; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Employee)) return false;
        Employee e = (Employee) o;
        return id == e.id && name.equals(e.name);
    }

    @Override
    public int hashCode() { return Objects.hash(name, id); }
}
```

---

### M9. Covariant Return Type

**Problem:** `Animal` clone returns Animal; `Dog` clone returns Dog.

**OOP Concepts:** Covariant return, overriding

```java
class Animal {
    Animal clone() { return new Animal(); }
}
class Dog extends Animal {
    @Override
    Dog clone() { return new Dog(); }
}
```

---

### M10. Immutable Class

**Problem:** Make `ImmutableStudent` truly immutable.

**OOP Concepts:** final, immutability

```java
public final class ImmutableStudent {
    private final String name;
    private final int age;
    public ImmutableStudent(String name, int age) {
        this.name = name; this.age = age;
    }
    public String getName() { return name; }
    public int getAge() { return age; }
}
```

---

### M11. Abstract Class with Concrete Methods and State

**Problem:** `Account` with balance, deposit, abstract `calculateInterest()`.

**OOP Concepts:** Abstraction with shared state

```java
abstract class Account {
    protected double balance;
    public void deposit(double amt) { balance += amt; }
    public abstract double calculateInterest();
}
class Savings extends Account {
    public double calculateInterest() { return balance * 0.04; }
}
```

---

### M12. Builder Pattern

**Problem:** Build a `User` with optional fields using Builder.

**OOP Concepts:** Builder pattern

```java
class User {
    private final String name;
    private final int age;
    private final String email;
    private final String phone;

    private User(Builder b) {
        this.name = b.name; this.age = b.age;
        this.email = b.email; this.phone = b.phone;
    }

    public static class Builder {
        private final String name;
        private int age;
        private String email;
        private String phone;
        public Builder(String name) { this.name = name; }
        public Builder age(int age) { this.age = age; return this; }
        public Builder email(String e) { this.email = e; return this; }
        public Builder phone(String p) { this.phone = p; return this; }
        public User build() { return new User(this); }
    }
}
```

---

### M13. Factory Pattern

**Problem:** `ShapeFactory` returns Circle, Square, Triangle.

**OOP Concepts:** Factory pattern, polymorphism

```java
interface Shape { void draw(); }
class Circle implements Shape { public void draw() { System.out.println("Circle"); } }
class Square implements Shape { public void draw() { System.out.println("Square"); } }

class ShapeFactory {
    public static Shape get(String type) {
        if (type.equals("circle")) return new Circle();
        if (type.equals("square")) return new Square();
        return null;
    }
}
```

---

### M14. Multi-level Inheritance with Override

**Problem:** `A → B → C`. Each overrides `show()`. Show dynamic dispatch.

**OOP Concepts:** Multilevel inheritance

```java
class A { void show() { System.out.println("A"); } }
class B extends A { @Override void show() { System.out.println("B"); } }
class C extends B { @Override void show() { System.out.println("C"); } }
```

---

### M15. Interface with default and static

**Problem:** `Vehicle` interface with default `honk()` and static `info()`.

**OOP Concepts:** Interface evolution

```java
interface Vehicle {
    void start();
    default void honk() { System.out.println("Beep!"); }
    static void info() { System.out.println("Vehicle interface"); }
}
class Car implements Vehicle {
    public void start() { System.out.println("Car starts"); }
}
```

---

# 🔴 HARD (5 Problems)

---

### H1. LRU Cache Design

**Problem:** Design a Least Recently Used cache using OOP.

**OOP Concepts:** Composition, encapsulation, design

```java
import java.util.*;
class LRUCache {
    private final int capacity;
    private final LinkedHashMap<Integer, Integer> cache;

    LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new LinkedHashMap<>(capacity, 0.75f, true) {
            protected boolean removeEldestEntry(Map.Entry e) {
                return size() > capacity;
            }
        };
    }

    public int get(int key) {
        return cache.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        cache.put(key, value);
    }
}
```

**Complexity:** O(1) average

---

### H2. Parking Lot System

**Problem:** Multi-floor parking with vehicle types.

**OOP Concepts:** Abstraction, polymorphism, design

```java
abstract class Spot {
    int id; boolean occupied;
    abstract boolean canFit(String type);
}
class SmallSpot extends Spot {
    boolean canFit(String t) { return t.equals("bike"); }
}
class LargeSpot extends Spot {
    boolean canFit(String t) { return t.equals("car") || t.equals("bike"); }
}
```

---

### H3. Custom HashMap

**Problem:** Implement a simplified HashMap with put, get.

**OOP Concepts:** Arrays, hashing, encapsulation

```java
class MyHashMap<K, V> {
    private static class Entry<K, V> {
        K key; V value; Entry<K, V> next;
        Entry(K k, V v) { key = k; value = v; }
    }
    private Entry<K, V>[] buckets = new Entry[16];

    public void put(K key, V value) {
        int idx = key.hashCode() % buckets.length;
        Entry<K, V> e = buckets[idx];
        if (e == null) { buckets[idx] = new Entry<>(key, value); return; }
        while (e.next != null) {
            if (e.key.equals(key)) { e.value = value; return; }
            e = e.next;
        }
        e.next = new Entry<>(key, value);
    }

    public V get(K key) {
        int idx = key.hashCode() % buckets.length;
        Entry<K, V> e = buckets[idx];
        while (e != null) {
            if (e.key.equals(key)) return e.value;
            e = e.next;
        }
        return null;
    }
}
```

---

### H4. Tic-Tac-Toe Game

**Problem:** Design Tic-Tac-Toe with OOP.

**OOP Concepts:** Composition, polymorphism, state

```java
class Board {
    char[][] grid = new char[3][3];

    boolean isFull() {
        for (char[] r : grid) for (char c : r) if (c == '\0') return false;
        return true;
    }

    boolean makeMove(int r, int c, char p) {
        if (grid[r][c] != '\0') return false;
        grid[r][c] = p;
        return true;
    }

    boolean hasWinner() {
        // rows, cols, diagonals
        for (int i = 0; i < 3; i++)
            if (grid[i][0] != '\0' && grid[i][0] == grid[i][1] && grid[i][1] == grid[i][2]) return true;
        for (int j = 0; j < 3; j++)
            if (grid[0][j] != '\0' && grid[0][j] == grid[1][j] && grid[1][j] == grid[2][j]) return true;
        if (grid[0][0] != '\0' && grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2]) return true;
        if (grid[0][2] != '\0' && grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0]) return true;
        return false;
    }
}

class Game {
    Board board = new Board();
    char current = 'X';
    void play(int r, int c) {
        if (board.makeMove(r, c, current)) {
            if (board.hasWinner()) System.out.println(current + " wins");
            current = (current == 'X') ? 'O' : 'X';
        }
    }
}
```

---

### H5. Notification System using Strategy + Observer

**Problem:** Build a system that notifies users via Email, SMS, or Push based on preference.

**OOP Concepts:** Strategy + Observer, polymorphism

```java
interface NotificationStrategy {
    void send(String msg);
}
class EmailStrategy implements NotificationStrategy {
    public void send(String msg) { System.out.println("Email: " + msg); }
}
class SMSStrategy implements NotificationStrategy {
    public void send(String msg) { System.out.println("SMS: " + msg); }
}
class User {
    String name;
    NotificationStrategy strategy;
    User(String n, NotificationStrategy s) { name = n; strategy = s; }
    void notify(String msg) { System.out.print(name + " got: "); strategy.send(msg); }
}

class NotificationService {
    List<User> users = new ArrayList<>();
    void addUser(User u) { users.add(u); }
    void broadcast(String msg) {
        for (User u : users) u.notify(msg);
    }
}
```

---

# 📍 PROGRESS CHECKPOINT 5

**Completed so far:**
- ✅ Parts 1–14 (Full material except 15–18 + Final)

**Remaining:**
- PART 15 — Top 100 Interview Questions
- PART 16 — One-Day Revision Sheet
- PART 17 — Interview Answering Technique (Bad/Good/Excellent for 20 questions)
- PART 18 — Mock Interview
- FINAL — Top 30 Must-Study

**Reply "next" to continue.**
