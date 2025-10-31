import { User } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Users, BookOpen, Calendar, TrendingUp } from 'lucide-react';

interface OverviewDashboardProps {
  user: User;
}

export function OverviewDashboard({ user }: OverviewDashboardProps) {
  const adminStats = [
    { label: 'Total Students', value: '2,847', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Courses', value: '156', icon: BookOpen, color: 'bg-green-500' },
    { label: 'This Semester', value: '24 weeks', icon: Calendar, color: 'bg-purple-500' },
    { label: 'Avg. Attendance', value: '87%', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  const academicStats = [
    { label: 'My Courses', value: '8', icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Total Students', value: '234', icon: Users, color: 'bg-green-500' },
    { label: 'Pending Grades', value: '45', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  const studentStats = [
    { label: 'Current Semester', value: '6', icon: Calendar, color: 'bg-blue-500' },
    { label: 'Enrolled Courses', value: '5', icon: BookOpen, color: 'bg-green-500' },
    { label: 'Current GPA', value: '3.67', icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'Attendance', value: '92%', icon: Calendar, color: 'bg-orange-500' },
  ];

  const stats = user.role === 'admin' ? adminStats : user.role === 'academic' ? academicStats : studentStats;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-slate-900 mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-slate-600">
          {user.role === 'admin' && 'Manage student records and monitor system performance'}
          {user.role === 'academic' && 'Manage your courses, grades, and student attendance'}
          {user.role === 'student' && 'View your academic progress and personal records'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-slate-600">{stat.label}</CardTitle>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-slate-900">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {user.role === 'student' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Grades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { course: 'Data Structures', grade: 'A', credits: 4 },
                  { course: 'Database Systems', grade: 'A-', credits: 3 },
                  { course: 'Web Development', grade: 'B+', credits: 3 },
                  { course: 'Computer Networks', grade: 'A', credits: 4 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-900">{item.course}</p>
                      <p className="text-sm text-slate-500">{item.credits} credits</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {item.grade}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { course: 'Data Structures', time: 'Mon, 9:00 AM', room: 'Room 301' },
                  { course: 'Database Systems', time: 'Tue, 11:00 AM', room: 'Lab 2B' },
                  { course: 'Web Development', time: 'Wed, 2:00 PM', room: 'Room 405' },
                  { course: 'Computer Networks', time: 'Thu, 10:00 AM', room: 'Room 302' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-900">{item.course}</p>
                      <p className="text-sm text-slate-500">{item.time}</p>
                    </div>
                    <span className="text-sm text-slate-600">{item.room}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
