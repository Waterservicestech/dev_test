const errorHandler = (err: { message: any; stack: any; }, req: any, res: { statusCode: any; status: (arg0: any) => void; json: (arg0: { message: any; stack: any; }) => void; }, next: any) => {
    /**
     * Handle all the errors delivered by the asyncHandler
     * @param {object} req - contains the status code
     * @param {object} err - contains the error message and stack trace
     * @param {object} res - response with the error data
     */

    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode);

    // answer with the error message
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack        
    })
}

export { errorHandler }
