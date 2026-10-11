import 'package:copor_core/src/modules/administration/log/bloc/log_list/log_list_event.dart';
import 'package:copor_core/src/modules/administration/log/bloc/log_list/log_list_state.dart';
import 'package:copor_core/src/modules/administration/log/data/repository/log_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class LogListBloc extends Bloc<LogListEvent, LogListState> {
  final LogRepository _logRepository;

  LogListBloc({required LogRepository logRepository})
    : _logRepository = logRepository,
      super(const LogListState.initial()) {
    on<GetLogList>(_onGetLogList);
  }

  Future<void> _onGetLogList(GetLogList event, Emitter<LogListState> emit) async {
    emit(LogListState.loading(result: state.result));

    final result = await _logRepository.getLogList();
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
