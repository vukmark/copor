class DSEndDrawerState {
  final bool isEndDrawerOpen;

  final String? endDrawerSelectedSectionKey;

  const DSEndDrawerState({
    this.isEndDrawerOpen = false,
    this.endDrawerSelectedSectionKey,
  });

  DSEndDrawerState copyWith({
    bool? isEndDrawerOpen,
    String? endDrawerSelectedSectionKey,
  }) => DSEndDrawerState(
    isEndDrawerOpen: isEndDrawerOpen ?? this.isEndDrawerOpen,
    endDrawerSelectedSectionKey:
        endDrawerSelectedSectionKey ?? this.endDrawerSelectedSectionKey,
  );
}
