import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import { Link } from 'react-router-dom';
import { formatDate, capitalizeText, } from "../infrastructure/common";
import ProjectEditForm from "./ProjectEditForm";
import ProjectViewForm from "./ProjectViewForm";

export class Projects extends Component {
  static displayName = Projects.name;

  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      row:"",
      project: {
        id: "",
        name: "",
        create: "",
        modify: "",
        startDate: "",
        completionDate: "",
        priority: "",
        status: "",
      },
      loading: true,
      showEditForm: false,
      showViewForm: false,
      validated: false,
    };
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
  }

  deleteProject = async (id) => {
    const url = "https://localhost:7172/api/Project/";
    fetch(url.concat(id), { method: "DELETE" })
      .then(async (response) => {
        this.getAllProjects();

        if (!response.ok) {
          const error = response.status;
          return Promise.reject(error);
        }

        console.log("Delete successful");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    if (this.state.projects.length === 0) {
      this.setDefaultValues();
    }
  };

  async getAllProjects() {
    const response = await fetch("https://localhost:7172/api/Project");
    const data = await response.json();
    this.setState({ projects: data, loading: false });
  }

  componentDidMount() {
    this.getAllProjects();
  }

  setStateProject = (project_id, index) => {

    this.setState({row: index})

    let setProject = this.state.projects.find((x) => x.id === project_id);

    this.setState({ project: {
      id: setProject.id,
      name: setProject.name,
      create: formatDate(setProject.create),
      modify: formatDate(Date.now()),
      startDate: formatDate(setProject.startDate),
      completionDate: formatDate(setProject.completionDate),
      priority: setProject.priority,
      status: setProject.status,
      tasks: setProject.tasks
    }})
  }
 
  updateStateShowEditForm = (value) => {
    this.setState({ 
      showEditForm: value 
    });
  }

  updateStateShowViewForm = (value) => {
    this.setState({ 
      showViewForm: value 
    });
  }

  onDelete = (project_id) => {
    this.deleteProject(project_id);
  }

  onView = (project_id, index) => {
    this.setState({
      showViewForm: !this.state.showViewForm
    });

    this.setStateProject(project_id, index)
  }

  onEdit = (project_id, index) => {
    this.setState({
      showEditForm: !this.state.showEditForm
    });

    this.setStateProject(project_id, index)
  };

  renderTableProjects = (projects) => {
    return (
        <table
          className="table table-striped table-hover"
          aria-labelledby="tabelLabel"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Name</th>
              <th>Priority</th>
              <th>Start</th>
              <th>Completion</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id}>
                <th scope="row">{index + 1}</th>
                <td>{project.id.substring(0, 4)}</td>
                <td>
                  <Link
                    to=""
                    className="border-0 mt-1"
                    onClick={() => {this.onView(project.id, index + 1)}}
                  >
                    {capitalizeText(project.name)}
                  </Link>
                </td>
                <td>{capitalizeText(project.priority)}</td>
                <td>{project.startDate.substring(0, 10)}</td>
                <td>{project.completionDate.substring(0, 10)}</td>
                <td>{capitalizeText(project.status)}</td>
                <td>
                <button 
                  className="btn btn-secondary me-2"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight" 
                  onClick={() => {this.onEdit(project.id, index + 1)}}
                  >Edit
                </button>
                <button className="btn btn-danger" onClick={() => {this.onDelete(project.id)}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
        <ProjectEditForm 
          placement = 'end' 
          row = {this.state.row} 
          show = {this.state.showEditForm} 
          project = {this.state.project}
          getAllProjects = {this.state.getAllProjects}
          updateStateShowEditForm = {this.updateStateShowEditForm}
        />

        <ProjectViewForm 
          row = {this.state.row} 
          show={this.state.showViewForm}
          project = {this.state.project}
          getAllProjects = {this.state.getAllProjects}
          updateStateShowViewForm = {this.updateStateShowViewForm}
        />

        <h3>Projects</h3>
        <Row>
        {
          this.state.projects.length === 0 ? 
            <div className="alert alert-info" role="alert">
                There are no projects!
            </div> 
          :
            contents
        }
        </Row>
      </>
    );
  }
}
export default Projects;
