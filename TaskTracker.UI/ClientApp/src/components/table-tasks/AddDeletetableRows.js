import React from "react";
import { formatDate } from "../../infrastructure/common";
import TableRows from "./TableRows";

const AddDeleteTableRows = ({ tasksData, setTasksData }) => {
 
    const addTableRows = (e) => {
        e.preventDefault();

        const initTask = {
            created: formatDate(Date.now()),
            modified: formatDate(Date.now()),
            name: "",
            priority: "Default",
            status: "Default",
            description: ""
          };   

        setTasksData([...tasksData, initTask])  
    }
    
    const deleteTableRows = (index, e) => {
        e.preventDefault();
        const rows = [...tasksData];
        rows.splice(index, 1);
        setTasksData(rows);
    }
 
    const handleChange = (index, e) => {
        e.preventDefault();
        const { name, value } = e.target;
        const data = [...tasksData];
        data[index][name] = value;
        setTasksData(data);
    }

    return(
        <table className="table table-hover table-responsive">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Priority</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th><button className="btn btn-outline-success ms-2" onClick={(e) => addTableRows(e)}>+</button></th>
                </tr>
            </thead>
            <tbody>
                <TableRows 
                tasksData={tasksData} 
                deleteTableRows={deleteTableRows} 
                handleChange={handleChange} />
            </tbody> 
        </table>
    )
}
export default AddDeleteTableRows
