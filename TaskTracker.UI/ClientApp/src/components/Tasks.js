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

    onEdit(task_id, index){
        this.setState({
          show: !this.state.show
        });

        this.setState({row: index})

        let editTask = this.state.tasks.find((x) => x.id === task_id);

/*         forEach(var item in editTask) {
            console.log(item);
        }; */

        console.log('editTask', JSON.stringify(editTask))

        this.setState(() => ({
            id: editTask.id,
            name: editTask.name,
            create: formatDate(editTask.create),
            modify: formatDate(Date.now()),
            priority: editTask.priority,
            status: editTask.status,
            description: editTask.description,
        }));
    
        console.log(!this.state.show + ' task_id ' + task_id)
    }

    deleteProject = async (id) => {
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
        this.deleteProject(task_id);
    };

    componentDidMount() {
        this.getAllTasks();
    }

    renderTableProjects = (tasks) => {
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
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, index) => (
                <tr key={task.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{task.id.substring(0, 4)}</td>
                    <td>{capitalizeText(task.name)}</td>
                    <td>{capitalizeText(task.priority)}</td>
                    <td className="text-truncate">{capitalizeText(task.description)}</td>
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
        </div>
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
