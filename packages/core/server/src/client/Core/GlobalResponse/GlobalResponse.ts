import {NextFunction, Request, Response} from 'express';

export interface GlobalResponse {
	appendResponse(req: Request, res: Response, next: NextFunction): void;
}