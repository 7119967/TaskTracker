import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import ProjectAddForm from "./ProjectAddForm";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      show: false,
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  updateStateShowModal = (value) => {
    this.setState({ 
      show: value 
    });
  }

  showModal(){
    this.setState({
      show: !this.state.show
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
                <NavLink tag={Link} className="text-dark" to="/projects">Projects</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/tasks">Tasks</NavLink>
              </NavItem>
              <NavItem>
                <button type="button" className="btn btn-primary" onClick={() => this.showModal()}>New Project</button>
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
        <ProjectAddForm 
          show={this.state.show} 
          updateStateShowModal={this.updateStateShowModal}
        />
      </header>
    );
  }
}
