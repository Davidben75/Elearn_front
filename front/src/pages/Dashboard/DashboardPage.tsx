import QuickAction from "../../components/QuickAction";
import Sidebar from "../../components/Sidebar";

const DashboardPage = () => {
    return (
        <main className="flex h-screen bg-grey-100">
            <Sidebar />
            <h1>Dashboard</h1>
            <QuickAction />
        </main>
    );
};

export default DashboardPage;
