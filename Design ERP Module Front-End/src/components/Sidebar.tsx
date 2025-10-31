import { User } from '../App';
import { ActiveView } from './Dashboard';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { 
  LayoutDashboard, 
  Users, 
  UserCircle, 
  GraduationCap, 
  Calendar,
  FileText,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  user: User;
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
  onLogout: () => void;
}

export function Sidebar({ user, activeView, onViewChange, onLogout }: SidebarProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, roles: ['admin', 'academic', 'student'] },
    { id: 'students', label: 'Student Management', icon: Users, roles: ['admin', 'academic'] },
    { id: 'profile', label: 'My Profile', icon: UserCircle, roles: ['student'] },
    { id: 'academic', label: 'Academic Records', icon: GraduationCap, roles: ['admin', 'academic', 'student'] },
    { id: 'attendance', label: 'Attendance', icon: Calendar, roles: ['admin', 'academic'] },
    { id: 'transcript', label: 'Transcripts', icon: FileText, roles: ['admin', 'student'] },
  ];

  const visibleItems = menuItems.filter(item => item.roles.includes(user.role || ''));

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-slate-900">Student Records</h1>
            <p className="text-xs text-slate-500">ERP System</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
          <Avatar>
            <AvatarFallback className="bg-blue-600 text-white">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-900 truncate">{user.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      <Separator />

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {visibleItems.map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <li key={item.id}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600'}`}
                  onClick={() => onViewChange(item.id as ActiveView)}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      <Separator />

      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
