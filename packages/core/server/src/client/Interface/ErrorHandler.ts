import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

export interface ErrorHandler {
	isTrustedError(error: Error): boolean
	handleError(error: Error | ErrorList): Promise<void>
	handleUnhandledRejection(error: Error): Promise<void>
	handleUncaughtError(error: Error): Promise<void>
}