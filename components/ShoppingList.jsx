import React, { useState, useEffect } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Table,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardSubtitle,
  CardText,
  CardGroup,
  Row,
  Col,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Image from "next/image";
import {
  BsFillTrashFill,
  BsWrench,
  BsListTask,
  BsGrid,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";

import {
  useGetItemsQuery,
  useDeleteItemMutation,
  useLikeDislikeMutation,
} from "../redux/slice/itemSlice";

import UpdateItemModal from "./UpdateItemModal";
import ItemModal from "./ItemModal";

import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

const ShoppingList = ({ manualLogged }) => {
  const { data: session, status } = useSession();
  const [updateModal, setUpdatedModal] = useState("");
  const [listView, setListView] = useState(false);
  const [logedEmail, setLogedEmail] = useState(
    session ? session.user.email : manualLogged.user?.email
  );

  const {
    data,
    isLoading,
    isSuccess: success,
    isError: error,
  } = useGetItemsQuery();

  const [deleteItem, isSuccess, isError] = useDeleteItemMutation();
  const [likeDislike] = useLikeDislikeMutation();

  const handleDelete = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteItem({
            id,
          });

          if (isError) {
            toast.error("Somethings is wrong!");
          }

          if (isSuccess) {
            toast.success("Item Deleted Successfully.");
            Swal.fire("Deleted!", "Your Item has been deleted.", "success");
          }
        }
      });
    } catch (err) {
      toast.error(`Failed to delete the post ${err}`);
    }
  };

  const handleReaction = async (id) => {
    try {
      await likeDislike({ id, email: logedEmail });
    } catch (err) {
      toast.error(`Failed to save the post ${err}`);
    }
  };

  useEffect(() => {
    setLogedEmail(session ? session.user.email : manualLogged.user?.email);
  }, [session, manualLogged]);
  const handleUpdate = async (e) => {
    setUpdatedModal("");
    setUpdatedModal(e);
  };

  const handleListView = () => {
    setListView(!listView);
  };

  return (
    <Container>
      {(session || manualLogged?.token) && <ItemModal />}
      {isError ? (
        <h4 className="text-center m-auto">Oh no, there was an error</h4>
      ) : isLoading ? (
        <h1 className="text-center m-auto">Loading...</h1>
      ) : listView ? (
        <div className="col-12">
          <div
            className={`mb-5 d-flex flex-row-right flex-row-reverse float-right ${
              logedEmail ? "col-6" : "col-12"
            }`}
          >
            <Button
              className="edit-btn "
              color="warning"
              size="lg"
              onClick={handleListView}
            >
              <BsGrid />
            </Button>
          </div>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                {(session || manualLogged?.token) && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {data?.items?.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <Image
                      src={item.item_image}
                      alt=""
                      width={40}
                      height={40}
                    />
                  </td>
                  <td>{item.item_name}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>
                    {(session || manualLogged?.token) && (
                      <>
                        <Button
                          className="remove-btn"
                          color="danger"
                          size="sm"
                          onClick={() => handleDelete(item._id)}
                        >
                          <BsFillTrashFill />
                        </Button>{" "}
                        <Button
                          className="edit-btn "
                          color="info"
                          size="sm"
                          onClick={() => handleUpdate(item._id)}
                        >
                          <BsWrench />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <>
          <div
            className={`mb-5 d-flex flex-row-right flex-row-reverse float-right ${
              logedEmail ? "col-6" : "col-12"
            }`}
          >
            <Button
              className="edit-btn "
              color="warning"
              size="lg"
              onClick={handleListView}
            >
              <BsListTask />
            </Button>
          </div>

          <CardGroup>
            <Row>
              {data?.items?.map((item, index) => (
                <Col xs="4" key={item._id}>
                  <Card xs="6" className="mb-3">
                    <CardImg
                      alt={item.item_name}
                      src={item.item_image}
                      top
                      width="100%"
                      height="230px"
                    />
                    <CardBody>
                      <CardTitle tag="h5">{item.item_name}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        {item.category}
                      </CardSubtitle>
                      <CardText>
                        Tk. <strong>{item.price}</strong>
                      </CardText>
                      {(session || manualLogged?.token) && (
                        <div className="d-flex justify-content-between">
                          <div className="d-flex justify-content-between">
                            <Button
                              className="remove-btn"
                              color="danger"
                              size="md"
                              onClick={() => handleDelete(item._id)}
                            >
                              <BsFillTrashFill />
                            </Button>
                            <Button
                              className="edit-btn ms-3"
                              color="info"
                              size="md"
                              onClick={() => handleUpdate(item._id)}
                            >
                              <BsWrench />
                            </Button>
                          </div>
                          <div className="d-flex justify-content-between">
                            <Button
                              className="border-none"
                              size="md"
                              onClick={() => handleReaction(item._id)}
                            >
                              {!item.likes.includes(logedEmail) ? (
                                <BsHeart
                                  size={30}
                                  color="pink"
                                  className="cursor-pointer"
                                />
                              ) : (
                                <BsHeartFill
                                  size={30}
                                  color="pink"
                                  className="cursor-pointer"
                                />
                              )}
                              <span className="fs-6">{item.likes.length}</span>
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </CardGroup>
        </>
      )}
      {updateModal && <UpdateItemModal itemId={updateModal} open={true} />}
      <Toaster position="top-right" reverseOrder={false} />
    </Container>
  );
};

export default ShoppingList;
