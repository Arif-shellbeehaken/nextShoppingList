import React, { useState, useEffect } from "react";
import Msg from "../constaint/text.json";
import {
  useGetItemsQuery,
  useDeleteItemMutation,
  useLikeDislikeMutation,
} from "../redux/slice/itemSlice";

import toast, {Toaster} from "react-hot-toast";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

const useShoppingListHook = () => {
    const { data: session } = useSession();
    const [listView, setListView] = useState(false);
    const [logedEmail, setLogedEmail] = useState(
      session?.user?.email || session?.user?.user?.email
    );
    const [deleteItem, isSuccess, isError] = useDeleteItemMutation();
    const [likeDislike, {isSuccess: reactSuccess}] = useLikeDislikeMutation();
  
    const handleDelete = (id) => {

      if (!session) {
        return toast.error(Msg.UnAuthorize);
      }

      try {
        Swal.fire({
          title: Msg.deleteItem.swal.title,
          text: Msg.deleteItem.swal.text,
          icon: Msg.deleteItem.swal.icon,
          showCancelButton: true,
          confirmButtonColor: Msg.deleteItem.swal.confirmButtonColor,
          cancelButtonColor: Msg.deleteItem.swal.cancelButtonColor,
          confirmButtonText: Msg.deleteItem.swal.confirmButtonText,
        }).then((result) => {
          if (result.isConfirmed) {
            deleteItem({
              id,
            });
  
            if (isError) {
              toast.error(Msg.deleteItem.swal.error);
            }
  
            if (isSuccess) {
              toast.success(Msg.deleteItem.success);
              Swal.fire("Deleted!",Msg.deleteItem.swal.success,"success");
            }
          }
        });
      } catch (err) {
        toast.error(Msg.deleteItem.error, err);
      }
    };
  
    const handleReaction = async (id) => {
      if (!session) {
        return toast.error(Msg.UnAuthorize);
      }
      try {
        await likeDislike({ id, email: logedEmail });
        if(reactSuccess) toast.success(Msg.updateItem.success);
      } catch (err) {
        toast.error(Msg.updateItem.error, err);
      }
    };
  
    useEffect(() => {
      setLogedEmail(session?.user?.email || session?.user?.user?.email);
    }, [session]);
  
  
    const handleUpdate = async (e) => {
      if (!session) {
        return toast.error(Msg.UnAuthorize);
      }
    };
  
    const handleListView = () => {
      setListView(!listView);
    };

    return {
      useGetItemsQuery,
      handleDelete,
      handleReaction,
      handleUpdate,
      handleListView,
      logedEmail,
      listView,
      Toaster
    };
  };

export default useShoppingListHook