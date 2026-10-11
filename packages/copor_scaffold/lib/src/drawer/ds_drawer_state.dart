class DSDrawerState {
  final String? drawerSelectedSectionKey;

  const DSDrawerState({this.drawerSelectedSectionKey});

  DSDrawerState copyWith({String? drawerSelectedSectionKey}) => DSDrawerState(
    drawerSelectedSectionKey:
        drawerSelectedSectionKey ?? this.drawerSelectedSectionKey,
  );
}
