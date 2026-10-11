import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/server_health_bloc/server_health_event.dart';
import 'package:copor_core/src/bloc/global_blocs/server_health_bloc/server_health_state.dart';
import 'package:copor_core/src/data/repository_impl/server_health/server_health_repository.dart';

class ServerHealthBloc extends Bloc<ServerHealthEvent, ServerHealthState> {
  final ServerHealthRepository _ServerHealthRepository;

  ServerHealthBloc({required ServerHealthRepository ServerHealthRepository})
    : _ServerHealthRepository = ServerHealthRepository,
      super(ServerHealthState.initial()) {
    on<CheckBaseUrlHealth>(_onCheckBaseUrlHealth);
  }

  Future<void> _onCheckBaseUrlHealth(
    CheckBaseUrlHealth event,
    Emitter<ServerHealthState> emit,
  ) async {
    emit(ServerHealthState.loading(result: null));
    final currentServerHealthResult = await _ServerHealthRepository.pingClient(event.baseUrl);
    await currentServerHealthResult.fold(
      (failure) async {
        emit(ServerHealthState.failure(failure: failure, result: null));
      },
      (success) async {
        emit(ServerHealthState.fetched(result: success));
      },
    );
  }
}
