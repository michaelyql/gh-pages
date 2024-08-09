---
title: "Java FX"
author: "Michael Yang"
date: 2024-08-05
tags:
  - java
  - javafx
category: java
---

## Setting Up

[SE Education](https://se-education.org/guides/tutorials/javaFxPart1.html) provides a guide on how to set up dependencies for JavaFX using Gradle.

## Main Class

The `Main` class should extend `javafx.application.Application` and override the `public void start(Stage primaryStage)` method. In the `main()` method, it should call `launch(args)` to launch the application. You can set the title of the application using `primaryStage.setTitle(...)`.

The **stage** is the entire window of the application. The **scene** is where the content of your app goes. You have to create a new scene using `Scene scene = new Scene(layout, width, height)` and set the scene using `primaryStage.setScene(scene)`, followed by `primaryStage.show()`. The layout of the app is controlled by layout objects like `StackPane`. Creating a layout box is as easy as calling `StackPane stack = new StackPane()`, then adding children to it.

To add children to a layout, you can call `layout.getChildren().add()` or `addAll()`.

It may also be useful to have a instance field to assign to `primaryStage`, e.g. `Stage window;` and inside the `start()` method, assign `window = primaryStage`.

## Handling User Events

The class should implement `javafx.event.EventHandler<ActionEvent>` which accepts a generic type. It should implement the `handle()` method. The `setOnAction(class)` method specifies which class is designated to handle user events. `event.getSource()` identifies which element was the source of the event (that triggered the event).

Instead of creating a separate class to handle events, you can create an anonymous inner class that implements `EventHandler` and pass it as the argument to `setOnAction`. Inside the anonymous class, you can provide a custom implementation for the `handle()` method.

Or you could just use lambda functions `e -> { ... }` (available from Java 8 onwards) to reduce the clutter of anonymous inner classes.

## Switching Scenes

Switching scenes is done by calling `stage.setScene(scene)` on the scene you want to switch to. You can attach this to a button or event handler to switch to another scene when the user clicks a button.

## Alert Boxes

Alert boxes are like little windows that pop up and are separate from the main window. You can configure alert boxes to look like a separate window altogether, such as opening a settings or configuration window, or perhaps a detailed popup view. You can define a separate class, such as `AlertBox`, and write a _static_ function like `display()`, and attach the method to event handler of a button.

`stage.initModality(Modality.APPLICATION_MODAL)` initializes the modality of that stage. Basically, it means that the window will block user events on all other windows, until the current window is closed. This is useful for alert boxes.

Remember that the window needs to have its own `scene`, which needs to have its own `layout`, which needs to have its own separate UI elements, such as `Label` and `Button`, and you have to call `stage.show()` in order to show the alert box. You can also call `showAndWait()`, which shows the stage and waits for it to be closed/hidden before returning to the caller.

You can programmatically close the window by calling `stage.close()`, and potentially attaching it to the event handler of a button. Alternatively, the close button is always there by default.

## Communicating between windows

You can take advantage of `static` fields on classes. When the user interacts with some UI element, you can update the value of that static field. If the value was on a separate window, when the window returns control to its caller, you can still access the updated value of that static field, essentially passing data between different windows.

## Cleaning Up on Close

Use `stage.setOnCloseRequest()` which takes a callback function to specify a cleanup function that you want to run before the user exits the application. You can do things such as saving the user's progress, saving state, or even prompting the user if they really want to exit. The window will close when the callback function returns. If you want to 'hijack' the exit logic, you can do `e -> { e.consume(); // custom close logic }`. This consumes the event and allows you to take control over how to close the application.

## Layouts

## Using FXML

FXML is like HTML but for Java. To read the configuration from a `.fxml` file, you typically use some version of this boilerplate code:

```java
@Override
public void start(Stage stage) throws IOException {
  FXMLLoader fxmlLoader = new FXMLLoader(MyApplication.class.getResource("path/to/main.fxml"));
  Scene scene = new Scene(fxmlLoader.load(), width, height);
  stage.setTitle("...");
  stage.setScene(scene);
  stage.show();
}
```

In order to use JavaFX element tags in FXML, you first need to add import statements to the front of the FXML file, which will look something like `<?import javafx.scene.layout.*?>` (_note the special syntax with angle brackets and question marks_). This will enable you to use tags like `<VBox></VBox>`, `<Label/>` and so on.

### fx:controller

Every FXML file can only have one controller.

The `fx:controller` attribute needs to match the package + class name of the java class that you want associated with the element tag. For example, if there was a class `Controller` inside a package `sample`, you would have to set the attribute `fx:controller="sample.Controller"` in the element tag.

### fx:id

The `fx:id` attribute should match the variable name within the controller. For example, if the controller has a instance field `private Button button;`, in order to sync the FXML file with the Java code, you would have to set `fx:id="button"` as the attribute. Adding onClick handlers can be done by setting `onAction="#nameOfYourFunction"`, matching the function called `nameOfYourFunction()` from inside the controller.

### Initializable

The `javafx.fxml.Initializable` allows us to run code on initialization of certain FXML elements. You have to implement the `public void initialize(URL location, ResourceBundle resources)` function.

### Referencing Variables

In FXML, you can reference variables using the syntax `${}`, much like in JavaScript where you can use template strings. For example, if a `<Label>` element had the id of `button1`, you could access its text value using `${button1.text}`.

### fx:define

You can define **reusable** components within `<fx:define></fx:define>` tags, which can be reused by other elements elsewhere. For example, to group a set of radio buttons together, you can define a `<ToggleGroup fx:id="custom-toggle-group"/>` inside the `fx:define` tags, then use the id of that toggle group in a radio button, i.e. `<RadioButton text="..." toggleGroup="$custom-toggle-group"/>`. Note the use of `$` which means to reference that component.

### Using CSS

You can add CSS styles using `scene.getStylesheets().add("path/to/stylesheet")`. JavaFX CSS properties are prefixed with `-fx-`. For example, you would use `-fx-background-color` instead of `background-color`, and `-fx-font-size` instead of `font-size`.

You can set inline styles of an element programmatically with `element.setStyle("-fx-<attribute-name>: <value>")`.

The root node is targetted using the `.root` selector. You can target all nodes of a type of component, for example, Label with `.label`, or `.button` for all buttons.

You can add custom style classes using `element.getStyleClass().add("custom-style-class-name")`, then target that style class correspondingly. You can target specific elements by their id, by using `element.setId("...")`. The element can be targetted as usual with `#<element-id>`.

You can also add stylesheets through the SceneBuilder GUI, which will save the link in the FXML file.

### Modularizing files

You can (and should) split up your FXML files into smaller files for each individual component, then use `<fx:include source="path/to/other/file.fxml" />` to include them into the main file.

### SceneBuilder

You can use SceneBuilder together with JavaFX in IntelliJ. To do so, you have to go to `Settings` > `Languages & Frameworks` > `JavaFX`, and specify the path to where you installed SceneBuilder. This will allow you to open `.fxml` files from within IntelliJ, and make changes to them automatically through the SceneBuilder GUI. You need to state the location of the SceneBuilder executable (Windows) or binary file (Linux/Mac).

`useComputedSizes` is a neat option to make UI elements 'responsive'.

`Region` can be used to flush elements to the ends using its HGROW property.

To package your JavaFX application, you have to build the artifact (the JAR file). IntelliJ provides a dedicated artifact type called **JavaFX Application**. You have to 1&#41; create an artifact configuration (for how to build the artifact) by going to `File` > `Project Settings` > `Artifacts`, and 2&#41; build the artifact.

If you face the issue

`Error:Java FX Packager: Can't build artifact – fx:deploy is not available in this JDK`,

see [here](https://www.jetbrains.com/help/idea/packaging-javafx-applications.html#troubleshoot) on how to resolve it.

## Application Lifecycle

> The entry point for JavaFX applications is the Application class.

The JavaFX runtime does the following, in order, whenever an application is launched:

- Constructs an instance of the specified `Application` class
- Calls the `init()` method
- Calls the `start(javafx.stage.Stage)` method
- Waits for the application to finish, which happens when either of the following occur:
  - the application calls `Platform.exit()`
  - the last window has been closed and the implicitExit attribute on Platform is true
- Calls the `stop()` method

Note that the `start` method is abstract and must be overridden. The `init` and `stop` methods have concrete implementations that do nothing.

Calling `Platform.exit()` is the preferred way to explicitly terminate a JavaFX Application. Directly calling `System.exit(int)` is an acceptable alternative, but doesn't allow the Application `stop()` method to run.

## Working Within Teams
