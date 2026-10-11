import 'package:copor_core/src/modules/administration/tag/bloc/tag_form/tag_form_event.dart';
import 'package:copor_core/src/modules/administration/tag/bloc/tag_form/tag_form_state.dart';
import 'package:copor_core/src/modules/administration/tag/data/repository/tag_repository.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class TagFormBloc extends Bloc<TagFormEvent, TagFormState> {
  final TagRepository _tagRepository;

  TagFormBloc({required TagRepository tagRepository})
    : _tagRepository = tagRepository,
      super(TagFormState.initial()) {
    on<GetTag>(_onGetTag);
    on<CreateTag>(_onCreateTag);
    on<UpdateTag>(_onUpdateTag);
    on<RegisterValidationAndSubmitCallback>((event, emit) {
      emit(state.copyWith(onValidateAndSubmit: event.onValidateAndSubmit));
    });
    on<SaveButtonPressed>((event, emit) {
      state.onValidateAndSubmit?.call();
    });
  }

  Future<void> _onGetTag(GetTag event, Emitter<TagFormState> emit) async {
    emit(TagFormState.loading(result: state.result));
    final result = await _tagRepository.getTag(event.tagId);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }

  Future<void> _onCreateTag(CreateTag event, Emitter<TagFormState> emit) async {
    emit(TagFormState.loading(result: state.result));
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

  Future<void> _onUpdateTag(UpdateTag event, Emitter<TagFormState> emit) async {
    emit(TagFormState.loading(result: state.result));
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
