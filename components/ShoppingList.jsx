import React, { useState } from "react";
import { Container, ListGroup, ListGroupItem, Button, Table } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Image from "next/image";
import { BsFillTrashFill, BsWrench } from "react-icons/bs";

import {
  useGetItemsQuery,
  useDeleteItemMutation,
} from "../redux/slice/itemSlice";

import UpdateItemModal from "./UpdateItemModal";
import ItemModal from "./ItemModal";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

const ShoppingList = ({ manualLogged }) => {
  const { data: session, status } = useSession();
  const [updateModal, setUpdatedModal] = useState("");
  const {
    data,
    isLoading,
    isSuccess: success,
    isError: error,
  } = useGetItemsQuery();

  const [deleteItem, isSuccess, isError] = useDeleteItemMutation();

  const isAuthenticated = true;

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

  const handleUpdate = async (e) => {
    setUpdatedModal("");
    setUpdatedModal(e);
  };

  return (
    <Container>
      {(session || manualLogged?.token) && <ItemModal />}

      {isError ? (
        <h4 className="text-center m-auto">Oh no, there was an error</h4>
      ) : isLoading ? (
        <h1 className="text-center m-auto">Loading...</h1>
      ) : (
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              {/* <th>Image</th> */}
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
                {/* <td>
              <Image src={item.image} alt="" width={40} height={40} />
            </td> */}
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
      )}
      {updateModal && <UpdateItemModal itemId={updateModal} open={true} />}
      <Toaster position="top-right" reverseOrder={false} />
    </Container>
  );
};

export default ShoppingList;
