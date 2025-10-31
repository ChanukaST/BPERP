import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { LoginScreen } from './components/LoginScreen';

export type UserRole = 'admin' | 'academic' | 'student' | null;

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  studentId?: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {!currentUser ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}
