import 'package:copor_core/src/components/presence_avatar.dart';
import 'package:copor_vu_meet/src/logic/utils/vu_meet_bloc_event_dispatcher.dart';
import 'package:copor_vu_meet/src/config/vu_meet_routes.dart';
import 'package:copor_vu_meet/src/data/model/chat_list/chat_list_model.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/get_vu_meet_message_file_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/vu_meet_message_model.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_vu_meet/src/helpers/chat_display_name.dart';
import 'package:copor_vu_meet/src/logic/call/call_bloc.dart';
import 'package:copor_vu_meet/src/logic/call/call_event.dart';
import 'package:copor_vu_meet/src/logic/call/call_state.dart';
import 'package:copor_vu_meet/src/presentation/components/call/active_call_banner.dart';
import 'package:copor_vu_meet/src/data/model/call/group_call_roster_model.dart';
import 'package:copor_vu_meet/src/logic/call/declined_calls_cubit.dart';
import 'package:copor_vu_meet/src/logic/call/group_call_roster_cubit.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_info/chat_info_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_info/chat_info_state.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_state.dart';
import 'package:copor_vu_meet/src/logic/chat/selected_chat/selected_chat_cubit.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_media_message/vu_meet_media_message_bloc.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_media_message/vu_meet_media_message_event.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_media_message/vu_meet_media_message_state.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_message/vu_meet_message_bloc.dart';
import 'package:copor_vu_meet/src/presentation/components/chat/conversation_view.dart';
import 'package:copor_vu_meet/src/presentation/components/chat/message_input.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/core/system/device_service.dart';

class ChatContainer extends HookWidget {
  final String chatId;
  final VuMeetPageTranslation translation;

  const ChatContainer({super.key, required this.translation, required this.chatId});

  @override
  Widget build(BuildContext context) {
    final messageState = context.watch<VuMeetMessageBloc>().state;
    final mediaState = context.watch<VuMeetMediaMessageBloc>().state;
    final messages = messageState.chatId == chatId
        ? messageState.result?.data ?? const <VuMeetMessageItemModel>[]
        : const <VuMeetMessageItemModel>[];

    useEffect(() {
      VuMeetDispatcher.messages.selectChatForMessages(chatId);
      VuMeetDispatcher.chatList.setSelectedChat(chatId);
      VuMeetDispatcher.chatInfo.getChatInfo(chatId);

      return () {
        if (getIt<SelectedChatCubit>().state == chatId) {
          VuMeetDispatcher.chatList.setSelectedChat(null);
        }
      };
    }, [chatId]);

    useEffect(() {
      final missingMessages = _getMediaMessagesToFetch(messages, mediaState);
      final mediaMessageBloc = context.read<VuMeetMediaMessageBloc>();

      for (final message in missingMessages) {
        mediaMessageBloc.add(
          GetVuMeetMessageFile(
            GetVuMeetMessageFileReqBodyDto(fileId: message.id, fileName: message.messageContent),
          ),
        );
      }

      return null;
    }, [chatId, messages, mediaState.result, mediaState.loadingIds, mediaState.failedIds]);

    final chatInfoState = context.watch<ChatInfoBloc>().state;

    return BlocBuilder<ChatListBloc, ChatListState>(
      builder: (context, chatListState) {
        final chats = chatListState.result?.data ?? const [];
        final match = chats.where((c) => c.id == chatId);
        final chat = match.isEmpty ? _fallbackChatFromInfo(chatInfoState, chatId) : match.first;

        final isLoadingCurrentChat =
            messageState.chatId != chatId ||
            (messageState.isLoading && messageState.result == null);
        final isWaitingForMedia =
            messageState.chatId == chatId && _hasPendingMedia(messages, mediaState);
        final showSkeleton = chat == null || isLoadingCurrentChat || isWaitingForMedia;

        if (showSkeleton) {
          return _ChatContainerSkeleton(
            key: ValueKey('skeleton_$chatId'),
            translation: translation,
          );
        }

        return Column(
          key: ValueKey('chat_$chatId'),
          children: [
            _ConversationAppBar(chat: chat, chatId: chatId, translation: translation),
            const DTDivider.subtle(height: 0),
            Expanded(
              child: ConversationView(
                key: ValueKey(chatId),
                chatId: chatId,
                isPrivate: chat.isPrivate,
                picture: chat.picture,
                translations: translation,
              ),
            ),
          ],
        );
      },
    );
  }

