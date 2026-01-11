import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './pages/public/HomePage';
import LocationsPage from './pages/public/LocationsPage';
import TrainingTypesPage from './pages/public/TrainingTypesPage';
import LoginPage from './pages/common/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLocationsPage from './pages/admin/AdminLocationsPage';
import CreateEmployeePage from './pages/admin/CreateEmployeePage';
import AdminEmployeesPage from './pages/admin/AdminEmployeesPage';
import AdminMembersPage from './pages/admin/AdminMembersPage';
import CreateLocationPage from './pages/admin/CreateLocationPage';
import EditLocationPage from './pages/admin/EditLocationPage';
import CreateTrainingTypePage from './pages/employee/CreateTrainingTypePage';
import CreateSessionPage from './pages/employee/CreateSessionPage';
import CreateMemberPage from './pages/employee/CreateMemberPage';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import EmployeeSessionsPage from './pages/employee/EmployeeSessionsPage';
import MemberDashboard from './pages/member/MemberDashboard';
import BuyTrainingPage from './pages/member/purchases/BuyTrainingPage';
import MemberPurchasesPage from './pages/member/purchases/MemberPurchasesPage';
import MemberReservationsPage from './pages/member/MemberReservationsPage';
import CreateReservationPage from './pages/member/CreateReservationPage';
import SessionByTypePage from './pages/member/SessionByType';
import SessionReservationsPage from './pages/employee/SessionReservationsPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/training-types" element={<TrainingTypesPage />} />
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
              path="/admin/locations"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminLocationsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/locations/create"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <CreateLocationPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/locations/edit/:id"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <EditLocationPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/employees/create"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <CreateEmployeePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/employees"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminEmployeesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/members"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminMembersPage />
                </ProtectedRoute>
              }
            />



            <Route
              path="/employee"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'EMPLOYEE']}>
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/employee/members/create"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'EMPLOYEE']}>
                  <CreateMemberPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/employee/training-types/create"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'EMPLOYEE']}>
                  <CreateTrainingTypePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/employee/sessions/create"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'EMPLOYEE']}>
                  <CreateSessionPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/employee/sessions"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'EMPLOYEE']}>
                  <EmployeeSessionsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/employee/sessions/:sessionId/reservations"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'EMPLOYEE']}>
                  <SessionReservationsPage />
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

            <Route
              path="/member/purchases"
              element={
                <ProtectedRoute allowedRoles={['MEMBER']}>
                  <MemberPurchasesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/member/purchases/buy"
              element={
                <ProtectedRoute allowedRoles={['MEMBER']}>
                  <BuyTrainingPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/member/reservations"
              element={
                <ProtectedRoute allowedRoles={['MEMBER']}>
                  <MemberReservationsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/member/reservations/create"
              element={
                <ProtectedRoute allowedRoles={['MEMBER']}>
                  <CreateReservationPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/member/sessions/:typeId"
              element={
                <ProtectedRoute allowedRoles={['MEMBER']}>
                  <SessionByTypePage />
                </ProtectedRoute>
              }
            />


            <Route path="/unauthorized" element={<div style={{ padding: '40px', textAlign: 'center' }}><h1>Nemate pristup</h1></div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;