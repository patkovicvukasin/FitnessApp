# Fitness Management System

This project is a mini fitness center management system developed as part of the Andrea360 Fullstack Challenge.
The system allows management of locations, employees, members, services, and training sessions, including purchasing services via Stripe and reserving sessions with real-time capacity updates.


---
## Project Overview

The application supports three user roles:

### Administrator

Creates and manages locations

Creates and manages employees per location

Has access to all employee functionalities

### Employee

Creates members

Creates services (trainings)

Creates training sessions for their location

Manages reservations and monitors session capacity

### Member

Purchases training services via Stripe (test mode)

Reserves training sessions

Each reservation consumes one purchased service


---
## Core Features

JWT-based authentication and role-based authorization

Location, employee, member, service, and session management

Stripe integration for service purchases (test mode)

Session reservation with capacity validation

Real-time capacity updates using WebSockets

Swagger / OpenAPI API documentation

Seed data for testing

Postman collection for API testing


---
## Tech Stack

### Backend

Java


Spring Boot 4 (Security, JPA, WebSocket)

PostgreSQL

Stripe Java SDK

Maven

### Frontend

React

TypeScript

React Router

Axios

React Query

SockJS + STOMP (WebSocket)

Stripe.js

### Infrastructure

Docker

Docker Compose

Nginx


---
## Running the Application

### Prerequisites

Docker

Docker Compose

### Steps

git clone <repository-url>

cd fitnessapp

docker-compose up --build

### Application URLs

Frontend: http://localhost:5173

Backend API: http://localhost:8080/api

Swagger UI: http://localhost:8080/swagger-ui.html


---
## Test Accounts

The application includes seeded test accounts for each role:

### Administrator
- **Email**: `admin@test.com`
- **Password**: `admin123`

### Employees

**Employee #1**
- **Email**: `employee1@test.com`
- **Password**: `employee123`

**Employee #2**
- **Email**: `employee2@test.com`
- **Password**: `employee123`

### Members

**Member #1**
- **Email**: `member1@test.com`
- **Password**: `member123`

**Member #2**
- **Email**: `member2@test.com`
- **Password**: `member123`

Each account is linked to predefined locations, services, and sessions.


---
## Stripe Test Cards

The application uses Stripe in test mode. 
Use these test card numbers for purchases:

### Successful Payment
- **Card Number**: `4242 4242 4242 4242`
- **Expiry Date**: Any future date (e.g., `12/34`)
- **CVC**: Any 3 digits (e.g., `123`)
- **ZIP**: Any 5 digits (e.g., `12345`)

### Other Test Cards
- **Declined**: `4000 0000 0000 0002`
- **Insufficient Funds**: `4000 0000 0000 9995`
- **Requires Authentication**: `4000 0025 0000 3155`


---
## API Documentation & Testing

### Swagger / OpenAPI
Interactive API documentation is available at:
- **URL**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **OpenAPI Spec**: [http://localhost:8080/api-docs](http://localhost:8080/api-docs)

### Postman Collection
A complete Postman collection is included in the repository:
- **File**: `docs/Fitness-App-API.postman_collection.json`
- **Import**: Postman → Import → Select the file


---
Author: Vukašin Patković
