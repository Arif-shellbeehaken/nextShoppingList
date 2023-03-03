
import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";

import useUpdateItemHook from "../BusinessLogic/useUpdateItemHook";

const UpdateItem = ({itemId}) => {

  const { handleOnSubmit,
    handleChange,
    imageUpload,
    previousData,isLoading } = useUpdateItemHook({ itemId });
  
  return (
    <div className="offset-col-3 col-6 ">
      <div className="mt-5 mb-5 items-center">
        <h2 className="">Update Item</h2>
      </div>
        <Form onSubmit={handleOnSubmit}>
              <Row>
                <Col md={6}>
                  <Label for="item_name">Item Name</Label>
                  <Input
                    type="text"
                    name="item_name"
                    id="item_name"
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
                      onChange={imageUpload}
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
    </div>
  );
};

export default UpdateItem;
