import React from "react";
import { Container, Navbar, Nav } from 'react-bootstrap'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import QAlogo from './../img/QA-logo.png'

import Home from "./Home";

import SellersPage from "./sellers/SellersPage";
import AddSeller from "./sellers/AddSeller";

import BuyersPage from "./buyers/BuyersPage";
import AddBuyer from "./buyers/AddBuyer";

import PropertiesPage from "./properties/PropertiesPage";
import BuyProperty from "./properties/BuyProperty";
import SubmitProperty from "./properties/SubmitProperty";
import FilterProperties from "./properties/FilterProperties";


function MyNavbar() {
  return (
    <>
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

          <Route path="/buyersPage"                      element={<BuyersPage />} />
          <Route path="/buyersPage/addBuyer"             element={<AddBuyer />} />

          <Route path="/sellersPage"                     element={<SellersPage />} />
          <Route path="/sellersPage/addSeller"           element={<AddSeller />} />

          <Route path="/propertiesPage"                  element={<PropertiesPage />} />
          <Route path="/propertiesPage/buyProperty"      element={<BuyProperty />} />
          <Route path="/propertiesPage/submitProperty"   element={<SubmitProperty />} />
          <Route path="/propertiesPage/filterProperties" element={<FilterProperties />} /> 

        </Routes>
      </BrowserRouter>
    </>
  )
}
export default MyNavbar