import {BaseController} from '../BaseController';

export class EnvironmentConfigController extends BaseController<void, {webSocketServer: string, jitsiServer: string}> {
	public getResponse(): void {
		const env = this.container.appContext.envVariables!;
		const webSocketServer = env.WEB_SOCKET_SERVER;
		const jitsiServer = env.JITSI_SERVER;

		this.response.json({
			webSocketServer: webSocketServer,
			jitsiServer: jitsiServer
		});
	}
}