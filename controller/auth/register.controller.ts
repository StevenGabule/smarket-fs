import {Request, Response} from "express";
import {User} from "../../model";

export const registerUser = async(req: Request, res: Response) => {
  try {
    const newAccount = new User(req.body);
    await newAccount.save();
    return res.status(201).json({account: newAccount})
  } catch (e:any) {
    console.log(e.message);
    return res.status(500).json({error: e.message})
  }
}