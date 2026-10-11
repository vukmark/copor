import 'dart:async';

import 'package:collection/collection.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_vu_meet/src/data/model/call/group_call_roster_model.dart';
import 'package:copor_vu_meet/src/data/model/chat_info/chat_info_model.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_info/chat_info_bloc.dart';
import 'package:copor_vu_meet/src/presentation/components/call/talkie_jitsi.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:jitsi_meet_flutter_sdk/jitsi_meet_flutter_sdk.dart';
import 'package:copor_core/src/config/dependency_injection.dart';

class ReturnToCallPill extends StatelessWidget {
  final String chatId;
  final DateTime connectedAt;
  final bool isVideo;

  const ReturnToCallPill({
    super.key,
    required this.chatId,
    required this.connectedAt,
    required this.isVideo,
  });

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    final textStyle = dt.text.compactDefault.copyWith(color: Colors.white);

    return GestureDetector(
      onTap: () => returnToCall(context, chatId, isVideo: isVideo),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
        decoration: BoxDecoration(
          color: const Color(0xFF22C55E),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(isVideo ? DTIcons.videoCall : DTIcons.phone, color: Colors.white, size: 16),
            const SizedBox(width: 6),
            Text(context.getState.commonTranslation.ensuredData.RETURN_TO_CALL, style: textStyle),
            const SizedBox(width: 6),
            CallDurationText(connectedAt: connectedAt, style: textStyle),
          ],
        ),
      ),
    );
  }
}

/// Compact pill for the mobile conversation header while a call is active:
/// just a camera icon and the elapsed call duration, no label text.
class CallDurationPill extends StatelessWidget {
  final String chatId;
  final DateTime connectedAt;
  final bool isVideo;

  const CallDurationPill({
    super.key,
    required this.chatId,
    required this.connectedAt,
    required this.isVideo,
  });

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);

    return GestureDetector(
      onTap: () => returnToCall(context, chatId, isVideo: isVideo),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        decoration: BoxDecoration(
          color: const Color(0xFF22C55E),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(isVideo ? DTIcons.videoCall : DTIcons.phone, color: Colors.white, size: 16),
            const SizedBox(width: 6),
            CallDurationText(
              connectedAt: connectedAt,
              style: dt.text.compactDefault.copyWith(color: Colors.white),
            ),
          ],
        ),
      ),
    );
  }
}

/// Ticks every second, rendering the elapsed time since [connectedAt] as mm:ss.
class CallDurationText extends StatefulWidget {
  final DateTime connectedAt;
  final TextStyle? style;

  const CallDurationText({super.key, required this.connectedAt, this.style});

  @override
  State<CallDurationText> createState() => _CallDurationTextState();
}

class _CallDurationTextState extends State<CallDurationText> {
  Timer? _ticker;

  @override
  void initState() {
    super.initState();
    _ticker = Timer.periodic(const Duration(seconds: 1), (_) {
      if (mounted) setState(() {});
    });
  }

  @override
  void dispose() {
    _ticker?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final elapsed = DateTime.now().difference(widget.connectedAt);
    final minutes = elapsed.inMinutes.remainder(60).toString().padLeft(2, '0');
    final seconds = elapsed.inSeconds.remainder(60).toString().padLeft(2, '0');

    return Text('$minutes:$seconds', style: widget.style);
  }
}

/// Shown in the group conversation header while a group call is ongoing and
/// at least one member declined, left, or never answered — lets people
/// notice a member dropped without having to open the call itself.
class GroupCallMissingMembersPill extends StatelessWidget {
  final GroupCallRosterModel roster;

  const GroupCallMissingMembersPill({super.key, required this.roster});

  @override
  Widget build(BuildContext context) {
    final translation = context.getState.commonTranslation.ensuredData;
    final missing = roster.participants.where(
      (p) =>
          p.status == GroupCallParticipantStatus.declined ||
          p.status == GroupCallParticipantStatus.left ||
          p.status == GroupCallParticipantStatus.noAnswer,
    );

    return Semantics(
      label: _tooltipMessage(context, missing, translation),
      child: DTInfoChip.error(
        icon: DTIcons.warning,
        label: '${missing.length} ${translation.GROUP_CALL_MISSING_MEMBERS}',
      ),
    );
  }

  String _tooltipMessage(
    BuildContext context,
    Iterable<GroupCallRosterParticipantModel> missing,
    CommonTranslation translation,
  ) {
    final chatInfoState = getIt<ChatInfoBloc>().state;
    final ChatInfoModel? chatInfo = chatInfoState.chatId == roster.chatId
        ? chatInfoState.result?.data
        : null;

    return missing
        .map((p) {
          final name = chatInfo?.members
              .where((m) => m.id == p.userId)
              .map((m) => m.name)
              .firstOrNull;
          final label = p.status == GroupCallParticipantStatus.left
              ? translation.LEFT_CALL
              : translation.DIDNT_ANSWER;
          return '${name ?? p.userId} $label';
        })
        .join('\n');
  }
}

void returnToCall(BuildContext context, String chatId, {required bool isVideo}) {
  if (kIsWeb) {
    launchUrl(Uri.parse('https://meet.example.com/$chatId#config.prejoinPageEnabled=false'));
  } else {
    TalkieJitsi(
      chatId: chatId,
      currentUser: context.getState.accountInfo.ensuredData,
      jitsiMeet: JitsiMeet(),
      context: context,
      isVideo: isVideo,
    ).join();
  }
}
