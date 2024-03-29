import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Company from './components/pages/Company'
import Contact from './components/pages/Contact'
import NewProject from './components/pages/NewProject'


import Container from './components/layout/Container'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Projects from './components/pages/Projects'
import Projeto from './components/pages/Projeto'

function App() {
  return (
   <Router>
    <Navbar />
    <Container customClass='min-height'>
    <Routes>
     
      <Route path="/" element={<Home />}></Route>
      <Route path="/Projects" element={<Projects />}></Route>
      <Route path="/Company" element={<Company />}></Route>
      <Route path="/Contact" element={<Contact />}></Route>
      <Route path="/NewProject" element={<NewProject />}></Route>
      <Route path="/project/:id" element={<Projeto />}></Route>
    </Routes>
    </Container>
    <Footer />
   </Router>
  );
}

export default App;
