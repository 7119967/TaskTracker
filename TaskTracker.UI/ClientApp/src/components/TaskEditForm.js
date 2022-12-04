import React from "react";
import Form from "react-bootstrap/Form";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, useEffect } from 'react'
import { capitalizeText, priorities, taskStatuses, initTask } from "../infrastructure/common";

const TaskEditForm = ({ row, updateStateShowTaskEditForm, ...props }) => {

  const [show, setShow] = useState(!props.show);
  const [taskEdit, setTaskEdit] = useState(initTask);
  const [validated, setValidated] = useState(false);
  
  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const handleClose = () => {
    setShow(!props.show); 
    updateStateShowTaskEditForm(!props.show)
  }

  const handleChange = (e) => {
    setTaskEdit({
      ...taskEdit,
      [e.target.name]: e.target.value
    })
  }

  const putTask = async (editTask) => {
    const url = "https://localhost:7172/api/Task/?id=";
    await fetch(url.concat(editTask.id), {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(editTask),
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = response.status;
          return Promise.reject(error);
        }

        console.log("Put task successful");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const onSave = (e) => {
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.preDefault();
      e.stopPropagation();
    }

    setValidated(true);

    console.log('validated', validated)
    
    if(validated === true){
      try {
        const editTask = {
          id: taskEdit.id,
          name: capitalizeText(taskEdit.name),
          create: taskEdit.create,
          modify: taskEdit.modify,
          priority: taskEdit.priority,
          status: taskEdit.status,
          description: taskEdit.description,
        };
    
        console.log(editTask.id + " got for saving");

        putTask(editTask);

      } catch (event) {
        console.error(event.message);
      }
    }
  };

  return (
    <>
    <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Edit task #{row}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        
        <Form validated={validated}>
              <Form.Control
                type="text"
                className="d-none"
                onChange={handleChange}
                value={props.create}
                name="create"
              />

              <Form.Control
                type="text"
                className="d-none"
                onChange={handleChange}
                value={props.modify}
                name="modify"
              />

              <Form.Group className="mb-3 d-none" controlId="form-id">
                <Form.Label>Id</Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  onChange={handleChange}
                  value={props.id}
                  name="id"
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="form-name"
                // validation={isNotEmpty(props.name)}
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter name of task"
                  onChange={handleChange}
                  value={props.name}
                  name="name"
                />
                <Form.Control.Feedback type="invalid">Please input a name.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-priority">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  required
                  id="form-priority"
                  onChange={handleChange}
                  name="priority"                
                >
                  {priorities.map((item) => {
                    if (props.priority === item.text) {
                      console.log(props.priority + " " + item.text);
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
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-status">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  required
                  id="form-taskStatus"
                  onChange={handleChange}
                  name="taskStatus"
                >
                  {taskStatuses.map((item) => {
                    if (props.status === item.text) {
                      console.log(props.status + " equals to " + item.text);
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
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  className="overflow-auto"
                  as="textarea"
                  style={{ height: '100px' }}
                  onChange={handleChange}
                  value={props.description}
                />
                <Form.Control.Feedback type="invalid">A text is required.</Form.Control.Feedback>
              </Form.Group>

              <button
                className="btn btn-success mb-3 me-2"
                onClick={onSave}
              >
                Save
              </button>
              <button
                className="btn btn-danger mb-3"
                onClick={handleClose}
              >
                Cancel
              </button>
            </Form>
        </Offcanvas.Body>
    </Offcanvas>
    </>
  );
};

export default TaskEditForm;
