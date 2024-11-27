import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ENV_VAR } from '../config/configVar.js';


export const generateWebTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, ENV_VAR.JWT_SECRET, {expiresIn: "15d"});
    res.cookie("jwt-netflix", token, {
        maxAge: 15*24*60*60*1000,  //stored in 15 dys milliseconds
        httpOnly: true, //prevent the cross site scripting attack
        sameSite: "strict", //csrf attacks and cross site forgery attcks
        secure: ENV_VAR.NODE_ENV !== "develpment"
    });

    return token;
}