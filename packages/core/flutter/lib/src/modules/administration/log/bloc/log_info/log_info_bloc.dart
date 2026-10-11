import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:copor_core/src/modules/administration/log/bloc/log_info/log_info_event.dart';
import 'package:copor_core/src/modules/administration/log/bloc/log_info/log_info_state.dart';
import 'package:copor_core/src/modules/administration/log/data/repository/log_info_repository.dart';

class LogInfoBloc extends Bloc<LogInfoEvent, LogInfoState> {
  final LogInfoRepository logInfoRepository;

  LogInfoBloc({required this.logInfoRepository}) : super(const LogInfoState.initial()) {
    on<GetLogInfo>(_onGetLogInfo);
  }

  Future<void> _onGetLogInfo(GetLogInfo event, Emitter<LogInfoState> emit) async {
    emit(LogInfoState.loading(result: null));

    final result = await logInfoRepository.getLogInfo(event.endpoint);
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
