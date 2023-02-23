import dbConnection from '../../../config/dbConnection';
import {
  registerUser,
  userLogin
} from '../../../controllers/UserController';

export default async function handler(req, res) {
  dbConnection().catch(() =>
    res.status(405).send({ error: 'Error in the Connections' })
  );

  // type of request
  const { method, url } = req;
  const functionName = url.split("/")[3];

  switch (functionName) {
    case 'register':
      registerUser(req, res);
      break;
    case 'login':
      userLogin(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}