import { Request, Response, NextFunction } from "express";

const asyncHandler = (handlerFunction: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handlerFunction(req, res, next)).catch(next);
  };
};


export default asyncHandler;