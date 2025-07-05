import { BrowserRouter, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

// Admin imports
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Memberships from "./pages/Memberships";
import Trainings from "./pages/Trainings";
import Diets from "./pages/Diets";
import Feedbacks from "./pages/Feedbacks";
import Testimonials from "./pages/Testimonials";
import Contacts from "./pages/Contacts";
import AddMembership from "./pages/AddMembership";
import MembershipList from "./pages/Memberships";
import TrainingList from "./pages/Trainings";
import AddTraining from "./pages/AddTraining";
import DietPlans from "./pages/Diets";
import AddDiet from "./pages/AddDiet";
import AuthPage from "./pages/AuthPage";
import ForgetPassword from "./pages/ForgetPassword";
import ProtectedRoute from "./components/ProtectedRoute";

// User imports
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import UserDashboard from "./pages/user/UserDashboard";
import ProtectedUserRoute from "./components/ProtectedUserRoute";
import UserForgotPassword from "./pages/user/UserForgotPassword";
import Users from "./pages/Users";
import AddUserModal from "./pages/AddUserModal";
import EditMembership from "./pages/EditMembership";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==== Public Admin Routes ==== */}
        <Route path="/admin-auth" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />

        {/* ==== Protected Admin Dashboard ==== */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="add-user" element={<AddUserModal />} />
            <Route path="memberships" element={<MembershipList />} />
            <Route path="memberships/add" element={<AddMembership />} />
            <Route path="memberships/edit/:id" element={<AddMembership />} />
            <Route path="trainings" element={<TrainingList />} />
            <Route path="trainings/add" element={<AddTraining />} />
            <Route path="trainings/edit/:id" element={<AddTraining />} />
            <Route path="diets" element={<DietPlans />} />
            <Route path="diets/add" element={<AddDiet />} />
            <Route path="diets/edit/:id" element={<AddDiet />} />
            <Route path="feedbacks" element={<Feedbacks />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="/memberships/edit/:id" element={<EditMembership />} />
          </Route>
        </Route>

        {/* ==== Public User Routes ==== */}
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-register" element={<UserRegister />} />

        <Route path="/user-forgot-password" element={<UserForgotPassword />} />

        {/* ==== Protected User Dashboard ==== */}
        <Route element={<ProtectedUserRoute />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
