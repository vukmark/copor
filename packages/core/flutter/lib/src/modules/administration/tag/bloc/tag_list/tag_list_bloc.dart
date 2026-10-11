import 'package:copor_core/src/modules/administration/tag/bloc/tag_list/tag_list_event.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/tag_list/tag_list_state.dart';
import 'package:copor_core/src/modules/administration/tag/data/repository/tag_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class TagListBloc extends Bloc<TagListEvent, TagListState> {
  final TagRepository _tagRepository;

  TagListBloc({required TagRepository tagRepository})
    : _tagRepository = tagRepository,
      super(TagListState.initial()) {
    on<GetPublicTagList>(_onGetPublicTagList);
    on<DeleteTag>(_onDeleteTag);
  }

  Future<void> _onGetPublicTagList(GetPublicTagList event, Emitter<TagListState> emit) async {
    emit(state.copyWith(isLoading: true, isDeleted: false, filterList: event.filterList));
    final result = await _tagRepository.getPublicTagList(event.filterList);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }

  Future<void> _onDeleteTag(DeleteTag event, Emitter<TagListState> emit) async {
    final result = await _tagRepository.deleteTag(event.tagId);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false, isDeleted: false));
      },
      (_) {
        emit(state.copyWith(isDeleted: true));
      },
    );
  }
}
