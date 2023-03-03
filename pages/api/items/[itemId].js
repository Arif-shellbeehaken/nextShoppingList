import dbConnection from '../../../config/dbConnection';
import {
  readItem,
  updateItem,
  deleteItem,
} from '../../../controllers/ItemController';
import jwtNextTokenVerify from '../../../lib/jwtNextTokenVerify';

const handler = async (req, res) => {

  const { method } = req;
  switch (method) {
    case 'GET':
      readItem(req, res);
      break;
    case 'DELETE': // TODO: validate
      deleteItem(req, res);
      break;
    case 'PUT': // TODO: validate
      updateItem(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}

export default handler;