import winston from 'winston';
import {ErrorLogger} from '../../Interface/ErrorLogger';
/* eslint-disable stylistic/function-call-argument-newline, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
const customLevels = {
	levels: {
		trace: 5,
		debug: 4,
		info: 3,
		warn: 2,
		error: 1,
		fatal: 0
	},
	colors: {
		trace: 'white',
		debug: 'green',
		info: 'green',
		warn: 'yellow',
		error: 'red',
		fatal: 'red'
	}
};
const formatter = winston.format.combine(winston.format.colorize(),
	winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
	winston.format.splat(),
	winston.format.printf((info) => {
		const {timestamp, level, stack, message, ... meta} = info;

		return `[${timestamp}] [${level}]: ${message} \n${stack}\n${
			Object.keys(meta).length ? Object.keys(meta).map((key) => `${key}: ${meta[key]}`)
				.join('\n') : ''
		}\n`;
	}));

export class WinstonErrorLogger implements ErrorLogger {
	private logger: winston.Logger;

	constructor() {
		const prodTransport = new winston.transports.File({
			filename: 'logs/error.log',
			level: 'error'
		});
		const transport = new winston.transports.Console({
			format: formatter
		});

		this.logger = winston.createLogger({
			level: isDevEnvironment() ? 'trace' : 'error',
			levels: customLevels.levels,
			transports: [isDevEnvironment() ? transport : prodTransport]
		});
		winston.addColors(customLevels.colors);
	}

	trace(msg: string, meta?: any) {
		return new Promise(() => {
			this.logger.log('trace', msg, meta);
		});
	}

	debug(msg: string, meta?: any) {
		return new Promise(() => {
			this.logger.debug(msg, meta);
		});
	}

	info(msg: string, meta?: any) {
		return new Promise(() => {
			this.logger.info(msg, meta);
		});
	}

	warn(msg: string, meta?: any) {
		return new Promise(() => {
			this.logger.warn(msg, meta);
		});
	}

	error(msg: string, meta?: any) {
		return new Promise(() => {
			this.logger.error(msg, meta);
		});
	}

	fatal(msg: string, meta?: any) {
		this.logger.log('fatal', msg, meta);
	}
}

function isDevEnvironment() {
	return true;
}