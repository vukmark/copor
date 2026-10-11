import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_vu_meet/src/logic/utils/vu_meet_bloc_event_dispatcher.dart';
import 'package:copor_vu_meet/src/logic/vu_meet_ui/vu_meet_ui_bloc.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_vu_meet/src/logic/call/call_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_info/chat_info_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/selected_chat/selected_chat_cubit.dart';
import 'package:copor_vu_meet/src/logic/message/private_message_list/private_message_list_bloc.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_media_message/vu_meet_media_message_bloc.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_message/vu_meet_message_bloc.dart';
import 'package:flutter/material.dart';

class VuMeetBlocFactory {
  static _VuMeetTranslation translation = _VuMeetTranslation();

  static VuMeetUiBloc initializeVuMeetUiBloc() {
    return getIt<VuMeetUiBloc>();
  }

  static CallBloc initializeCallBloc() {
    final bloc = getIt<CallBloc>();
    return bloc;
  }

  static SelectedChatCubit initializeSelectedChat() {
    return getIt<SelectedChatCubit>();
  }

  static VuMeetMessageBloc initializeVuMeetMessagesBloc() {
    final bloc = getIt<VuMeetMessageBloc>();
    return bloc;
  }

  static VuMeetMediaMessageBloc initializeVuMeetMediaMessageBloc() {
    final bloc = getIt<VuMeetMediaMessageBloc>();
    return bloc;
  }

  static ChatListBloc initializeChatListBloc() {
    return getIt<ChatListBloc>();
  }

  static ChatInfoBloc initializeChatInfo() {
    final bloc = getIt<ChatInfoBloc>();
    return bloc;
  }

  static PrivateMessageListBloc initializePrivateMessageListBloc(BuildContext context) {
    final bloc = getIt<PrivateMessageListBloc>();
    VuMeetDispatcher.vuMeetPrivateMessageList.getVuMeetPrivateMessageList(bloc);
    return bloc;
  }

  TranslationBloc<VuMeetPageTranslation> initializeVuMeetTranslationBloc(BuildContext context) {
    final bloc = getIt<TranslationBloc<VuMeetPageTranslation>>();
    VuMeetDispatcher.translation.getVuMeetTranslation(bloc, context.config.currentLanguage);
    return bloc;
  }
}

class _VuMeetTranslation {
  TranslationBloc<VuMeetPageTranslation> initializeVuMeetTranslationBloc(BuildContext context) {
    final bloc = getIt<TranslationBloc<VuMeetPageTranslation>>();
    VuMeetDispatcher.translation.getVuMeetTranslation(bloc, context.config.currentLanguage);
    return bloc;
  }
}
