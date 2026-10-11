import 'dart:async';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/painting.dart';
import 'package:bloc/bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/data/model/named_id/named_id_model.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_event.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_state.dart';
import 'package:copor_core/src/modules/forms/data/model/copor_form_dto.dart';
import 'package:copor_core/src/modules/forms/data/model/copor_form_submit_result.dart';
import 'package:copor_core/src/modules/forms/data/repository/copor_form_repository.dart';
import 'package:copor_core/src/utils/typedef.dart';

class CoporFormBloc extends Bloc<CoporFormEvent, CoporFormState> {
  final CoporFormRepository coporFormRepository;
  List<CoporFormFieldDTO>? _originalFields;
  final List<UploadPicture> _pictureQueue = [];
  final List<DeletePicture> _pictureDeleteQueue = [];

  CoporFormBloc({required this.coporFormRepository}) : super(const CoporFormState.initial()) {
    on<GetCoporForm>(_onGetCoporForm);
    on<GetPublicCoporForm>(_onGetPublicCoporForm);
    on<SubmitFromCoporForm>(_onSubmitFromCoporForm);
    on<CreateFromCoporForm>(_onCreateFromCoporForm);
    on<UpdateFromCoporForm>(_onUpdateFromCoporForm);
    on<UploadPicture>(_onUploadPicture);
    on<DeletePicture>(_onDeletePicture);
    on<ClearCoporForm>(_onClearCoporForm);
    on<UpdateSystemSettings>(_onUpdateSystemSettings);
    on<FilterCommonPasswordsField>(_onFilterCommonPasswordsField);
  }

