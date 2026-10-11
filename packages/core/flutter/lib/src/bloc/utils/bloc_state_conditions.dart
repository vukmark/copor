import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';

class BlocStateConditions {
  static bool hasLoadingStates(List<BaseState> states) {
    return states.any((state) => state.isLoading);
  }

  static bool hasInitialStates(List<BaseState> states) {
    return states.any((state) => state.isInitial);
  }

  static bool hasFailureStates(List<BaseState> states) {
    return states.any((state) => state.failure != null);
  }

  static bool hasOnlySuccessfulStates(List<BaseState> states) {
    return states.every((state) => state.result != null || !state.isLoading);
  }

  static Failure? getFirstFailure(List<BaseState> states) {
    for (final state in states) {
      if (state.failure != null) {
        return state.failure;
      }
    }

    return null;
  }
}
