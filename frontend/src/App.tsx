import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './pages/common/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import MemberDashboard from './pages/member/MemberDashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/employee"
              element={
                <ProtectedRoute allowedRoles={['EMPLOYEE']}>
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/member"
              element={
                <ProtectedRoute allowedRoles={['MEMBER']}>
                  <MemberDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/unauthorized" element={<div style={{ padding: '40px', textAlign: 'center' }}><h1>Unauthorized</h1><p>You don't have permission to access this page.</p></div>} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;