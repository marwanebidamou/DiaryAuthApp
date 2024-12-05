declare namespace Express {
    interface Request {
        connectedUser?: {
            id: string,
            fullname: string,
            email: string
        };
    }
}