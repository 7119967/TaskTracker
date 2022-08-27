import React, { Component } from 'react';

export class Project extends Component {
    static displayName = Project.name;

    constructor() {
        super();
        this.state = { projects: [] }
    }

    getProjects = async () => {
        var response = await fetch(
            'api/Project',
            {
                method: 'get'
            }
        )

        var responsejson = await response.json();
            this.setState({
            projects: responsejson
        })
    }

    render() {
        const projects = this.state.projects.map((item, index) => <li key={index}>{ item.name }</li>)
        return (
            <div>
                <h1>Projects</h1>
                <button className="btn btn-primary" onClick={this.getProjects}>Get Projects</button>
                <p>This is a simple example of a React component.</p>
                <ul>{ projects }</ul>
            </div>
        );
    }
}
