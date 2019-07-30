import React, { useState, useContext } from "react";
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
import { UserContext } from "../configs/store";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userContext = useContext(UserContext);

  const _logout = () => {
    userContext.setUser({});
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  };

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
              Water Quality Maps
            </DropdownToggle>
            <DropdownMenu right>
              <Link href="/forecast/pH">
                <DropdownItem>
                  <a className="nav-link">pH</a>
                </DropdownItem>
              </Link>
              <Link href="/forecast/ammonia">
                <DropdownItem>
                  <a className="nav-link">Ammonia</a>
                </DropdownItem>
              </Link>

              <Link href="/forecast/nitrate">
                <DropdownItem>
                  <a className="nav-link">Nitrate</a>
                </DropdownItem>
              </Link>
              <Link href="/forecast/inorganic_phosphate">
                <DropdownItem>
                  <a className="nav-link">Inorganic Phosphate</a>
                </DropdownItem>
              </Link>

              <Link href="/forecast/BOD">
                <DropdownItem>
                  <a className="nav-link">BOD Level</a>
                </DropdownItem>
              </Link>

              <Link href="/forecast/dissolved_oxygen">
                <DropdownItem>
                  <a className="nav-link">Dissolved Oxygen (DO)</a>
                </DropdownItem>
              </Link>

              <Link href="/forecast/fecal_coliforms">
                <DropdownItem>
                  <a className="nav-link">Fecal Coliforms</a>
                </DropdownItem>
              </Link>

              <Link href="/forecast/wqi">
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
              <Link href="/simulation/pH">
                <DropdownItem>
                  <a className="nav-link">pH</a>
                </DropdownItem>
              </Link>
              <Link href="/simulation/ammonia">
                <DropdownItem>
                  <a className="nav-link">Ammonia</a>
                </DropdownItem>
              </Link>
              <Link href="/simulation/nitrate">
                <DropdownItem>
                  <a className="nav-link">Nitrate</a>
                </DropdownItem>
              </Link>
              <Link href="/simulation/inorganic_phosphate">
                <DropdownItem>
                  <a className="nav-link">Inorganic Phosphate</a>
                </DropdownItem>
              </Link>
              <Link href="/simulation/BOD">
                <DropdownItem>
                  <a className="nav-link">BOD Level</a>
                </DropdownItem>
              </Link>
              <Link href="/simulation/dissolved_oxygen">
                <DropdownItem>
                  <a className="nav-link">Dissolved Oxygen (DO)</a>
                </DropdownItem>
              </Link>
              <Link href="/simulation/fecal_coliforms">
                <DropdownItem>
                  <a className="nav-link">Fecal Coliforms</a>
                </DropdownItem>
              </Link>
              <Link href="/simulation/wqi">
                <DropdownItem>
                  <a className="nav-link">Water Quality Index</a>
                </DropdownItem>
              </Link>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <Link href="/timeline">
              <a className="nav-link">Data Visualization</a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/rivers">
              <a className="nav-link">Rivers</a>
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
          {userContext.user.name &&
          userContext.user.token &&
          userContext.user.email ? (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {userContext.user.email}
              </DropdownToggle>
              <DropdownMenu right>
                <Link href="/data">
                  <DropdownItem>Database</DropdownItem>
                </Link>
                <Link href="/users">
                  <DropdownItem>Users</DropdownItem>
                </Link>
                <DropdownItem divider />
                <DropdownItem onClick={() => _logout()}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            <>
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
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Navigation;
