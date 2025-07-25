import React from 'react'
import HomePage from './Pages/HomePage'
import NavBar from './Com/NavBar'
import './App.css'; // <- Import here
import AboutSection from './Com/AboutSection';
import FeatureSection from './Com/FeatureSection';
import TrustedSection from './Com/TrustedSection';
import Footer from './Com/Footer';
import ContactSection from './Com/ContactSection';
import Signup from './Pages/Signup';
import Login from './Pages/LoginPage';
import CreateProjectSection from './Com/CreateProjectSection';
import ListsPro from './Com/ListsPro';
import SearchProjects from './Com/SearchComponent';
const App = () => {
  return (
<>
<NavBar/>
<SearchProjects></SearchProjects>
<ListsPro></ListsPro>

<CreateProjectSection></CreateProjectSection>
<Signup></Signup>
<Login></Login>


</>
  )
}

export default App