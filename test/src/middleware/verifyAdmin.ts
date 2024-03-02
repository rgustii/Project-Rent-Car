import { error } from "console";
import { NextFunction, Request, Response } from "express";
import { request } from "http";
import { verify } from "jsonwebtoken";

const verifyAdmin = async (request: Request, response: Response, next: NextFunction) => {
    try {

        const header = request.headers.authorization

        const token = header?.split(" ")[1] || ""
        const secretkey = "punyagusti"

        verify(token, secretkey, error => {
            if(error) {
                return response.status(401).json({
                    status: false,
                    message: "unautorized"
                })
            }
            next()
        })

    } catch (error) {
        return response.status(500).json({
            status: false,
            message: "gagal"
        })
    }
}

export { verifyAdmin }
