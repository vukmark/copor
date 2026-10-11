import 'dart:async';

import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/route_cubit.dart';
import 'package:copor_vu_meet/src/config/vu_meet_routes.dart';
import 'package:bloc/bloc.dart';

class SelectedChatCubit extends Cubit<String?> {
  final RouteCubit _routeCubit;
  late final StreamSubscription<String> _routeSubscription;

  SelectedChatCubit({required RouteCubit routeCubit}) : _routeCubit = routeCubit, super(null) {
    _routeSubscription = _routeCubit.stream.listen(_onRouteChanged);
  }

  void selectChat(String? chatId) {
    emit(chatId);
  }

  void clearChat() {
    emit(null);
  }

  // `route` is the GoRouter path template (e.g. `/vu-meet/:id/info`), not the
  // resolved path - so a chat's own sub-routes (info, call, call-summary)
  // must be tolerated here, not just the exact chat route, or navigating to
  // one of them looks identical to "left the chat" and clears the selection.
  void _onRouteChanged(String route) {
    if (!route.startsWith(VuMeetRoutes.vu_meet_chat) && state != null) clearChat();
  }

  @override
  Future<void> close() {
    _routeSubscription.cancel();
    return super.close();
  }
}
