import React from "react";
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react'
import {
  capitalizeText, 
  priorities, 
  projectStatuses, 
  makeLowerCaseRemoveSpace, 
} from "../infrastructure/common";

const ProjectViewForm = ({ row, project, getAllProjects, updateStateShowViewForm, ...props }) => {

  const [showViewForm, setShowViewForm] = useState(!props.show);
  const [projectView, setProjectView] = useState({})

  useEffect(() => {
    if(project !== undefined){
      setProjectView(project)
    }
  }, [project]);
  
  useEffect(() => {
    setShowViewForm(props.show);
  }, [props.show]);

  const handleClose = () => {
    setShowViewForm(!props.show); 
    updateStateShowViewForm(!props.show)
  }

  const renderTableTasks = (project) => {
    return (
      <div>
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
            </tr>
          </thead>
          <tbody>
            {project?.tasks?.map((task, index) => (
              <tr key={task.id}>
                <th scope="row">{index + 1}</th>
                <td>{task.id.substring(0, 4)}</td>
                <td>{capitalizeText(task.name)}</td>
                <td>{capitalizeText(task.priority)}</td>
                <td>{capitalizeText(task.description)}</td>
                <td>{capitalizeText(task.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <Modal 
        show={showViewForm} 
        onHide={handleClose}  
        {...props}     
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>View project #{row}</Modal.Title>
        </Modal.Header>
        <Modal.Body>    
          <Form>
            <Form.Control
                type="text"
                className="d-none"
                value={projectView.create}
                name="create"
              />

              <Form.Control
                type="text"
                className="d-none"
                value={projectView.modify}
                name="modify"
              />

            <Row className="mb-3">
              <Form.Group as={Col} controlId="form-name">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  disabled
                  type="text" 
                  placeholder="Enter a name of project"                   
                  value={projectView.name}
                  name="name"
                  />
                  <Form.Control.Feedback type="invalid">Please input a name.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="form-priority">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                    disabled
                    id="form-priority"
                    name="priority"
                  >
                {priorities.map((item) => {
                  if (
                    makeLowerCaseRemoveSpace(projectView.priority) ===
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
                  disabled
                  type="date"
                  value={projectView.startDate}
                  name="startDate"
                />
                <Form.Control.Feedback type="invalid">Specify a date.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="form-status">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  disabled
                  id="form-status"
                  name="status"
                >
                  {projectStatuses.map((item) => {
                    if (
                      makeLowerCaseRemoveSpace(projectView.status) ===
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
                  disabled
                  type="date"
                  value={projectView.completionDate}
                  name="completionDate"
                />
                <Form.Control.Feedback type="invalid">Specify a date.</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <span className="border border-1">
                {renderTableTasks(projectView)}
              </span>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProjectViewForm;
