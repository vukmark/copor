import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_vu_meet/src/config/vu_meet_routes.dart';
import 'package:copor_vu_meet/src/logic/utils/vu_meet_bloc_event_dispatcher.dart';

/// Navigates back to a chat after a call ends. Selects the chat first so the
/// mobile layout (which switches between the chat list and the conversation
/// view based on the selected chat) lands on the conversation view instead of
/// briefly showing the chat list.
void goToChatFromCall(String chatId) {
  VuMeetDispatcher.chatList.setSelectedChat(chatId);
  goToPage(VuMeetRoutes.getChatUri(chatId));
}
