import 'package:copor_core/src/bloc/utils/bloc_reactions.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

enum ScaffoldLoadingType { request, page, auto }

abstract class ScaffoldReactionHandler {
  static void handle<B extends BlocBase<S>, S extends BaseState>({
    required BuildContext context,
    required S state,
    required String loadingKey,
    required String failureKey,
    required String warningKey,
    ScaffoldLoadingType loadingType = ScaffoldLoadingType.auto,
  }) {
    final resolved = loadingType == ScaffoldLoadingType.auto
        ? (state.isInitial ? ScaffoldLoadingType.page : ScaffoldLoadingType.request)
        : loadingType;

    switch (resolved) {
      case ScaffoldLoadingType.request:
        BlocReactions.common.addRequestLoadingToScaffold(context, state, loadingKey);
      case ScaffoldLoadingType.page:
        BlocReactions.common.addPageLoadingToScaffold(context, state, loadingKey);
      case ScaffoldLoadingType.auto:
        break;
    }
    BlocReactions.common.addFailureToScaffold(context, state, failureKey);
    BlocReactions.common.addWarningToScaffold(context, state, warningKey);
  }
}
