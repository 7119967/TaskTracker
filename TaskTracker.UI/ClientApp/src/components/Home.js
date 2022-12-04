import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { formatDate, capitalizeText } from "../infrastructure/common";
import ProjectAddForm from "./ProjectAddForm";
import ProjectViewForm from "./ProjectViewForm";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      row:"",
      id: "",
      name: "",
      create: formatDate(Date.now()),
      modify: formatDate(Date.now()),
      startDate: formatDate(Date.now()),
      completionDate: "",
      priority: "Default",
      status: "Default",
      loading: true,
      isEdit: false,
      showAddForm: false,
      showViewForm: false,
    };

    // this.setDefaultValues = this.setDefaultValues.bind(this);
  }

  setDefaultValues() {
    this.setState({
      name: "",
      create: formatDate(Date.now()),
      modify: formatDate(Date.now()),
      startDate: formatDate(Date.now()),
      completionDate: "",
      priority: "Default",
      status: "Default",
      isEdit: false,
    });

    console.log("State set default values");
  }

  async getAllProjects() {
    const response = await fetch("https://localhost:7172/api/Project");
    const data = await response.json();
    this.setState({ projects: data, loading: false });
  }

  componentDidMount() {
    this.getAllProjects();
  }

  updateStateShowAddForm = (value) => {
    this.setState({ 
      showAddForm: value 
    });
  }

  updateStateShowViewForm = (value) => {
    this.setState({ 
      showViewForm: value 
    });
  }

  setStateProject = (project_id, index) => {
    this.setState({ row: index });

    let setProject = this.state.projects.find((x) => x.id === project_id);

    this.setState({
      project: {
        id: setProject.id,
        name: setProject.name,
        create: formatDate(setProject.create),
        modify: formatDate(Date.now()),
        startDate: formatDate(setProject.startDate),
        completionDate: formatDate(setProject.completionDate),
        priority: setProject.priority,
        status: setProject.status,
        tasks: setProject.tasks
      },
    });
  };

  onView = (project_id, index) => {
    this.setState({
      showViewForm: !this.state.showViewForm,
    });

    this.setStateProject(project_id, index);
  };

  onAdd = () => {
    this.setState({
      showAddForm: !this.state.showAddForm,
    });
  }

  renderTableProjects = (projects) => {
    return (
      <ol className="list-group list-group-numbered">
        {projects.map((project, index) => (
          <li
            key={project.id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">
                <Link
                  to=""
                  className="border-0 mt-1"
                  onClick={() => {
                    this.onView(project.id, index + 1);
                  }}
                >
                  {capitalizeText(project.name)}
                </Link>
              </div>
              <span className="me-2">
                Status: {capitalizeText(project.status)}
              </span>
              <span>Completion: {project.startDate.substring(0, 10)}</span>
            </div>
            <span className="badge bg-primary rounded-pill">
              {project.tasks.length} tasks
            </span>
          </li>
        ))}
      </ol>
    );
  };

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderTableProjects(this.state.projects)
    );

    return (
      <>
        <ProjectViewForm
          row = {this.state.row} 
          show = {this.state.showViewForm}
          project = {this.state.project}
          updateStateShowViewForm = {this.updateStateShowViewForm}
        />

        <ProjectAddForm
          show = {this.state.showAddForm}
          updateStateShowAddForm = {this.updateStateShowAddForm}
        />
        <Row>
          <Col>
            <div className="card">
              <h5 className="card-header">Info</h5>
              <div className="card-body">
                <h5 className="card-title">Description</h5>
                <p className="card-text">
                  The program is a Web API for entering project data and also
                  keeps tasks entities into the database (task tracker).
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => this.onAdd()}
                >
                  New Project
                </button>
              </div>
            </div>
          </Col>
          <Col>
            {this.state.projects.length === 0 ? (
              <div className="alert alert-info" role="alert">
                There are no projects!
              </div>
            ) : (
              contents
            )}
          </Col>
        </Row>
      </>
    );
  }
}
