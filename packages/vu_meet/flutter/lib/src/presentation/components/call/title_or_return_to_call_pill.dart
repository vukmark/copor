import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_vu_meet/src/logic/call/call_bloc.dart';
import 'package:copor_vu_meet/src/logic/call/call_state.dart';
import 'package:copor_vu_meet/src/presentation/components/call/active_call_banner.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

/// A page's app-bar title, replaced by a "return to call" pill while a call
/// is connected.
class TitleOrReturnToCallPill extends StatelessWidget {
  final Widget title;

  const TitleOrReturnToCallPill({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CallBloc, CallState>(
      bloc: getIt<CallBloc>(),
      buildWhen: (prev, curr) => prev.runtimeType != curr.runtimeType,
      builder: (context, callState) {
        if (callState is CallConnected) {
          return ReturnToCallPill(
            chatId: callState.chatId,
            connectedAt: callState.connectedAt,
            isVideo: callState.isVideo,
          );
        }
        return title;
      },
    );
  }
}
