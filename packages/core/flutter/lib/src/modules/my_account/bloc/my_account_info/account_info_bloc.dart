import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:copor_core/src/modules/my_account/data/repository/account_info_repository.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_event.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_state.dart';

class AccountInfoBloc extends Bloc<AccountInfoEvent, AccountInfoState> {
  final AccountInfoRepository _accountInfoRepository;

  AccountInfoBloc({required AccountInfoRepository accountInfoRepository})
    : _accountInfoRepository = accountInfoRepository,
      super(const AccountInfoState.initial()) {
    on<GetAccountInfo>(_onGetAccountInfo);
    on<UpdateAccountInfo>(_onUpdateAccountInfo);
    on<UploadPersonalImage>(_onUploadPersonalImage);
    on<AccountInfoReset>(_onAccountInfoReset);
    on<RegisterValidationAndSubmitCallback>((event, emit) {
      emit(state.copyWith(onValidateAndSubmit: event.onValidateAndSubmit));
    });
    on<SaveButtonPressed>((event, emit) {
      state.onValidateAndSubmit?.call();
    });
  }

  Future<void> _onGetAccountInfo(GetAccountInfo event, Emitter<AccountInfoState> emit) async {
    emit(state.copyWith(isLoading: true, setFailureToNull: true));
    final result = await _accountInfoRepository.getMyAccountInfo();

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (accountInfoResult) {
        emit(state.copyWith(result: accountInfoResult, isLoading: false));
      },
    );
  }

  Future<void> _onUpdateAccountInfo(UpdateAccountInfo event, Emitter<AccountInfoState> emit) async {
    emit(state.copyWith(isLoading: true, isUpdated: false, setFailureToNull: true));
    final result = await _accountInfoRepository.updateAccountInfo(event.updateData);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (_) {
        emit(state.copyWith(isUpdated: true, isLoading: false));
      },
    );
  }

  Future<void> _onAccountInfoReset(AccountInfoReset event, Emitter<AccountInfoState> emit) async {
    await _accountInfoRepository.clearLocalCache();
    emit(const AccountInfoState.initial());
  }

  Future<void> _onUploadPersonalImage(
    UploadPersonalImage event,
    Emitter<AccountInfoState> emit,
  ) async {
    emit(state.copyWith(isLoading: true, isUpdated: false, setFailureToNull: true));
    final result = await _accountInfoRepository.uploadPersonalImage(event.file);

    result.fold(
      (failure) => emit(state.copyWith(failure: failure, isLoading: false)),
      (_) => emit(state.copyWith(isUpdated: true, isLoading: false)),
    );
  }
}
