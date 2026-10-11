/// Mirrors the backend's `RosterParticipantStatus` enum
/// (client/src/Core/CallRoster/CallRosterRegistry.ts).
enum GroupCallParticipantStatus { ringing, joined, declined, left, noAnswer, unknown }

GroupCallParticipantStatus _statusFromString(String value) {
  switch (value) {
    case 'RINGING':
      return GroupCallParticipantStatus.ringing;
    case 'JOINED':
      return GroupCallParticipantStatus.joined;
    case 'DECLINED':
      return GroupCallParticipantStatus.declined;
    case 'LEFT':
      return GroupCallParticipantStatus.left;
    case 'NO_ANSWER':
      return GroupCallParticipantStatus.noAnswer;
    default:
      return GroupCallParticipantStatus.unknown;
  }
}

/// Raw group-call roster payload from the `GROUP_CALL_ROSTER_UPDATED`
/// WebSocket event. An empty [participants] list means the call has ended.
class GroupCallRosterParticipantModel {
  final String userId;
  final GroupCallParticipantStatus status;

  const GroupCallRosterParticipantModel({required this.userId, required this.status});

  factory GroupCallRosterParticipantModel.fromJson(Map<String, dynamic> json) {
    return GroupCallRosterParticipantModel(
      userId: json['userId'] as String,
      status: _statusFromString(json['status'] as String? ?? ''),
    );
  }
}

class GroupCallRosterModel {
  final String chatId;
  final int totalMembers;
  final List<GroupCallRosterParticipantModel> participants;

  const GroupCallRosterModel({
    required this.chatId,
    required this.totalMembers,
    required this.participants,
  });

  factory GroupCallRosterModel.fromJson(Map<String, dynamic> json) {
    final rawParticipants = json['participants'] as List<dynamic>? ?? const [];
    return GroupCallRosterModel(
      chatId: json['chatId'] as String,
      totalMembers: json['totalMembers'] as int? ?? 0,
      participants: rawParticipants
          .map((p) => GroupCallRosterParticipantModel.fromJson(p as Map<String, dynamic>))
          .toList(),
    );
  }

  int get unavailableCount => participants
      .where(
        (p) =>
            p.status == GroupCallParticipantStatus.declined ||
            p.status == GroupCallParticipantStatus.left ||
            p.status == GroupCallParticipantStatus.noAnswer,
      )
      .length;
}
