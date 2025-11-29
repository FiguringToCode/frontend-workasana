import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../AuthContext";
import { IoHome } from "react-icons/io5";
import { AiOutlineProject } from "react-icons/ai";
import { RiTeamFill } from "react-icons/ri";
import { MdInsertChart } from "react-icons/md";

export const Sidebar = () => {
    const { sidebarOpen, showForm, showProjectForm } = useContext(AuthContext);

    const navItems = [
        {
            name: "Dashboard",
            to: "/dashboard",
            icon: <IoHome className="text-xl" />,
        },
        {
            name: "Projects",
            to: "/projects",
            icon: <AiOutlineProject className="text-xl" />,
        },
        { name: "Teams", to: "/teams", icon: <RiTeamFill className="text-xl" /> },
        {
            name: "Reports",
            to: "/reports",
            icon: <MdInsertChart className="text-xl" />,
        },
    ];

    return (
        <>
            <div className={`fixed z-40 bg-neutral-900 bg-opacity-80 w-64 min-h-full shadow-lg shadow-purple-800 ${
          sidebarOpen
            ? "translate-x-0 transition ease-in duration-200"
            : "-translate-x-64 transition ease-in duration-200"
        } lg:translate-x-0 lg:static lg:transition lg:ease-in lg:duration-200 flex flex-col items-center ${showForm || showProjectForm ? "blurred" : ""}`}
      >
        <div className="flex flex-col items-center">
          <img
            src="/Untitled design.png"
            alt="logo"
            className="w-1/3 mt-10 rounded-lg"
          />
          <h1 className="text-2xl font-semibold my-3 bg-linear-to-r from-blue-400 via-green-400 to-pink-500 bg-clip-text text-transparent">
            Workasana
          </h1>
        </div>
        <div className="p-4">
          {navItems.map(({ name, to, icon }) => (
            <Link
              className="text-indigo-500 flex gap-2 text-lg my-13 items-center hover:bg-indigo-500 hover:text-white hover:rounded-lg hover:transition hover:ease-in hover:duration-500 hover:py-2 hover:px-5"
              key={name}
              to={to}
            >
              {icon}
              {name}
            </Link>
          ))}
        </div>
      </div>
        </>
    )
}