import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage'
import NavBar from './Com/HomeComponent/NavBar';
import Login from './Pages/LoginPage'
import Footer from './Com/HomeComponent/Footer';
import FeatureSection from './Com/HomeComponent/FeatureSection';
import Signup from './Pages/Signup';
import Project from './Pages/Project';
import CreateProject from './Com/Projects/CreateProjectSection';
import Edit from './Com/Projects/EditProject'
import Issue from './Com/Issue/Issue';
import ViewProject from './Com/Projects/VeiwProject'
const App = () => {
  return (
<>
<Router>
<NavBar/>
  <Routes>
    <Route path='/' element={<HomePage/>}/>
     <Route path='/feature' element={<FeatureSection/>}/>
     <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
     <Route path='/create' element={<CreateProject/>}/>
    <Route path='/projects' element={<Project/>}/>
     <Route path="/projects/:projectId" element={<ViewProject />} />
     <Route path="/projects/:projectId/edit" element={<Edit />} />
     <Route path='/project/issue' element={<Issue/>}/>








  </Routes>

</Router>

</>  )
}

export default App