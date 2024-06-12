import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { signOutAccount } from "@/lib/appwrite/api";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function RootLayout() {
  const { setUser, setIsAuthenticated } = useUserContext();
  const navigate = useNavigate();
  const logout = async () => {
    await signOutAccount();
    setIsAuthenticated(false);
    navigate("/sign-in");
  };
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />
      <section className="flex flex-1 h-full">
         <Outlet />
      </section>
      <Bottombar />
    </div>
  );
}

export default RootLayout;
