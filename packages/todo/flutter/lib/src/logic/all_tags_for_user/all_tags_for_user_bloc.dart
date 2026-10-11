import 'package:bloc/bloc.dart';
import 'package:copor_core/src/modules/administration/tag/data/repository/tag_repository.dart';
import 'package:copor_todo/src/logic/all_tags_for_user/all_tags_for_user_event.dart';
import 'package:copor_todo/src/logic/all_tags_for_user/all_tags_for_user_state.dart';

class AllTagsForUserBloc extends Bloc<AllTagsForUserEvent, AllTagsForUserState> {
  final TagRepository _tagRepository;

  AllTagsForUserBloc({required TagRepository tagRepository})
    : _tagRepository = tagRepository,
      super(AllTagsForUserState.initial()) {
    on<GetAllTagsForUser>(_onGetAllTagsForUser);
  }

  Future<void> _onGetAllTagsForUser(
    GetAllTagsForUser event,
    Emitter<AllTagsForUserState> emit,
  ) async {
    emit(AllTagsForUserState.loading(result: state.result));
    final result = await _tagRepository.getAllTagsForUser();
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }
}
