import React from "react";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState, useEffect } from "react";
import {
  formatDate,
  capitalizeText,
  priorities,
  projectStatuses,
  makeLowerCaseRemoveSpace,
} from "../infrastructure/common";

const ProjectEditForm = ({
  row,
  project,
  getAllProjects,
  updateStateShowEditForm,
  ...props
}) => {
  const [showEditForm, setShowEditForm] = useState(!props.show);
  const [projectEdit, setProjectEdit] = useState({});
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setProjectEdit(project);
  }, [project]);

  useEffect(() => {
    setShowEditForm(props.show);
  }, [props.show]);

  const handleClose = () => {
    setShowEditForm(!props.show);
    updateStateShowEditForm(!props.show);
  };

  const handleChange = (e) => {
    setProjectEdit({
      ...projectEdit,
      [e.target.name]: e.target.value,
    });
  };

  const validationForm = (e) => {
    const form = e.currentTarget;

    form.checkValidity();

    if (form.reportValidity()) {
      e.stopPropagation();
    }
    setValidated(true);
  };

  const putProject = async (editProject) => {
    const url = "http://localhost:5172/api/Project/?id=";
    await fetch(url.concat(editProject.id), {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(editProject),
    })
      .then(async (response) => {
        getAllProjects();

        if (!response.ok) {
          const error = response.status;
          return Promise.reject(error);
        }
        console.log("Put project successful");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const onSave = (e) => {
    const editProject = {
      id: projectEdit.id,
      name: capitalizeText(projectEdit.name),
      created: projectEdit.created,
      modified: projectEdit.modified,
      priority: projectEdit.priority,
      status: projectEdit.status,
      startDate: formatDate(projectEdit.startDate),
      finishDate: formatDate(projectEdit.finishDate),
    };

    validationForm(e);

    console.log("validated ", validated);

    if (validated === true) {
      try {
        putProject(editProject);
      } catch (event) {
        console.error(event.message);
      }
    }
  };

  return (
    <>
      <Offcanvas show={showEditForm} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit project #{row}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form validated={validated}>
            <Form.Control
              type="text"
              className="d-none"
              onChange={handleChange}
              value={projectEdit.created}
              name="created"
            />

            <Form.Control
              type="text"
              className="d-none"
              onChange={handleChange}
              value={projectEdit.modified}
              name="modified"
            />

            <Form.Group className="mb-3 d-none" controlId="form-id">
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="text"
                disabled
                onChange={handleChange}
                value={projectEdit.id}
                name="id"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="form-name"
              // validation={isNotEmpty(projectEdit.name)}
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter name of project"
                onChange={handleChange}
                value={projectEdit.name}
                name="name"
              />
              <Form.Control.Feedback type="invalid">
                Please input a name.
              </Form.Control.Feedback>
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
                  if (
                    makeLowerCaseRemoveSpace(projectEdit.priority) ===
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
              <Form.Control.Feedback type="invalid">
                Choose one item of the list.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="form-startDate">
              <Form.Label>StartDate</Form.Label>
              <Form.Control
                required
                type="date"
                onChange={handleChange}
                value={projectEdit.startDate}
                name="startDate"
              />
              <Form.Control.Feedback type="invalid">
                Specify a date.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="form-finishDate">
              <Form.Label>CompletionDate</Form.Label>
              <Form.Control
                required
                type="date"
                onChange={handleChange}
                value={projectEdit.finishDate}
                name="finishDate"
              />
              <Form.Control.Feedback type="invalid">
                Specify a date.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="form-status">
              <Form.Label>Status</Form.Label>
              <Form.Select
                required
                id="form-status"
                onChange={handleChange}
                name="status"
              >
                {projectStatuses.map((item) => {
                  if (
                    makeLowerCaseRemoveSpace(projectEdit.status) ===
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
              <Form.Control.Feedback type="invalid">
                Choose one item of the list.
              </Form.Control.Feedback>
            </Form.Group>
            <button className="btn btn-success mb-3 me-2" onClick={onSave}>
              Save
            </button>
            <button className="btn btn-danger mb-3" onClick={handleClose}>
              Cancel
            </button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ProjectEditForm;
