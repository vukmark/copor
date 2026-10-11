import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_vu_meet/src/logic/utils/vu_meet_bloc_event_dispatcher.dart';
import 'package:copor_vu_meet/src/logic/vu_meet_ui/vu_meet_ui_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_state.dart';
import 'package:copor_vu_meet/src/logic/vu_meet_ui/vu_meet_ui_event.dart';
import 'package:copor_vu_meet/src/logic/vu_meet_ui/vu_meet_ui_state.dart';
import 'package:copor_vu_meet/src/config/vu_meet_routes.dart';
import 'package:copor_vu_meet/src/data/model/chat_list/chat_list_model.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_vu_meet/src/presentation/components/chat_list/chat_list.dart';
import 'package:copor_vu_meet/src/presentation/pages/create_chat/create_chat_screen.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class VuMeetChatsAndUsers extends HookWidget {
  final VuMeetPageTranslation translation;

  const VuMeetChatsAndUsers({super.key, required this.translation});

  @override
  Widget build(BuildContext context) {
    final searchController = useTextEditingController();

    useEffect(() {
      String previousText = searchController.text;

      void listener() {
        if (searchController.text != previousText) {
          previousText = searchController.text;
          VuMeetDispatcher.chatList.getVuMeetChatList(searchController.text);
        }
      }

      searchController.addListener(listener);
      return () => searchController.removeListener(listener);
    }, [searchController]);

    return BlocListener<ChatListBloc, ChatListState>(
      listenWhen: (_, curr) => curr is ChatCreationSuccessState,
      listener: (context, state) {
        VuMeetDispatcher.chatList.setSelectedChat((state as ChatCreationSuccessState).newChatId);
        _closeContactList(context);
      },
      child: BlocBuilder<VuMeetUiBloc, VuMeetUiState>(
        builder: (context, state) {
          final step = state.step;
          return ClipRRect(
            clipBehavior: Clip.hardEdge,
            child: DTStepContent(
              key: const ValueKey('chat_list_container'),
              stepIndex: step.index,
              child: switch (step) {
                VuMeetStep.chatList => _ChatListStep(
                  translation: translation,
                  searchController: searchController,
                  onSelectChat: (chat) => _openChat(context, chat),
                  onCreateNew: () => _openContactList(context),
                ),
                VuMeetStep.createChat => CreateChatScreen(
                  key: const ValueKey('vu_meet_contacts_list'),
                  translation: translation,
                  onBackPressed: () => _closeContactList(context),
                ),
              },
            ),
          );
        },
      ),
    );
  }

  void _openChat(BuildContext context, ChatListItemModel chat) {
    VuMeetDispatcher.chatList.setSelectedChat(chat.id);

    final navigationCubit = context.read<NavigationCubit>();
    final currentChatRoute = navigationCubit.state.selectedRoute;
    final targetRoute = VuMeetRoutes.getChatUri(chat.id);

    if (currentChatRoute != targetRoute) {
      goToPage(targetRoute);
    }
  }

  void _closeContactList(BuildContext context) {
    context.read<VuMeetUiBloc>().add(HideCreateChatScreen());
  }

  void _openContactList(BuildContext context) {
    context.read<VuMeetUiBloc>().add(ShowCreateChatScreen());
  }
}

class _ChatListStep extends StatelessWidget {
  final VuMeetPageTranslation translation;
  final TextEditingController searchController;
  final void Function(ChatListItemModel) onSelectChat;
  final VoidCallback onCreateNew;

  const _ChatListStep({
    required this.translation,
    required this.searchController,
    required this.onSelectChat,
    required this.onCreateNew,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            Expanded(
              child: DTSearchBar(
                key: const ValueKey('vu_meet_search_bar'),
                title: translation.SEARCH_VU_MEET,
                controller: searchController,
                onSearchChanged: VuMeetDispatcher.chatList.getVuMeetChatList,
              ),
            ),
            const SizedBox(width: 5),
            DTButton.primary(
              key: const ValueKey('vu_meet_create_new_message_btn'),
              icon: DTIcons.newChat,
              label: '',
              semanticLabel: translation.CREATE_CHAT,
              onPressed: onCreateNew,
            ),
          ],
        ),
        const SizedBox(height: 8),
        DTDivider.subtle(height: 0),
        Expanded(
          child: ChatList(
            key: const ValueKey('vu_meet_chat_list'),
            translation: translation,
            onSelectChat: onSelectChat,
            searchController: searchController,
          ),
        ),
      ],
    );
  }
}
