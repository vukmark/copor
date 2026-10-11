import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {BaseError, BaseErrorList} from './BaseError';
import {ErrorFormatter} from '../../Interface/ErrorFormatter';
import i18next from 'i18next';
import {DeletionNotAllowedException} from '@copor/core/domain/Core/Exceptions/DeletionNotAllowedException';

export const ErrorToHttpStatusCode: Record<string, number> = {
	'ForbiddenAccessException': 403,
	'RegistrationDisabledException': 403,
	'InvalidIDException': 406,
	'InvalidUserException': 406,
	'EmptyTitleException': 406,
	'InactiveUserException': 406,
	'InvalidUserPasswordException': 411,
	'DeletionNotAllowedException': 400,
	'ContractDocumentNotFoundException': 404,
	'ChangelogNotFoundException': 404,
	'DuplicateChatMemberException': 409,
	'InvalidFileSizeException': 413
};

export class ErrorFormatterInstance implements ErrorFormatter {
	formatErrorsToBaseErrors(error: ErrorList | Error | BaseError | BaseErrorList): BaseErrorList {
		if (error instanceof BaseErrorList) {
			return error;
		}

		const baseErrorList = this.convertToBaseErrorList(error);

		return new BaseErrorList(baseErrorList);
	}

	private convertToBaseErrorList = (error: ErrorList | Error | BaseError): BaseError[] => {
		if (error instanceof ErrorList) {
			return error.list.map(this.convertToBaseError);
		}

		if (error instanceof BaseError) {
			return [error];
		}

		return [this.convertToBaseError(error)];
	};

	private convertToBaseError = (error: Error): BaseError => {
		i18next.setDefaultNamespace('error');

		let message: string;

		if (error instanceof DeletionNotAllowedException) {
			message = i18next.t(error.translationKey, {
				table: error.table,
				interpolation: {escapeValue: false}
			});
		} else {
			message = i18next.t(error.message);
		}

		return new BaseError(
			error.name,
			ErrorToHttpStatusCode[error.name] ?? 400,
			true,
			message,
			error.stack
		);
	};
}

