import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_list/private_tag_list_event.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_list/private_tag_list_state.dart';
import 'package:copor_core/src/modules/administration/tag/data/repository/tag_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class PrivateTagListBloc extends Bloc<PrivateTagListEvent, PrivateTagListState> {
  final TagRepository _tagRepository;

  PrivateTagListBloc({required TagRepository tagRepository})
    : _tagRepository = tagRepository,
      super(PrivateTagListState.initial()) {
    on<GetPrivateTagList>(_onGetPrivateTagList);
    on<DeletePrivateTag>(_onDeletePrivateTag);
  }

  Future<void> _onGetPrivateTagList(
    GetPrivateTagList event,
    Emitter<PrivateTagListState> emit,
  ) async {
    emit(state.copyWith(isLoading: true, isDeleted: false));

    final result = await _tagRepository.getPrivateTagList();
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }

  Future<void> _onDeletePrivateTag(
    DeletePrivateTag event,
    Emitter<PrivateTagListState> emit,
  ) async {
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
