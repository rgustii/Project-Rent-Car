import { Prisma, PrismaClient } from "@prisma/client";
import { error } from "console";
import { Request, Response } from "express";
import { request } from "http";
import md5 from "md5"
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient({log:['error']});

// create admin
const createAdmin = async (request: Request, response: Response) => {
    try {
        
        const nama_admin = (request.body.namaAdmin);
        const email = (request.body.email);
        const password = (request.body.password);

        const newData = await prisma.admin.create({
            data: {
                nama_admin: nama_admin,
                email: email,
                password: password
            }
        });

        return response.status(200).json({
            status: true,
            message: 'admin has been created',
            data: newData
        });

    } catch (error) {
        return response.status(500).json({
            status: false,
            massage: error
        })
    }
}

// function to READ admin
const readAdmin = async (request: Request, response: Response) => {
    try {

        const dataAdmin = await prisma.admin.findMany();
        return response.status(200).json({
            status: true,
            message: 'admin has been loaded',
            data: dataAdmin
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

// update admin
const updateAdmin = async (request: Request, response: Response) => {
    try {
        const adminID = request.params.adminID

        const nama_admin = (request.body.nama_admin)
        const email = (request.params.email)
        const password = (request.params.password)

        const findAdmin = await prisma.admin.findFirst({
            where: { adminID: Number(adminID)}
        })
        if(!findAdmin){
            return response.status(400).json({
                status: false,
                message: 'data admin not found'
            })
        }

        const dataAdmin = await prisma.admin.update({
            where: {adminID: Number(adminID)},
            data:{
                nama_admin: nama_admin || findAdmin.nama_admin,
                email: email || findAdmin.email,
                password: password || findAdmin.password
            }
        })
        return response.status(200).json({
            status: true,
            message: 'admin has been update',
            data: dataAdmin
        })


    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

// delete admin
const deleteAdmin = async (request: Request, response: Response) => {
    try {
        
        const adminID = request.params.adminID

        const findAdmin = await prisma.admin.findFirst({
            where: {adminID: Number(adminID)}
        })
        if (!findAdmin){
            return response.status(400).json({
                status: false,
                message: 'data not found'
            })
        }

        // execute for delete
        const dataAdmin = await prisma.admin.delete({
            where: {adminID: Number(adminID)}
        })
        return response.status(400).json({
            status: true,
            message: 'data has been deleted'
        })
        
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const login = async (request: Request, response: Response) => {
    try {
        const email = request.body.email
        const password = md5(request.body.password)
        const admin = await prisma.admin.findFirst({
            where: {email: email, password: password}
        })

        if (admin) {
            const payload= admin
            const secretkey= "punyagusti"
            const token = sign(payload, secretkey)
            return response.status(200).json({
                status : true,
                message : "login mahuk",
                token : token
            })
        }else{
            return response.status(200).json({
                status : false,
                message : "login gabisa"
            })
        }

    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: "ERROR ANYINK"
            })
    }
}

export {createAdmin, readAdmin, updateAdmin, deleteAdmin, login}

