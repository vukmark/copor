import 'package:copor_core/src/data/model/user_picker/user_picker_item_model.dart';
import 'package:equatable/equatable.dart';

enum EditGroupStatus { initial, idle, loading, success, error }

class EditGroupState extends Equatable {
  final List<UserPickerItemModel> selectedContacts;
  final EditGroupStatus status;

  const EditGroupState({this.selectedContacts = const [], this.status = EditGroupStatus.idle});

  EditGroupState copyWith({
    List<UserPickerItemModel>? selectedContacts,
    EditGroupStatus? status,
  }) {
    return EditGroupState(
      selectedContacts: selectedContacts ?? this.selectedContacts,
      status: status ?? this.status,
    );
  }

  bool get hasSelection => selectedContacts.isNotEmpty;

  bool get isLoading => status == EditGroupStatus.loading;

  bool get isSuccess => status == EditGroupStatus.success;

  @override
  List<Object?> get props => [selectedContacts, status];
}
