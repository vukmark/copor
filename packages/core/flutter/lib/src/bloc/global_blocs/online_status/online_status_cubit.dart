import 'dart:async';

import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_state.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/data/repository_impl/online_status/online_status_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

const _kUserOnlineStatusEvent = 'USER_ONLINE_STATUS';

class OnlineStatusCubit extends Cubit<Set<String>> {
  final OnlineStatusRepository _repository;
  late final StreamSubscription<WebSocketState> _webSocketSubscription;

  OnlineStatusCubit({required OnlineStatusRepository repository})
    : _repository = repository,
      super(const {}) {
    _webSocketSubscription = getIt<WebSocketBloc>().stream.listen(_onWebSocketMessage);
  }

  bool isOnline(String userId) => state.contains(userId);

  void _onWebSocketMessage(WebSocketState wsState) {
    if (wsState is WebSocketConnected) {
      _fetchOnlineUsers();
      return;
    }
    if (wsState is! WebSocketMessageReceived) return;
    if (wsState.message.event != _kUserOnlineStatusEvent) return;

    final userId = wsState.message.payload['userId'];
    final isOnline = wsState.message.payload['isOnline'];
    if (userId is! String || isOnline is! bool) return;

    final updated = isOnline ? {...state, userId} : state.where((id) => id != userId).toSet();
    emit(updated);
  }

  Future<void> _fetchOnlineUsers() async {
    final result = await _repository.getOnlineUserIds();
    result.fold((_) {}, (result) => emit(result.data.toSet()));
  }

  @override
  Future<void> close() {
    _webSocketSubscription.cancel();
    return super.close();
  }
}
