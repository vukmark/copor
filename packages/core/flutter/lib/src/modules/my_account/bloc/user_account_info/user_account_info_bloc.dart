import 'dart:async';
import 'package:copor_core/src/modules/my_account/bloc/user_account_info/user_account_info_event.dart';
import 'package:copor_core/src/modules/my_account/bloc/user_account_info/user_account_info_state.dart';
import 'package:copor_core/src/modules/my_account/data/repository/account_info_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class UserAccountInfoBloc extends Bloc<UserAccountInfoEvent, UserAccountInfoState> {
  final AccountInfoRepository _accountInfoRepository;

  UserAccountInfoBloc({required AccountInfoRepository accountInfoRepository})
    : _accountInfoRepository = accountInfoRepository,
      super(const UserAccountInfoState.initial()) {
    on<GetUserAccountInfo>(_onGetUserAccountInfo);
    on<UpdateUserAccountInfo>(_onUpdateUserAccountInfo);
    on<UploadUserImage>(_onUploadUserImage);
    on<RegisterValidationAndSubmitCallback>((event, emit) {
      emit(state.copyWith(onValidateAndSubmit: event.onValidateAndSubmit));
    });
    on<UserAccountSaveButtonPressed>((event, emit) {
      state.onValidateAndSubmit?.call();
    });
  }

  Future<void> _onGetUserAccountInfo(
    GetUserAccountInfo event,
    Emitter<UserAccountInfoState> emit,
  ) async {
    emit(state.copyWith(isLoading: true));
    final result = await _accountInfoRepository.getAccountInfo(event.userId);
    result.fold(
      (failure) => emit(state.copyWith(failure: failure, isLoading: false)),
      (success) => emit(state.copyWith(result: success, isLoading: false)),
    );
  }

  Future<void> _onUpdateUserAccountInfo(
    UpdateUserAccountInfo event,
    Emitter<UserAccountInfoState> emit,
  ) async {
    emit(state.copyWith(isLoading: true, isUpdated: false));
    final result = await _accountInfoRepository.updateAccountInfo(event.updateData);
    result.fold(
      (failure) => emit(state.copyWith(failure: failure, isLoading: false)),
      (_) => emit(state.copyWith(isUpdated: true, isLoading: false)),
    );
  }

  Future<void> _onUploadUserImage(UploadUserImage event, Emitter<UserAccountInfoState> emit) async {
    emit(state.copyWith(isLoading: true, isUpdated: false));
    final result = await _accountInfoRepository.uploadUserImage(event.file, event.userId);

    result.fold(
      (failure) => emit(state.copyWith(failure: failure, isLoading: false)),
      (_) => emit(state.copyWith(isUpdated: true, isLoading: false)),
    );
  }
}
