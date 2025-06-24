import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="memberships" element={<Memberships />} />
          <Route path="trainings" element={<Trainings />} />
          <Route path="diets" element={<Diets />} />
          <Route path="feedbacks" element={<Feedbacks />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="/memberships" element={<MembershipList />} />
          <Route path="/memberships/add" element={<AddMembership />} />
          <Route path="/memberships/edit/:id" element={<AddMembership />} />
          <Route path="/trainings" element={<TrainingList />} />
          <Route path="/trainings/add" element={<AddTraining />} />
          <Route path="/trainings/edit/:id" element={<AddTraining />} />
          <Route path="/diets" element={<DietPlans />} />
          <Route path="/diets/add" element={<AddDiet />} />
          <Route path="/diets/edit/:id" element={<AddDiet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
