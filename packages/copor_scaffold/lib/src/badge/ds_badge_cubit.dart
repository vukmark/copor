import 'package:flutter_bloc/flutter_bloc.dart';
import 'ds_badge_state.dart';

class DSBadgeCubit extends Cubit<DSBadgeState> {
  DSBadgeCubit() : super(const DSBadgeState());

  void setBadgeCount(String destinationKey, int count) {
    final updated = Map<String, int>.from(state.badgeCounts);
    if (count <= 0) {
      updated.remove(destinationKey);
    } else {
      updated[destinationKey] = count;
    }
    emit(state.copyWith(badgeCounts: updated));
  }

  void incrementBadgeCount(String destinationKey, [int by = 1]) {
    final current = state.badgeCounts[destinationKey] ?? 0;
    setBadgeCount(destinationKey, current + by);
  }

  void decrementBadgeCount(String destinationKey, [int by = 1]) {
    final current = state.badgeCounts[destinationKey] ?? 0;
    setBadgeCount(destinationKey, current - by);
  }

  void clearBadgeCount(String destinationKey) {
    if (!state.badgeCounts.containsKey(destinationKey)) return;
    final updated = Map<String, int>.from(state.badgeCounts)..remove(destinationKey);
    emit(state.copyWith(badgeCounts: updated));
  }

  void clearAllBadgeCounts() => emit(const DSBadgeState());
}
