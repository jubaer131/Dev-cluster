
import Swal from 'sweetalert2'
import { useState, useEffect } from "react";

const AddStudent = () => {


    const [currentTime, setCurrentTime] = useState("");


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

    const handleAddStudent = (event) => {
        event.preventDefault();
        const form = event.target;
        const firstName = form.firstName.value;
        const middleName = form.middleName.value;
        const lastName = form.lastName.value;
        const className = form.class.value;
        const division = form.division.value;
        const rollNumber = form.rollNumber.value;
        const addressLine1 = form.addressLine1.value;
        const addressLine2 = form.addressLine2.value;
        const landmark = form.landmark.value;
        const city = form.city.value;
        const pincode = form.pincode.value;


        const newStudent = {
            firstName,
            middleName,
            lastName,
            class: className,
            division,
            rollNumber,
            addressLine1,
            addressLine2,
            landmark,
            city,
            pincode,

        };

        console.log(newStudent);

        fetch('http://localhost:8000/students', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newStudent),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {

                    Swal.fire({
                        title: 'Success',
                        text: 'Student added successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                    });
                }
            })
            .catch(error => {
                console.error('Error adding student:', error);
            });
    };

    return (
        <div className='space-y-8'>
            <div className="flex justify-between items-center  ">
                <h1 className="text-2xl text-[#333538] font-bold">Add Students</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-600">{currentTime}</span>
                </div>
            </div>
            <form onSubmit={handleAddStudent} className='flex flex-col gap-5'>
                <div className='flex justify-between items-center gap-5'>
                    <input name="firstName" type="text" placeholder="First Name" className="input input-bordered w-full" required />
                    <input name="middleName" type="text" placeholder="Middle Name" className="input input-bordered w-full" required />
                    <input name="lastName" type="text" placeholder="Last Name" className="input input-bordered w-full" required />
                </div>
                <div className='flex justify-between items-center gap-5'>
                    <input name="class" type="text" placeholder="Select Class" className="input input-bordered w-full" required />
                    <input name="division" type="text" placeholder="Select Division" className="input input-bordered w-full" required />
                    <input name="rollNumber" type="text" placeholder="Enter Roll Number in Digit" className="input input-bordered w-full" required />
                </div>
                <div className='flex justify-between items-center pt-8 gap-5'>
                    <input name="addressLine1" type="text" placeholder="Address Line 1" className="input input-bordered w-full" required />
                    <input name="addressLine2" type="text" placeholder="Address Line 2" className="input input-bordered w-full" />
                </div>
                <div className='flex justify-between items-center gap-5'>
                    <input name="landmark" type="text" placeholder="Landmark" className="input input-bordered w-full" />
                    <input name="city" type="text" placeholder="City" className="input input-bordered w-full" />
                    <input name="pincode" type="text" placeholder="Pincode" className="input input-bordered w-full" />
                </div>
                <button type='submit' className='btn w-56 bg-[#f33823] text-white'>Add Student</button>
            </form>
        </div>
    );
};

export default AddStudent;