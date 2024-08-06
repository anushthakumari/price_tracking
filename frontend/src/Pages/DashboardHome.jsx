import Body from "./../components/Body";

import { useUser } from "../userContext";
const DashboardHome = ({ setSelectedProduct }) => {
  const { userData } = useUser();
  return (
    <div>
      <h1 className="quicksand text-white text-center text-2xl p-4 underline">
        Welcome {userData.user.username}
      </h1>
      <Body setSelectedProduct={setSelectedProduct} />
    </div>
  );
};

export default DashboardHome;
