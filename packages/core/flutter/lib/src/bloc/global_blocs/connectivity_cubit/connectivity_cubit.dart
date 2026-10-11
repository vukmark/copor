import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:copor_core/src/config/connectivity_service.dart';

class ConnectivityCubit extends Cubit<bool> {
  final ConnectivityService connectivityService;
  StreamSubscription<bool>? _subscription;
  bool _initialized = false;

  ConnectivityCubit({required this.connectivityService}) : super(true);

  Future<void> initialize() async {
    if (_initialized) return;
    _initialized = true;

    try {
      final connected = await connectivityService.isConnected();
      emit(connected);
    } catch (_) {
      emit(false);
    }

    _subscription = connectivityService.connectivityStream.listen((isConnected) {
      emit(isConnected);
    });
  }

  @override
  Future<void> close() async {
    await _subscription?.cancel();
    return super.close();
  }
}
