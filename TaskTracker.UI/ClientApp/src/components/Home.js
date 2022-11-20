import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const priorities = [
  {value: '1', text: 'High'},
  {value: '2', text: 'Middle'},
  {value: '3', text: 'Low'}
];

const statuses = [
  {value: '0', text: 'Not Started'},
  {value: '1', text: 'Active'},
  {value: '2', text: 'Completed'}
];

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

  postProject = async (newProject) => {
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

  putProject = async (editProject) => {
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

  deleteProject = async (id) => {

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

  capitalizeText = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

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
      name: this.capitalizeText(this.state.name),
      startDate: this.state.startDate,
      completionDate: this.state.completionDate,
      priority: this.state.priority,
      status: this.state.status,
    };
    
    try {
      await this.postProject(newProject);
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
      name: this.capitalizeText(this.state.name),
      startDate: this.state.startDate,
      completionDate: this.state.completionDate,
      priority: this.state.priority,
      status: this.state.status,
    };
    
    try {
      await this.putProject(editProject);
      this.setState(() => ({
        name: "",
        startDate: this.formatDate(Date.now()),
        completionDate: "",
        priority: "",
        status: "",
      }));
    } catch (event) {
      alert(`Updating the project failed! ${event.message}`);
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

  onDelete = async (project_id) => {
    return await this.deleteProject(project_id)
  }

  onCancel = async () => {
      this.setState(() => ({
        id: "",
        name: "",
        startDate: this.formatDate(Date.now()),
        completionDate: "",
        priority: "",
        status: "",
        loading: true,
        isEdit: false,
      }));

    await this.getAllProjects();
  }

  renderTableProjects = (projects) => {
    let currentRow = 1
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
              <td>{this.capitalizeText(project.name)}</td>
              <td>{this.capitalizeText(project.priority)}</td>
              <td>{project.startDate.substring(0, 10)}</td>
              <td>{project.completionDate.substring(0, 10)}</td>
              <td>{this.capitalizeText(project.status)}</td>
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
                <Form.Select id="new-priority" onChange={(e) => this.setState({ priority: e.target.value })}>
                <option value="DEFAULT">Choose ...</option>
                {priorities.map(item => {
                  return (
                    <option key={item.value} value={item.value}>{item.text}</option>)
                  })
                }          
                 
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
                  {statuses.map(item => {
                    return (<option key={item.value} value={item.value}>{item.text}</option>);
                  })}
                </Form.Select>
              </Form.Group>
              {isEdit ?
              <>
                <button className="btn btn-success mb-3 me-2" onClick={() => this.onSave()}>Save</button>
                <button className="btn btn-danger mb-3" onClick={() => this.onCancel()}>Cancel</button>
              </> 
              :
              <button className="btn btn-primary mb-3" onClick={() => this.onAdd()}>Add #{this.state.projects.length + 1}</button>}
              
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}