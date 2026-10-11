import 'package:equatable/equatable.dart';

class CallNotificationModel extends Equatable {
  final String chatId;
  final String callerName;
  final bool hasVideo;
  final String avatar;
  final String callType;

  const CallNotificationModel({
    required this.chatId,
    required this.callerName,
    required this.hasVideo,
    required this.avatar,
    this.callType = 'VIDEO',
  });

  factory CallNotificationModel.fromJson(Map<Object?, Object?> json) {
    final callType =
        json['callType'] as String? ?? (json['hasVideo'] == 'true' ? 'VIDEO' : 'AUDIO');
    return CallNotificationModel(
      chatId: json['chatId'] as String,
      callerName: json['callerName'] as String,
      hasVideo: json['hasVideo'] == 'true',
      avatar: json['avatar'] as String,
      callType: callType,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'chatId': chatId,
      'callerName': callerName,
      'hasVideo': hasVideo,
      'avatar': avatar,
      'callType': callType,
    };
  }

  @override
  List<Object?> get props => [chatId, callerName, hasVideo, avatar, callType];
}
