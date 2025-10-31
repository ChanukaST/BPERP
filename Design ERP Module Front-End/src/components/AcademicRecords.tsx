import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus, Filter } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AcademicRecordsProps {
  user: User;
}

interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  courseCode: string;
  courseName: string;
  semester: string;
  grade: string;
  credits: number;
  instructor: string;
}

const gradeRecords: Grade[] = [
  { id: '1', studentId: 'STU2024001', studentName: 'Emma Williams', courseCode: 'CS301', courseName: 'Data Structures', semester: 'Fall 2024', grade: 'A', credits: 4, instructor: 'Dr. Chen' },
  { id: '2', studentId: 'STU2024001', studentName: 'Emma Williams', courseCode: 'CS302', courseName: 'Database Systems', semester: 'Fall 2024', grade: 'A-', credits: 3, instructor: 'Dr. Johnson' },
  { id: '3', studentId: 'STU2024002', studentName: 'James Anderson', courseCode: 'BUS201', courseName: 'Marketing Principles', semester: 'Fall 2024', grade: 'B+', credits: 3, instructor: 'Prof. Smith' },
  { id: '4', studentId: 'STU2024001', studentName: 'Emma Williams', courseCode: 'CS303', courseName: 'Web Development', semester: 'Fall 2024', grade: 'B+', credits: 3, instructor: 'Dr. Wilson' },
  { id: '5', studentId: 'STU2024003', studentName: 'Sophia Martinez', courseCode: 'ENG401', courseName: 'Advanced Thermodynamics', semester: 'Fall 2024', grade: 'A', credits: 4, instructor: 'Dr. Brown' },
];

export function AcademicRecords({ user }: AcademicRecordsProps) {
  const [grades, setGrades] = useState<Grade[]>(gradeRecords);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filterSemester, setFilterSemester] = useState('all');
  const [newGrade, setNewGrade] = useState({
    studentId: '',
    courseCode: '',
    grade: ''
  });

  const filteredGrades = user.role === 'student'
    ? grades.filter(g => g.studentId === (user.studentId || 'STU2024001'))
    : filterSemester === 'all'
    ? grades
    : grades.filter(g => g.semester === filterSemester);

  const handleAddGrade = () => {
    // Find student and course info
    const student = gradeRecords.find(g => g.studentId === newGrade.studentId);
    
    const grade: Grade = {
      id: Date.now().toString(),
      studentId: newGrade.studentId,
      studentName: student?.studentName || 'Unknown Student',
      courseCode: newGrade.courseCode,
      courseName: 'Course Name',
      semester: 'Fall 2024',
      grade: newGrade.grade,
      credits: 3,
      instructor: user.name
    };

    setGrades([...grades, grade]);
    setIsAddDialogOpen(false);
    setNewGrade({ studentId: '', courseCode: '', grade: '' });
    toast.success('Grade added successfully');
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const calculateGPA = () => {
    const gradePoints: Record<string, number> = {
      'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0.0
    };

    let totalPoints = 0;
    let totalCredits = 0;

    filteredGrades.forEach(record => {
      const points = gradePoints[record.grade] || 0;
      totalPoints += points * record.credits;
      totalCredits += record.credits;
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const canAddGrades = user.role === 'admin' || user.role === 'academic';

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-slate-900 mb-2">Academic Records</h1>
        <p className="text-slate-600">
          {user.role === 'student' ? 'View your grades and academic performance' : 'Manage student grades and academic records'}
        </p>
      </div>

      {user.role === 'student' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-600">Current GPA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-slate-900">{calculateGPA()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-600">Total Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-slate-900">
                {filteredGrades.reduce((sum, g) => sum + g.credits, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-600">Courses Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-slate-900">{filteredGrades.length}</div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Grade Records</CardTitle>
            <div className="flex gap-2">
              {user.role !== 'student' && (
                <Select value={filterSemester} onValueChange={setFilterSemester}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Semesters</SelectItem>
                    <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                    <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                    <SelectItem value="Fall 2023">Fall 2023</SelectItem>
                  </SelectContent>
                </Select>
              )}
              {canAddGrades && (
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Grade
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Grade Record</DialogTitle>
                      <DialogDescription>
                        Enter a new grade for a student
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="studentId">Student ID</Label>
                        <Input
                          id="studentId"
                          value={newGrade.studentId}
                          onChange={(e) => setNewGrade({ ...newGrade, studentId: e.target.value })}
                          placeholder="STU2024001"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="courseCode">Course Code</Label>
                        <Input
                          id="courseCode"
                          value={newGrade.courseCode}
                          onChange={(e) => setNewGrade({ ...newGrade, courseCode: e.target.value })}
                          placeholder="CS301"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="grade">Grade</Label>
                        <Select value={newGrade.grade} onValueChange={(value) => setNewGrade({ ...newGrade, grade: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A">A</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="C+">C+</SelectItem>
                            <SelectItem value="C">C</SelectItem>
                            <SelectItem value="C-">C-</SelectItem>
                            <SelectItem value="D">D</SelectItem>
                            <SelectItem value="F">F</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddGrade}>Add Grade</Button>
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
                  {user.role !== 'student' && <TableHead>Student ID</TableHead>}
                  {user.role !== 'student' && <TableHead>Student Name</TableHead>}
                  <TableHead>Course Code</TableHead>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Grade</TableHead>
                  {user.role !== 'student' && <TableHead>Instructor</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrades.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-slate-500">
                      No grade records found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredGrades.map((record) => (
                    <TableRow key={record.id}>
                      {user.role !== 'student' && <TableCell>{record.studentId}</TableCell>}
                      {user.role !== 'student' && <TableCell>{record.studentName}</TableCell>}
                      <TableCell>{record.courseCode}</TableCell>
                      <TableCell>{record.courseName}</TableCell>
                      <TableCell>{record.semester}</TableCell>
                      <TableCell>{record.credits}</TableCell>
                      <TableCell>
                        <Badge className={getGradeColor(record.grade)} variant="secondary">
                          {record.grade}
                        </Badge>
                      </TableCell>
                      {user.role !== 'student' && <TableCell>{record.instructor}</TableCell>}
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
