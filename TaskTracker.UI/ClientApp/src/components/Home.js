import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import {
  formatDate,
  capitalizeText,
  makeLowerCaseRemoveSpace,
} from "../infrastructure/common";
import ProjectAddForm from "./ProjectAddForm";
import ProjectViewForm from "./ProjectViewForm";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      row: "",
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
      showAddForm: value,
    });
  };

  updateStateShowViewForm = (value) => {
    this.setState({
      showViewForm: value,
    });
  };

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
        tasks: setProject.tasks,
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
  };

  renderTableProjects = (projects) => {
    return (
      <ol className="list-group list-group-numbered shadow p-3 mb-5 bg-white rounded">
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

    let countNewProjects = 0;

    this.state.projects.forEach((project) => {
      if (formatDate(project.startDate) === formatDate(Date.now()))
        countNewProjects++;
    });

    let countNotStarted = 0;
    let countActive = 0;
    let countCompleted = 0;
    let sumProjects = this.state.projects.length;

    this.state.projects.forEach((project) => {
      if (
        makeLowerCaseRemoveSpace(project.status) ===
        makeLowerCaseRemoveSpace("NotStarted")
      )
        countNotStarted++;

      if (
        makeLowerCaseRemoveSpace(project.status) ===
        makeLowerCaseRemoveSpace("Active")
      )
        countActive++;

      if (
        makeLowerCaseRemoveSpace(project.status) ===
        makeLowerCaseRemoveSpace("Completed")
      )
        countCompleted++;
    });

    let valueNotStarted = (countNotStarted / sumProjects) * 100;
    let valueActive = (countActive / sumProjects) * 100;
    let valueCompleted = (countCompleted / sumProjects) * 100;

    return (
      <>
        <ProjectViewForm
          row={this.state.row}
          show={this.state.showViewForm}
          project={this.state.project}
          updateStateShowViewForm={this.updateStateShowViewForm}
        />

        <ProjectAddForm
          show={this.state.showAddForm}
          updateStateShowAddForm={this.updateStateShowAddForm}
        />
        <Row>
          <Col>
            <Row>
              <div className="card shadow p-3 mb-1 bg-white rounded">
                <h5 className="card-header">Info</h5>
                <div className="card-body">
                  <p className="card-text">
                    The program is a Web API for entering project data and also
                    keeps tasks entities into the database (task tracker).
                  </p>
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
                </div>
              </div>
            </Row>
            <Row>
              <div
                className="card shadow p-3 mb-5 bg-white rounded"
                style={{ width: 100 + "%" }}
              >
                <h5 className="card-header">Project analytics</h5>
                <div className="card-body">
                  <div className="alert alert-primary" role="alert">
                    NotStarted: {valueNotStarted}%
                  </div>
                  <div className="alert alert-warning" role="alert">
                    Active: {valueActive}%
                  </div>
                  <div className="alert alert-success" role="alert">
                    Completed: {valueCompleted}%
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: valueNotStarted + "%" }}
                      aria-valuenow={valueNotStarted}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      NotStarted: {valueNotStarted}"%"
                    </div>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: valueActive + "%" }}
                      aria-valuenow={valueActive}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      Active: {valueActive}"%"
                    </div>
                  </div>
                  <div class="progress">
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: valueCompleted + "%" }}
                      aria-valuenow={valueCompleted}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      Completed: {valueCompleted}"%"
                    </div>
                  </div>
                </div>
              </div>
            </Row>
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
