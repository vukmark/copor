import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_form/private_tag_form_event.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/private_tag_form/private_tag_form_state.dart';
import 'package:copor_core/src/modules/administration/tag/data/repository/tag_repository.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class PrivateTagFormBloc extends Bloc<PrivateTagFormEvent, PrivateTagFormState> {
  final TagRepository _tagRepository;

  PrivateTagFormBloc({required TagRepository tagRepository})
    : _tagRepository = tagRepository,
      super(PrivateTagFormState.initial()) {
    on<CreatePrivateTag>(_onCreatePrivateTag);
    on<UpdatePrivateTag>(_onUpdatePrivateTag);
  }

  Future<void> _onCreatePrivateTag(
    CreatePrivateTag event,
    Emitter<PrivateTagFormState> emit,
  ) async {
    emit(PrivateTagFormState.loading(result: state.result));

    final result = await _tagRepository.createTag(event.tagToCreate);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (_) {
        emit(state.copyWith(isUpdated: true, isLoading: false, actionType: ActionType.create));
      },
    );
  }

  Future<void> _onUpdatePrivateTag(
    UpdatePrivateTag event,
    Emitter<PrivateTagFormState> emit,
  ) async {
    emit(PrivateTagFormState.loading(result: state.result));

    final result = await _tagRepository.updateTag(event.tagToUpdate);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (_) {
        emit(state.copyWith(isUpdated: true, isLoading: false, actionType: ActionType.update));
      },
    );
  }
}
