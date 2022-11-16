import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
/* import { useState } from 'react';
import { Modal } from 'react-bootstrap';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(false);

// its up to you how you do it
const buttonClickHandler = e => {
 // increment
 // setCount(count + 1)
 
 // decrement
 // setCount(count -1)
 
 // anything
 // setCount(0)
  }
} */

export class NavMenu extends Component {
  static displayName = NavMenu.name;
  

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container bg="dark" variant="dark">
          <NavbarBrand tag={Link} to="/"><img width="30" src="logo512.png" alt="logoapp"/>TaskTracker</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/project">Projects</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
              </NavItem>
              <NavItem>
                <button type="button" className="btn btn-primary">New Project</button>
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>

{/*         <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton>
              <ModalTitle>Log in</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup controlId="fromBasicEmail">
                  <FormLabel>Email address</FormLabel>
                  <FormControl type="email" placeholder="Enter your email" />
                  <FormText className="text-muted">We'll never share your email with third parties</FormText>
                </FormGroup>
                <FormGroup controlId="fromBasicPassword">
                  <FormLabel>Password</FormLabel>
                  <FormControl type="password" placeholder="Enter your password" />
                </FormGroup>
                <FormGroup controlId="fromBasicCheckedBox">
                  <FormCheck type="checkbox" label="Remember me" />
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal> */}
      </header>
    );
  }
}
