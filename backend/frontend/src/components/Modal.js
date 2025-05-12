import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: props.activeItem || {
        task: "Placeholder Task",
        completed: false,
      },
    };
    
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={this.props.modal} toggle={toggle}>
      <ModalHeader toggle={toggle} aria-label="ToDo Item Header">ToDo Item</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="todo-description">Description</Label>
              <Input
                type="text"
                id="todo-task"
                name="task"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter ToDo task"
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

CustomModal.propTypes = {
toggle: PropTypes.func.isRequired,
onSave: PropTypes.func.isRequired,
activeItem: PropTypes.shape({
  title: PropTypes.string,
  description: PropTypes.string,
  completed: PropTypes.bool,
}),
};

export default CustomModal;