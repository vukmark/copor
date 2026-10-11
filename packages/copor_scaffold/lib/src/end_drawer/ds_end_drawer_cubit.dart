import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'ds_end_drawer_state.dart';

class DSEndDrawerCubit extends Cubit<DSEndDrawerState> {
  DSEndDrawerCubit() : super(const DSEndDrawerState());

  final LayerLink endDrawerAnchor = LayerLink();

  final Object endDrawerGroupId = Object();

  void openDrawer() {
    if (state.isEndDrawerOpen) return;
    emit(state.copyWith(isEndDrawerOpen: true));
  }

  void closeDrawer() {
    if (!state.isEndDrawerOpen) return;
    emit(state.copyWith(isEndDrawerOpen: false));
  }

  void selectSection(String key) =>
      emit(state.copyWith(endDrawerSelectedSectionKey: key));

  void reset() => emit(const DSEndDrawerState());
}
