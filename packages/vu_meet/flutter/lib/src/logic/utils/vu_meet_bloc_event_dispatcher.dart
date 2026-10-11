// ignore_for_file: library_private_types_in_public_api

import 'package:collection/collection.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_vu_meet/src/data/model/chat_list/chat_list_model.dart';
import 'package:copor_vu_meet/src/data/model/chat_list/create_new_chat_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/chat_list/edit_chat_req_body_dto.dart';
import 'package:copor_core/src/data/model/user_picker/user_picker_item_model.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/send_vu_meet_file_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/send_vu_meet_message_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/typing_status_req_body.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_video_call/make_video_call_req_body_dto.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_event.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_info/chat_info_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_info/chat_info_event.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_event.dart';
import 'package:copor_vu_meet/src/logic/chat/selected_chat/selected_chat_cubit.dart';
import 'package:copor_vu_meet/src/logic/message/private_message_list/private_message_list_bloc.dart';
import 'package:copor_vu_meet/src/logic/message/private_message_list/private_message_list_event.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_message/vu_meet_message_bloc.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_message/vu_meet_message_event.dart';
import 'package:copor_core/src/utils/json_object_normalizer.dart';

import 'package:copor_core/src/bloc/global_blocs/notification_counter_bloc/config/notification_counter_dependency_injection.dart';

class VuMeetDispatcher {
  static _VuMeetMessages messages = _VuMeetMessages();
  static _VuMeetChatList chatList = _VuMeetChatList();
  static _VuMeetPrivateMessageList vuMeetPrivateMessageList = _VuMeetPrivateMessageList();
  static _VuMeetChatInfo chatInfo = _VuMeetChatInfo();
  static _Translation translation = _Translation();
}

class _Translation {
  void getVuMeetTranslation(TranslationBloc<VuMeetPageTranslation> bloc, LanguageModel language) {
    bloc.add(
      GetTranslationEvent<VuMeetPageTranslation>(
        namespace: VuMeetPageTranslation.namespaceStatic,
        languageModel: language,
        constructor: (translationStringList) =>
            VuMeetPageTranslation(translationStringList: translationStringList),
      ),
    );
  }
}

class _VuMeetMessages {
  void sendMessage(SendVuMeetMessageReqBodyDto message) {
    final bloc = getIt<VuMeetMessageBloc>();
    bloc.add(SendVuMeetMessage(message));
  }

  void sendFileMessage(SendVuMeetFileReqBodyDto messageFileDto) {
    final bloc = getIt<VuMeetMessageBloc>();
    bloc.add(SendVuMeetFileMessage(messageFileDto: messageFileDto));
  }

  void getNewVuMeetMessages(String chatId) {
    final bloc = getIt<VuMeetMessageBloc>();
    bloc.add(GetNewVuMeetMessage(chatId));
  }

  void makeVideoCall(MakeVideoCallActionReqBodyDto requestDto) {
    final vuMeetMessageBloc = getIt<VuMeetMessageBloc>();
    vuMeetMessageBloc.add(MakeVideoCall(requestDto));
  }

  void selectChatForMessages(String? chatId) {
    getIt<VuMeetMessageBloc>().add(SelectChatForMessages(chatId));
  }

  void changeTypingStatus(TypingStatusReqBody body) {
    final bloc = getIt<VuMeetMessageBloc>();
    bloc.add(ChangeTypingStatusEvent(body));
  }

  void updateTypingStatus(Object? typingStatusModel) {
    final model = _typingStatusUpdateFrom(typingStatusModel);
    if (model == null) return;

    final bloc = getIt<VuMeetMessageBloc>();
    bloc.add(UpdateTypingStatusEvent(model));
  }

  TypingStatusUpdateDTO? _typingStatusUpdateFrom(Object? value) {
    if (value is TypingStatusUpdateDTO) {
      return value;
    }

    final json = _jsonMapFrom(value);
    if (json == null) {
      return null;
    }

    final chatId = json['chatId'];
    final typingStatus = json['typingStatus'];
    final userName = json['userName'];

    if (chatId is! String || typingStatus is! String || userName is! String) {
      return null;
    }

    return TypingStatusUpdateDTO(
      chatId: chatId,
      isTyping: typingStatus == 'STARTED_TYPING',
      userName: userName,
    );
  }

  Map<String, dynamic>? _jsonMapFrom(Object? value) {
    final normalizedValue = normalizeJsonObject(value);
    if (normalizedValue is! Map) {
      return null;
    }

    return normalizedValue.map((key, value) => MapEntry(key.toString(), value));
  }
}

class _VuMeetChatList {
  void getVuMeetChatList(String filterByName) {
    final bloc = getIt<ChatListBloc>();
    bloc.add(GetChatList(filterByName: filterByName));
  }

  void createChat(List<String> membersIds, [String groupName = '']) {
    final bloc = getIt<ChatListBloc>();
    bloc.add(
      CreateChat(
        users: CreateNewChatReqBodyDto(users: membersIds, groupName: groupName),
      ),
    );
  }

  void editChat({
    required List<UserPickerItemModel> selectedContacts,
    required String chatId,
    required String groupName,
  }) {
    final bloc = getIt<ChatListBloc>();
    bloc.add(
      EditChat(
        body: EditChatReqBodyDto(
          id: chatId,
          name: groupName,
          userList: selectedContacts.map((c) => c.id).toList(),
        ),
      ),
    );
  }

  ChatListItemModel? getChatDetailsFromChatList(String chatId) {
    final chatList = getIt<ChatListBloc>().state.result?.data ?? [];
    return chatList.firstWhereOrNull((chat) => chat.id == chatId);
  }

  void setSelectedChat(String? chatId) {
    getIt<SelectedChatCubit>().selectChat(chatId);
  }
}

class _VuMeetPrivateMessageList {
  void getVuMeetPrivateMessageList(PrivateMessageListBloc bloc) {
    bloc.add(GetPrivateMessageList());
  }
}

class _VuMeetChatInfo {
  void getChatInfo(String chatId) {
    final bloc = getIt<ChatInfoBloc>();
    bloc.add(GetChatInfo(chatId));
  }
}
