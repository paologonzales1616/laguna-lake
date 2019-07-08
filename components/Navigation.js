import React, { useState } from "react";
import Link from "next/link";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Navbar color="primary" dark expand="md">
      <Link href="/">
        <a className="navbar-brand">Laguna Lake</a>
      </Link>
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <Link href="/">
              <a className="nav-link">Home</a>
            </Link>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Forecast
            </DropdownToggle>
            <DropdownMenu right>
              <Link href={{ pathname: "/forecast", query: { feature: "pH" } }}>
                <DropdownItem>
                  <a className="nav-link">pH</a>
                </DropdownItem>
              </Link>
              <Link
                href={{
                  pathname: "/forecast",
                  query: { feature: "ammonia" }
                }}
              >
                <DropdownItem>
                  <a className="nav-link">Ammonia</a>
                </DropdownItem>
              </Link>

              <Link
                href={{
                  pathname: "/forecast",
                  query: { feature: "nitrate" }
                }}
              >
                <DropdownItem>
                  <a className="nav-link">Nitrate</a>
                </DropdownItem>
              </Link>
              <Link
                href={{
                  pathname: "/forecast",
                  query: { feature: "inorganic_phosphate" }
                }}
              >
                <DropdownItem>
                  <a className="nav-link">Inorganic Phosphate</a>
                </DropdownItem>
              </Link>

              <Link href={{ pathname: "/forecast", query: { feature: "BOD" } }}>
                <DropdownItem>
                  <a className="nav-link">BOD Level</a>
                </DropdownItem>
              </Link>

              <Link
                href={{
                  pathname: "/forecast",
                  query: { feature: "dissolved_oxygen" }
                }}
              >
                <DropdownItem>
                  <a className="nav-link">Dissolved Oxygen (DO)</a>
                </DropdownItem>
              </Link>

              <Link
                href={{
                  pathname: "/forecast",
                  query: { feature: "fecal_coliforms" }
                }}
              >
                <DropdownItem>
                  <a className="nav-link">Fecal Coliforms</a>
                </DropdownItem>
              </Link>

              <Link
                href={{
                  pathname: "/forecast",
                  query: { feature: "fecal_coliforms" }
                }}
              >
                <DropdownItem>
                  <a className="nav-link">Water Quality Index</a>
                </DropdownItem>
              </Link>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Simulation
            </DropdownToggle>
            <DropdownMenu right>
              <Link
                href={{
                  pathname: "/simulation",
                  query: { feature: "pH" }
                }}
              >
                <DropdownItem>
                  <a className="nav-link">pH</a>
                </DropdownItem>
              </Link>
              <Link
                href={{
                  pathname: "/simulation",
                  query: { feature: "ammonia" }
                }}
              >
                <DropdownItem>
                  <a className="nav-link">Ammonia</a>
                </DropdownItem>
              </Link>
              <Link
                href={{
                  pathname: "/simulation",
                  query: { feature: "nitrate" }
                }}
              >
                <DropdownItem>
                  <a className="nav-link">Nitrate</a>
                </DropdownItem>
              </Link>
              <Link
                href={{
                  pathname: "/simulation",
                  query: { feature: "inorganic_phosphate" }
                }}
              >
                <DropdownItem>
                  <a className="nav-link">Inorganic Phosphate</a>
                </DropdownItem>
              </Link>
              <Link
                href={{
                  pathname: "/simulation",
                  query: { feature: "BOD" }
                }}
              >
                <DropdownItem>
                  <a className="nav-link">BOD Level</a>
                </DropdownItem>
              </Link>
              <Link
                href={{
                  pathname: "/simulation",
                  query: { feature: "dissolved_oxygen" }
                }}
              >
                <DropdownItem>
                  <a className="nav-link">Dissolved Oxygen (DO)</a>
                </DropdownItem>
              </Link>
              <Link
                href={{
                  pathname: "/simulation",
                  query: { feature: "fecal_coliforms" }
                }}
              >
                <DropdownItem>
                  <a className="nav-link">Fecal Coliforms</a>
                </DropdownItem>
              </Link>
              <Link
                href={{
                  pathname: "/simulation",
                  query: { feature: "wqi" }
                }}
              >
                <DropdownItem>
                  <a className="nav-link">Water Quality Index</a>
                </DropdownItem>
              </Link>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <Link href="/timeline">
              <a className="nav-link">Timeline</a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/about">
              <a className="nav-link">About</a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/contact">
              <a className="nav-link">Contact Us</a>
            </Link>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Link href="/register">
              <a className="nav-link">Register</a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/login">
              <a className="nav-link">Login</a>
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Navigation;
