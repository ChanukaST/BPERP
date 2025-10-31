# Git Repository Setup Guide

This guide provides instructions for setting up a clean Git repository with proper version control practices.

## Initial Setup

### 1. Initialize Git Repository

```bash
git init
```

### 2. Add All Files

```bash
git add .
```

### 3. Create Initial Commit

```bash
git commit -m "Initial commit: NSBM Green University Student Records ERP

- Implemented role-based authentication system
- Created dashboard with overview statistics
- Built student management module with CRUD operations
- Developed academic records tracking with GPA calculation
- Added attendance management system
- Implemented transcript generation feature
- Integrated responsive design with Tailwind CSS
- Added accessibility features (WCAG 2.1 compliant)
- Included comprehensive documentation"
```

## Connect to GitHub

### 1. Create GitHub Repository

1. Go to https://github.com
2. Click "New repository"
3. Name: `student-records-erp`
4. Description: "NSBM Green University - Student Records ERP System Frontend"
5. Set to **Public**
6. Do NOT initialize with README (we already have one)
7. Click "Create repository"

### 2. Add Remote Origin

```bash
git remote add origin https://github.com/YOUR_USERNAME/student-records-erp.git
```

Replace `YOUR_USERNAME` with your GitHub username.

### 3. Push to GitHub

```bash
git branch -M main
git push -u origin main
```

## Recommended Commit Conventions

Follow these conventions for future commits:

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples:

```bash
git commit -m "feat: add student profile export to PDF"
git commit -m "fix: resolve GPA calculation rounding issue"
git commit -m "docs: update README with deployment instructions"
```

## Verify Repository

After pushing, verify your repository is public and accessible:

1. Visit `https://github.com/YOUR_USERNAME/student-records-erp`
2. Confirm all files are visible
3. Check that README.md displays properly
4. Test the repository URL for LMS submission

## Repository URL for Submission

Your submission URL will be:
```
https://github.com/YOUR_USERNAME/student-records-erp
```

Make sure the repository is set to **Public** before submitting to LMS.
