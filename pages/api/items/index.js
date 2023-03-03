import dbConnection from '../../../config/dbConnection';
import {
  createItem,
  readItems,
  updateItem,
  deleteItem,
} from '../../../controllers/ItemController';

import jwtNextTokenVerify from '../../../lib/jwtNextTokenVerify';
const handler = async (req, res) => {

  const { method } = req;

  switch (method) {
    case 'GET':
      readItems(req, res);
      break;
    case 'POST':
      createItem(req, res);
      break;
    case 'DELETE':
      deleteItem(req, res);
      break;
    case 'PUT':
      updateItem(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}

export default jwtNextTokenVerify(handler);