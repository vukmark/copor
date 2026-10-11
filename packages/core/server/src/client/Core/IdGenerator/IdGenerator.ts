import {envFilePath} from '@copor/core/client/Core/Helpers/EnvFile';
import dotenv, {DotenvParseOutput} from 'dotenv';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';
import {DBEnv} from '../../enum/DBEnv';
import {v4 as uuidv4} from 'uuid';
import {resolve} from 'path';

const config = dotenv.config({path: envFilePath()}).parsed;

if (!config)
	throw new Error('No config provided!');


export class IdGenerator implements UniqueIdGenerator {
	private config: DotenvParseOutput;
	constructor() {
		const config = dotenv.config({path: envFilePath()}).parsed;

		if (!config)
			throw new Error('No config provided!');
		this.config = config;
	}
	getNewId(): Promise<string> {
		if (this.config.DB_ENV === DBEnv.FAKE)
			return Promise.resolve('123123');

		return Promise.resolve(uuidv4());
	}
}