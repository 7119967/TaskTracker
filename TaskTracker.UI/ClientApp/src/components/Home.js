import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// import React, { Component, useEffect, useState } from 'react';
// import axios from 'axios';

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
      loading: true
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  saveFormData = async (newProject) => {
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

  // onSubmit = async (event) => {
  //   event.preventDefault(); // Prevent default submission
  //   try {
  //     await this.saveFormData();
  //     alert('Your registration was successfully submitted!');
  //     this.setValues({
  //       name: '', color: '', age: '', habits: '' 
  //     });
  //   } catch (e) {
  //     alert(`Registration failed! ${e.message}`);
  //   }
  // }

//  static deleteProject = async (e, id) => {
//     e.preventDefault();
//     let url = 'https://localhost:7172/api/' + {id};
//     alert(url);
//     const response = await fetch(url, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       method: 'DELETE'
//     });
//     if (response.status !== 200) {
//       throw new Error(`Request failed: ${response.status}`); 
//     }
//   }

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
    this.getProjectsData();
  }

  async getProjectsData() {
    const response = await fetch('https://localhost:7172/api/Project');
    const data = await response.json();
    this.setState({ projects: data, loading: false });
  }

  onSubmit = async () => {
  // handleSubmit(e) {    
    // event.preventDefault();
    if (this.state.name.length === 0) {
      // event.preventDefault();
      return
    }

    this.setState({
      loading: true
    });

    const newProject = {
      name: this.state.name,
      startDate: this.state.startDate,
      completionDate: this.state.completionDate,
      priority: this.state.priority,
      status: this.state.status,
    };
    
    try {
      await this.saveFormData(newProject);
      await this.getProjectsData();
      // this.setState(() => ({projects: this.state.projects});
      this.setState(() => ({
        projects: this.state.projects,
        name: "",
        startDate: this.formatDate(Date.now()),
        completionDate: "",
        priority: "",
        status: "",
      }));
      // alert('Your registration was successfully submitted!');
    } catch (event) {
      alert(`Registration failed! ${event.message}`);
    }
    
    // this.saveFormData(newProject);
    // this.getProjectsData();

    // this.setState(() => ({
    //   // projects: this.state.projects,
    //   name: "",
    //   startDate: this.formatDate(Date.now()),
    //   completionDate: "",
    //   priority: "",
    //   status: "",
    // }));

    // Home.renderTableProjects(this.state.projects);

    // alert('Your registration was successfully submitted!');
  }

  static renderTableProjects (projects) {
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
          {projects.map((project) => (
            <tr key={project.id}>
              <th scope="row">{value++}</th>
              {/* <td>{project.id.substring(0, 4)}</td> */}
              <td>{project.id}</td>
              <td>{project.name}</td>
              <td>{project.priority}</td>
              <td>{project.startDate.substring(0, 10)}</td>
              <td>{project.completionDate.substring(0, 10)}</td>
              <td>{project.status}</td>
              <td>
                <button className="btn btn-secondary me-2" onClick={this.editProject}>Edit</button>
                <button className="btn btn-danger" onClick={this.deleteProject}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
  }

  render() {
    let contents = this.state.loading ? <p><em>Loading...</em></p> : Home.renderTableProjects(this.state.projects);

    return (
      <>
        <h3>Projects</h3>
        <Row>
          <Col className="col-9">
            {contents}
          </Col>
          <Col className="col-3">
            <Form>
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
              <Button className="mb-3" onClick={() => this.onSubmit()}>Add #{this.state.projects.length + 1}</Button>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}