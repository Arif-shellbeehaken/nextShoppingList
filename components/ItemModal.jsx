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
import toast, { Toaster } from "react-hot-toast";
import { useAddItemMutation } from "../redux/slice/itemSlice";
import { BsDribbble, BsPlusSquareFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
const ItemModal = ({ is }) => {
  const { data: session, status } = useSession();
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [addItem, isSuccess, isError, isLoading, error] = useAddItemMutation();
  const [imgUrl, setImgUrl] = useState("");

  //image upload
  const imageUpload = async (event) => {
    const imgFrom = new FormData();
    imgFrom.append("file", event.target.files[0]);
    imgFrom.append("upload_preset", "shoppingCard");
    const imgData = await fetch(
      "https://api.cloudinary.com/v1_1/drvutnctp/image/upload",
      {
        method: "POST",
        body: imgFrom,
      }
    ).then((response) => response.json());

    setImgUrl(imgData.url);
    console.log("formData", formData);
  };

  useEffect(() => {
    setFormData({
      ...formData,
      ["item_image"]: imgUrl,
    });
  }, [imgUrl]);

  //handle form data change
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  // modal toggled
  const handleToggle = () => {
    if (!session) {
      return toast.error(`Sorry! You are not logged in. Please login first!`);
    }
    setModal(!modal);
  };

  // handle form submitting
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    console.log({ formData });
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
      <div className="col-6 float-start">
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={handleToggle}
        >
          <BsPlusSquareFill size={30} />
          <span className="ms-2 fs-5 uppercase">ADD ITEM</span>
        </Button>
      </div>

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
                  id="item_name"
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
                  defaultValue={0}
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
                    onChange={imageUpload}
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
