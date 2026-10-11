import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'ds_chrome_state.dart';

class DSChromeCubit extends Cubit<DSChromeState> {
  DSChromeCubit() : super(const DSChromeState());

  void clearAppBar() =>
      emit(DSChromeState(
        drawer: state.drawer,
        rail: state.rail,
        endDrawer: state.endDrawer,
        isEmptyScaffold: state.isEmptyScaffold,
        bottomNavBar: state.bottomNavBar,
        leading: state.leading,
        title: state.title,
        actions: state.actions,
        floatingActionButton: state.floatingActionButton,
      ));

  void clearDrawer() =>
      emit(DSChromeState(
        appBar: state.appBar,
        rail: state.rail,
        endDrawer: state.endDrawer,
        isEmptyScaffold: state.isEmptyScaffold,
        bottomNavBar: state.bottomNavBar,
        leading: state.leading,
        title: state.title,
        actions: state.actions,
        floatingActionButton: state.floatingActionButton,
      ));

  void clearRail() =>
      emit(DSChromeState(
        appBar: state.appBar,
        drawer: state.drawer,
        endDrawer: state.endDrawer,
        isEmptyScaffold: state.isEmptyScaffold,
        bottomNavBar: state.bottomNavBar,
        leading: state.leading,
        title: state.title,
        actions: state.actions,
        floatingActionButton: state.floatingActionButton,
      ));

  void clearEndDrawer() =>
      emit(DSChromeState(
        appBar: state.appBar,
        drawer: state.drawer,
        rail: state.rail,
        isEmptyScaffold: state.isEmptyScaffold,
        bottomNavBar: state.bottomNavBar,
        leading: state.leading,
        title: state.title,
        actions: state.actions,
        floatingActionButton: state.floatingActionButton,
      ));

  void clearBottomNavBar() =>
      emit(DSChromeState(
        appBar: state.appBar,
        drawer: state.drawer,
        rail: state.rail,
        endDrawer: state.endDrawer,
        isEmptyScaffold: state.isEmptyScaffold,
        leading: state.leading,
        title: state.title,
        actions: state.actions,
        floatingActionButton: state.floatingActionButton,
      ));

  void clearLeading() =>
      emit(DSChromeState(
        appBar: state.appBar,
        drawer: state.drawer,
        rail: state.rail,
        endDrawer: state.endDrawer,
        isEmptyScaffold: state.isEmptyScaffold,
        bottomNavBar: state.bottomNavBar,
        title: state.title,
        actions: state.actions,
        floatingActionButton: state.floatingActionButton,
      ));

  void clearTitle() =>
      emit(DSChromeState(
        appBar: state.appBar,
        drawer: state.drawer,
        rail: state.rail,
        endDrawer: state.endDrawer,
        isEmptyScaffold: state.isEmptyScaffold,
        bottomNavBar: state.bottomNavBar,
        leading: state.leading,
        actions: state.actions,
        floatingActionButton: state.floatingActionButton,
      ));

  void clearActions() =>
      emit(DSChromeState(
        appBar: state.appBar,
        drawer: state.drawer,
        rail: state.rail,
        endDrawer: state.endDrawer,
        isEmptyScaffold: state.isEmptyScaffold,
        bottomNavBar: state.bottomNavBar,
        leading: state.leading,
        title: state.title,
        floatingActionButton: state.floatingActionButton,
      ));

  void clearFloatingActionButton() =>
      emit(DSChromeState(
        appBar: state.appBar,
        drawer: state.drawer,
        rail: state.rail,
        endDrawer: state.endDrawer,
        isEmptyScaffold: state.isEmptyScaffold,
        bottomNavBar: state.bottomNavBar,
        leading: state.leading,
        title: state.title,
        actions: state.actions,
      ));

  void configureEmptyScaffold() =>
      emit(const DSChromeState(isEmptyScaffold: true));

  void configureScaffold({
    Widget? appBar,
    Widget? drawer,
    Widget? rail,
    Widget? endDrawer,
    bool isEmptyScaffold = false,
    Widget? bottomNavBar,
    Widget? leading,
    Widget? title,
    List<Widget>? actions,
    Widget? floatingActionButton,
  }) {
    emit(
      DSChromeState(
        appBar: appBar,
        drawer: drawer,
        rail: rail,
        endDrawer: endDrawer,
        isEmptyScaffold: isEmptyScaffold,
        bottomNavBar: bottomNavBar,
        leading: leading,
        title: title,
        actions: actions,
        floatingActionButton: floatingActionButton,
      ),
    );
  }

  void updateChrome({
    Widget? appBar,
    Widget? drawer,
    Widget? rail,
    Widget? endDrawer,
    Widget? bottomNavBar,
    Widget? leading,
    Widget? title,
    List<Widget>? actions,
    Widget? floatingActionButton,
  }) {
    emit(
      state.copyWith(
        appBar: appBar,
        drawer: drawer,
        rail: rail,
        endDrawer: endDrawer,
        bottomNavBar: bottomNavBar,
        leading: leading,
        title: title,
        actions: actions,
        floatingActionButton: floatingActionButton,
      ),
    );
  }

  void reset() => emit(const DSChromeState());
}
