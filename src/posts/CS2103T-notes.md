---
title: CS2103T Notes
author: "Michael Yang"
date: 2024-08-18
tags:
  - cs2103t
  - software engineering
  - OOP
category: notes
---

## Week 1

### OOP

- OOP is a **programming paradigm**
- OOP is used as an abstraction mechanism to model the real world - it allows us to abstract away the lower level details and work with bigger granularity entities. I.e. ignore implementation details and work with interfaces
- Some programming languages like Java and Python support multiple paradigms
- Java is mainly an OOP language but it supports procedural and functional programming
- C is a procedural language

### Objects

- Objects have _state_ (data) and _behaviour_ (operations on data)
- OOP views the world as a network of interacting objects
- OOP simulates interaction between objects
- Every object has an _interface_ and an _implementation_
- Objects interact by sending messages
- _Encapsulation_ protects an implementation from unintended actions and from inadvertent access. An object is an encapsulation via _packaging_ (An object packages data and related behavior together into one self-contained unit) and _information hiding_ (data in an object is hidden from the outside world and are only accessible using the object's interface)

### Classes

- A _class_ contains instructions for creating (instantiating) a specific kind of objects
- Constructors can be _overloaded_
- `this` is a reference to the current object. It can also be used to call the constructor
- Instance methods can access attributes of the class
- Getters and setters provide an interface for getting and setting the attributes
- Class-level attributes are shared by all instances of that class using the `static` keyword
- Enums are a fixed set of values that can be considered as a data type. The names of an enum type's fields are in uppercase letters by convention
- Enums can have methods

### Inheritance

- _Inheritance_ allows you to define a new class based on an existing class
- A superclass is said to be _more general_ than the subclass. A subclass is said to be _more specialized_ than the superclass
- The derived class can be considered as a _subtype_ of the base class, and the base class is a super-type of the derived class, resulting in an _is-a_ relationship
- Inheritance relationships through a chain of classes can result in inheritance hierarchies (aka inheritance trees)
- _Multiple Inheritance_ is when a class inherits directly from multiple classes. Multiple inheritance is not allowed in Java
