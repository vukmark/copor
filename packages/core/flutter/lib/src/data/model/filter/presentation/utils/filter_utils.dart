import 'package:copor_core/src/data/model/filter/bloc/filter_bloc.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_event.dart';
import 'package:copor_core/src/data/model/filter/presentation/filter/filter_dialog.dart';
import 'package:copor_core/src/data/model/filter/presentation/sort/dynamic_sort_bottom_sheet.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class FilterUtils {
  static void showFilterUI(BuildContext context, {bool forceBottomSheet = false}) {
    showFilterDialog(context, forceBottomSheet: forceBottomSheet);
  }

  static Future<void> showSortUI(BuildContext context, {bool forceBottomSheet = false}) async {
    final filterBloc = context.read<FilterBloc>();
    if (context.isMobile || forceBottomSheet) {
      await DTDraggableScrollableSheet.show<void>(
        context,
        useRootNavigator: true,
        contentBuilder: (ctx, scrollController) => BlocProvider.value(
          value: filterBloc,
          child: DynamicSortBottomSheet(scrollController: scrollController),
        ),
      );
    } else {
      filterBloc.add(ToggleDesktopSort());
    }
  }
}
