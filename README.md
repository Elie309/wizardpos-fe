# **POS System Frontend**

## **Table of Contents**
1. [Introduction](#introduction)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Installation](#installation)  
5. [Running the App](#running-the-app)  
6. [Project Structure](#project-structure)  
7. [Pages Overview](#pages-overview)  
8. [How to Use](#how-to-use)  
9. [Future Improvements](#future-improvements)  
10. [Contributing](#contributing)  
11. [License](#license)

---

## **Introduction**

This project is a **Point of Sale (POS) system frontend** built using React, TypeScript, and Tailwind CSS. It allows users to manage orders, reservations, employees, and products efficiently. This app serves as a scalable foundation for a more complete POS solution.



## **Features**

- **Orders Management**: Create, view, and track orders with product details.
- **Reservations Management**: Manage table reservations with client information and time durations.
- **Employee Management**: Add, delete, and view detailed employee profiles.
- **Products and Categories**: Grid-based product selection and category filtering.
- **Responsive Design**: Mobile-friendly using Tailwind CSS.
- **Error Handling**: User-friendly 404 Not Found page.



## **Tech Stack**

- **React**: UI library for building interfaces.  
- **TypeScript**: Enhances JavaScript with strong typing.  
- **Tailwind CSS**: Utility-first CSS framework for styling.  
- **React Router**: Handles navigation and routing.


## **Project Structure**

pos-system-frontend/
├── src/
│   ├── components/          # Reusable components (e.g., Navbar)
│   ├── data/                # Mock data for products and employees
│   ├── pages/               # App pages (Orders, Reservations, Employees)
│   ├── utils/               # Utility functions (e.g., generateId)
│   ├── App.tsx              # Main app component with routes
│   ├── index.tsx            # Entry point of the React app
│   └── styles/              # Custom CSS or Tailwind overrides
├── public/                  # Public files (e.g., index.html)
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation

## **Pages Overview**

- **Home Page**: Placeholder home page.  
- **Orders Page**: View, manage, and place orders with product details.  
- **Reservations Page**: Manage table reservations, including table selection, client information, and stay duration.  
- **Employee Page**: Add, delete, and view employee profiles.  
- **Employee Profile Page**: Display individual employee details such as username and password.  
- **404 Page**: Custom page shown for undefined routes.


## **How to Use**

1. **Orders Management**:  
   - Navigate to the **Orders** page via the Navbar.  
   - Select products and place orders.  

2. **Reservations Management**:  
   - Go to the **Reservations** page.  
   - Reserve a table by entering client information (phone number, time, and stay duration).  

3. **Employee Management**:  
   - Use the **Employees** page to add, delete, or view employee profiles.  
   - Click on an employee’s username to view their profile.  

4. **Navigation**:  
   - Use the Navbar to switch between **Orders**, **Reservations**, and **Employees** pages.


## **Future Improvements**

- **Authentication**: Add login for employees with role-based access (e.g., Admin, Cashier).  
- **Order History**: Store and display order history for better tracking.  
- **Database Integration**: Connect to a backend service for data persistence.  
- **Payment System**: Integrate payment processing for order settlements.  
- **Dashboard**: Add a dashboard for monitoring key metrics (e.g., daily sales, reservations).  


## **Contributing**

Contributions are welcome! Follow these steps:  
1. Fork the repository.  
2. Create a new branch (`git checkout -b feature-name`).  
3. Commit your changes (`git commit -m 'Add feature'`).  
4. Push to the branch (`git push origin feature-name`).  
5. Open a pull request.


## **License**

This project is proprietary software and may not be used, distributed, or modified without express written permission from the owner. All rights reserved. See the [LICENSE](LICENSE) file for details.


## **Contact**

For inquiries or suggestions, feel free to reach out to **Elie Saade - Elie309**.
