import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Response} from 'express';

export interface ErrorResponder {
	respond(errorList: ErrorList, response: Response): void;
}