class TypingInfo {
  final String userId;
  final String userName;
  final bool isTyping;

  TypingInfo({required this.userId, required this.userName, required this.isTyping});
}

enum TypingStatus {
  startedTyping,
  stoppedTyping;

  String toJson() {
    switch (this) {
      case TypingStatus.startedTyping:
        return 'STARTED_TYPING';
      case TypingStatus.stoppedTyping:
        return 'STOPPED_TYPING';
    }
  }

  static TypingStatus fromJson(String value) {
    switch (value) {
      case 'STARTED_TYPING':
        return TypingStatus.startedTyping;
      case 'STOPPED_TYPING':
        return TypingStatus.stoppedTyping;
      default:
        throw ArgumentError('Unknown TypingStatus: $value');
    }
  }
}
