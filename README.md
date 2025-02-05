# SB1
React Firebase Student Management System

Overview

This project is a React-based web application that provides a simple student management system with Firebase authentication and Firestore database integration. It includes a login page for authentication and a student management dashboard that allows users to view, add, edit, and delete student records.

Features

Firebase Authentication: Users can log in using predefined credentials.

Students Management: View, add, edit, and delete student details in a table format.

Sidebar Navigation:

Students Page: Displays a list of students.

Logout: Logs out the authenticated user.

Firestore Integration: Student records are stored and managed in Firestore.

Add Student Modal: A form with at least 12 fields to enter student details with proper validations.

Role-based Access: Only authenticated users can access the dashboard.

Deployment: The application is deployed on a hosting platform.

Pages

1. Login Page

Simple authentication page using Firebase.

Users must log in with:

Username: admin@123.com

Password: admin@123

Successful login redirects to the Students Page.

2. Students Page

Displays student data in a table format with columns:

ID, Name, Class, Section, Roll Number, Action

Actions:

View: Opens a detailed view of the student's information.

Edit: Allows editing the student's details.

Delete: Removes the student from the Firestore database.

Add Student Button:

Opens a modal with a 12-field form for student details.

Includes various input types such as text, number, date, dropdowns, etc.

Form fields have proper validations to ensure data integrity.

Tech Stack

Frontend: React.js (with Hooks and Context API)

Authentication: Firebase Authentication

Database: Firestore

UI Components: Material-UI / Bootstrap / TailwindCSS

Deployment: Hosted on a cloud-based platform (Netlify, Vercel, Firebase Hosting, etc.)

Installation & Setup

Clone the Repository

git clone https://github.com/yourusername/react-firebase-student-management.git
cd react-firebase-student-management

Install Dependencies

npm install

Configure Firebase

Create a Firebase project in the Firebase Console.

Enable Authentication (Email/Password login).

Enable Firestore Database.

Update Firebase configuration in src/firebase.js.

Run the Project Locally

npm start

Deploy the Application

Use Firebase Hosting, Vercel, or Netlify for deployment.

npm run build

Follow hosting platform guidelines for deployment.

Validations

Email and password validation on login.

Required fields validation in the "Add Student" form.

Data type validation for numeric and date fields.