  ChatListItemModel? _fallbackChatFromInfo(ChatInfoState chatInfoState, String chatId) {
    final chatInfo = chatInfoState.result?.data;
    if (chatInfo == null || chatInfo.id != chatId) return null;

    return ChatListItemModel(
      id: chatInfo.id,
      isPrivate: chatInfo.isPrivate,
      name: chatInfo.name,
      picture: chatInfo.chatPicture,
      lastMessage: '',
      createdAt: '',
      numberOfUnseenMessages: 0,
      isActive: chatInfo.isActive ?? false,
    );
  }

  List<VuMeetMessageItemModel> _getMediaMessagesToFetch(
    List<VuMeetMessageItemModel> messages,
    VuMeetMediaMessageState mediaState,
  ) {
    return messages.where((message) {
      if (message.messageStatus != VuMeetMessageType.file) return false;
      if (mediaState.result?.data.containsKey(message.id) ?? false) {
        return false;
      }
      if (mediaState.loadingIds.contains(message.id)) return false;
      return !mediaState.failedIds.contains(message.id);
    }).toList();
  }

  bool _hasPendingMedia(List<VuMeetMessageItemModel> messages, VuMeetMediaMessageState mediaState) {
    return messages.any((message) {
      if (message.messageStatus != VuMeetMessageType.file) return false;
      if (mediaState.result?.data.containsKey(message.id) ?? false) {
        return false;
      }
      return !mediaState.failedIds.contains(message.id);
    });
  }
}

class _ConversationAppBar extends StatelessWidget {
  final ChatListItemModel chat;
  final String chatId;
  final VuMeetPageTranslation translation;

  const _ConversationAppBar({required this.chat, required this.chatId, required this.translation});

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    final displayName = chatDisplayName(
      name: chat.name,
      isPrivate: chat.isPrivate,
      translation: translation,
      isActive: chat.isActive,
    );

