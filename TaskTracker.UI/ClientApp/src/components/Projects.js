import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import OffcanvasForm from "./OffcanvasForm";
import ModalForm from "./ModalForm";
import { isNotEmpty } from "../infrastructure/helpers/validator";
import { 
  formatDate, 
  capitalizeText, 
  priorities, 
  projectStatuses
} from "../infrastructure/common";

export class Projects extends Component {
  static displayName = Projects.name;

  constructor(props) {
    super(props);

    this.state = {
      projects: [],
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
      show: false,
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

    // console.log("State set default values");
  }

  postProject = async (newProject, e) => {
    e.preventDefault();
    await fetch("https://localhost:7172/api/Project", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(newProject),
    })
        .then(response=>response.json())
        .then(data=>{ console.log(data.data.id);

        alert(data.data.id)

/*       .then(async (response) => {
        const data = response.json()
        console.log(data.id)
        for (let [key, value] of response.headers) {
            alert(`${key} = ${value}`);
        } */
        this.getAllProjects();

/*         if (!response.ok) {
          const error = response.status;
          return Promise.reject(error);
        } */

        console.log("Post project successful");
      })
/*       .catch((error) => {
        console.error("There was an error!", error);
      }); */
  };

  putProject = async (editProject) => {
    const url = "https://localhost:7172/api/Project/?id=";
    await fetch(url.concat(editProject.id), {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(editProject),
    })
      .then(async (response) => {
        this.getAllProjects();
        this.setDefaultValues();

        if (!response.ok) {
          const error = response.status;
          return Promise.reject(error);
        }

        console.log("Put project successful");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

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

  onAdd = async (e) => {
    if (this.state.name.length === 0) {
      return;
    }

    const newProject = {
      create: this.state.create,
      modify: this.state.modify,
      name: capitalizeText(this.state.name),
      startDate: this.state.startDate,
      completionDate: this.state.completionDate,
      priority: this.state.priority,
      status: this.state.status,
    };

    try {
      this.postProject(newProject, e);
    } catch (event) {
      console.error(event.message);
    }

    this.setDefaultValues();
  };

  onSave = () => {
    if (this.state.name.length === 0) {
      return;
    }

    const editProject = {
      id: this.state.id,
      name: capitalizeText(this.state.name),
      create: this.state.create,
      modify: this.state.modify,
      startDate: this.state.startDate,
      completionDate: this.state.completionDate,
      priority: this.state.priority,
      status: this.state.status,
    };

    console.log(editProject.id + " got for saving");

    try {
      this.putProject(editProject);
    } catch (event) {
      console.error(event.message);
    }
  };

  onEdit = (project_id) => {
    if (this.state.id !== "") {
      return;
    }
    console.log(project_id + " got for editing");

    let editProject = this.state.projects.find((x) => x.id === project_id);

    this.setState(() => ({
      isEdit: true,
      id: editProject.id,
      name: editProject.name,
      create: formatDate(editProject.create),
      modify: formatDate(Date.now()),
      startDate: formatDate(editProject.startDate),
      completionDate: formatDate(editProject.completionDate),
      priority: editProject.priority,
      status: editProject.status,
    }));
  };

  onDelete = (project_id) => {
    this.deleteProject(project_id);
  };

  onCancel = () => {
    this.getAllProjects();
  };
  
  updateStateShowOffcanvasForm = (value) => {
    this.setState({ 
      show: value 
    });

    // console.log(this.state.show)
  }

  showOffcanvasForm(){
    this.setState({
      show: !this.state.show
    });

    // console.log(!this.state.show)
  }

  updateStateShowModal = (value) => {
    this.setState({ 
      show: value 
    });

    // console.log(this.state.show)
 }

  showModal(){
    this.setState({
      show: !this.state.show
    });

    // console.log(!this.state.show)
  }

  renderTableProjects = (projects) => {
    let currentRow = 1;
    return (
      <div>
        <table
          className="table table-striped table-hover"
          aria-labelledby="tabelLabel"
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Priority</th>
              <th scope="col">StartDate</th>
              <th scope="col">CompletionDate</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <th scope="row">{currentRow++}</th>
                <td>{project.id.substring(0, 4)}</td>
                <td><a onClick={() => this.showModal()}>{capitalizeText(project.name)}</a></td>
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
                    onClick={() => {
                      this.onEdit(project.id);
                    //   this.showOffcanvasForm();
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.onDelete(project.id);
                    }}
                  >
                    Delete
                  </button>
{/* 
                  <button
                    className="btn btn-primary"
                    onClick={() => {this.showModal()}}
                  >
                    Offcanvas
                  </button> */}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
        {/* <OffcanvasForm placement='end' name='end' show={this.state.show} updateStateShowOffcanvasForm={this.updateStateShowOffcanvasForm}/>
        <ModalForm show={this.state.show} updateStateShowModal={this.updateStateShowModal}/> */}
        <h3>Projects</h3>
        <Row>
          <Col className="col-9">{contents}</Col>

           <Col className="col-3">
            <Form needs-validation="true">
              <Form.Control
                type="text"
                className="d-none"
                onChange={(e) => this.setState({ create: e.target.value })}
                value={this.state.create}
              />

              <Form.Control
                type="text"
                className="d-none"
                onChange={(e) => this.setState({ modify: e.target.value })}
                value={this.state.modify}
              />

              <Form.Group className="mb-3 d-none" controlId="form-id">
                <Form.Label>Id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  disabled
                  onChange={(e) => this.setState({ id: e.target.value })}
                  value={this.state.id}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="form-name"
                validation={isNotEmpty(this.state.name)}
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name of project"
                  onChange={(e) => this.setState({ name: e.target.value })}
                  value={this.state.name}
                />
                <Form.Control.Feedback type="valid">
                  Looks good!
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-priority">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  id="form-priority"
                  onChange={(e) => this.setState({ priority: e.target.value })}
                >
                  {priorities.map((item) => {
                    if (
                      this.state.priority.toLowerCase() ===
                      item.text.toLowerCase()
                    ) {
                      console.log(this.state.priority + " " + item.text);
                      return (
                        <option key={item.value} value={item.value} selected>
                          {item.text}
                        </option>
                      );
                    }
                    return (
                      <option key={item.value} value={item.value}>
                        {item.text}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-startDate">
                <Form.Label>StartDate</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => this.setState({ startDate: e.target.value })}
                  value={this.state.startDate}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-completionDate">
                <Form.Label>CompletionDate</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) =>
                    this.setState({ completionDate: e.target.value })
                  }
                  value={this.state.completionDate}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-status">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  id="form-status"
                  onChange={(e) => this.setState({ status: e.target.value })}
                >
                  {projectStatuses.map((item) => {
                    if (
                      this.state.status.toLowerCase() ===
                      item.text.toLowerCase().replace(" ", "")
                    ) {
                      console.log(
                        this.state.status.toLowerCase() +
                          " " +
                          item.text.toLowerCase().replace(" ", "")
                      );
                      return (
                        <option key={item.value} value={item.value} selected>
                          {item.text}
                        </option>
                      );
                    }
                    return (
                      <option key={item.value} value={item.value}>
                        {item.text}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              {this.state.isEdit ? (
                <>
                  <button
                    className="btn btn-success mb-3 me-2"
                    onClick={() => this.onSave()}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger mb-3"
                    onClick={() => this.onCancel()}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary mb-3"
                  onClick={(e) => this.onAdd(e)}
                >
                  Add #{this.state.projects.length + 1}
                </button>
              )}
            </Form>
          </Col>

        </Row>
      </>
    );
  }
}
export default Projects;
