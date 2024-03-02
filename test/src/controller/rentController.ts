import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { request } from "http";

const prisma = new PrismaClient

// create
const createRent = async (request: Request, response: Response) => {
    try {

        const carID = Number(request.body.carID)
        const nameCust = (request.body.nameCust)
        const lamaSewa = Number(request.body.lamaSewa)
        const bookedDate = new Date(request.body.bookedDate).toISOString();

        // total bayar
        const car = await prisma.car.findFirst({
            where: {carID:carID}
        })
        if (!car) {
            return response.status(400)
            .json({
                status: false,
                message: 'Data rent not found'
            })
        }
        const totalBayar = car.harga_perhari*lamaSewa
        

        const newData = await prisma.rent.create({
            data: {
                carID: carID,
                nameCust: nameCust,
                lamaSewa: lamaSewa,
                totalBayar: totalBayar,
                bookedDate: bookedDate
            }
        })
        return response.status(200).json({
            status: true,
            message: 'rent has been created',
            data: newData
        });


    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })
    }
}

// read
const readRent = async (request: Request, response: Response) => {
    try {

        const dataRent = await prisma.rent.findMany();
        return response.status(200).json({
            status: true,
            message: 'rent has been loaded',
            data: dataRent
        });
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        });
    }
}

// update
const updateRent = async (request: Request, response: Response) => {
    try {
        const rentID = request.params.rentID

        const carID = request.body.carID
        const nameCust = (request.body.nameCust)
        const lamaSewa = request.body.lamaSewa
        const totalBayar = request.body.totalBayar
        const bookedDate = new Date (request.body.bookedDate).toISOString()

        const findRent = await prisma.rent.findFirst({
            where: {rentID: Number(rentID)}
        })

        if (!findRent) {
            /** give a response when event
             * not found
             */
            return response.status(400)
                .json({
                    status: false,
                    message: `DATA RENT NOT FOUND`
                })
        }

        const dataRent = await prisma.rent.update({
            where: {rentID: Number(rentID)},
            data: {
                carID: carID || findRent.carID,
                nameCust: nameCust || findRent.nameCust,
                lamaSewa: lamaSewa || findRent.lamaSewa,
                totalBayar: totalBayar || findRent.totalBayar,
                bookedDate: bookedDate || findRent.bookedDate
            }
        })
        return response.status(200)
            .json({
                status: true,
                message: `RENT HAS BEEN UPDATED`,
                data: dataRent
            })


    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        });
    }
}

// delete 
const deleteRent = async (request: Request, response: Response) => {
    try {
        
        const rentID = request.params.rentID
        
        const findRent = await prisma.rent.findFirst({
            where: {rentID: Number(rentID)}
        })

        if (!findRent) {
            /** give a response when event
             * not found
             */
            return response.status(400)
                .json({
                    status: false,
                    message: `DATA RENT NOT FOUND`
                })
        }

        // execute delete
        const dataRent = await prisma.rent.delete({
            where: {rentID: Number(rentID)}
        })
        return response.status(200)
        .json({
            status: true,
            message: `DATA HAS BEEN DELETED`
        })

    } catch (error) {
        return response.status(500)
            .json({
                status: false,
                message: error
            })
    }
}

export {createRent, readRent, updateRent, deleteRent}
