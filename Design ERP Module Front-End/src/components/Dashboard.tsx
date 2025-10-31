import { useState } from 'react';
import { User } from '../App';
import { Sidebar } from './Sidebar';
import { StudentsManagement } from './StudentsManagement';
import { StudentProfile } from './StudentProfile';
import { AcademicRecords } from './AcademicRecords';
import { TranscriptGenerator } from './TranscriptGenerator';
import { OverviewDashboard } from './OverviewDashboard';
import { AttendanceManagement } from './AttendanceManagement';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export type ActiveView = 'overview' | 'students' | 'profile' | 'academic' | 'attendance' | 'transcript';

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeView, setActiveView] = useState<ActiveView>('overview');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const handleViewStudent = (studentId: string) => {
    setSelectedStudentId(studentId);
    setActiveView('profile');
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar 
        user={user} 
        activeView={activeView}
        onViewChange={setActiveView}
        onLogout={onLogout}
      />
      
      <main className="flex-1 overflow-y-auto">
        {activeView === 'overview' && <OverviewDashboard user={user} />}
        {activeView === 'students' && <StudentsManagement user={user} onViewStudent={handleViewStudent} />}
        {activeView === 'profile' && <StudentProfile user={user} studentId={selectedStudentId} />}
        {activeView === 'academic' && <AcademicRecords user={user} />}
        {activeView === 'attendance' && <AttendanceManagement user={user} />}
        {activeView === 'transcript' && <TranscriptGenerator user={user} />}
      </main>
    </div>
  );
}
