import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/bloc/utils/scaffold_reaction_handler.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

typedef GenericBlocListener<B extends BlocBase<S>, S> = BlocListener<B, S>;

GenericBlocListener<B, S> createStandardListener<B extends BlocBase<S>, S extends BaseState>({
  required String loadingKey,
  required String failureKey,
  required String warningKey,
  ScaffoldLoadingType loadingType = ScaffoldLoadingType.auto,
  void Function(BuildContext, S)? additionalLogic,
  bool Function(S previous, S current)? listenWhen,
}) {
  return GenericBlocListener<B, S>(
    listenWhen: listenWhen,
    listener: (context, state) {
      ScaffoldReactionHandler.handle<B, S>(
        context: context,
        state: state,
        loadingKey: loadingKey,
        failureKey: failureKey,
        warningKey: warningKey,
        loadingType: loadingType,
      );

      additionalLogic?.call(context, state);
    },
  );
}
