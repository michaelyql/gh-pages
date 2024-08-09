---
title: "Using Gradle"
author: "Michael Yang"
date: 2024-07-23
tags:
  - java
  - gui
category: java
---

## Gradle Wrapper (gradlew)

On Linux/Mac

```bash
./gradlew build
```

This uses a specific version of gradle.

`/gradle/wrapper/gradle-wrapper.jar` is a small JAR file that contains the Gradle Wrapper code. It is responsible for downloading and installing the correct version of Gradle for a project if it’s not already installed.

`/gradle/wrapper/gradle-wrapper.properties` contains configuration details for the gradle wrapper, such as where to download it from.

`./gradle` is a shell script used for Linux/Mac, while `./grade.bat` is a batch script used for Windows.

> You should never alter these files.

To see the version of gradle being used,

```bash
./gradlew --version
```

### Executing Tasks

```bash
gradle [taskName...] [--option-name...]
```

Options are allowed **before** and **after** task names

If multiple tasks are specified, you should separate them with a space.

```bash
gradle [taskName1 taskName2...] [--option-name...]
```

Options that accept values can be specified with or without = between the option and argument. The use of = is recommended.

```bash
gradle [...] --console=plain
```

Many long-form options have short-option equivalents, like `-h` and `--help`.

### Settings

`/settings.gradle` is the entry point for every Gradle project. It can either be written in Kotlin (`.kts`) or traditionally in Groovy (without the `.kts` extension). In the settings file, you configure the root projects name, include subprojects, and more. It looks something like

```kotlin
rootProject.name = "My Project"

include("app")
include("business-logic")
include("data-model")
```

### Building

Every Gradle build comprises at least one build script (either `/build.gradle` or `/build.gradle.kts`). It looks like this:

```groovy
plugins {
    id 'application'
}

application {
    mainClass = 'com.example.Main'
}
```

To run a build task, do `./gradlew build`.

### Dependencies

To add a dependency to your project, specify a dependency in the dependencies block of your `/build.gradle(.kts)` file.

```groovy
plugins {
    alias(libs.plugins.androidApplication)
}

dependencies {
    // Dependency on a remote binary to compile and run the code
    implementation(libs.googleMaterial)

    // Dependency on a remote binary to compile and run the test code
    testImplementation(libs.mockitoCore)
}
```

To view dependencies, use

```bash
$ ./gradlew :app:dependencies
```

### Tasks

To see all available tasks:

```bash
$ ./gradlew tasks
```

Tasks have dependencies; this means certain tasks must be run before other tasks are run.

### Plugins

There are 3 types of plugins: Core plugins, Community plugins, and local plugins. You apply plugins as follows:

```groovy
plugins {
    id «plugin id» version «plugin version»
}
```

### Caching

Gradle uses **incremental builds** which avoids running tasks whose inputs have not changed since the last build.

> For incremental builds to work, tasks must define their inputs and outputs. If their inputs have changed, Gradle will execute the task. Otherwise, it will skip execution, leading to faster build times.

Gradle also uses **build caching** which basically caches previous builds. This is useful in cases such as switching to another branch which does not have the build yet - Gradle will just reuse the build.

### IntelliJ

The `/.gradle` folder in an IntelliJ IDEA project is a directory used by Gradle to store various configuration files, caches, and other build-related data. This folder helps improve build performance and manage project dependencies.

Gradle uses the `/.gradle` folder to store a cache of build artifacts and metadata. It might contain a folder like `8.4` which is storing files for that specific version of Gradle, amongst other files. It is usually safe to delete the `.gradle` folder. Gradle will automatically regenerate the folder during the next build.

Using the Gradle Tool Window in IntelliJ: `View` > `Tool Windows` > `Gradle` (or on the far right toolbar, with the elephant icon). After updating `build.gradle` you should **reload** the project using the gradle tool window. Then clean the project build, and rebuild the project.

To check that IntelliJ has synced the changes, go to `File` > `Project Settings` > `Modules` to verify that the dependencies have been added.
