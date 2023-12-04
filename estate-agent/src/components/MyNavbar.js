import React from "react";
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Home from "./Home";

import SellersPage from "./seller/SellersPage";
import AddSeller from "./seller/AddSeller";

import BuyersPage from "./buyer/BuyersPage";
import AddBuyer from "./buyer/AddBuyer";

import QAlogo from './../img/QA-logo.png'



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
                <Nav.Link as={Link} to={'/'}>        <span id="nav-item"> <b>Home       </b> </span> </Nav.Link>
                <Nav.Link as={Link} to={'./buyersPage'}>  <span id="nav-item"> <b>Buyers     </b> </span></Nav.Link>
                <Nav.Link as={Link} to={'./sellersPage'}> <span id="nav-item"> <b>Sellers    </b> </span></Nav.Link>
                <Nav.Link as={Link} to={'./sellersPage'}> <span id="nav-item"> <b>Properties </b> </span></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>


        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/buyersPage" element={<BuyersPage />} />
          <Route path="/buyersPage/addBuyer" element={<AddBuyer />} />

          <Route path="/sellersPage" element={<SellersPage />} />
          <Route path="/sellersPage/addSeller" element={<AddSeller />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}
export default MyNavbar