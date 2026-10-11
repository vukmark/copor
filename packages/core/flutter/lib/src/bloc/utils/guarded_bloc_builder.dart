import 'package:copor_core/src/components/scaffold/stacked_on_top/error_screen.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class GuardedBlocBuilder<B extends BlocBase<S>, S extends BaseState> extends StatelessWidget {
  final Widget Function(BuildContext context, S state) builder;
  final Widget? initialPlaceholder;
  final Widget? loadingPlaceholder;
  final Widget? inCaseEmptyPlaceholder;
  final Widget Function(BuildContext context, S state, Failure failure)? errorPlaceholderBuilder;
  final bool? showFailure;

  const GuardedBlocBuilder({
    super.key,
    required this.builder,
    this.initialPlaceholder,
    this.loadingPlaceholder,
    this.errorPlaceholderBuilder,
    this.inCaseEmptyPlaceholder,
    this.showFailure,
  });

  @override
  Widget build(BuildContext context) {
    final S state = context.watch<B>().state;
    final hasData = state.result != null;

    if (state.failure != null && (showFailure ?? true)) {
      return errorPlaceholderBuilder?.call(context, state, state.failure!) ??
          ErrorScreen(failure: state.failure!);
    }

    if (state.isInitial && !state.isLoading) {
      return initialPlaceholder ?? Container();
    }

    if (state.isLoading && !hasData) {
      return loadingPlaceholder ?? Container();
    }

    return builder(context, state);
  }
}
