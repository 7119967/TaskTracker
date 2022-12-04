import Form from "react-bootstrap/Form";
import {
  priorities,
  taskStatuses,
} from "../../infrastructure/common";

const TableRows = ({ tasksData, deleteTableRows, handleChange }) => {

  return (
    
    tasksData.map((data, index) => {
    const {
      create,
      modify,
      name,
      priority,
      status,
      description,
    } = data;

      return (
        <tr key={index}>
          <th scope="row">
            {index + 1}
            <input
              type="hidden"
              value={create}
              name="create"
              className="form-control"
            />
            <input
              type="hidden"
              value={modify}
              name="modify"
              className="form-control"
            />
          </th>
          <td>
            <input
              required
              type="text"
              placeholder="Enter a name of task"
              value={name}
              onChange={(e) => handleChange(index, e)}
              name="name"
              className="form-control"
            />
            <Form.Control.Feedback type="invalid">Please input a name.</Form.Control.Feedback>
          </td>
          <td>
            <Form.Select
              required
              id="form-priority"
              onChange={(e) => handleChange(index, e)}
              name="priority"
            >
              {priorities.map((item) => {
                if (priority.toLowerCase() === item.text.toLowerCase()) {
                  console.log(priority + " " + item.text);
                  return (
                    <option key={item.value} value={item.value} selected>
                      {item.text}
                    </option>
                  );
                }
                return (
                  <option key={item.value} value={item.value}>
                    {item.text}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Control.Feedback type="invalid">Choose one item of the list.</Form.Control.Feedback>
          </td>
          <td>
            <input
              required
              type="text"
              placeholder="Enter a description of task"
              value={description}
              onChange={(e) => handleChange(index, e)}
              name="description"
              className="form-control"
            />
            <Form.Control.Feedback type="invalid">Please input a description.</Form.Control.Feedback>
          </td>
          <td>
            <Form.Select
              required
              id="form-status"
              onChange={(e) => handleChange(index, e)}
              name="status"
            >
              {taskStatuses.map((item) => {
                if (status.toLowerCase() === item.text.toLowerCase().replace(" ", "")) {
                  console.log(status.toLowerCase() + " equals to " + item.text.toLowerCase().replace(" ", ""));
                  return (
                    <option key={item.value} value={item.value} selected>
                      {item.text}
                    </option>
                  );
                }
                return (
                  <option key={item.value} value={item.value}>
                    {item.text}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Control.Feedback type="invalid">Choose one item of the list.</Form.Control.Feedback>
          </td>
          <td>
            <button
              className="btn btn-outline-danger ms-2"
              onClick={(e) => deleteTableRows(index, e)}
            >
              x
            </button>
          </td>
        </tr>
      );
    })
  )
};
export default TableRows;
