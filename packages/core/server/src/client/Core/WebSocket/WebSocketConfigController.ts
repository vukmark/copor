import {envFilePath} from '@copor/core/client/Core/Helpers/EnvFile';
import {BaseController} from '../BaseController';
import dotenv from 'dotenv';
import {resolve} from 'path';

const config = dotenv.config({path: envFilePath()}).parsed;

if (!config)
	throw new Error('No config provided!');
export class WebSocketConfigController extends BaseController<void, {server: string}> {
	public getResponse(): void {
		const {server} = this.getWebSocketConfig();

		this.response.json({server});
	}
	private getWebSocketConfig = () => ({
		server: config!.WEB_SOCKET_SERVER
	});
}