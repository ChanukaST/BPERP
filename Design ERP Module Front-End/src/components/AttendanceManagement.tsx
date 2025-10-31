import { useState } from 'react';
import { User } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';

interface AttendanceManagementProps {
  user: User;
}

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  courseCode: string;
  courseName: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

const attendanceRecords: AttendanceRecord[] = [
  { id: '1', studentId: 'STU2024001', studentName: 'Emma Williams', courseCode: 'CS301', courseName: 'Data Structures', date: '2024-10-28', status: 'present' },
  { id: '2', studentId: 'STU2024002', studentName: 'James Anderson', courseCode: 'CS301', courseName: 'Data Structures', date: '2024-10-28', status: 'present' },
  { id: '3', studentId: 'STU2024003', studentName: 'Sophia Martinez', courseCode: 'CS301', courseName: 'Data Structures', date: '2024-10-28', status: 'late' },
  { id: '4', studentId: 'STU2024004', studentName: 'Michael Brown', courseCode: 'CS301', courseName: 'Data Structures', date: '2024-10-28', status: 'absent' },
  { id: '5', studentId: 'STU2024001', studentName: 'Emma Williams', courseCode: 'CS302', courseName: 'Database Systems', date: '2024-10-27', status: 'present' },
  { id: '6', studentId: 'STU2024002', studentName: 'James Anderson', courseCode: 'CS302', courseName: 'Database Systems', date: '2024-10-27', status: 'present' },
];

export function AttendanceManagement({ user }: AttendanceManagementProps) {
  const [attendance] = useState<AttendanceRecord[]>(attendanceRecords);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedDate, setSelectedDate] = useState('2024-10-28');

  const courses = Array.from(new Set(attendance.map(a => a.courseCode)));

  const filteredAttendance = attendance.filter(record => {
    const courseMatch = selectedCourse === 'all' || record.courseCode === selectedCourse;
    const dateMatch = !selectedDate || record.date === selectedDate;
    return courseMatch && dateMatch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-800" variant="secondary">Present</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-800" variant="secondary">Absent</Badge>;
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-800" variant="secondary">Late</Badge>;
      default:
        return null;
    }
  };

  const calculateStats = () => {
    const total = filteredAttendance.length;
    const present = filteredAttendance.filter(a => a.status === 'present' || a.status === 'late').length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : '0';
    
    return { total, present, percentage };
  };

  const stats = calculateStats();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-slate-900 mb-2">Attendance Management</h1>
        <p className="text-slate-600">Track and manage student attendance records</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-600">Total Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-slate-900">{stats.total}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-600">Present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-slate-900">{stats.present}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-600">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-slate-900">{stats.percentage}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Attendance Records</CardTitle>
            <div className="flex gap-2">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map(course => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-md text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendance.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-slate-500">
                      No attendance records found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAttendance.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.studentId}</TableCell>
                      <TableCell>{record.studentName}</TableCell>
                      <TableCell>
                        {record.courseCode} - {record.courseName}
                      </TableCell>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
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
