import 'ds_loading_source.dart';

class DSLoadingState {
  final Set<DSLoadingSource> loadingSources;

  const DSLoadingState({this.loadingSources = const {}});

  bool get isLoading =>
      loadingSources.any((s) => s.type == DSLoadingSourceType.request);

  bool get isPageLoading =>
      loadingSources.any((s) => s.type == DSLoadingSourceType.page);

  DSLoadingState copyWith({Set<DSLoadingSource>? loadingSources}) =>
      DSLoadingState(loadingSources: loadingSources ?? this.loadingSources);
}
