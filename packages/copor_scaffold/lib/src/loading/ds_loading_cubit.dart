import 'package:flutter_bloc/flutter_bloc.dart';
import 'ds_loading_source.dart';
import 'ds_loading_state.dart';

class DSLoadingCubit extends Cubit<DSLoadingState> {
  DSLoadingCubit() : super(const DSLoadingState());

  void addLoadingSource(DSLoadingSource source) {
    final updated = Set<DSLoadingSource>.from(state.loadingSources)
      ..add(source);
    emit(state.copyWith(loadingSources: updated));
  }

  void addRequestLoading(String key) =>
      addLoadingSource(DSLoadingSource.request(key));

  void addPageLoading(String key) =>
      addLoadingSource(DSLoadingSource.page(key));

  Future<void> removeLoadingSource(String key) async {
    await Future.delayed(const Duration(milliseconds: 500));
    final updated = Set<DSLoadingSource>.from(state.loadingSources)
      ..removeWhere((s) => s.key == key);
    emit(state.copyWith(loadingSources: updated));
  }

  void clearLoadingSources() => emit(const DSLoadingState());

  void replaceLoadingSources(Set<DSLoadingSource> loadingSources) =>
      emit(DSLoadingState(loadingSources: loadingSources));
}
