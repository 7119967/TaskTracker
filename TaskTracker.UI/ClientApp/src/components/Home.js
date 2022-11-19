import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      id: "",
      name: "",
      startDate: this.formatDate(Date.now()),
      completionDate: "",
      priority: "",
      status: "",
      loading: true,
      isEdit: false,
    };
  }

  addNewProject = async (newProject) => {
    const response = await fetch('https://localhost:7172/api/Project', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(newProject)
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`); 
    }
  }

  updateProject = async (editProject) => {
    const url = 'https://localhost:7172/api/Project/?id=';
    const response = await fetch(url.concat(editProject.id), {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(editProject)
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`); 
    }
  }

  onDelete = async (id) => {

    const url = 'https://localhost:7172/api/Project/';   

    fetch(url.concat(id), { method: 'DELETE' })
        .then(async response => {
          this.getAllProjects();

            if (!response.ok) {
                const error = response.status;
                return Promise.reject(error);
            }

            console.log('Delete successful');
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
  }

  formatDate = (date) => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  componentDidMount() {
    this.getAllProjects();
  }

  async getAllProjects() {
    const response = await fetch('https://localhost:7172/api/Project');
    const data = await response.json();
    this.setState({ projects: data, loading: false });
  }

  onAdd = async () => {
    if (this.state.name.length === 0) {
      return
    }

    const newProject = {
      name: this.state.name,
      startDate: this.state.startDate,
      completionDate: this.state.completionDate,
      priority: this.state.priority,
      status: this.state.status,
    };
    
    try {
      await this.addNewProject(newProject);
      this.setState(() => ({
        name: "",
        startDate: this.formatDate(Date.now()),
        completionDate: "",
        priority: "",
        status: "",
      }));
    } catch (event) {
      alert(`Adding a new project failed! ${event.message}`);
    }

    await this.getAllProjects();
  }

  onSave = async () => {
    if (this.state.name.length === 0) {
      return
    }

    const editProject = {
      id: this.state.id,
      name: this.state.name,
      startDate: this.state.startDate,
      completionDate: this.state.completionDate,
      priority: this.state.priority,
      status: this.state.status,
    };
    
    try {
      await this.updateProject(editProject);
      this.setState(() => ({
        name: "",
        startDate: this.formatDate(Date.now()),
        completionDate: "",
        priority: "",
        status: "",
        // isEdit: false
      }));
    } catch (event) {
      alert(`Adding a new project failed! ${event.message}`);
    }

    await this.getAllProjects();
  }

  onEdit = async (project_id) => {
    if (this.state.id !== "") {
      return
    }

    let editProject = this.state.projects.find((x) => x.id === project_id)

    this.setState(() => ({
      isEdit: true,
      id: editProject.id,
      name: editProject.name,
      startDate: this.formatDate(editProject.startDate),
      completionDate: this.formatDate(editProject.completionDate),
      priority: editProject.priority,
      status: editProject.status,
    }));

  }

  renderTableProjects = (projects) => {
    let value = 1
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
          {projects.map((project, index) => (
            <tr key={project.id}>
              <th scope="row">{value++}</th>
              <td>{project.id.substring(0, 4)}</td>
              <td>{project.name}</td>
              <td>{project.priority}</td>
              <td>{project.startDate.substring(0, 10)}</td>
              <td>{project.completionDate.substring(0, 10)}</td>
              <td>{project.status}</td>
              <td>
                <button className="btn btn-secondary me-2" onClick={() => {this.onEdit(project.id)} }>Edit</button>
                <button className="btn btn-danger" onClick={() => { this.onDelete(project.id) }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
  }

  render() {
    let contents = this.state.loading ? <p><em>Loading...</em></p> : this.renderTableProjects(this.state.projects);
    let isEdit = this.state.isEdit;
    return (
      <>
        <h3>Projects</h3>
        <Row>
          <Col className="col-9">
            {contents}
          </Col>
          <Col className="col-3">
            <Form>
            <Form.Group className="mb-3" controlId="new-id">
                <Form.Label>Id</Form.Label>
                <Form.Control type="text" placeholder="" disabled
                  onChange={(e) => this.setState({ id: e.target.value })}
                  value={this.state.id}
                  />
              </Form.Group>
              <Form.Group className="mb-3" controlId="new-name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name of project" 
                  onChange={(e) => this.setState({ name: e.target.value })}
                  value={this.state.name}
                  />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="new-priority">
                <Form.Label>Priority</Form.Label>
                <Form.Select id="new-priority" value={this.state.priority} onChange={(e) => this.setState({ priority: e.target.value })}>
                  <option value="DEFAULT">Choose ...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="new-startDate">
                <Form.Label>StartDate</Form.Label>
                <Form.Control type="date" 
                  onChange={(e) => this.setState({ startDate: e.target.value })}
                  value={this.state.startDate}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="new-completionDate">
                <Form.Label>CompletionDate</Form.Label>
                <Form.Control type="date" 
                  onChange={(e) => this.setState({ completionDate: e.target.value })}
                  value={this.state.completionDate}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="new-status">
                <Form.Label>Status</Form.Label>
                <Form.Select id="new-status" value={this.state.status} onChange={(e) => this.setState({ status: e.target.value })}>
                  <option value="DEFAULT">Choose ...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>
              {isEdit ? 
              <button className="btn btn-success mb-3" onClick={() => this.onSave()}>Save</button>:
              <button className="btn btn-primary mb-3" onClick={() => this.onAdd()}>Add #{this.state.projects.length + 1}</button>}
              
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}