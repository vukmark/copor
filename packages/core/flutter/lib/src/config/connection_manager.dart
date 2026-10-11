import 'package:copor_core/src/core/module/app_modules.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_state.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_state.dart';
import 'package:copor_core/src/bloc/global_blocs/connectivity_cubit/connectivity_cubit.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_event.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_event_dispatcher.dart';
import 'package:copor_core/src/modules/push_notification/notification_token_factory.dart';
import 'package:copor_core/src/utils/push_notification/bloc/fcm_token_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ConnectionManager extends StatefulWidget {
  final Widget child;

  const ConnectionManager({super.key, required this.child});

  @override
  State<ConnectionManager> createState() => _ConnectionManagerState();
}

class _ConnectionManagerState extends State<ConnectionManager> {
  // Covers both missed initial auth/config emissions and later connectivity changes.
  bool _initialConnectionScheduled = false;
  String? _fcmRegistrationRequestedForToken;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_initialConnectionScheduled) return;

    _initialConnectionScheduled = true;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) _attemptConnection();
    });
  }

  @override
  Widget build(BuildContext context) {
    return MultiBlocListener(
      listeners: [
        BlocListener<AuthorizationBloc, AuthorizationState>(
          listener: (context, state) {
            _attemptConnection();
          },
        ),
        BlocListener<ConfigBloc, ConfigState>(
          listener: (context, state) {
            _attemptConnection();
          },
        ),
        BlocListener<ConnectivityCubit, bool>(
          listenWhen: (prev, curr) => curr && !prev,
          listener: (context, _) => _attemptConnection(),
        ),
        BlocListener<WebSocketBloc, WebSocketState>(
          listener: (context, state) => _handleWebSocketMessage(state),
        ),
      ],
      child: widget.child,
    );
  }

  void _handleWebSocketMessage(WebSocketState state) {
    if (state is! WebSocketMessageReceived) return;

    final message = state.message;
    for (final module in AppModules.enabled) {
      if (module.handleWebSocketMessage(message.event, message.payload)) return;
    }
  }

  void _attemptConnection() {
    final authState = context.read<AuthorizationBloc>().state;
    final configState = context.read<ConfigBloc>().state;
    final wsState = context.read<WebSocketBloc>().state;

    final bool isAuthReady =
        authState.result?.data != null && authState.ensuredData.authToken.isNotEmpty;

    final bool isConfigReady =
        configState.result != null && configState.ensuredData.webSocketUrl.isNotEmpty;

    final bool isReadyToConnect = isAuthReady && isConfigReady;

    if (!isAuthReady) {
      _fcmRegistrationRequestedForToken = null;
      if (wsState is! WebSocketInitial) {
        context.read<WebSocketBloc>().add(const DisconnectWebSocket());
      }
      return;
    }

    final bool isAlreadyConnectedOrConnecting =
        wsState is WebSocketConnecting ||
        wsState is WebSocketConnected ||
        wsState is WebSocketMessageReceived;

    if (isReadyToConnect && !isAlreadyConnectedOrConnecting) {
      _saveFcmTokenOnce(authState.ensuredData.authToken);
      _connectWebSocket(authState.ensuredData.authToken, configState.ensuredData.webSocketUrl);
    }
  }

  Future<void> _saveFcmTokenOnce(String authToken) async {
    if (_fcmRegistrationRequestedForToken == authToken) return;
    _fcmRegistrationRequestedForToken = authToken;

    try {
      final token = await NotificationTokenFactory.getToken();

      if (!mounted) return;

      if (token != null) {
        context.read<FcmTokenCubit>().saveToken(token);
      }
    } catch (e) {
      if (_fcmRegistrationRequestedForToken == authToken) {
        _fcmRegistrationRequestedForToken = null;
      }
      debugPrint(e.toString());
    }
  }

  void _connectWebSocket(String authToken, String webSocketUrl) {
    BlocEventDispatcher.webSocket.connectToWebSocket(
      context.read<WebSocketBloc>(),
      authToken,
      webSocketUrl,
    );
  }
}
