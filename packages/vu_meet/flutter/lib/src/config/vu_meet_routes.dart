class VuMeetRoutes {
  static const String vuMeet = '/vu-meet';

  static const String vu_meet_chat = '/vu-meet/:id';
  static const String vu_meet_chat_call = '/vu-meet/:id/call';
  static const String vu_meet_chat_call_summary = '/vu-meet/:id/call-summary/:seconds';
  static const String vu_meet_chat_info = '/vu-meet/:id/info';

  static const String relative_chat_id = ':id';
  static const String relative_call = 'call';
  static const String relative_call_summary = 'call-summary/:seconds';
  static const String relative_info = 'info';

  static String getChatUri(String chatId) => '$vuMeet/$chatId';

  static String getCallSummaryUri(String chatId, Duration duration) =>
      '$vuMeet/$chatId/call-summary/${duration.inSeconds}';
}
