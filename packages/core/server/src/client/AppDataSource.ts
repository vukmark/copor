import {envFilePath} from '@copor/core/client/Core/Helpers/EnvFile';
import dotenv from 'dotenv';
import {DB} from './types/db';
import {createPool} from 'mysql2';
import {CamelCasePlugin, Kysely, MysqlDialect} from 'kysely';
import {resolve} from 'path';
import dotenvExpand from 'dotenv-expand';

const env = dotenv.config({path: envFilePath()});

dotenvExpand.expand(env);

if (!env.parsed)
	throw new Error('No config provided!');
const config = env.parsed;

const dialect = new MysqlDialect({
	pool: createPool({
		database: config.DB_NAME,
		host: 'localhost',
		user: config.DB_USER,
		password: config.DB_PASS,
		port: 3306,
		connectionLimit: 10,
		queueLimit: 100,
		waitForConnections: true,
		connectTimeout: 30000,
		dateStrings: false,
		timezone: 'Z'
	})
});

export const db = new Kysely<DB>({
	dialect,
	plugins: [new CamelCasePlugin()]
});