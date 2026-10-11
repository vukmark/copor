import 'package:flutter_bloc/flutter_bloc.dart';
import 'ds_drawer_state.dart';

/// Tracks which [DSDrawerSection] is selected in the main drawer. Unlike
/// `DSEndDrawerCubit`, this doesn't track open/closed — the main drawer is
/// always a real `Scaffold.drawer`, so open/close is Flutter's own
/// `Scaffold` state (`Scaffold.of(context).openDrawer()`), not duplicated
/// here.
class DSDrawerCubit extends Cubit<DSDrawerState> {
  DSDrawerCubit() : super(const DSDrawerState());

  void selectSection(String key) =>
      emit(state.copyWith(drawerSelectedSectionKey: key));

  void reset() => emit(const DSDrawerState());
}
