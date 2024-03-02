import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response} from "express";


const prisma = new PrismaClient({log:['error']});

// create
const createCar = async (request: Request, respons: Response) => {
    try {

        const merk = (request.body.merk);
        const nopol = (request.body.nopol);
        const harga_perhari = (request.body.harga_perhari);

        const newData = await prisma.car.create({
            data: {
                merk: merk,
                nopol: nopol,
                harga_perhari: harga_perhari
            }
        });
        return respons.status(200).json({
            status: true,
            message: 'car has been created',
            data: newData
        })
    } catch (error) {
        return respons.status(500).json({
            status: false,
            message: error
        })
    }
}

// show
const readCar = async (request: Request, response: Response) => {
    try {

        const dataCar = await prisma.car.findMany();
        return response.status(200).json({
            status: true,
            message: 'car has been loaded',
            data: dataCar
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        });
    }
};

// update
const updateCar = async (request: Request, response: Response) => {
    try {

        const carID = request.params.carID

        const merk = (request.body.merk)
        const nopol = (request.body.nopol)
        const harga_perhari = (request.body.harga_perhari)

        const findCar = await prisma.car.findFirst({
            where: { carID: Number(carID) }
        })
        if (!findCar) {
            return response.status(400).json({
                status: false,
                message: 'data car not found'
            })
        }

        const dataCar = await prisma.car.update({
            where: { carID: Number(carID) },
            data: {
                merk: merk || findCar.merk,
                nopol: nopol || findCar.nopol,
                harga_perhari: harga_perhari || findCar.harga_perhari
            }
        })
        return response.status(200).json({
            status: true,
            message: 'car has been update',
            data: dataCar
        })

    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

// delete
const deleteCar = async (request: Request, response: Response) => {
    try {

        const carID = request.params.carID

        const findCar = await prisma.car.findFirst({
            where: { carID: Number(carID) }
        })
        if (!findCar) {
            return response.status(400).json({
                status: false,
                message: 'data not found'
            })
        }

        // execute for delete
        const dataCar = await prisma.car.delete({
            where: { carID: Number(carID) }
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

export { createCar, readCar, updateCar, deleteCar };