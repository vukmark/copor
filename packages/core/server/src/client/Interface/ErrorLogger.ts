/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
export interface ErrorLogger {
	trace(msg: string, meta?: any): Promise<any>

	debug(msg: string, meta?: any): Promise<any>

	info(msg: string, meta?: any): Promise<any>

	warn(msg: string, meta?: any): Promise<any>

	error(msg: string, meta?: any): Promise<any>

	fatal(msg: string, meta?: any): void
}