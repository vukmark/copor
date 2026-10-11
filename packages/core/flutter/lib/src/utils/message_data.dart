import 'package:copor_scaffold/copor_scaffold.dart' show DSNotification;

/// Raw chat-message payload from the WebSocket. App-specific model.
///
/// Use [toDSNotification] to convert to the scaffold-level notification type.
class MessageData {
  final int unreadMessages;
  final String lastMessageChatName;
  final String lastMessageContent;
  final String lastMessageChatPicture;
  final String lastMessageChatId;
  final bool lastMessageIsChatPrivate;

  const MessageData({
    required this.unreadMessages,
    required this.lastMessageChatName,
    required this.lastMessageContent,
    required this.lastMessageChatPicture,
    required this.lastMessageChatId,
    required this.lastMessageIsChatPrivate,
  });

  factory MessageData.fromJson(Map<String, dynamic> json) {
    final message = tryFromJson(json);
    if (message == null) {
      throw const FormatException('Invalid NEW_MESSAGE_NOTIFICATION payload');
    }
    return message;
  }

  static MessageData? tryFromJson(Map<String, dynamic> json) {
    final chatId = _stringValue(json['lastMessageChatId']);
    final chatName = _stringValue(json['lastMessageChatName']);
    final content = _stringValue(json['lastMessageContent']);
    final isPrivate = _boolValue(json['lastMessageIsChatPrivate']);
    if (chatId == null || chatName == null || content == null || isPrivate == null) {
      return null;
    }

    return MessageData(
      unreadMessages: _intValue(json['unreadMessages']) ?? 0,
      lastMessageChatName: chatName,
      lastMessageContent: content,
      lastMessageChatPicture: _stringValue(json['lastMessageChatPicture']) ?? '',
      lastMessageChatId: chatId,
      lastMessageIsChatPrivate: isPrivate,
    );
  }

  static String? _stringValue(Object? value) => value is String ? value : null;

  static int? _intValue(Object? value) {
    if (value is int) return value;
    if (value is num) return value.toInt();
    if (value is String) return int.tryParse(value);
    return null;
  }

  static bool? _boolValue(Object? value) {
    if (value is bool) return value;
    if (value is num) {
      if (value == 1) return true;
      if (value == 0) return false;
    }
    if (value is String) {
      switch (value.toLowerCase()) {
        case 'true':
        case '1':
          return true;
        case 'false':
        case '0':
          return false;
      }
    }
    return null;
  }

  Map<String, dynamic> toJson() => {
    'unreadMessages': unreadMessages,
    'lastMessageChatName': lastMessageChatName,
    'lastMessageContent': lastMessageContent,
    'lastMessageChatPicture': lastMessageChatPicture,
    'lastMessageChatId': lastMessageChatId,
    'lastMessageIsChatPrivate': lastMessageIsChatPrivate,
  };

  DSNotification toDSNotification() => DSNotification(
    id: lastMessageChatId,
    title: lastMessageChatName,
    body: lastMessageContent,
    imageUrl: lastMessageChatPicture.isEmpty ? null : lastMessageChatPicture,
    unreadCount: unreadMessages,
  );
}