    final resolvedName = chat.isPrivate || chat.name.trim().isNotEmpty
        ? chat.name
        : translation.UNNAMED_GROUP_CHAT;

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          if (context.isMobile) ...[
            DTButton.surface(
              icon: DTIcons.back,
              label: '',
              semanticLabel: '',
              border: false,
              onPressed: () => goToPage(VuMeetRoutes.vuMeet),
            ),
            const SizedBox(width: 4),
          ],
          Flexible(
            child: MouseRegion(
              cursor: SystemMouseCursors.click,
              child: GestureDetector(
                behavior: HitTestBehavior.opaque,
                onTap: () => goToPage('${VuMeetRoutes.getChatUri(chatId)}/info'),
                child: Row(
                  mainAxisSize: MainAxisSize.max,
                  children: [
                    chat.isPrivate
                        ? PresenceAvatar(
                            userId: chat.otherUserId,
                            userFullName: resolvedName,
                            picture: chat.picture,
                            radius: 18,
                          )
                        : DTAvatar(userFullName: resolvedName, picture: chat.picture, radius: 18),
                    const SizedBox(width: 10),
                    Flexible(
                      child: Text(
                        displayName,
                        style: dt.text.bodyStrong,
                        overflow: TextOverflow.ellipsis,
                        maxLines: 1,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          if (!chat.isPrivate)
            BlocBuilder<GroupCallRosterCubit, Map<String, GroupCallRosterModel>>(
              bloc: getIt<GroupCallRosterCubit>(),
              builder: (context, rosters) {
                final roster = rosters[chatId];
                if (roster == null || roster.unavailableCount == 0) {
                  return const SizedBox.shrink();
                }

                return Padding(
                  padding: const EdgeInsets.only(right: 4),
                  child: GroupCallMissingMembersPill(roster: roster),
                );
              },
            ),
          BlocBuilder<CallBloc, CallState>(
            bloc: getIt<CallBloc>(),
            buildWhen: (prev, curr) => prev.runtimeType != curr.runtimeType,
            builder: (context, callState) {
              if (callState is CallConnected) {
                return context.isMobile
                    ? CallDurationPill(
                        chatId: callState.chatId,
                        connectedAt: callState.connectedAt,
                        isVideo: callState.isVideo,
                      )
                    : ReturnToCallPill(
                        chatId: callState.chatId,
                        connectedAt: callState.connectedAt,
                        isVideo: callState.isVideo,
                      );
              }
              return Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  DTButton.primary(
                    icon: DTIcons.phone,
                    label: '',
                    semanticLabel: '',
                    border: false,
                    enabled: context.isMobilePlatform,
                    onPressed: () => _startCall(context, isVideo: false),
                  ),
                  const SizedBox(width: 4),
                  DTButton.primary(
                    icon: DTIcons.videoCall,
                    label: '',
                    semanticLabel: '',
                    border: false,
                    enabled: context.isMobilePlatform,
                    onPressed: () => _startCall(context, isVideo: true),
                  ),
                ],
              );
            },
          ),
          const SizedBox(width: 4),
          DTButton.surface(
            icon: DTIcons.info,
            label: '',
            semanticLabel: '',
            border: false,
            onPressed: () => goToPage('${VuMeetRoutes.getChatUri(chatId)}/info'),
          ),
        ],
      ),
    );
  }

  void _startCall(BuildContext context, {required bool isVideo}) {
    final callBloc = getIt<CallBloc>();
    if (callBloc.state is CallOutgoing || callBloc.state is CallConnected) {
      return;
    }
    VuMeetDispatcher.chatInfo.getChatInfo(chatId);
    callBloc.add(CallStartOngoing(chatId: chatId, isVideo: isVideo));
    getIt<DeclinedCallsCubit>().clearNumberOfDeclinedCalls();
    goToPage('${VuMeetRoutes.getChatUri(chatId)}/call');
  }
}

class _ChatContainerSkeleton extends HookWidget {
  final VuMeetPageTranslation translation;

  const _ChatContainerSkeleton({super.key, required this.translation});

  @override
  Widget build(BuildContext context) {
    final c = CoporTheme.of(context).colors;
    final placeholder = c.onSurfaceDisabled.withValues(alpha: 0.4);
    final controller = useTextEditingController();

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 10),
          child: Row(
            children: [
              Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(color: placeholder, shape: BoxShape.circle),
              ),
              const SizedBox(width: 10),
              Container(
                width: 110,
                height: 13,
                decoration: BoxDecoration(
                  color: placeholder,
                  borderRadius: BorderRadius.circular(6),
                ),
              ),
              const Spacer(),
              if (!context.isMobile) ...[
                Container(
                  width: 36,
                  height: 36,
                  decoration: BoxDecoration(
                    color: placeholder,
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                const SizedBox(width: 4),
              ],
              Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  color: placeholder,
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
            ],
          ),
        ),
        const DTDivider.subtle(height: 0),
        const Expanded(child: Center(child: DTRingLoader())),
        IgnorePointer(
          child: Opacity(
            opacity: 0.4,
            child: MessageInput(
              messageController: controller,
              onSendPressed: () {},
              isSendButtonEnabled: false,
              onTypingStatusChanged: (_) {},
              translations: translation,
            ),
          ),
        ),
      ],
    );
  }
}
