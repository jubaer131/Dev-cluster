
import { NavLink, Outlet } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { FaUserGroup } from "react-icons/fa6";
import { GrLogout } from "react-icons/gr";
import { BiCollapse } from "react-icons/bi";

const Dashboard = () => {
    return (
        <>
            <div className="flex justify-between items-center  w-[1300px] mx-auto p-8">
                <h1 className="text-2xl text-[#f33823] font-bold">Dev cluster</h1>
                <button className="btn mr-36 flex items-center gap-4 "><LuUser />username@dev-cluster.com</button>
            </div>
            <div className="w-[1350px] mx-auto flex items-start ">

                <div className="bg-white w-64 mt-[100px]">

                    <ul className="space-y-6">
                        <li>
                            <NavLink
                                to="/add-student"
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex items-center space-x-3 text-white  bg-[#f33823] p-2 rounded cursor-pointer"
                                        : "flex items-center space-x-3 text-gray-600 hover:text-black cursor-pointer"
                                }
                            >
                                <span><FaUserGroup className="text-2xl" /></span>
                                <span>Add Student</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/managestudent"
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex items-center space-x-3 text-white  bg-[#f33823] p-2 rounded cursor-pointer"
                                        : "flex items-center space-x-3 text-gray-600 hover:text-black cursor-pointer"
                                }
                            >
                                <span><BiCollapse className="text-2xl" /></span>
                                <span>Manage Students</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/logout"
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex items-center space-x-3 text-white bg-[#f33823] p-2 rounded cursor-pointer"
                                        : "flex items-center space-x-3 text-gray-600 hover:text-black cursor-pointer"
                                }
                            >
                                <span><GrLogout className="text-2xl" /></span>
                                <span>Logout</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
