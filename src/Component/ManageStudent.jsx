import { LuPencil } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const ManageStudent = () => {
    const [currentTime, setCurrentTime] = useState("");
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('')



    const updateTime = () => {
        const now = new Date();
        const formattedTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        setCurrentTime(formattedTime);
    };

    useEffect(() => {
        const intervalId = setInterval(updateTime, 1000);
        updateTime();
        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {

        fetch(`http://localhost:8000/students31?search=${search}`)
            .then(res => res.json())
            .then(data => {
                setStudents(data)

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [search]);

    const handleSearch = (e) => {
        e.preventDefault();
        const text = e.target.search.value;
        setSearch(text);
    };


    const fetchStudents = async () => {
        try {
            const response = await fetch(`http://localhost:8000/students31`);
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };


    const handleDelete = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:8000/registerdelete/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            fetchStudents();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Student id has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
        });
    };







    return (
        <div className="w-[1000px]">
            <div className="flex items-center justify-between space-x-4 p-6 ">
                <h2 className="text-lg font-semibold">Manage Students</h2>

                <form onSubmit={handleSearch} className='flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                    <button type="submit" className="relative px-0 py-2 mt-0 mr-2 font-medium group md:inline pl-4">
                        <IoSearchSharp />
                    </button>
                    <input
                        className='py-2 w-40 max-sm:w-40 text-black bg-white outline-none focus:placeholder-transparent'
                        type='text'
                        name='search'
                        placeholder='Search'
                        aria-label='Enter Student Name'
                    />
                </form>


                <button className="bg-gray-100 px-4 py-2 rounded-md w-[100px] h-[44px]" >Export</button>
                <button className="bg-gray-100 px-4 py-2 rounded-md  w-[100px] h-[44px] shadow-md" >Filter</button>
                <button className="bg-gray-100 px-4 py-2 rounded-md w-[100px] h-[44px]">Print</button>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-600">{currentTime}</span>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow-md">
                <table className="w-full text-left text-gray-600">
                    <thead className="bg-[#f33823] text-white p-4 rounded-t-2xl">
                        <tr className="flex justify-between ">
                            <th className="p-4 flex-1">Name</th>
                            <th className="p-4 flex-1">Class</th>
                            <th className="p-4 flex-1">Roll No.</th>
                            <td className="p-4 flex-1 text-center space-x-2">
                                <span>View</span>
                                <span>/</span>
                                <span>Edit</span>
                                <span>/</span>
                                <span>Delete</span>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr className="flex justify-between" key={index}>
                                <td className="p-4 flex-1 ">{student.firstName}</td>
                                <td className="p-4 flex-1 ">{student.class}</td>
                                <td className="p-4 flex-1">{student.rollNumber}</td>
                                <td className="p-4 flex-1 text-center space-x-8">
                                    <button><FaEye className="text-2xl text-[#f33823]" /></button>
                                    <button><LuPencil className="text-2xl text-[#f33823]" /></button>
                                    <button onClick={() => handleDelete(student._id)}><RiDeleteBin6Line className="text-2xl text-[#f33823]" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageStudent;
