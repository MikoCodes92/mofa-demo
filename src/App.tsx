// App.tsx - WITHOUT BrowserRouter
import { Routes, Route } from "react-router-dom";
import { useStore } from "./store/store";
import VolunteerLandingPage from "./features/events/InformationPage";
import RegistrationPage from "./features/auth/RegistrationPage";
import LoginPage from "./features/auth/LoginPage"; // Import LoginPage
import VolunteerProfilePage from "./features/events/VolunteerProfilePage";
import AdminDashboard from "./features/events/AdminDashboard";

function App() {
  const { events } = useStore();

  return (
    <Routes>
      {/* Home/Landing Page */}
      <Route path="/" element={<VolunteerLandingPage events={events} />} />

      {/* Login Page */}
      <Route path="/login" element={<LoginPage />} />

      {/* Registration Page - New user signup */}
      <Route path="/register" element={<RegistrationPage />} />

      <Route path="/admin-dashboard" element={<AdminDashboard />} />

      {/* Event-specific Registration Page (with eventId) */}
      <Route path="/register/:eventId" element={<RegistrationPage />} />

      {/* View All Opportunities */}
      <Route
        path="/volunteer/opportunities"
        element={<VolunteerLandingPage events={events} />}
      />
      <Route path="/profile" element={<VolunteerProfilePage />} />
      {/* 404 redirect */}
      <Route path="*" element={<VolunteerLandingPage events={events} />} />
    </Routes>
  );
}

export default App;
