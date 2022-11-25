import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { isNotEmpty } from "../infrastructure/helpers/validator";
import { formatDate, capitalizeText } from "../infrastructure/common";

const priorities = [
  { value: "Default", text: "Choose ..." },
  { value: "1", text: "High" },
  { value: "2", text: "Middle" },
  { value: "3", text: "Low" },
];

const statuses = [
  { value: "Default", text: "Choose ..." },
  { value: "0", text: "Not Started" },
  { value: "1", text: "Active" },
  { value: "2", text: "Completed" },
];

export class Home extends Component {
  static displayName = Home.name;

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

  postProject = async (newProject) => {
    await fetch("https://localhost:7172/api/Project", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(newProject),
    })
      .then(async (response) => {
        this.getAllProjects();

        if (!response.ok) {
          const error = response.status;
          return Promise.reject(error);
        }

        console.log("Post project successful");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
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

      if(this.state.projects.length === 0){
        this.setDefaultValues();
      }
  };

  async getAllProjects() {
    const response = await fetch('https://localhost:7172/api/Project');
    const data = await response.json();
    this.setState({ projects: data, loading: false });   
  }

  componentDidMount() {
    this.getAllProjects();
  }

  onAdd = async () => {
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
      this.postProject(newProject);
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

    console.log(editProject.id + ' got for saving')
    
    try {
      this.putProject(editProject);
    } catch (event) {
      console.error(event.message);
    }

    this.componentDidMount();
  };

  onEdit = (project_id) => {
    if (this.state.id !== "") {
      return;
    }
    console.log(project_id + ' got for editing')

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
    // this.setDefaultValues();
    this.getAllProjects();
    // this.componentDidMount();
  };


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
                <td>{capitalizeText(project.name)}</td>
                <td>{capitalizeText(project.priority)}</td>
                <td>{project.startDate.substring(0, 10)}</td>
                <td>{project.completionDate.substring(0, 10)}</td>
                <td>{capitalizeText(project.status)}</td>
                <td>
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => {
                      this.onEdit(project.id);
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
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-priority">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  id="form-priority"
                  onChange={(e) => this.setState({ priority: e.target.value })}
                >
                  {priorities.map((item) => {

                    if(this.state.priority.toLowerCase() === item.text.toLowerCase()){
                      console.log(this.state.priority + " " + item.text)
                      return (
                      <option key={item.value} value={item.value} selected>{item.text}</option>
                    );
                    }
                    return (
                      <option key={item.value} value={item.value}>{item.text}</option>
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
                  // value={this.state.status}
                  onChange={(e) => this.setState({ status: e.target.value })}
                >
                  {/* <option value="DEFAULT">Choose ...</option> */}
{/*                   {statuses.map((item) => {
                    return (
                      <option key={item.value} value={item.value}>
                        {item.text}
                      </option>
                    );
                  })} */}

                  {statuses.map((item) => {
                    console.log(this.state.status.toLowerCase() + " " + item.text.toLowerCase().replace(" ", ''))
                    if(this.state.status.toLowerCase() === item.text.toLowerCase().replace(" ", '')){
                      console.log(this.state.status.toLowerCase() + " " + item.text.toLowerCase().trim())
                      return (
                      <option key={item.value} value={item.value} selected>{item.text}</option>
                    );
                    }
                    return (
                      <option key={item.value} value={item.value}>{item.text}</option>
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
                  onClick={() => this.onAdd()}
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
