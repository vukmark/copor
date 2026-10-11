import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_state.dart';
import 'package:copor_vu_meet/src/data/model/call/group_call_roster_model.dart';
import 'package:flutter/foundation.dart';

/// Tracks the live group-call roster per chat, keyed by chatId, driven by the
/// `GROUP_CALL_ROSTER_UPDATED` WebSocket event. An empty participants list in
/// the payload means the call ended, so the chat's entry is dropped.
class GroupCallRosterCubit extends Cubit<Map<String, GroupCallRosterModel>> {
  final WebSocketBloc _webSocketBloc;
  late final StreamSubscription<WebSocketState> _webSocketSubscription;

  GroupCallRosterCubit({required WebSocketBloc webSocketBloc})
    : _webSocketBloc = webSocketBloc,
      super(const {}) {
    _webSocketSubscription = _webSocketBloc.stream.listen(_onWebSocketMessage);
  }

  void _onWebSocketMessage(WebSocketState wsState) {
    if (wsState is! WebSocketMessageReceived) return;
    if (wsState.message.event != 'GROUP_CALL_ROSTER_UPDATED') return;

    final GroupCallRosterModel roster;
    try {
      roster = GroupCallRosterModel.fromJson(wsState.message.payload);
    } catch (error) {
      debugPrint('Ignored malformed group call roster: $error');
      return;
    }

    final updated = Map<String, GroupCallRosterModel>.from(state);

    if (roster.participants.isEmpty) {
      updated.remove(roster.chatId);
    } else {
      updated[roster.chatId] = roster;
    }

    emit(updated);
  }

  @override
  Future<void> close() {
    _webSocketSubscription.cancel();
    return super.close();
  }
}
