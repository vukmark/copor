import 'package:copor_vu_meet/src/data/model/chat_list/chat_list_model.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_event.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_state.dart';
import 'package:copor_vu_meet/src/logic/chat/selected_chat/selected_chat_cubit.dart';
import 'package:copor_vu_meet/src/presentation/components/chat_list/chat_list_item.dart';
import 'package:copor_vu_meet/src/presentation/components/chat_list/empty_chat_list_message.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

const _kItemExtent = 70.0;
const _kListTopPadding = 10.0;
const _kScrollPadding = 12.0;

class ChatList extends StatefulWidget {
  final VuMeetPageTranslation translation;
  final void Function(ChatListItemModel selectedChat) onSelectChat;
  final TextEditingController searchController;

  const ChatList({
    super.key,
    required this.translation,
    required this.onSelectChat,
    required this.searchController,
  });

  @override
  State<ChatList> createState() => _ChatListState();
}

class _ChatListState extends State<ChatList> {
  static double _lastChatListScrollOffset = 0;

  late final ScrollController _scrollController;
  String? _lastScrolledChatId;
  bool _hasSearched = false;

  @override
  void initState() {
    super.initState();
    _scrollController = ScrollController(initialScrollOffset: _lastChatListScrollOffset);
    _scrollController.addListener(_saveScrollOffset);
  }

  @override
  void dispose() {
    _saveScrollOffset();
    _scrollController.removeListener(_saveScrollOffset);
    _scrollController.dispose();
    super.dispose();
  }

  void _saveScrollOffset() {
    if (!_scrollController.hasClients) return;
    _lastChatListScrollOffset = _scrollController.offset;
  }

  void _scrollToSelectedChat(String? selectedChatId, List<ChatListItemModel> chatList) {
    if (selectedChatId == _lastScrolledChatId) return;
    _lastScrolledChatId = selectedChatId;

    if (selectedChatId == null || chatList.isEmpty) return;
    final index = chatList.indexWhere((c) => c.id == selectedChatId);
    if (index < 0) return;

    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!_scrollController.hasClients) return;
      final itemTop = _kListTopPadding + index * _kItemExtent;
      final itemBottom = itemTop + _kItemExtent;
      final viewTop = _scrollController.offset;
      final viewBottom = viewTop + _scrollController.position.viewportDimension;

      if (itemTop < viewTop) {
        _scrollController.animateTo(
          itemTop,
          duration: const Duration(milliseconds: 250),
          curve: Curves.easeOut,
        );
      } else if (itemBottom > viewBottom) {
        _scrollController.animateTo(
          itemBottom - _scrollController.position.viewportDimension + _kScrollPadding,
          duration: const Duration(milliseconds: 250),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final ChatListState chatListState = context.watch<ChatListBloc>().state;
    if (chatListState.result == null) return const SizedBox.shrink();
    final chatList = chatListState.ensuredData;
    final selectedChatId = context.watch<SelectedChatCubit>().state;

    if (widget.searchController.text.isNotEmpty) _hasSearched = true;
    if (chatList.isNotEmpty) _hasSearched = false;

    _scrollToSelectedChat(selectedChatId, chatList);

    if (chatList.isEmpty && !_hasSearched) {
      return EmptyChatListMessage(translations: widget.translation);
    }

    if (chatList.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: DTEmptyState(icon: DTIcons.noResults, title: widget.translation.NO_CONTACT_FOUND),
        ),
      );
    }

    return RefreshIndicator(
      onRefresh: () async {
        context.read<ChatListBloc>().add(
          GetChatList(filterByName: widget.searchController.text, showLoading: false),
        );
        await context.read<ChatListBloc>().stream.first;
      },
      child: ListView.builder(
        controller: _scrollController,
        key: const PageStorageKey('vu_meet_chat_list_scroll'),
        padding: const EdgeInsets.only(bottom: 80, top: 10),
        itemExtent: _kItemExtent,
        itemCount: chatList.length,
        itemBuilder: (context, index) {
          final chat = chatList[index];
          final isTyping = chatListState.typingByChatId.containsKey(chat.id);
          final displayChat = isTyping
              ? chat.copyWith(lastMessage: widget.translation.TYPING)
              : (!chat.isPrivate && chat.lastMessage.isEmpty)
              ? chat.copyWith(lastMessage: widget.translation.ADDED_TO_GROUP)
              : chat;
          return ChatListItem(
            key: ValueKey(chat.id),
            isSelected: chat.id == selectedChatId,
            chatItem: displayChat,
            isTyping: isTyping,
            translation: widget.translation,
            onTap: () => widget.onSelectChat(chat),
          );
        },
      ),
    );
  }
}
