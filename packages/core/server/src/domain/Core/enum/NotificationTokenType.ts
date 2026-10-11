export enum NotificationTokenType {
	ANDROID = 'android',
	IOS = 'ios',
	WEB = 'web',
	// A PushKit VoIP token - distinct from IOS's regular APNs token. Only a VoIP
	// token, sent through a direct APNs connection, is allowed by Apple to reliably
	// wake CallKit when the app is backgrounded or killed. See PushNotificationHelper
	// and ApnsVoipSender for the delivery path this type routes through.
	IOS_VOIP = 'ios_voip'
}
