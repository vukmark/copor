// Core's WebSocket events. Modules send their own (e.g. VuMeet's
// VuMeetWebSocketEvent, Cloud's CLOUD_NOTIFICATION) through
// webSocketHelper.sendMessageWithPayload.
export enum WebSocketEvent {
	USER_ONLINE_STATUS = 'USER_ONLINE_STATUS'
}
