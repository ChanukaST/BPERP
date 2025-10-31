import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface StudentsManagementProps {
  user: User;
  onViewStudent: (studentId: string) => void;
}

interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  program: string;
  year: string;
  gpa: number;
  status: 'active' | 'inactive' | 'graduated';
}

const initialStudents: Student[] = [
  { id: '1', studentId: 'STU2024001', name: 'Emma Williams', email: 'emma.williams@students.nsbm.ac.lk', program: 'Computer Science', year: '3rd Year', gpa: 3.67, status: 'active' },
  { id: '2', studentId: 'STU2024002', name: 'James Anderson', email: 'james.anderson@students.nsbm.ac.lk', program: 'Business Administration', year: '2nd Year', gpa: 3.45, status: 'active' },
  { id: '3', studentId: 'STU2024003', name: 'Sophia Martinez', email: 'sophia.martinez@students.nsbm.ac.lk', program: 'Engineering', year: '4th Year', gpa: 3.89, status: 'active' },
  { id: '4', studentId: 'STU2024004', name: 'Michael Brown', email: 'michael.brown@students.nsbm.ac.lk', program: 'Psychology', year: '1st Year', gpa: 3.12, status: 'active' },
  { id: '5', studentId: 'STU2023050', name: 'Olivia Davis', email: 'olivia.davis@students.nsbm.ac.lk', program: 'Computer Science', year: 'Graduate', gpa: 3.95, status: 'graduated' },
];

export function StudentsManagement({ user, onViewStudent }: StudentsManagementProps) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    program: '',
    year: ''
  });

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStudent = () => {
    const student: Student = {
      id: Date.now().toString(),
      studentId: `STU${Date.now()}`,
      name: newStudent.name,
      email: newStudent.email,
      program: newStudent.program,
      year: newStudent.year,
      gpa: 0.0,
      status: 'active'
    };

    setStudents([...students, student]);
    setIsAddDialogOpen(false);
    setNewStudent({ name: '', email: '', program: '', year: '' });
    toast.success('Student profile created successfully');
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudents(students.filter(s => s.id !== studentId));
    toast.success('Student record deleted');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'graduated': return 'bg-blue-100 text-blue-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const canEdit = user.role === 'admin';

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-slate-900 mb-2">Student Management</h1>
        <p className="text-slate-600">Manage student profiles and records</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>All Students</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full sm:w-64"
                />
              </div>
              {canEdit && (
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Student
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Student</DialogTitle>
                      <DialogDescription>
                        Create a new student profile in the system
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={newStudent.name}
                          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newStudent.email}
                          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                          placeholder="john.doe@student.edu"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="program">Program</Label>
                        <Select value={newStudent.program} onValueChange={(value) => setNewStudent({ ...newStudent, program: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                            <SelectItem value="Business Administration">Business Administration</SelectItem>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                            <SelectItem value="Psychology">Psychology</SelectItem>
                            <SelectItem value="Medicine">Medicine</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="year">Academic Year</Label>
                        <Select value={newStudent.year} onValueChange={(value) => setNewStudent({ ...newStudent, year: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1st Year">1st Year</SelectItem>
                            <SelectItem value="2nd Year">2nd Year</SelectItem>
                            <SelectItem value="3rd Year">3rd Year</SelectItem>
                            <SelectItem value="4th Year">4th Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddStudent}>Create Profile</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-slate-500">
                      No students found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.studentId}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.program}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>{student.gpa.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status)} variant="secondary">
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onViewStudent(student.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {canEdit && (
                            <>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteStudent(student.id)}
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
