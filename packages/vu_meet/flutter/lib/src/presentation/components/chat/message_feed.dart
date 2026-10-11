import 'package:copor_core/src/bloc/utils/guarded_bloc_builder.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/vu_meet_message_model.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_message/vu_meet_message_bloc.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_message/vu_meet_message_event.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_message/vu_meet_message_state.dart';
import 'package:copor_vu_meet/src/presentation/components/message/message_item_container.dart';
import 'package:copor_vu_meet/src/presentation/components/chat/typing_indicator.dart'
    show typingToMessageCrossfadeDuration;
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

const _messageClusterMaxGap = Duration(minutes: 10);

class MessageFeed extends HookWidget {
  final bool isPrivate;
  final VuMeetPageTranslation translations;

  const MessageFeed({super.key, required this.isPrivate, required this.translations});

  @override
  Widget build(BuildContext context) {
    final state = context.watch<VuMeetMessageBloc>().state;
    final messages = state.result?.data ?? [];
    final selectedMessageId = useState<String?>(null);

    final processedMessages = useMemoized(() => _processMessagesForUI(messages), [messages]);

    return GuardedBlocBuilder<VuMeetMessageBloc, VuMeetMessageState>(
      initialPlaceholder: const SizedBox.shrink(),
      builder: (context, _) {
        if (processedMessages.isEmpty) {
          return Center(
            child: DTEmptyState(
              icon: DTIcons.message,
              title: translations.NO_MESSAGES_YET,
              subtitle: translations.START_A_CONVERSATION_AND_CONNECT_WITH_OTHERS,
            ),
          );
        }

        return NotificationListener<ScrollNotification>(
          onNotification: (notification) => _handleScrollNotification(context, notification),
          child: ListView.builder(
            padding: const EdgeInsets.fromLTRB(0, 0, 20, 10),
            reverse: true,
            itemCount: processedMessages.length + (state.isLoadingOlder ? 1 : 0),
            itemBuilder: (context, index) {
              if (state.isLoadingOlder && index >= processedMessages.length) {
                return _getLoadingOlderIndicator();
              }

              final messageItem = processedMessages[index];

              final container = MessageItemContainer(
                message: messageItem,
                isPrivate: isPrivate,
                translations: translations,
                isTimestampVisible: selectedMessageId.value == messageItem.id,
                isLatestMessage: index == 0,
                onToggle: () {
                  selectedMessageId.value = selectedMessageId.value == messageItem.id
                      ? null
                      : messageItem.id;
                },
              );

              // This specific message just replaced a live typing indicator
              // (see VuMeetMessageBloc._onGetNewMessage) — fade it in over
              // the same duration the indicator fades out, so it reads as
              // one continuous crossfade rather than an abrupt swap.
              if (messageItem.id == state.justArrivedMessageId) {
                return TweenAnimationBuilder<double>(
                  key: ValueKey('arrived-${messageItem.id}'),
                  tween: Tween(begin: 0, end: 1),
                  duration: typingToMessageCrossfadeDuration,
                  builder: (context, opacity, child) => Opacity(opacity: opacity, child: child),
                  child: container,
                );
              }

              return container;
            },
          ),
        );
      },
    );
  }

  List<VuMeetMessageItemModel> _processMessagesForUI(List<VuMeetMessageItemModel> messages) {
    if (messages.isEmpty) return [];

    final List<VuMeetMessageItemModel> processedList = [];

    for (int i = 0; i < messages.length; i++) {
      final current = messages[i];
      final newer = (i > 0) ? messages[i - 1] : null;
      final older = (i < messages.length - 1) ? messages[i + 1] : null;

      if (current.messageStatus == VuMeetMessageType.callEvent) {
        processedList.add(current);
        continue;
      }

      final isFirstInClump =
          older == null ||
          older.messageStatus == VuMeetMessageType.callEvent ||
          older.senderId != current.senderId ||
          _isMessageClusterGap(older.createdAt, current.createdAt);

      final isLastInClump =
          newer == null ||
          newer.messageStatus == VuMeetMessageType.callEvent ||
          newer.senderId != current.senderId ||
          _isMessageClusterGap(current.createdAt, newer.createdAt);

      processedList.add(
        current.copyWith(isFirstFromUser: isFirstInClump, isLastFromUser: isLastInClump),
      );
    }
    return processedList;
  }

  bool _isMessageClusterGap(String earlier, String later) {
    final a = DateTime.tryParse(earlier);
    final b = DateTime.tryParse(later);
    if (a == null || b == null) return false;
    return b.difference(a).abs() > _messageClusterMaxGap;
  }

  bool _handleScrollNotification(BuildContext context, ScrollNotification scrollNotification) {
    if (scrollNotification is ScrollStartNotification) {
      if (scrollNotification.metrics.pixels >= scrollNotification.metrics.maxScrollExtent - 50) {
        context.read<VuMeetMessageBloc>().add(GetOlderVuMeetMessages());
      }
    }
    return false;
  }

  Widget _getLoadingOlderIndicator() {
    return const Center(
      child: Padding(padding: EdgeInsets.symmetric(vertical: 16.0), child: DTRingLoader.inline()),
    );
  }
}
