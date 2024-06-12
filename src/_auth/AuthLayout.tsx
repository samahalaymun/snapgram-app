import { useUserContext } from "@/context/AuthContext";
import { Section } from "lucide-react";
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

function AuthLayout() {
  const {isAuthenticated} = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          <img
            alt="form-logo"
            src="/assets/images/side-img.svg"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  );
}

export default AuthLayout;
