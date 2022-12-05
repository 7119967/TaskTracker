import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { formatDate } from "../infrastructure/common";
import ProjectAddForm from "./ProjectAddForm";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      projects: [],
      loading: true,
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

  onAdd(){
    this.setState({
      show: !this.state.show
    });
  }

  async getAllProjects() {
    const response = await fetch("https://localhost:7172/api/Project");
    const data = await response.json();
    this.setState({ projects: data, loading: false });
  }

  componentDidMount() {
    this.getAllProjects();
  }

  render() {
    let countNewProjects = 0
    
    this.state.projects.forEach(project => {
      if(formatDate(project.startDate) === formatDate(Date.now()))
      countNewProjects++
    });

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
              <button
                  type="button"
                  className="btn btn-primary position-relative"
                  onClick={() => this.onAdd()}
                >
                  New Project
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {countNewProjects}
                    <span className="visually-hidden">New projects</span>
                  </span>
                </button>
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
