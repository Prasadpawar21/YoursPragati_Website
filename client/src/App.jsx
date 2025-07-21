import './App.css' ;
import 'react-datepicker/dist/react-datepicker.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";
import Login from './Components/Login'  ; 
import Signup from './Components/Signup' ; 
import CreateBlog from './Components/CreateBlog'; 
import AllBlogs from './Components/AllBlogs';
import SpecificBlog from './Components/SpecificBlog';
import AdminDashboard from './Components/AdminDashboard';
import AllUsers from './Components/UserData';
import BlogsData from './Components/BlogsData';
import EditBlog from './Components/EditBlog';
import Home from './Components/Home' ;
import UserActivity from './Components/UserActivity';
import AdminCollabPage from './Components/CollabData' ;
import AdminAccessPage from './Components/AdminAccess' ;
import AdminServices from './Components/ServicesData' ;
import AddService from './Components/AddService' ;
import FieldWork from './Components/DataCollectionData' ;
import EditService from './Components/EditService';
import DataCollectionAddImage from './Components/DataCollectionAddImage';
import EditActivity from './Components/EditActivity';
import EditImage from './Components/DataCollectionEditImage';
import AnimatedHello from './Components/Animation';
import TeamsData from './Components/TeamsData';
import AddTeamMember from './Components/AddTeamMember';
import EditTeamMember from './Components/EditTeamMember';
import ContactUs from './Components/ContactUs';
import TempHome from './Components/TempHome' ; 
import TeamPage from './Components/AllTeamMemebers' ; 
import UiverseCard from "./Components/UiverseCard";
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<TempHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route path="/all-blogs/:id" element={<SpecificBlog />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/all-users" element={<AllUsers />} />
        <Route path="/admin-dashboard/blogs-data" element={<BlogsData />} />
        <Route path="/admin-dashboard/blogs-data/create-blog" element={<CreateBlog />} />
        <Route path="/admin-dashboard/blogs-data/edit-blog/:id" element={<EditBlog />} />
        <Route path="/activities" element={<UserActivity />} />
        <Route path="/admin-dashboard/collab" element={<AdminCollabPage />} />
        <Route path="/admin-dashboard/admin-access" element={<AdminAccessPage />} />
        <Route path="/admin-dashboard/services" element={<AdminServices />} />
        <Route path="/admin-dashboard/services/add-service" element={<AddService />} />
        <Route path="/admin-dashboard/field-work" element={<FieldWork />} />
        <Route path="/admin-dashboard/field-work/create" element={<DataCollectionAddImage />} />
        <Route path="/admin-dashboard/services/edit/:id" element={<EditService />} />
        <Route path="/activities/edit/:id" element={<EditActivity />} />
        <Route path="/admin-dashboard/field-work/edit/:id" element={<EditImage />} />
        <Route path="/animation" element={<AnimatedHello />} />
        <Route path="/admin-dashboard/teams" element={<TeamsData />} />
        <Route path="/admin-dashboard/teams/add" element={<AddTeamMember />} />
        <Route path="/admin-dashboard/teams/edit/:id" element={<EditTeamMember />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/uiverseCard" element={<UiverseCard/>} /> 
      </Routes>
    </Router>
  )
}

export default App
