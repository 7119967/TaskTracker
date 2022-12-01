import React from "react";
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react'
import { 
  priorities,
  projectStatuses,
  initProject,
} from "../infrastructure/common";
import AddDeleteTableRows from './table-tasks/AddDeletetableRows';
import { isNotEmpty } from "../infrastructure/helpers/validator";

const AddNewProjectForm = (props) => {
  const [show, setShow] = useState(!props.show);
  const [newProject, setNewProject] = useState(initProject)
  const [tasksData, setTasksData] = useState([]);
  const [validated, setValidated] = useState(false);
 
  useEffect(() => {
      setShow(props.show);
    }, [props.show]
  )

  const handleClose = () => {
    setShow(!props.show); 
    props.updateStateShowModal(!props.show)
  }

  const postProject = async () => {
    const request = mapData()
    await fetch("https://localhost:7172/api/Project", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(request),
    })
    .then(response => response.json())

    console.log("Post new project successful")
  }

  const mapData = () => {
    return {
      ...newProject,
      tasks: tasksData
    }
  }

  const handleChange = (e) => {

    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {

    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.preDefault();
      e.stopPropagation();
    }

    setValidated(true);
    
    if(validated === true){
      postProject()
    }
  }

  return (
    <>
      <Modal 
        show={show} 
        onHide={handleClose}       
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>    
          <Form noValidate validated={validated}>
            <Form.Control
                type="text"
                className="d-none"
                onChange={handleChange}
                value={newProject.create}
                name="create"
              />

              <Form.Control
                type="text"
                className="d-none"
                onChange={handleChange}
                value={newProject.modify}
                name="modify"
              />

            <Row className="mb-3">
              <Form.Group as={Col} className="" controlId="form-name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    required
                    type="text" 
                    placeholder="Enter a name of project"                   
                    onChange={handleChange}
                    value={newProject.name}
                    name="name"
                    onBlur={(e) => isNotEmpty(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">Please input a name.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className="" controlId="form-priority">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                    required
                    id="form-priority"
                    onChange={handleChange}
                    name="priority"
                  >
                    {priorities.map((item) => {
                      if (newProject.priority.toLowerCase() === item.text.toLowerCase()) {
                        console.log(newProject.priority.toLowerCase() + " equals to " + item.text.toLowerCase());
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
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="form-startDate">
                <Form.Label>Start</Form.Label>
                <Form.Control
                  required
                  type="date"
                  onChange={handleChange}
                  value={newProject.startDate}
                  name="startDate"
                />
                <Form.Control.Feedback type="invalid">Specify a date.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="form-projectStatus">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  required
                  id="form-projectStatus"
                  onChange={handleChange}
                  name="projectStatus"
                >
                  {projectStatuses.map((item) => {
                    if (newProject.projectStatus.toLowerCase() === item.text.toLowerCase().replace(" ", "")) {
                      console.log(newProject.projectStatus.toLowerCase() + " equals to " + item.text.toLowerCase().replace(" ", ""));
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

              <Form.Group as={Col} className="mb-3" controlId="form-completionDate">
                <Form.Label>Completion</Form.Label>
                <Form.Control
                  required
                  type="date"
                  onChange={handleChange}
                  value={newProject.completionDate}
                  name="completionDate"
                />
                <Form.Control.Feedback type="invalid">Specify a date.</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <span className="border border-1">
                <AddDeleteTableRows 
                  tasksData={tasksData}
                  setTasksData={setTasksData}
                />
              </span>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={onSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )   
};

export default AddNewProjectForm;