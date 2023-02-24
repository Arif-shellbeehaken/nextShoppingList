import React, { useState, useReducer } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import toast, { Toaster } from "react-hot-toast";
import { useAddItemMutation } from "../redux/slice/itemSlice";

// From data change handle
const modalReducer = (state, event) => {
  if (event.target.name === "item_image") {
    return {
      ...state,
      [event.target.name]: event.target.files[0],
    };
  } else {
    return {
      ...state,
      [event.target.name]: event.target.value,
    };
  }
};

const ItemModal = () => {
  const isAuthenticated = true;
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useReducer(modalReducer, {});
  const [addItem, isSuccess, isError, isLoading, error] = useAddItemMutation();

  // modal toggled
  const handleToggle = () => setModal(!modal);

  // handle form submitting
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(formData).length == 0)
      return toast.error("Don't have For data");

    try {
      let newItem = await addItem(formData);
      if (isError) {
        toast.error(error.message);
      }

      if (isSuccess) {
        toast.success("Item Added Successfully.");
      }
    } catch (err) {
      toast.error(`Failed to save the post ${err}`);
    }

    // Close modal
    handleToggle();
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={handleToggle}
        >
          Add Item
        </Button>
      ) : (
        <h4 className="mb-3 ml-4">Please log in to manage items</h4>
      )}

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <Row>
              <Col md={6}>
                <Label for="item_name">Item Name</Label>
                <Input
                  type="text"
                  name="item_name"
                  id="item"
                  placeholder="Add shopping item"
                  onChange={setFormData}
                />
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="category">Category</Label>
                  <Input
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Add shopping item category"
                    onChange={setFormData}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Label for="price">Price</Label>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  defaultValue={0}
                  onChange={setFormData}
                />
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="item_image">Image</Label>
                  <Input
                    type="file"
                    name="item_image"
                    id="item_image"
                    placeholder="Add shopping item Image"
                    onChange={setFormData}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                {isLoading ? "Submiting..." : "Add Item"}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ItemModal;
