import 'package:copor_vu_meet/src/logic/utils/vu_meet_bloc_event_dispatcher.dart';
import 'package:copor_core/src/data/model/user_picker/user_picker_item_model.dart';
import 'package:copor_vu_meet/src/logic/chat/add_members/edit_group_state.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class EditGroupCubit extends Cubit<EditGroupState> {
  String? _chatId;
  String? _groupName;

  EditGroupCubit() : super(const EditGroupState());

  void reset() {
    _chatId = null;
    _groupName = null;

    emit(const EditGroupState());
  }

  void initialize({
    List<UserPickerItemModel> existingMembers = const [],
    required String chatId,
    required String groupName,
  }) {
    _chatId = chatId;
    _groupName = groupName;

    emit(EditGroupState(selectedContacts: existingMembers, status: EditGroupStatus.initial));
  }

  void toggleContact(UserPickerItemModel contact) {
    final isSelected = state.selectedContacts.any((c) => c.id == contact.id);
    final updated = isSelected
        ? state.selectedContacts.where((c) => c.id != contact.id).toList()
        : [...state.selectedContacts, contact];
    emit(state.copyWith(selectedContacts: updated));
  }

  Future<void> addMembers() async {
    if (!state.hasSelection) return;
    emit(state.copyWith(status: EditGroupStatus.loading));
    if (_chatId != null && _groupName != null) {
      VuMeetDispatcher.chatList.editChat(
        selectedContacts: state.selectedContacts,
        chatId: _chatId!,
        groupName: _groupName!,
      );
      emit(state.copyWith(status: EditGroupStatus.success));
    } else {
      emit(state.copyWith(status: EditGroupStatus.error));
    }
  }
}
