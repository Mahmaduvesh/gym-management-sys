import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

// ================= ADMIN =================
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import MembershipList from "./pages/Memberships";
import TrainingList from "./pages/Trainings";
import DietPlans from "./pages/Diets";
import Feedbacks from "./pages/Feedbacks";
import Testimonials from "./pages/Testimonials";
import Contacts from "./pages/Contacts";
import AddMembership from "./pages/AddMembership";
import AddTraining from "./pages/AddTraining";
import AddDiet from "./pages/AddDiet";
import Users from "./pages/Users";
import AddUserModal from "./pages/AddUserModal";
import EditMembership from "./pages/EditMembership";
import AuthPage from "./pages/AuthPage";
import ForgetPassword from "./pages/ForgetPassword";
import ProtectedRoute from "./components/ProtectedRoute";

// ================= USER =================
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import UserDashboard from "./pages/user/UserDashboard";
import UserForgotPassword from "./pages/user/UserForgotPassword";
import ProtectedUserRoute from "./components/ProtectedUserRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/user-login" replace />} />

        {/* ================= USER ROUTES ================= */}

        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/user-forgot-password" element={<UserForgotPassword />} />

        <Route element={<ProtectedUserRoute />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}

        <Route path="/admin-auth" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />

            <Route path="users" element={<Users />} />
            <Route path="add-user" element={<AddUserModal />} />

            <Route path="memberships" element={<MembershipList />} />
            <Route path="memberships/add" element={<AddMembership />} />
            <Route path="memberships/edit/:id" element={<EditMembership />} />

            <Route path="trainings" element={<TrainingList />} />
            <Route path="trainings/add" element={<AddTraining />} />
            <Route path="trainings/edit/:id" element={<AddTraining />} />

            <Route path="diets" element={<DietPlans />} />
            <Route path="diets/add" element={<AddDiet />} />
            <Route path="diets/edit/:id" element={<AddDiet />} />

            <Route path="feedbacks" element={<Feedbacks />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="contacts" element={<Contacts />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/user-login" replace />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
