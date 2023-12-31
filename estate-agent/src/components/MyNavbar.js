import React from "react";
import { Container, Navbar, Nav } from 'react-bootstrap'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import QAlogo from './../img/QA-logo.png'

import Home from "./Home";

import SellersPage from "./sellers/SellersPage";
import RegisterSeller from "./sellers/RegisterSeller";

import BuyersPage from "./buyers/BuyersPage";
import RegisterBuyer from "./buyers/RegisterBuyer";

import PropertiesPage from "./properties/PropertiesPage";
import SubmitProperty from "./properties/SubmitProperty";
import FilterProperties from "./properties/FilterProperties";
import ViewProperty from "./properties/ViewProperty";
import AmmendProperty from "./properties/AmmendProperty";


function MyNavbar() {
  return (
    <div id="navbar">
      <BrowserRouter>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand><img id="QAlogo" src={QAlogo} alt="QA" /> <i style={{ fontSize: '15px' }}>Estate Agent</i> </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to={'/'}>                <span id="nav-item"> <b>Home       </b> </span></Nav.Link>
                <Nav.Link as={Link} to={'./buyersPage'}>     <span id="nav-item"> <b>Buyers     </b> </span></Nav.Link>
                <Nav.Link as={Link} to={'./sellersPage'}>    <span id="nav-item"> <b>Sellers    </b> </span></Nav.Link>
                <Nav.Link as={Link} to={'./propertiesPage'}> <span id="nav-item"> <b>Properties </b> </span></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>


        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/buyersPage"                                     element={<BuyersPage />} />
          <Route path="/buyersPage/registerBuyer"                       element={<RegisterBuyer />} />
                  
          <Route path="/sellersPage"                                    element={<SellersPage />} />
          <Route path="/sellersPage/registerSeller"                     element={<RegisterSeller />} />
                  
          <Route path="/propertiesPage"                                 element={<PropertiesPage />} />
          <Route path="/propertiesPage/submitProperty"                  element={<SubmitProperty />} />
          <Route path="/propertiesPage/filterProperties"                element={<FilterProperties />} /> 
          <Route path="/propertiesPage/viewProperty"                    element={<ViewProperty />} /> 
          <Route path="/propertiesPage/viewProperty/ammendProperty"     element={<AmmendProperty />} /> 

        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default MyNavbar