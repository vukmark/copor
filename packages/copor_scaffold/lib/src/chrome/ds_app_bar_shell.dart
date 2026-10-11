import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../utils/ds_device_extensions.dart';
import 'ds_chrome_cubit.dart';

class DSAppBarShell extends StatelessWidget {
  const DSAppBarShell({super.key});

  @override
  Widget build(BuildContext context) {
    final state = context.watch<DSChromeCubit>().state;

    return DTAppBar(
      titleWidget: state.title,
      leading: state.leading,
      actions: state.actions,
      isMobile: context.isMobile,
    );
  }
}
