#  MobileShop – Full Stack eCommerce Website

A modern **Full-Stack eCommerce Web Application** built using **Spring Boot**, **React.js**, and **MySQL**.  
This project provides a seamless shopping experience for users and an intuitive admin panel to manage products, orders, and users efficiently.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-------------|
|  Frontend | React.js, HTML5, CSS3, JavaScript |
|  Backend | Spring Boot 3.4.0, Java 21 |
|  Database | MySQL |
|  Authentication | JWT (JSON Web Token) |
|  Build Tools | Maven (Backend), npm (Frontend) |

---

##  Features

###  User Module
- User Registration & Login (JWT Authentication)
- Browse Products with search & filter options
- Add to Cart, Checkout & Order History
- Secure session handling

###  Admin Module
- Manage Products (Add / Edit / Delete)
- Manage Orders and Users
- Upload Product Images
- View all orders placed by users

###  General Features
- RESTful API design
- Responsive front-end UI
- Role-based access control
- Centralized error handling
- MySQL database integration

---

##  Project Structure
##  Installation & Setup Guide

###  Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend

### Configure your MySQL database in application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/mobileshop_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
jwt.secret=your_jwt_secret_key


Build and run the backend:

mvn clean install
mvn spring-boot:run


##  Backend will start at → http://localhost:8080

# Frontend Setup (React.js)

Navigate to the frontend directory:

cd frontend


# Install all dependencies:

npm install


Create a .env file and add your backend API base URL:

REACT_APP_API_BASE_URL=http://localhost:8080


Start the React development server:

npm start


#  Frontend will start at → http://localhost:3000

## How It Works

Frontend (React.js) sends API requests to the backend (Spring Boot).

Backend authenticates users using JWT tokens and processes requests through REST APIs.

Database (MySQL) stores product, user, and order details.

Admin has full control via the admin dashboard.

# Screenshots 
## Home Page 
<img width="1893" height="921" alt="image" src="https://github.com/user-attachments/assets/eacf9429-bfcf-4683-9cd4-a869ed8c4d29" />

## Sign In page
<img width="1919" height="915" alt="image" src="https://github.com/user-attachments/assets/3b1e2194-9372-4f8d-a464-f59219c4449b" />

## Products 
<img width="1903" height="913" alt="image" src="https://github.com/user-attachments/assets/107b2e4e-78c5-4eea-b7cf-036f7b244189" />


## Admin Dashboard
<img width="1914" height="905" alt="image" src="https://github.com/user-attachments/assets/efea0af1-260d-4445-9b90-63444f08e0e8" />


## Cart / Checkout Page
<img width="1902" height="907" alt="image" src="https://github.com/user-attachments/assets/c3bb5af7-9d71-4d14-bd36-3565f22f0037" />
# Database Mysql User tables
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f33a5ec5-556f-4b0d-9c82-d93f518ca9fe" />


# Future Enhancements

 Payment Gateway Integration (Razorpay / Stripe)

 Email Notifications for Orders

 Product Reviews & Ratings

Progressive Web App (PWA) version

 Cloud Deployment (AWS / Render / Vercel)

 Author : Krishna Teja

Developed by Vanama Krishna Teja

 Email: vanamakrishnateja0604@gmail.com

 # License

This project is licensed under the MIT License – feel free to use and modify.

Star this repo if you found it helpful!


