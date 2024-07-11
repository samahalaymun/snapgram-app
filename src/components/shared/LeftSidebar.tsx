import { sidebarLinks } from "@/constants";
import { INITIAL_USER, useUserContext } from "@/context/AuthContext";
import { INavLink } from "@/types";
import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";


function LeftSidebar() {
  const { user, setIsAuthenticated, setUser } = useUserContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const logout = async () => {
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };
  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);
  return (
    <nav className="leftsidebar border-r border-dark-4">
      <div className="flex flex-col gap-10">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:leftsidebar-link-hover ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
          <li
            key={user?.username}
            className={`leftsidebar-link group ${
              pathname === `/profile/${user.id}` && "bg-primary-500"
            }`}
          >
            <NavLink
              to={`/profile/${user.id}`}
              className="flex gap-4 items-center p-4"
            >
              <img
                src={user?.imageUrl}
                alt={user?.imageUrl}
                className=" rounded-full group-hover:scale-110"
               width={26}
               height={26}
              />
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => logout()}
      >
        <img src="/assets/icons/logout.svg" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
}

export default LeftSidebar;