  Future<void> _onGetCoporForm(GetCoporForm event, Emitter<CoporFormState> emit) async {
    emit(CoporFormState.loading(result: state.result));

    final result = await coporFormRepository.getCoporForm(event.endpoint);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        _originalFields = List.from(success.data.fields);
        emit(state.copyWith(result: success, isLoading: false));

        final bool blockCommonPasswords = success.data.fields.any((f) {
          if (f.name == 'blockCommonPasswords') {
            final dropdown = f.currentValue.dropdown;
            if (dropdown != null && dropdown.isNotEmpty) {
              return dropdown.first.id == true;
            }
          }
          return false;
        });

        if (!isClosed) {
          add(FilterCommonPasswordsField(blockCommonPasswords, {}));
        }
      },
    );
  }

  Future<void> _onGetPublicCoporForm(GetPublicCoporForm event, Emitter<CoporFormState> emit) async {
    emit(CoporFormState.loading(result: state.result));

    final result = await coporFormRepository.getPublicCoporForm(event.endpoint);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        _originalFields = List.from(success.data.fields);
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }

  void _onUploadPicture(UploadPicture event, Emitter<CoporFormState> emit) {
    _pictureDeleteQueue.removeWhere((queued) => queued.endpoint == event.endpoint);
    _pictureQueue
      ..removeWhere((queued) => queued.endpoint == event.endpoint)
      ..add(event);
  }

  void _onDeletePicture(DeletePicture event, Emitter<CoporFormState> emit) {
    _pictureQueue.removeWhere((queued) => queued.endpoint == event.endpoint);
    _pictureDeleteQueue
      ..removeWhere((queued) => queued.endpoint == event.endpoint)
      ..add(event);
  }

  Future<Failure?> _flushPictureQueue() async {
    for (final upload in _pictureQueue) {
      final result = await coporFormRepository.uploadFormImage(upload.endpoint, upload.image);
      final failure = result.fold<Failure?>((failure) => failure, (_) => null);
      if (failure != null) return failure;
      await _evictCachedImage(upload.currentImageUrl);
    }
    _pictureQueue.clear();

    for (final deletion in _pictureDeleteQueue) {
      final result = await coporFormRepository.deleteFormImage(deletion.endpoint);
      final failure = result.fold<Failure?>((failure) => failure, (_) => null);
      if (failure != null) return failure;
      await _evictCachedImage(deletion.currentImageUrl);
    }
    _pictureDeleteQueue.clear();

    return null;
  }

  /// Pictures are painted through CachedNetworkImageProvider, so a replaced one has
  /// to go from the cache manager's files and from the decoded-image cache - evicting
  /// a NetworkImage key clears neither, and the decoded copy is never revalidated.
  Future<void> _evictCachedImage(String imageUrl) async {
    if (imageUrl.isEmpty) return;

    await CachedNetworkImage.evictFromCache(imageUrl);
    PaintingBinding.instance.imageCache
      ..clear()
      ..clearLiveImages();
  }

  Future<void> _onSubmitFromCoporForm(
    SubmitFromCoporForm event,
    Emitter<CoporFormState> emit,
  ) async {
    emit(CoporFormState.loading(result: state.result));

    final uploadFailure = await _flushPictureQueue();
    if (uploadFailure != null) {
      emit(state.copyWith(failure: uploadFailure, isLoading: false));
      return;
    }

    final result = await coporFormRepository.submitFromCoporForm(event.endpoint, event.formData);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(isLoading: false, isUpdated: true, actionType: ActionType.get));
      },
    );
  }

  Future<void> _onCreateFromCoporForm(
    CreateFromCoporForm event,
    Emitter<CoporFormState> emit,
  ) async {
    emit(CoporFormState.loading(result: state.result));

    final uploadFailure = await _flushPictureQueue();
    if (uploadFailure != null) {
      emit(state.copyWith(failure: uploadFailure, isLoading: false));
      return;
    }

    final result = await coporFormRepository.createFromCoporForm(event.endpoint, event.formData);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(isLoading: false, isUpdated: true, actionType: ActionType.create));
      },
    );
  }

  Future<void> _onUpdateFromCoporForm(
    UpdateFromCoporForm event,
    Emitter<CoporFormState> emit,
  ) async {
    emit(CoporFormState.loading(result: state.result));

    final uploadFailure = await _flushPictureQueue();
    if (uploadFailure != null) {
      emit(state.copyWith(failure: uploadFailure, isLoading: false));
      return;
    }

    final result = await coporFormRepository.updateFromCoporForm(event.endpoint, event.formData);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        switch (success.data) {
          case CoporFormNextStep(:final form):
            _originalFields = List.from(form.fields);
            emit(
              state.copyWith(
                result: Result(data: form, warning: success.warning),
                isLoading: false,
                isUpdated: false,
                actionType: ActionType.get,
              ),
            );
          case CoporFormCompleted(:final message):
            emit(
              state.copyWith(
                isLoading: false,
                isUpdated: true,
                actionType: ActionType.update,
                message: (message.isNotEmpty) ? message : null,
              ),
            );
        }
      },
    );
  }

  void _onClearCoporForm(ClearCoporForm event, Emitter<CoporFormState> emit) {
    _originalFields = null;
    _pictureQueue.clear();
    _pictureDeleteQueue.clear();
    emit(const CoporFormState.initial());
  }

  Future<void> _onUpdateSystemSettings(
    UpdateSystemSettings event,
    Emitter<CoporFormState> emit,
  ) async {
    emit(CoporFormState.loading(result: state.result));

    final result = await coporFormRepository.updateSystemSettings(event.formData);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(isLoading: false, isUpdated: true, actionType: ActionType.update));
      },
    );
  }


  void _onFilterCommonPasswordsField(
    FilterCommonPasswordsField event,
    Emitter<CoporFormState> emit,
  ) {
    if (_originalFields == null || state.result == null) return;

    final fields = _originalFields!
        .where((field) {
          if (field.name == 'commonPasswords') return event.blockCommonPasswords;
          return true;
        })
        .map<CoporFormFieldDTO>((field) {
          if (field.name == 'blockCommonPasswords') {
            return CoporFormFieldDTO(
              name: field.name,
              label: field.label,
              type: field.type,
              values: field.values,
              requiredMessage: field.requiredMessage,
              currentValue: field.currentValue.copyWith(
                dropdown: [
                  NamedIdModel(
                    id: event.blockCommonPasswords,
                    name: event.blockCommonPasswords ? 'Yes' : 'No',
                  ),
                ],
              ),
            );
          }

          final currentStateField = state.result!.data.fields.firstWhere(
            (f) => f.name == field.name,
            orElse: () => field,
          );

          final uiValue = event.currentValues[field.name];

          List<NamedIdModel<dynamic>>? preservedDropdown = currentStateField.currentValue.dropdown;
          String? preservedText = currentStateField.currentValue.text;
          int? preservedNumber = currentStateField.currentValue.number;
          double? preservedDouble = currentStateField.currentValue.doubleNumber;
          String? preservedDate = currentStateField.currentValue.date;
          List<String>? preservedTextList = currentStateField.currentValue.textList;

          switch (uiValue) {
            case NamedIdModel v:
              preservedDropdown = [v];
              break;
            case List<dynamic> v when v.every((e) => e is String):
              preservedTextList = v.cast<String>();
              break;
            case int v:
              preservedNumber = v;
              break;
            case double v:
              preservedDouble = v;
              break;
            case String v:
              preservedText = v;
              break;
            case _:
              break;
          }

          return CoporFormFieldDTO(
            name: field.name,
            label: field.label,
            type: field.type,
            values: field.values,
            requiredMessage: field.requiredMessage,
            currentValue: field.currentValue.copyWith(
              dropdown: preservedDropdown,
              text: preservedText,
              number: preservedNumber,
              doubleNumber: preservedDouble,
              date: preservedDate,
              textList: preservedTextList,
            ),
          );
        })
        .toList();

    emit(
      state.copyWith(
        result: Result(
          data: CoporFormDTO(fields: fields, endpoint: state.result!.data.endpoint),
        ),
        isLoading: false,
      ),
    );
  }
}
