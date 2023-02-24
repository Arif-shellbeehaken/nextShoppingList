import React, { useState, useReducer, useEffect } from "react";
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

import {
  useGetItemQuery,
  useUpdateItemMutation,
} from "../redux/slice/itemSlice";

import toast, { Toaster } from "react-hot-toast";

const UpdateItemModal = ({ itemId, open }) => {
  const isAuthenticated = true;
  const [modal, setModal] = useState(false);
  const { data } = useGetItemQuery(itemId);
  const [previousData, setPreviousData] = useState(data?.item || {});
  const [formData, setFormData] = useState({});

  // update from data change handle
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  // modal off on wise previous data change
  useEffect(() => {
    setModal(open);
    setPreviousData({});
  }, [itemId, open]);

  // formdata wise previous data show handle
  useEffect(() => {
    setPreviousData(formData);
  }, [formData]);

  // state wise previous data show handle
  useEffect(() => {
    setPreviousData(data?.item);
  }, [data?.item]);

  // redux update function call
  const [updateItem, isSuccess, isError, isLoading, error] =
    useUpdateItemMutation();

  // Update modal handle
  const handleToggle = () => {
    setFormData({});
    setModal(!modal);
  };

  // Update form submit handle
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (formData == null) return toast.error(`Don't have For data`);

    try {
      if (itemId) {
        await updateItem({ formData, itemId }); // update function used to update
      } else {
        toast.error("Item Id required");
      }

      if (isError) {
        toast.error(error.message);
      }
      if (isSuccess) {
        toast.success("Item Updated Successfully.");
      }
    } catch (err) {
      toast.error(`Failed to save the item ${err}`);
    }
    // Close modal
    handleToggle();
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Update Item</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <Row>
              <Col md={6}>
                <Label for="item_name">Item Name</Label>
                <Input
                  type="text"
                  name="item_name"
                  id="name"
                  value={previousData?.item_name}
                  placeholder="Add shopping item"
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="category">Category</Label>
                  <Input
                    type="text"
                    name="category"
                    id="category"
                    value={previousData?.category}
                    placeholder="Add shopping item category"
                    onChange={handleChange}
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
                  value={previousData?.price ? previousData?.price : 0}
                  onChange={handleChange}
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
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                {isLoading ? "Updateting..." : "Update Item"}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default UpdateItemModal;
