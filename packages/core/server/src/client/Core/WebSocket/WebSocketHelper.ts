import {WebSocket, WebSocketServer} from 'ws';
import jwt, {VerifyErrors} from 'jsonwebtoken';
import {JwtPayloadWithUserId} from '../Middleware/JwtAuthenticationMiddleware';
import {AppContext} from '../../Interface/AppContext';
import {Server as HTTPServer} from 'http';
import {Server as HTTPSServer} from 'https';
import {WebSocketEvent} from '@copor/core/client/Core/WebSocket/enum/WebSocketEvent';
import {MessageWithPayload} from '@copor/core/client/Core/WebSocket/dto/MessageWithPayload';
import {UserWebSocket} from '@copor/core/client/Core/WebSocket/UserWebSocket';
import {OnlineStatusMessageDTO} from '@copor/core/client/Core/WebSocket/dto/OnlineStatusMessageDTO';
import {verboseLog} from '@copor/core/client/Core/Helpers/VerboseLog';

const DEFAULT_OFFLINE_DEBOUNCE_MS = 8000;

class WebSocketHelper {
	private wss: WebSocketServer | undefined;
	private userConnections = new Map<string, Set<WebSocket>>();
	private pendingOfflineTimers = new Map<string, NodeJS.Timeout>();

	public initialize(server: HTTPServer | HTTPSServer, jwtSecret: string, context: AppContext) {
		const offlineDebounceMs = Number(context.envVariables!.WEB_SOCKET_OFFLINE_DEBOUNCE ?? DEFAULT_OFFLINE_DEBOUNCE_MS);

		this.wss = new WebSocketServer({server});
		this.wss.on('connection', (ws: WebSocket, req) => {
			const url = new URL(req.url ?? '', `http://${req.headers.host}`);
			const token = url.searchParams.get('token');

			if (!token) {
				ws.close(1008, 'Authorization token missing');
				return;
			}

			jwt.verify(token, jwtSecret, (error: VerifyErrors | null) => {
				const jwtPayload = jwt.decode(token) as JwtPayloadWithUserId;

				if (error ?? !jwtPayload?.userId) {
					ws.close(1008, 'Invalid authorization token');
					return;
				}

				const userWs = ws as UserWebSocket;

				userWs.userId = jwtPayload.userId;
				this.handleUserConnected(jwtPayload.userId, userWs);

				ws.on('message', (message) => {
					verboseLog(`received message from user ${String(message)}`);
				});

				ws.on('close', () => {
					clearInterval(pingInterval);
					this.handleUserDisconnected(jwtPayload.userId, userWs, offlineDebounceMs);
					verboseLog('user with id ' + jwtPayload.userId + ' disconnected from websocket');
				});

				const pingInterval = setInterval(() => {
					if (ws.readyState === WebSocket.OPEN) {
						ws.ping();
					}
				}, Number(context.envVariables!.WEB_SOCKET_PING_INTERVAL ?? 30000));

				ws.on('pong', () => {
					verboseLog(`Received pong from client: ${userWs.userId}`);
				});
			});
		});
	}

	public getOnlineUserIds(): string[] {
		return Array.from(this.userConnections.keys());
	}

	public sendMessageWithPayload<PayloadType>(message: MessageWithPayload<PayloadType>, userIds: string[]) {
		const messageProcessed = JSON.stringify({event: message.event, payload: message.payload});

		userIds.forEach((userId) => {
			const connections = this.userConnections.get(userId);

			if (connections) {
				connections.forEach((client) => {
					if (client.readyState === WebSocket.OPEN) {
						client.send(messageProcessed);
					}
				});
			}
		});
	}

	private handleUserConnected(userId: string, ws: WebSocket) {
		const wasOffline = !this.userConnections.has(userId);

		this.addUserConnection(userId, ws);

		const pendingOfflineTimer = this.pendingOfflineTimers.get(userId);

		if (pendingOfflineTimer) {
			clearTimeout(pendingOfflineTimer);
			this.pendingOfflineTimers.delete(userId);
			return;
		}

		if (wasOffline) {
			this.broadcastOnlineStatus(userId, true);
		}
	}

	private handleUserDisconnected(userId: string, ws: WebSocket, offlineDebounceMs: number) {
		this.removeUserConnection(userId, ws);

		if (this.userConnections.has(userId)) {
			return;
		}

		const timer = setTimeout(() => {
			this.pendingOfflineTimers.delete(userId);
			if (!this.userConnections.has(userId)) {
				this.broadcastOnlineStatus(userId, false);
			}
		}, offlineDebounceMs);

		this.pendingOfflineTimers.set(userId, timer);
	}

	private broadcastOnlineStatus(userId: string, isOnline: boolean) {
		const message = JSON.stringify(
			{event: WebSocketEvent.USER_ONLINE_STATUS, payload: {userId, isOnline} satisfies OnlineStatusMessageDTO}
		);

		this.userConnections.forEach((connections) => {
			connections.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
					client.send(message);
				}
			});
		});
	}

	private addUserConnection(userId: string, ws: WebSocket) {
		if (!this.userConnections.has(userId)) {
			this.userConnections.set(userId, new Set());
		}
		this.userConnections.get(userId)!.add(ws);
		verboseLog('user with id ' + userId + ' connected to websocket');
	}

	private removeUserConnection(userId: string, ws: WebSocket) {
		const connections = this.userConnections.get(userId);

		if (connections) {
			connections.delete(ws);
			if (connections.size === 0) {
				this.userConnections.delete(userId);
			}
		}
	}
}

export const webSocketHelper = new WebSocketHelper();
