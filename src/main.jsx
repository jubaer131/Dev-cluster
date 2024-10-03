// import React from 'react'
// import ReactDOM from 'react-dom/client'

// import './index.css'
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import Home from './Component/Home/Home.jsx';


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home></Home>,
//     children: [





//     ]

//   }
// ]);


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>,
// )


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './Component/Dashboard';
import ManageStudent from './Component/ManageStudent';
import AddStudent from './Component/AddStudent';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "add-student",
        element: <AddStudent></AddStudent>,
      },
      {
        path: "managestudent",
        element: <ManageStudent></ManageStudent>,
      },

      {
        path: "logout",
        element: <div>Logout Page</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
