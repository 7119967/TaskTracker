import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { projects: [], loading: true };
  }

  componentDidMount() {
    this.getProjectsData();
  }

  static renderForecastsTable(projects) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Priority</th>
            <th scope="col">StartDate</th>
            <th scope="col">CompletionDate</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project =>
            <tr key={project.id}>
              <th scope="row">{project.id}</th>
              <td>{project.name}</td>
              <td>{project.priority}</td>
              <td>{project.startDate}</td>
              <td>{project.completionDate}</td>
              <td>{project.status}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.projects);

    return (
      <div>
        <h1 id="tabelLabel" >Projects</h1>
        <p>This table demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async getProjectsData() {
    const response = await fetch('https://localhost:7172/api/Project');
    const data = await response.json();
    this.setState({ projects: data, loading: false });
  }
}
