class DSBadgeState {
  final Map<String, int> badgeCounts;

  const DSBadgeState({this.badgeCounts = const {}});

  int badgeCountFor(String destinationKey) => badgeCounts[destinationKey] ?? 0;

  DSBadgeState copyWith({Map<String, int>? badgeCounts}) =>
      DSBadgeState(badgeCounts: badgeCounts ?? this.badgeCounts);
}
