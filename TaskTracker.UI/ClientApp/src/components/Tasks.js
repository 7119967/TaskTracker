import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import { formatDate, capitalizeText, } from "../infrastructure/common";
import TaskEditForm from "./TaskEditForm";

export class Tasks extends Component {
    static displayName = Tasks.name;

    constructor() {
        super();
        this.state = { 
            tasks: [],
            row:"",
            show: false,
            id: "",
            name: "",
            create: "",
            modify: "",
            priority: "",
            status: "",
            description: "",
            task:{}
        }
    }

    async getAllTasks() {
        const response = await fetch('https://localhost:7172/api/Task');
        const data = await response.json();
        this.setState({ tasks: data, loading: false });
    }

    updateStateShowTaskEditForm = (value) => {
        this.setState({ 
          show: value 
        });
    }

    onCancel = () => {
        this.getAllTasks();
      };

    getTaskById = async (id) => {
        const url = "https://localhost:7172/api/Task/";
        await fetch(url.concat(id), {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET"
        })
            .then(response => response.json())
            .then(data => { 
                console.log('data ', data.data)
                this.setState({ task: data.data });
            })
    };

    onEdit(task_id, index){
        this.setState({
          show: !this.state.show
        });

        this.setState({row: index})
        this.getTaskById(task_id)
    }

    deleteTask = async (id) => {
        const url = "https://localhost:7172/api/Task/";
        fetch(url.concat(id), { method: "DELETE" })
          .then(async (response) => {
            this.getAllTasks();
    
            if (!response.ok) {
              const error = response.status;
              return Promise.reject(error);
            }
    
            console.log("Delete task successful");
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
    
        if (this.state.tasks.length === 0) {
        //   this.setDefaultValues();
        }
    };
    
    onDelete = (task_id) => {
        this.deleteTask(task_id);
    };

    componentDidMount() {
        this.getAllTasks();
    }

    renderTableProjects = (tasks) => {
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
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, index) => (
                <tr key={task.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{task.id.substring(0, 4)}</td>
                    <td>{capitalizeText(task.name)}</td>
                    <td>{capitalizeText(task.priority)}</td>
                    <td>{capitalizeText(task.description)}</td>
                    <td>{capitalizeText(task.status)}</td>
                    <td>
                    <button 
                        className="btn btn-secondary me-2"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight" 
                        onClick={() => {this.onEdit(task.id, index + 1)} }
                        >Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => { this.onDelete(task.id) }}>Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )
    }
    
    render() {
        let contents = this.state.loading ? <p><em>Loading...</em></p> : this.renderTableProjects(this.state.tasks);
        return (
            <>
                <TaskEditForm 
                    placement = 'end' 
                    row = {this.state.row} 
                    show = {this.state.show} 
                    task = {this.state.task} 
                    getAllTasks = {this.state.getAllTasks}
                    updateStateShowTaskEditForm = {this.updateStateShowTaskEditForm}
                />
                <h3>Tasks</h3>
                <Row>
                    {
                        this.state.tasks.length === 0 ? 
                        <div className="alert alert-info" role="alert">
                            There are no tasks!
                        </div> 
                    :
                        contents
                    }
                </Row>
            </>
        );
    }
}
