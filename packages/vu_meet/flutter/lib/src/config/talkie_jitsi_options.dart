import 'package:jitsi_meet_flutter_sdk/jitsi_meet_flutter_sdk.dart';

class TalkieJitsiOptions {
  final String serverURL = 'https://meet.example.com';

  final Map<String, Object?>? featureFlags = {
    FeatureFlags.chatEnabled: false,
    FeatureFlags.reactionsEnabled: false,
    FeatureFlags.recordingEnabled: false,
    FeatureFlags.iosScreenSharingEnabled: false,
    FeatureFlags.androidScreenSharingEnabled: false,
    FeatureFlags.settingsEnabled: false,
    FeatureFlags.toolboxAlwaysVisible: true,
    FeatureFlags.unsafeRoomWarningEnabled: false,
    FeatureFlags.videoShareEnabled: false,
    FeatureFlags.welcomePageEnabled: false,
    FeatureFlags.raiseHandEnabled: false,
    FeatureFlags.helpButtonEnabled: false,
    FeatureFlags.inviteEnabled: false,
    FeatureFlags.carModeEnabled: false,
    'breakout-rooms.enabled': false,
    FeatureFlags.securityOptionEnabled: false,
    FeatureFlags.meetingNameEnabled: false,
    FeatureFlags.calenderEnabled: false,
    FeatureFlags.callIntegrationEnabled: false,
    FeatureFlags.closeCaptionsEnabled: false,
    FeatureFlags.tileViewEnabled: false,
    FeatureFlags.speakerStatsEnabled: false,
    //"toolbox.enabled": false,
    // You can set these to `false` if you want to start with them on.
  };

  JitsiMeetUserInfo userInfo;

  Map<String, Object?> configOverrides;

  String room;

  TalkieJitsiOptions(String chatId, this.userInfo, {bool isVideo = true})
    : room = chatId,
      configOverrides = {
        'welcomePage.disabled': true,
        'prejoinConfig.enabled': false,
        'notifyOnConferenceDestruction': false,
        'subject': userInfo.displayName,
        'hideRecordingLabel': true,
        'deeplinking.disabled': true,
        'breakoutRooms.hideAddRoomButton': true,
        'hideParticipantsStats': true,
        'p2p.enabled': false,
        if (!isVideo) 'startWithVideoMuted': true,
      };
}
