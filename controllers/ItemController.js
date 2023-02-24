import Item from '../models/Item';
import cloudinary from "../config/cloudinary";

// Create item
export const createItem = async (req, res) => {

  // console.log(req.body);
  // const photo = req.body.item_image;
  // const photoUrl = photo && await cloudinary.uploader.upload(photo);
  try {
    // photoUrl && (req.body.item_image = photoUrl.url);
    const item = await Item.create(req.body);

    res.status(201).json({
      success: true,
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

// Read items (all)
export const readItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

// Read item
export const readItem = async (req, res) => {
  try {
    const item = await Item.findById(req.query.itemId);

    if (item) {
      res.status(200).json({
        success: true,
        item,
      });
    } else {
      res.status(422).json({
        success: false,
        error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

// Update item
export const updateItem = async (req, res) => {
  const {itemId} = req.query;
  const newItem = {name: req.body.name, category: req.body.category, price: req.body.price};
  console.log({newItem});
  const upload = multer({
    storage: multer.diskStorage({
        destination: "./public/uploads", // destination folder
        filename: (req, file, cb) => cb(null, getFileName(file)),
    }),
});

const getFileName = (file) => {
    filename +=
        "." +
        file.originalname.substring(
            file.originalname.lastIndexOf(".") + 1,
            file.originalname.length
        );
    return filename;
};
console.log(upload);

  if(itemId && newItem){
    try {
      const newData = await Item.findByIdAndUpdate({_id: itemId} , newItem);
      res.status(200).json({
        success: true,
        item: newData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  }else{
    res.status(404).json({
      success: false,
      error: error,
    });
  }
};

// Delete item
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.query.itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
      });
    }

    await Item.deleteOne({ _id: req.query.itemId });

    res.status(200).json({
      success: true,
      item: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
