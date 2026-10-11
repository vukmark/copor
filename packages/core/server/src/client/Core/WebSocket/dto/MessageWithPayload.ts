// `event` is core's WebSocketEvent or a module's own event name.
export interface MessageWithPayload<PayloadType> {
	event: string;
	payload: PayloadType;
}
