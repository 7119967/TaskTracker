import React from "react";
// import Button from 'react-bootstrap/Button';
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Offcanvas from 'react-bootstrap/Offcanvas';
// import { isNotEmpty } from "../infrastructure/helpers/validator";
import { useState, useEffect } from 'react'
// import { formatDate, capitalizeText, priorities, statuses } from "../infrastructure/common";

const OffcanvasForm = ({ name, ...props }) => {

  // console.log(props.show + " modal")

  const [show, setShow] = useState(!props.show);
  
  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const handleClose = () => {
    setShow(!props.show); 
    props.updateStateShowOffcanvasForm(!props.show)
  }

  // const getAllProjects = () => {
  //   const response = fetch('https://localhost:7172/api/Project');
  //   const data = response.json();
  //   this.setState({ projects: data, loading: false });   
  // }

  // const componentDidMount = () => {
  //   this.getAllProjects();
  // }

  return (
    <>
    
    <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas {name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        
        <Form needs-validation="true">
              <Form.Control
                type="text"
                className="d-none"
                onChange={(e) => this.setState({ create: e.target.value })}
                // value={this.state.create}
              />

              <Form.Control
                type="text"
                className="d-none"
                // onChange={(e) => this.setState({ modify: e.target.value })}
                // value={this.state.modify}
              />

              <Form.Group className="mb-3 d-none" controlId="form-id">
                <Form.Label>Id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  disabled
                //   onChange={(e) => this.setState({ id: e.target.value })}
                //   value={this.state.id}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="form-name"
                // validation={isNotEmpty(this.state.name)}
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name of project"
                //   onChange={(e) => this.setState({ name: e.target.value })}
                //   value={this.state.name}
                />
                <Form.Control.Feedback type="valid">
                  Looks good!
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-priority">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  id="form-priority"
                //   onChange={(e) => this.setState({ priority: e.target.value })}
                >
    {/*               {priorities.map((item) => {
                    if (
                      this.state.priority.toLowerCase() ===
                      item.text.toLowerCase()
                    ) {
                      console.log(this.state.priority + " " + item.text);
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
                  })} */}

                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-startDate">
                <Form.Label>StartDate</Form.Label>
                <Form.Control
                  type="date"
                //   onChange={(e) => this.setState({ startDate: e.target.value })}
                //   value={this.state.startDate}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-completionDate">
                <Form.Label>CompletionDate</Form.Label>
                <Form.Control
                  type="date"
                //   onChange={(e) =>
                //     this.setState({ completionDate: e.target.value })
                //   }
                //   value={this.state.completionDate}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-status">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  id="form-status"
                  onChange={(e) => this.setState({ status: e.target.value })}
                >
{/*                   {statuses.map((item) => {
                    if (
                      this.state.status.toLowerCase() ===
                      item.text.toLowerCase().replace(" ", "")
                    ) {
                      console.log(
                        this.state.status.toLowerCase() +
                          " " +
                          item.text.toLowerCase().replace(" ", "")
                      );
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
                  })} */}

                </Form.Select>
              </Form.Group>

{/*               {this.state.isEdit ? (
                <>
                  <button
                    className="btn btn-success mb-3 me-2"
                    onClick={() => this.onSave()}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger mb-3"
                    onClick={() => this.onCancel()}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary mb-3"
                  onClick={() => this.onAdd()}
                >
                  Add #{this.state.projects.length + 1}
                </button>
              )} */}

            </Form>
        </Offcanvas.Body>
    </Offcanvas>


{/*       <Modal 
        show={show} 
        onHide={handleClose}       
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        <Form>

      <Row className="mb-3">
        <Form.Group
          as={Col}
          className="mb-3"
          controlId="form-name"
          // validation={isNotEmpty(this.state.name)}
        >
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name of project"
            // onChange={(e) => this.setState({ name: e.target.value })}
            // value={this.state.name}
          />
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="form-priority">
          <Form.Label>Priority</Form.Label>
          <Form.Select
            id="form-priority"
            // onChange={(e) => this.setState({ priority: e.target.value })}
          >
            {priorities.map((item) => {
              return (
                <option key={item.value} value={item.value}>
                  {item.text}
                </option>
              );
            })}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} className="mb-3" controlId="form-startDate">
          <Form.Label>StartDate</Form.Label>
          <Form.Control
            type="date"
            // onChange={(e) => this.setState({ startDate: e.target.value })}
            // value={this.state.startDate}
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="form-status">
          <Form.Label>Status</Form.Label>
          <Form.Select
            id="form-status"
            // value={this.state.status}
            // onChange={(e) => this.setState({ status: e.target.value })}
          >
            {/* <option value="DEFAULT">Choose ...</option> 
            {statuses.map((item) => {
              return (
                <option key={item.value} value={item.value}>
                  {item.text}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="form-completionDate">
          <Form.Label>CompletionDate</Form.Label>
          <Form.Control
            type="date"
            // onChange={(e) =>
            //   this.setState({ completionDate: e.target.value })
            // }
            // value={this.state.completionDate}
          />
        </Form.Group>
      </Row>

      <Row>
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
              <th scope="col">StartDate</th>
              <th scope="col">CompletionDate</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
{/*             {projects.map((project) => (
              <tr key={project.id}>
                <th scope="row">{currentRow++}</th>
                <td>{project.id.substring(0, 4)}</td>
                <td>{capitalizeText(project.name)}</td>
                <td>{capitalizeText(project.priority)}</td>
                <td>{project.startDate.substring(0, 10)}</td>
                <td>{project.completionDate.substring(0, 10)}</td>
                <td>{capitalizeText(project.status)}</td>
                <td>
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => {
                      this.onEdit(project.id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.onDelete(project.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default OffcanvasForm;
