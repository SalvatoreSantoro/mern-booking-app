import {Request, Response, NextFunction } from "express";


class ResponseError extends Error{
    statusCode: number;

    constructor(message: any, statusCode: number) {
        super();
        this.message = message;
        this.statusCode = statusCode;
        this.name = "ResponseError"
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

const errorHandler = (err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message);
    if(err.statusCode){
        res.status(err.statusCode).json({msg: err.message});
    }else{
        res.status(500).json({msg: "Something went wrong"});
    }
};

export {errorHandler, ResponseError};