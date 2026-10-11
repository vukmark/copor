import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'ds_end_drawer_cubit.dart';

class DSEndDrawerAnchor extends StatelessWidget {
  final Widget child;
  const DSEndDrawerAnchor({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    final cubit = context.read<DSEndDrawerCubit>();
    return TapRegion(
      groupId: cubit.endDrawerGroupId,
      child: CompositedTransformTarget(
        link: cubit.endDrawerAnchor,
        child: child,
      ),
    );
  }
}
