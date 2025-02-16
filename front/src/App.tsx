import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { SignInPage } from "./pages/SignIn/SignInPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import HomePage from "./pages/Home/Homepage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import useLocalStorage from "./hooks/useLocalStorage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import CoursePage from "./pages/Course/CoursePage";
import ProtectedRoute from "./components/ProtectedRoute";
import UsersPage from "./pages/Users/UsersPage";
import Profile from "./pages/Profile/Profile";
import UserAdd from "./pages/Users/UserAdd";
import CoursePageEdit from "./pages/Course/CoursePageEdit";
import CourseEnrollment from "./pages/Course/CourseEnrollment";
import FirstLogin from "./pages/FirstLogin/FirstLogin";
import { ToastContainer } from "react-toastify";

function App() {
    const location = useLocation();
    const hideHeader = ["/login", "/register"];
    const [user] = useLocalStorage("user", null);

    return (
        <>
            <ToastContainer />
            {!hideHeader.includes(location.pathname) && <Header />}

            <Routes>
                {/* PROTECTED ROUTES */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardPage />} />

                    <Route path="/profile" element={<Profile />} />

                    {/* USERS */}
                    <Route path="/learners" element={<UsersPage />} />
                    <Route path="/add-learner" element={<UserAdd />} />

                    {/* COURSE */}
                    <Route path="/courses" element={<CoursePage />} />
                    <Route
                        path="/course-edit/:id"
                        element={<CoursePageEdit />}
                    />

                    <Route
                        path="/course-enrollment/:id"
                        element={<CourseEnrollment />}
                    />

                    <Route path="//first-login" element={<FirstLogin />} />
                </Route>
                {/* END PROTECTED ROUTES */}

                <Route path="/login" element={<SignInPage />} />
                <Route path="/register" element={<SignUpPage />} />
                <Route
                    path="/"
                    element={user ? <DashboardPage /> : <HomePage />}
                />
            </Routes>
            {!user && <Footer />}
        </>
    );
}

export default App;
