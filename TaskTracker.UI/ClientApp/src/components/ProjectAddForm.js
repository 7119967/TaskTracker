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
  makeLowerCaseRemoveSpace, 
} from "../infrastructure/common";
import AddDeleteTableRows from './table-tasks/AddDeletetableRows';
import { isNotEmpty } from "../infrastructure/helpers/validator";

const ProjectAddForm = ({getAllProjects, updateStateShowAddForm, ...props}) => {
  const [show, setShow] = useState(!props.show);
  const [projectAdd, setProjectAdd] = useState(initProject)
  const [tasksData, setTasksData] = useState([]);
  const [validated, setValidated] = useState(false);
 
  useEffect(() => {
      setShow(props.show);
    }, [props.show]
  )

  const handleClose = () => {
    setShow(!props.show); 
    updateStateShowAddForm(!props.show)
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
    .then(async (response) => {
      console.log("Post new project successful ", response.json)
      getAllProjects()
      handleClose()
      if (!response.ok) {
        const error = response.status;
        return Promise.reject(error);
      } 
    })  
     .catch((error) => {
      console.error("There was an error!", error);
    });
  }

  const mapData = () => {
    return {
      ...projectAdd,
      tasks: tasksData
    }
  }

  const handleChange = (e) => {

    setProjectAdd({
      ...projectAdd,
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
    console.error("Form validated ", validated);
    
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
          <Form validated={validated}>
            <Form.Control
                type="text"
                className="d-none"
                onChange={handleChange}
                value={projectAdd.create}
                name="create"
              />

              <Form.Control
                type="text"
                className="d-none"
                onChange={handleChange}
                value={projectAdd.modify}
                name="modify"
              />

            <Row className="mb-3">
              <Form.Group as={Col} controlId="form-name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    required
                    type="text" 
                    placeholder="Enter a name of project"                   
                    onChange={handleChange}
                    value={projectAdd.name}
                    name="name"
                    onBlur={(e) => isNotEmpty(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">Please input a name.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="form-priority">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                    required
                    id="form-priority"
                    onChange={handleChange}
                    name="priority"
                  >
                {priorities.map((item) => {
                  if (
                    makeLowerCaseRemoveSpace(projectAdd.priority) ===
                    makeLowerCaseRemoveSpace(item.text)
                  ) {
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
              <Form.Group as={Col} controlId="form-startDate">
                <Form.Label>Start</Form.Label>
                <Form.Control
                  required
                  type="date"
                  onChange={handleChange}
                  value={projectAdd.startDate}
                  name="startDate"
                />
                <Form.Control.Feedback type="invalid">Specify a date.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="form-status">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  required
                  id="form-status"
                  onChange={handleChange}
                  name="status"
                >
                  {projectStatuses.map((item) => {
                    if (
                      makeLowerCaseRemoveSpace(projectAdd.status) ===
                      makeLowerCaseRemoveSpace(item.text)
                    ) {
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

              <Form.Group as={Col} controlId="form-completionDate">
                <Form.Label>Completion</Form.Label>
                <Form.Control
                  required
                  type="date"
                  onChange={handleChange}
                  value={projectAdd.completionDate}
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

export default ProjectAddForm;