import { Outlet } from "react-router-dom";
import Footer from "../../pages/footer/Footer";

import NavBar from "../navBar/NavBar";

const MainLayout = () => {
  return (
    <div>
      <NavBar></NavBar>
      <main className="min-h-screen">
        <Outlet></Outlet>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
