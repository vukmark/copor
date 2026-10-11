import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'ds_end_drawer_cubit.dart';
import 'ds_end_drawer_state.dart';

class DSEndDrawerSync extends StatefulWidget {
  final Widget Function(
    BuildContext context,
    GlobalKey<ScaffoldState> scaffoldKey,
  )
  builder;

  const DSEndDrawerSync({super.key, required this.builder});

  @override
  State<DSEndDrawerSync> createState() => _DSEndDrawerSyncState();
}

class _DSEndDrawerSyncState extends State<DSEndDrawerSync> {
  final _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return BlocListener<DSEndDrawerCubit, DSEndDrawerState>(
      listenWhen: (prev, curr) => prev.isEndDrawerOpen != curr.isEndDrawerOpen,
      listener: (context, state) {
        final scaffold = _scaffoldKey.currentState;
        if (scaffold == null) return;
        if (state.isEndDrawerOpen && !scaffold.isEndDrawerOpen) {
          scaffold.openEndDrawer();
        } else if (!state.isEndDrawerOpen && scaffold.isEndDrawerOpen) {
          scaffold.closeEndDrawer();
        }
      },
      child: widget.builder(context, _scaffoldKey),
    );
  }
}
