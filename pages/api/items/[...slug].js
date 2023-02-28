import dbConnection from '../../../config/dbConnection';
import {
  likeDislikeItem,
} from '../../../controllers/ItemController';

export default async function handler(req, res) {
  dbConnection().catch(() =>
    res.status(405).json({ error: 'Error in the Connection' })
  );

  // type of request
  const { method } = req;
  console.log({method});
  switch (method) {
    case 'PUT':
      likeDislikeItem(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}
