---
title: PostgreSQL Notes
author: "Michael Yang"
date: 2024-07-28
tags:
  - postgres
category: postgres
---

## Querying a Postgres Database from Frontend

Usually, the frontend does not directly query the Postgres database. Instead, it sends a request to a **backend server** at one of its **API endpoints**, with the necessary data in the payload.

The backend server receives the request and **validates the incoming data** to prevent security issues like SQL injection, Cross-Site Scripting (XSS), etc. The backend server can be any http server, like ExpressJS, Django, Flask, and so on.

The backend server then **authenticates** the user and checks their **authorization** to ensure they have permission to perform the requested action. Common methods include JSON Web Tokens (JWT), OAuth, and session-based authentication.

The backend server then uses a **database client** or **ORM** (Object-Relational Mapping) to interact with the PostgreSQL database. It constructs and executes the necessary SQL queries. Once done with the query, the server formats the data and sends it back as an **HTTP response** to the frontend.
