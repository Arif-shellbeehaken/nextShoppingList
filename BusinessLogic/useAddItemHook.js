import { useState, useEffect } from "react";
import Msg from "../constaint/text.json";
import toast, { Toaster } from "react-hot-toast";
import { useAddItemMutation } from "../redux/slice/itemSlice";
import { useRouter } from 'next/router';

const useAddItemHook = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({});
    const [addItem, isSuccess, isError, error, isLoading] = useAddItemMutation();
    const [imgUrl, setImgUrl] = useState("");

    const imageUpload = async (event) => {
      const imgFrom = new FormData();
      imgFrom.append("file", event.target.files[0]);
      imgFrom.append("upload_preset", "shoppingCard");
      const imgData = await fetch('https://api.cloudinary.com/v1_1/drvutnctp/image/upload',
        {
          method: "POST",
          body: imgFrom,
        }
      ).then((response) => response.json());
  
      setImgUrl(imgData.url);
    };
  
    useEffect(() => {
      setFormData({
        ...formData,
        ["item_image"]: imgUrl,
      });
    }, [imgUrl]);
  
    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.id]: event.target.value,
      });
    };
  
    const handleOnSubmit = async (e) => {
      e.preventDefault();
  
      if (Object.keys(formData).length == 0)
        return toast.error(Msg.emptyFormData);
  
      try {
        let newItem = await addItem(formData);
        if (isError) {
          toast.error(error.message);
        }
  
        if (isSuccess) {
          toast.success(Msg.addItem.success);
          router.push("/");
        }
      } catch (err) {
        toast.error(Msg.addItem.success, err);
      }
    };

    return {
      handleOnSubmit,
      handleChange,
      imageUpload,
      Toaster,
      isLoading
    };
  };

export default useAddItemHook