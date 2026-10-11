import 'package:bloc/bloc.dart';
import 'package:copor_todo/src/logic/private_tags_management/private_tags_management_event.dart';
import 'package:copor_todo/src/logic/private_tags_management/private_tags_management_state.dart';

class PrivateTagsManagementBloc
    extends Bloc<PrivateTagsManagementEvent, PrivateTagsManagementState> {
  PrivateTagsManagementBloc() : super(const PrivateTagsManagementState()) {
    on<AddTagToggled>(_onAddTagToggled);
    on<NewTagNameChanged>((event, emit) => emit(state.copyWith(newTagName: event.name)));
    on<NewTagColorChanged>((event, emit) => emit(state.copyWith(newTagColor: event.color)));
    on<EditModeToggled>(_onEditModeToggled);
    on<EditingTagNameChanged>(_onEditingTagNameChanged);
    on<EditingTagColorChanged>(_onEditingTagColorChanged);
  }

  void _onAddTagToggled(AddTagToggled event, Emitter<PrivateTagsManagementState> emit) {
    emit(state.copyWith(isAddingTag: !state.isAddingTag, newTagName: '', newTagColor: 0));
  }

  void _onEditModeToggled(EditModeToggled event, Emitter<PrivateTagsManagementState> emit) {
    final newEditingIds = Set<String>.from(state.editingTagIds);
    final newEditingNames = Map<String, String>.from(state.editingTagNames);
    final newEditingColors = Map<String, int>.from(state.editingTagColors);

    if (newEditingIds.contains(event.tag.id)) {
      newEditingIds.remove(event.tag.id);
      newEditingNames.remove(event.tag.id);
      newEditingColors.remove(event.tag.id);
    } else {
      newEditingIds.add(event.tag.id);
      newEditingNames[event.tag.id] = event.tag.name;
      newEditingColors[event.tag.id] = event.tag.color;
    }

    emit(
      state.copyWith(
        editingTagIds: newEditingIds,
        editingTagNames: newEditingNames,
        editingTagColors: newEditingColors,
      ),
    );
  }

  void _onEditingTagNameChanged(
    EditingTagNameChanged event,
    Emitter<PrivateTagsManagementState> emit,
  ) {
    final newEditingNames = Map<String, String>.from(state.editingTagNames);
    newEditingNames[event.tagId] = event.name;
    emit(state.copyWith(editingTagNames: newEditingNames));
  }

  void _onEditingTagColorChanged(
    EditingTagColorChanged event,
    Emitter<PrivateTagsManagementState> emit,
  ) {
    final newEditingColors = Map<String, int>.from(state.editingTagColors);
    newEditingColors[event.tagId] = event.color;
    emit(state.copyWith(editingTagColors: newEditingColors));
  }
}
