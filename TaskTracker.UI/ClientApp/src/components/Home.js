import React, { Component } from 'react';
// import React, { Component, useEffect, useState } from 'react';
// import axios from 'axios';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      name: "",
      startDate: this.formatDate(Date.now()),
      completionDate: "",
      priority: "",
      status: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.today = this.formatDate(Date.now());
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

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.name.length === 0) {
      return;
    }

    const newProject = {
      id: this.state.projects.length + 1,
      name: this.state.name,
      startDate: this.state.startDate,
      completionDate: this.state.completionDate,
      priority: this.state.priority,
      status: this.state.status,
    };

    this.setState((state) => ({
      projects: state.projects.concat(newProject),
      name: "",
      startDate: this.formatDate(Date.now()),
      completionDate: "",
      priority: "",
      status: "",
    }));
  }

  render() {
    return (
      <div>
        <h3>{this.displayName} Projects</h3>
        <div></div>
        <div className="row">
          <div className="col-9">
            <TodoList projects={this.state.projects} />
          </div>
          <div className="col-3">
            <form onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="new-name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="new-name"
                  aria-describedby="emailHelp"
                  onChange={(e) => this.setState({ name: e.target.value })}
                  value={this.state.name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="new-priority" className="form-label">
                  Priority
                </label>
                <select
                  className="form-select"
                  id="new-priority"
                  required
                  value={this.state.priority}
                  onChange={(e) => this.setState({ priority: e.target.value })}
                >
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="new-startDate" className="form-label">
                  StartDate
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="new-startDate"
                  aria-describedby="emailHelp"
                  onChange={(e) => this.setState({ startDate: e.target.value })}
                  value={this.state.startDate}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="new-completionDate" className="form-label">
                  CompletionDate
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="new-completionDate"
                  aria-describedby="emailHelp"
                  onChange={(e) =>
                    this.setState({ completionDate: e.target.value })
                  }
                  value={this.state.completionDate}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="new-status" className="form-label">
                  Status
                </label>
                <select
                  className="form-select"
                  id="new-status"
                  required
                  value={this.state.status}
                  onChange={(e) => this.setState({ status: e.target.value })}
                >
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary mb-3">
                Add #{this.state.projects.length + 1}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
class TodoList extends React.Component {
  render() {
    return (
      <div>
        <table
          className="table table-striped table-hover"
          aria-labelledby="tabelLabel"
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Priority</th>
              <th scope="col">StartDate</th>
              <th scope="col">CompletionDate</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.projects.map((project) => (
              <tr key={project.id}>
                <th scope="row">{project.id}</th>
                <td>{project.name}</td>
                <td>{project.priority}</td>
                <td>{project.startDate}</td>
                <td>{project.completionDate}</td>
                <td>{project.status}</td>
                <td>
                  <div className="row justify-content-evenly">
                    <div className="col-4">
                      <button
                        className="btn btn-secondary"
                        onClick={this.editProject}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="col-4">
                      <button
                        className="btn btn-danger"
                        onClick={this.deleteProject}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
