import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Download, FileText, Printer } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface TranscriptGeneratorProps {
  user: User;
}

export function TranscriptGenerator({ user }: TranscriptGeneratorProps) {
  const [selectedStudent, setSelectedStudent] = useState('STU2024001');
  const [selectedSemester, setSelectedSemester] = useState('all');

  const transcriptData = {
    studentId: 'STU2024001',
    studentName: 'Emma Williams',
    program: 'Bachelor of Science in Computer Science',
    enrollmentDate: 'September 2021',
    dateOfBirth: 'May 15, 2002',
    address: 'Mahenwatte, Pitipana, Homagama, Sri Lanka',
    semesters: [
      {
        name: 'Fall 2024',
        courses: [
          { code: 'CS301', name: 'Data Structures', credits: 4, grade: 'A', points: 4.0 },
          { code: 'CS302', name: 'Database Systems', credits: 3, grade: 'A-', points: 3.7 },
          { code: 'CS303', name: 'Web Development', credits: 3, grade: 'B+', points: 3.3 },
          { code: 'CS304', name: 'Computer Networks', credits: 4, grade: 'A', points: 4.0 },
        ]
      },
      {
        name: 'Spring 2024',
        courses: [
          { code: 'CS201', name: 'Algorithms', credits: 4, grade: 'A', points: 4.0 },
          { code: 'CS202', name: 'Operating Systems', credits: 4, grade: 'B+', points: 3.3 },
          { code: 'CS203', name: 'Software Engineering', credits: 3, grade: 'A-', points: 3.7 },
          { code: 'MAT201', name: 'Discrete Mathematics', credits: 3, grade: 'A', points: 4.0 },
        ]
      }
    ]
  };

  const calculateSemesterGPA = (courses: any[]) => {
    const totalPoints = courses.reduce((sum, c) => sum + (c.points * c.credits), 0);
    const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
    return (totalPoints / totalCredits).toFixed(2);
  };

  const calculateCumulativeGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    
    transcriptData.semesters.forEach(semester => {
      semester.courses.forEach(course => {
        totalPoints += course.points * course.credits;
        totalCredits += course.credits;
      });
    });
    
    return (totalPoints / totalCredits).toFixed(2);
  };

  const handleDownload = () => {
    toast.success('Transcript downloaded successfully');
  };

  const handlePrint = () => {
    window.print();
    toast.success('Opening print dialog...');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-slate-900 mb-2">Transcript Generator</h1>
        <p className="text-slate-600">Generate official academic transcripts</p>
      </div>

      {user.role === 'admin' && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Student</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="student">Student</Label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger id="student">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="STU2024001">STU2024001 - Emma Williams</SelectItem>
                    <SelectItem value="STU2024002">STU2024002 - James Anderson</SelectItem>
                    <SelectItem value="STU2024003">STU2024003 - Sophia Martinez</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester Filter</Label>
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger id="semester">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Semesters</SelectItem>
                    <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                    <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center border-b">
          <div className="mb-4">
            <h2 className="text-slate-900">NSBM Green University</h2>
            <p className="text-slate-600">Official Academic Transcript</p>
          </div>
          <div className="flex justify-center gap-2">
            <Button onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="mb-6">
            <h3 className="text-slate-900 mb-3">Student Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">Student ID:</p>
                <p className="text-slate-900">{transcriptData.studentId}</p>
              </div>
              <div>
                <p className="text-slate-600">Name:</p>
                <p className="text-slate-900">{transcriptData.studentName}</p>
              </div>
              <div>
                <p className="text-slate-600">Program:</p>
                <p className="text-slate-900">{transcriptData.program}</p>
              </div>
              <div>
                <p className="text-slate-600">Enrollment Date:</p>
                <p className="text-slate-900">{transcriptData.enrollmentDate}</p>
              </div>
              <div>
                <p className="text-slate-600">Date of Birth:</p>
                <p className="text-slate-900">{transcriptData.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-slate-600">Cumulative GPA:</p>
                <p className="text-slate-900">{calculateCumulativeGPA()}</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {transcriptData.semesters
            .filter(sem => selectedSemester === 'all' || sem.name === selectedSemester)
            .map((semester, idx) => (
            <div key={idx} className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-slate-900">{semester.name}</h3>
                <p className="text-sm text-slate-600">
                  Semester GPA: {calculateSemesterGPA(semester.courses)}
                </p>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left p-3 text-slate-700">Course Code</th>
                      <th className="text-left p-3 text-slate-700">Course Name</th>
                      <th className="text-center p-3 text-slate-700">Credits</th>
                      <th className="text-center p-3 text-slate-700">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semester.courses.map((course, courseIdx) => (
                      <tr key={courseIdx} className="border-t">
                        <td className="p-3 text-slate-900">{course.code}</td>
                        <td className="p-3 text-slate-900">{course.name}</td>
                        <td className="p-3 text-center text-slate-900">{course.credits}</td>
                        <td className="p-3 text-center text-slate-900">{course.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50 border-t-2">
                    <tr>
                      <td colSpan={2} className="p-3 text-slate-700">Semester Total</td>
                      <td className="p-3 text-center text-slate-900">
                        {semester.courses.reduce((sum, c) => sum + c.credits, 0)}
                      </td>
                      <td className="p-3 text-center text-slate-900">-</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          ))}

          <Separator className="my-6" />

          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-700">Total Credits Earned:</span>
              <span className="text-slate-900">
                {transcriptData.semesters.flatMap(s => s.courses).reduce((sum, c) => sum + c.credits, 0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-700">Cumulative GPA:</span>
              <span className="text-slate-900">{calculateCumulativeGPA()}</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t text-center text-sm text-slate-500">
            <p>This is an official transcript issued on {new Date().toLocaleDateString()}</p>
            <p className="mt-2">NSBM Green University - Registrar's Office</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
