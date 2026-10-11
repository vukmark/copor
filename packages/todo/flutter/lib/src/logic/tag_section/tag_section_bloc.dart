import 'package:bloc/bloc.dart';
import 'package:copor_todo/src/logic/tag_section/tag_section_event.dart';
import 'package:copor_todo/src/logic/tag_section/tag_section_state.dart';
import 'package:copor_core/src/modules/administration/tag/data/model/tag_model.dart';

class TagSectionBloc extends Bloc<TagSectionEvent, TagSectionState> {
  TagSectionBloc({required List<TagModel> initialSelectedTags})
    : super(TagSectionState(selectedTags: initialSelectedTags)) {
    on<TagAdded>(_onTagAdded);
    on<TagRemoved>(_onTagRemoved);
    on<TagsUpdated>(_onTagsUpdated);
  }

  void _onTagAdded(TagAdded event, Emitter<TagSectionState> emit) {
    if (!state.selectedTags.any((t) => t.id == event.tag.id)) {
      final updatedTags = List<TagModel>.from(state.selectedTags)..add(event.tag);
      emit(state.copyWith(selectedTags: updatedTags));
    }
  }

  void _onTagRemoved(TagRemoved event, Emitter<TagSectionState> emit) {
    final updatedTags = state.selectedTags.where((t) => t.id != event.tag.id).toList();
    emit(state.copyWith(selectedTags: updatedTags));
  }

  void _onTagsUpdated(TagsUpdated event, Emitter<TagSectionState> emit) {
    emit(state.copyWith(selectedTags: event.tags));
  }
}
