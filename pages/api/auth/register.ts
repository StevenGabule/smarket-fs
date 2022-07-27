import {Request, Response} from 'express'
import {registerUser} from "../../../controller/auth/register.controller";

const Register = async (req: Request, res: Response) => {
  switch (req.method) {
    case "POST":
      await registerUser(req, res);
      break;
  }
}


export default Register;