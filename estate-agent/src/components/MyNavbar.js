import React from "react";
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Home from "./Home";
import SellersPage from "./seller/SellersPage";
import BuyersPage from "./buyer/BuyersPage";

function Navbar() {
  return (
    <>
      <BrowserRouter>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">QA</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to={'./home'}>Home</Nav.Link>
                <Nav.Link as={Link} to={'./buyersPage'}>Buyers</Nav.Link>
                <Nav.Link as={Link} to={'./sellersPage'}>Sellers</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>


        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/sellersPage" element={<SellersPage />} />
          <Route path="/buyersPage" element={<BuyersPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default Navbar