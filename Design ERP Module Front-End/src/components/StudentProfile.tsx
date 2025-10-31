import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { UserCircle, Mail, Phone, MapPin, Calendar, Edit2, Save } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface StudentProfileProps {
  user: User;
  studentId: string | null;
}

export function StudentProfile({ user, studentId }: StudentProfileProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Student data
  const studentData = {
    id: studentId || 'STU2024001',
    name: user.role === 'student' ? user.name : 'Emma Williams',
    email: user.role === 'student' ? user.email : 'emma.williams@students.nsbm.ac.lk',
    phone: '+94 71 234 5678',
    address: 'Mahenwatte, Pitipana, Homagama, Sri Lanka',
    dateOfBirth: '2002-05-15',
    enrollmentDate: '2021-09-01',
    program: 'Computer Science',
    year: '3rd Year',
    gpa: 3.67,
    status: 'Active',
    advisor: 'Dr. Michael Chen'
  };

  const courses = [
    { code: 'CS301', name: 'Data Structures', credits: 4, grade: 'A', semester: 'Fall 2024' },
    { code: 'CS302', name: 'Database Systems', credits: 3, grade: 'A-', semester: 'Fall 2024' },
    { code: 'CS303', name: 'Web Development', credits: 3, grade: 'B+', semester: 'Fall 2024' },
    { code: 'CS304', name: 'Computer Networks', credits: 4, grade: 'A', semester: 'Fall 2024' },
    { code: 'CS201', name: 'Algorithms', credits: 4, grade: 'A', semester: 'Spring 2024' },
    { code: 'CS202', name: 'Operating Systems', credits: 4, grade: 'B+', semester: 'Spring 2024' },
  ];

  const attendance = [
    { course: 'Data Structures', present: 28, total: 30, percentage: 93 },
    { course: 'Database Systems', present: 26, total: 28, percentage: 93 },
    { course: 'Web Development', present: 25, total: 28, percentage: 89 },
    { course: 'Computer Networks', present: 29, total: 30, percentage: 97 },
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const canEdit = user.role === 'admin' || user.role === 'student';

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-slate-900 mb-2">Student Profile</h1>
          <p className="text-slate-600">View and manage student information</p>
        </div>
        {canEdit && (
          <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center mb-4">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-3">
                <UserCircle className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-slate-900 text-center">{studentData.name}</h2>
              <p className="text-slate-500">{studentData.id}</p>
              <Badge className="mt-2 bg-green-100 text-green-800" variant="secondary">
                {studentData.status}
              </Badge>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center gap-3 text-slate-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{studentData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{studentData.phone}</span>
              </div>
              <div className="flex items-start gap-3 text-slate-600">
                <MapPin className="w-4 h-4 mt-1" />
                <span className="text-sm">{studentData.address}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Born: {new Date(studentData.dateOfBirth).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardContent className="pt-6">
            <Tabs defaultValue="academic">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="personal">Personal Details</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
              </TabsList>

              <TabsContent value="academic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Program</Label>
                    <p className="text-slate-900 mt-1">{studentData.program}</p>
                  </div>
                  <div>
                    <Label>Academic Year</Label>
                    <p className="text-slate-900 mt-1">{studentData.year}</p>
                  </div>
                  <div>
                    <Label>Current GPA</Label>
                    <p className="text-slate-900 mt-1">{studentData.gpa.toFixed(2)}</p>
                  </div>
                  <div>
                    <Label>Academic Advisor</Label>
                    <p className="text-slate-900 mt-1">{studentData.advisor}</p>
                  </div>
                  <div>
                    <Label>Enrollment Date</Label>
                    <p className="text-slate-900 mt-1">
                      {new Date(studentData.enrollmentDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-slate-900 mb-3">Recent Courses</h3>
                  <div className="space-y-2">
                    {courses.slice(0, 4).map((course, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="text-slate-900">{course.code} - {course.name}</p>
                          <p className="text-sm text-slate-500">{course.credits} credits • {course.semester}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800" variant="secondary">
                          {course.grade}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="personal" className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input
                      id="fullname"
                      defaultValue={studentData.name}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={studentData.email}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        defaultValue={studentData.phone}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        type="date"
                        defaultValue={studentData.dateOfBirth}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      defaultValue={studentData.address}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="attendance" className="space-y-4">
                <div className="space-y-3">
                  {attendance.map((record, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-slate-900">{record.course}</h4>
                        <Badge 
                          className={record.percentage >= 90 ? 'bg-green-100 text-green-800' : record.percentage >= 75 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}
                          variant="secondary"
                        >
                          {record.percentage}%
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">
                        Present: {record.present} / {record.total} classes
                      </p>
                      <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${record.percentage >= 90 ? 'bg-green-600' : record.percentage >= 75 ? 'bg-yellow-600' : 'bg-red-600'}`}
                          style={{ width: `${record.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
