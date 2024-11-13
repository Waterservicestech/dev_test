import { NextFunction, Request, Response} from "express";
import { NotFoundUserByIdError} from "../errors/CustomizedErrors";

export const managerErrors = (
    error: Error & Partial<NotFoundUserByIdError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error.statusCode ?? 500;
    const msg = error.statusCode ? error.message : "Internal server error";

    return res.status(statusCode).json({
        timeStamp: new Date(),
        message: msg,
        endpoint: req.url
    });
}