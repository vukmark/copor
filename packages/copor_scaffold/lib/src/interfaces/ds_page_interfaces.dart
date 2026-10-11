import 'package:flutter/material.dart';
import '../drawer/ds_drawer_section.dart';
import '../end_drawer/ds_end_drawer_section.dart';

abstract class DSPageAppBar {
  Widget getAppBar();
}

abstract class DSPageDrawer {}

/// Extra sections a [DSPageDrawer] page contributes to the main drawer,
/// alongside the app's main navigation menu section — switched via tab
/// buttons inside [DSDrawerHost], the same pattern [DSPageEndDrawer] uses
/// for the end drawer. Useful for pages whose own in-content sidebar has
/// nowhere to live on mobile/tablet, where the drawer slot is already
/// taken by the main menu.
abstract class DSPageDrawerSections {
  List<DSDrawerSection> getDrawerSections();
}

abstract class DSPageRail {
  Widget getRail();
}

abstract class DSPageEndDrawer {
  List<DSEndDrawerSection> getEndDrawerSections();
}

abstract class DSPageBottomNavBar {
  Widget getBottomNavBar();
}

abstract class DSPageFloatingButton {
  Widget getFloatingButton();
}

abstract class DSAppBarLeading {
  Widget getLeading();
}

abstract class DSAppBarTitle {
  Widget getTitle();
}

abstract class DSAppBarActions {
  List<Widget> getActions();
}

class DSEmptyScaffold {
  const DSEmptyScaffold();
}
