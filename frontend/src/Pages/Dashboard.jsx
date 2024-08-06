import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="bg-black">
      <Outlet />
    </div>
  );
};

export default Dashboard;
