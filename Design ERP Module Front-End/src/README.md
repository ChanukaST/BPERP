# Student Records ERP System - Frontend

A professional, responsive, and accessible web application for managing student records at NSBM Green University. Built with React, TypeScript, and Tailwind CSS.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [User Roles](#user-roles)
- [Module Components](#module-components)
- [Architecture](#architecture)
- [Accessibility](#accessibility)
- [Task 02 Report](#task-02-report)

## 🎯 Overview

The Student Records ERP module serves as a central repository for storing and managing student information at NSBM Green University. It provides role-based access to personal details, academic history, attendance records, and administrative information.

This frontend application demonstrates the business processes identified in Task 02, implementing a complete user interface for:
- Student profile management
- Academic records tracking
- Attendance monitoring
- Transcript generation
- Administrative operations

## ✨ Features

### Role-Based Access Control
- **Administrative Staff**: Full access to manage all student records
- **Academic Staff**: Input grades, attendance, and course details
- **Students**: View personal academic records and update contact information

### Core Functionality
- 📊 **Dashboard Overview**: Role-specific metrics and quick stats
- 👥 **Student Management**: Create, view, edit, and delete student profiles
- 📚 **Academic Records**: Grade entry and GPA calculations
- 📅 **Attendance Tracking**: Monitor and manage student attendance
- 📄 **Transcript Generation**: Generate official academic transcripts
- 🔍 **Search & Filter**: Advanced filtering by semester, course, and student

## 🛠 Technology Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: Shadcn/ui component library
- **Icons**: Lucide React
- **Notifications**: Sonner toast notifications
- **State Management**: React hooks (useState)

## 📦 Installation

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Steps

1. Clone the repository:
```bash
git clone https://github.com/yourusername/student-records-erp.git
cd student-records-erp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 🚀 Usage

### Login
1. On the login screen, select your role:
   - Administrative Staff
   - Academic Staff
   - Student

2. Click "Sign In" to access the system

### Navigation
- Use the sidebar to navigate between different modules
- The interface adapts based on your user role
- Click "Sign Out" in the sidebar to return to the login screen

### User Profiles
The application includes the following user roles:
- **Administrative Staff**: Sarah Johnson (admin-001)
- **Academic Staff**: Dr. Michael Chen (acad-001)
- **Student**: Emma Williams (STU2024001)

## 👤 User Roles

### Administrative Staff
**Access Level**: Full
- View all student records
- Create new student profiles
- Edit and delete student information
- Generate transcripts for any student
- View system-wide statistics

### Academic Staff
**Access Level**: Moderate
- View student lists
- Input and manage grades
- Track attendance
- View course-related information
- Update academic records

### Students
**Access Level**: Limited
- View personal profile
- Access academic records and grades
- Check attendance status
- Request official transcripts
- Update contact information

## 🧩 Module Components

### 1. Login Screen (`LoginScreen.tsx`)
- Role selection interface
- User authentication system
- Role-based access description

### 2. Dashboard (`Dashboard.tsx`)
- Main application container
- View management and routing
- User context handling

### 3. Sidebar Navigation (`Sidebar.tsx`)
- Role-based menu items
- User profile display
- Navigation controls
- Logout functionality

### 4. Overview Dashboard (`OverviewDashboard.tsx`)
- Role-specific statistics
- Quick metrics display
- Recent activity widgets

### 5. Students Management (`StudentsManagement.tsx`)
- Student list with search
- Add new student profiles
- Edit and delete operations
- Status tracking

### 6. Student Profile (`StudentProfile.tsx`)
- Personal information display
- Academic details
- Tabbed interface for:
  - Academic records
  - Personal details
  - Attendance history
- Edit mode for authorized users

### 7. Academic Records (`AcademicRecords.tsx`)
- Grade management
- GPA calculations
- Semester filtering
- Course performance tracking

### 8. Attendance Management (`AttendanceManagement.tsx`)
- Attendance record tracking
- Course-wise attendance
- Date-based filtering
- Attendance statistics

### 9. Transcript Generator (`TranscriptGenerator.tsx`)
- Official transcript generation
- Student selection (admin only)
- Semester filtering
- Download and print options
- GPA calculations

## 🏗 Architecture

### Component Structure
```
App.tsx (Root)
├── LoginScreen.tsx
└── Dashboard.tsx
    ├── Sidebar.tsx
    └── Views
        ├── OverviewDashboard.tsx
        ├── StudentsManagement.tsx
        ├── StudentProfile.tsx
        ├── AcademicRecords.tsx
        ├── AttendanceManagement.tsx
        └── TranscriptGenerator.tsx
```

### Data Flow
- **State Management**: Local component state using React hooks
- **Props**: User context passed down from App component
- **Data Structures**: Predefined interfaces for student records
- **Event Handling**: Callback props for component communication

### Design Patterns
- **Component Composition**: Reusable UI components
- **Props Drilling**: User context and callbacks
- **Conditional Rendering**: Role-based UI elements
- **Controlled Components**: Form inputs with React state

## ♿ Accessibility

### WCAG 2.1 Compliance
- ✅ Semantic HTML structure
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Color contrast ratios
- ✅ Screen reader compatibility

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Flexible grid layouts
- Touch-friendly UI elements

### Best Practices
- Clear visual hierarchy
- Consistent navigation patterns
- Error feedback and validation
- Loading states and feedback
- Toast notifications for actions

## 📊 Task 02 Report

### Business Process Analysis Summary

**Module**: Student Records Management

#### Identified Users/Roles
1. **Administrative Staff**: Full system access for record management
2. **Academic Staff**: Grade and attendance input capabilities
3. **Students**: Self-service portal for personal records
4. **IT Staff**: Backend maintenance and security (not implemented in frontend)

#### Sub-Processes Implemented

1. **Profile Creation**
   - Implemented in: `StudentsManagement.tsx`
   - Features: Add new student form with validation
   - Access: Administrative staff only

2. **Information Update**
   - Implemented in: `StudentProfile.tsx`
   - Features: Edit mode for personal and contact details
   - Access: Admin and students (limited)

3. **Academic Records Entry**
   - Implemented in: `AcademicRecords.tsx`
   - Features: Grade input, GPA calculation
   - Access: Admin and academic staff

4. **Attendance Records Integration**
   - Implemented in: `AttendanceManagement.tsx`
   - Features: Attendance tracking, statistics
   - Access: Admin and academic staff

5. **Transcript Generation**
   - Implemented in: `TranscriptGenerator.tsx`
   - Features: Official transcript with GPA
   - Access: Admin and students

6. **Security & Access Control**
   - Implemented in: Role-based rendering throughout
   - Features: Conditional UI based on user role
   - Access: All roles with specific permissions

#### High-Level Business Processes Context

The Student Records module is part of a larger NSBM Green University ERP system that includes:
1. Admissions & Enrollment
2. **Student Records Management** ← This Module
3. Course & Timetable Scheduling
4. Examination & Grading
5. Attendance Tracking
6. Finance & Fees
7. Payroll & HR
8. Library Management
9. Hostel/Accommodation
10. Transport Management

### Implementation Decisions

#### Technology Choices
- **React + TypeScript**: Type safety and component reusability
- **Shadcn/ui**: Professional, accessible component library
- **Tailwind CSS**: Rapid UI development with consistent styling
- **Client-side State**: React hooks for efficient state management

#### Design Decisions
- **Role-based UI**: Different interfaces for different user types
- **Responsive Design**: Mobile and desktop support
- **Accessibility**: WCAG 2.1 compliant components
- **User Experience**: Intuitive navigation and clear feedback

#### Future Enhancements
- Backend integration with REST API
- Real-time data synchronization
- Advanced search and filtering
- Bulk operations support
- Export to multiple formats (PDF, Excel)
- Email notifications
- Audit logging
- Data archiving for graduated students

## 📝 Development Notes

### Data Management
The application uses client-side state management with sample data:
- Student profiles and enrollment information
- Academic records and grade tracking
- Attendance monitoring and statistics
- Transcript generation capabilities

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance
- Code splitting for optimal loading
- Lazy loading of components
- Optimized re-renders with React hooks

## 🤝 Contributing

This project is part of an academic ERP systems course. For questions or improvements:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is developed for educational purposes as part of NSBM Green University coursework.


