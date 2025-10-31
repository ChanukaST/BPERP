import { useState } from 'react';
import { User, UserRole } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { GraduationCap } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const handleLogin = () => {
    if (!selectedRole) return;

    const users: Record<string, User> = {
      admin: {
        id: 'admin-001',
        name: 'Sarah Johnson',
        role: 'admin',
        email: 'sarah.johnson@nsbm.ac.lk'
      },
      academic: {
        id: 'acad-001',
        name: 'Dr. Michael Chen',
        role: 'academic',
        email: 'michael.chen@nsbm.ac.lk'
      },
      student: {
        id: 'student-001',
        name: 'Emma Williams',
        role: 'student',
        email: 'emma.williams@students.nsbm.ac.lk',
        studentId: 'STU2024001'
      }
    };

    onLogin(users[selectedRole]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-600 p-3 rounded-full">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle>NSBM Green University</CardTitle>
          <CardDescription>
            Student Records ERP System - Select your role to access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">User Role</Label>
            <Select value={selectedRole || ''} onValueChange={(value) => setSelectedRole(value as UserRole)}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrative Staff</SelectItem>
                <SelectItem value="academic">Academic Staff</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedRole && (
            <div className="bg-green-50 p-3 rounded-md text-sm">
              <p className="text-green-900">
                {selectedRole === 'admin' && 'Full access to manage all student records'}
                {selectedRole === 'academic' && 'Input grades, attendance, and course details'}
                {selectedRole === 'student' && 'View personal academic records'}
              </p>
            </div>
          )}

          <Button 
            onClick={handleLogin} 
            disabled={!selectedRole}
            className="w-full"
          >
            Sign In
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Secure access to NSBM Green University information system
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
