import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {BaseErrorList} from '../Core/ErrorMiddleware/BaseError';

export interface ErrorFormatter {
	formatErrorsToBaseErrors(errorList: ErrorList): BaseErrorList
}