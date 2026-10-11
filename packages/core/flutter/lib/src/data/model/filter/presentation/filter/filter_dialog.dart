import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_bloc.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_event.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_state.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_model/filter_model.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

// ─── Entry point ──────────────────────────────────────────────────────────────

void showFilterDialog(BuildContext context, {bool forceBottomSheet = false}) {
  final filterBloc = context.read<FilterBloc>();

  if (context.isMobile || forceBottomSheet) {
    DTDraggableScrollableSheet.show<void>(
      context,
      useRootNavigator: true,
      contentBuilder: (ctx, scrollController) => BlocProvider.value(
        value: filterBloc,
        child: _FilterDialogContent(
          isDialog: false,
          scrollController: scrollController,
          onClose: () => Navigator.of(ctx).pop(),
        ),
      ),
    );
  } else {
    DTDialog.show<void>(
      context,
      barrierDismissible: true,
      builder: (ctx) => BlocProvider.value(
        value: filterBloc,
        child: _FilterDialogContent(isDialog: true, onClose: () => Navigator.of(ctx).pop()),
      ),
    );
  }
}

// ─── Shared filter content ────────────────────────────────────────────────────

class _FilterDialogContent extends StatefulWidget {
  final bool isDialog;
  final VoidCallback onClose;
  final ScrollController? scrollController;

  const _FilterDialogContent({
    required this.isDialog,
    required this.onClose,
    this.scrollController,
  });

  @override
  State<_FilterDialogContent> createState() => _FilterDialogContentState();
}

class _FilterDialogContentState extends State<_FilterDialogContent> {
  late Map<String, dynamic> _pending;

  @override
  void initState() {
    super.initState();
    _pending = Map.from(context.read<FilterBloc>().state.appliedFilters);
  }

  void _toggle(String key, String value) {
    setState(() {
      final current = List<String>.from(_pending[key] ?? []);
      current.contains(value) ? current.remove(value) : current.add(value);
      if (current.isEmpty) {
        _pending.remove(key);
      } else {
        _pending[key] = current;
      }
    });
  }

  void _apply() {
    context.read<FilterBloc>().add(ApplyFilters(Map.from(_pending)));
    widget.onClose();
  }

  void _clear() {
    setState(() => _pending.clear());
    context.read<FilterBloc>().add(ClearFiltersWithoutSearch());
    widget.onClose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<FilterBloc, FilterState>(
      builder: (context, state) {
        final translationState = context.watch<TranslationBloc<CommonTranslation>>().state;
        final translation = translationState.isLoading ? null : translationState.ensuredData;

        final filters = state.filters.where((f) => f.type == FilterType.IN).toList();
        final cancelLabel = translation?.CANCEL ?? 'Cancel';
        final clearLabel = translation?.CLEAR_ALL ?? 'Clear';
        final applyLabel = translation?.SAVE ?? 'Apply';

        if (widget.isDialog) {
          return _buildDialogCard(context, filters, cancelLabel, clearLabel, applyLabel);
        }

        return _buildSheet(context, filters, clearLabel, applyLabel);
      },
    );
  }

  Widget _buildDialogCard(
    BuildContext context,
    List<FilterModel> filters,
    String cancelLabel,
    String clearLabel,
    String applyLabel,
  ) {
    return DTFloatingLayout(
      padding: EdgeInsetsGeometry.symmetric(vertical: 20),
      title: 'Filter',
      icon: DTIcons.filter,
      leading: Row(
        mainAxisSize: MainAxisSize.min,
        spacing: 8,
        children: [
          DTButton.surface(label: cancelLabel, onPressed: widget.onClose),
          DTButton.primary(
            icon: DTIcons.clear,
            label: clearLabel,
            onPressed: _clear,
            border: false,
          ),
        ],
      ),
      trailing: DTButton.positive(label: applyLabel, onPressed: _apply),
      children: [_FilterGroups(filters: filters, pending: _pending, onToggle: _toggle)],
    );
  }

  Widget _buildSheet(
    BuildContext context,
    List<FilterModel> filters,
    String clearLabel,
    String applyLabel,
  ) {
    final dc = CoporColors.of(context);
    return Column(
      children: [
        Expanded(
          child: SingleChildScrollView(
            controller: widget.scrollController,
            padding: const EdgeInsets.only(left: 16, right: 16, top: 5),
            child: _FilterGroups(filters: filters, pending: _pending, onToggle: _toggle),
          ),
        ),
        Divider(height: 1, thickness: 1, color: dc.outlineSubtle),
        DTActionFooter.dual(
          leadingLabel: clearLabel,
          trailingLabel: applyLabel,
          onLeading: _clear,
          onTrailing: _apply,
        ),
      ],
    );
  }
}

// ─── Filter groups ────────────────────────────────────────────────────────────

class _FilterGroups extends StatelessWidget {
  final List<FilterModel> filters;
  final Map<String, dynamic> pending;
  final void Function(String key, String value) onToggle;

  const _FilterGroups({required this.filters, required this.pending, required this.onToggle});

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    if (filters.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 24),
          child: Text('No filters available', style: dt.text.body),
        ),
      );
    }

    return SizedBox(
      width: double.infinity,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          for (final filter in filters) ...[
            DTInputDecorator(
              label: filter.name.translation,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  for (final option in filter.values ?? []) ...[
                    DTCheckbox(
                      label: option.translation,
                      value: List<String>.from(
                        pending[filter.name.value] ?? [],
                      ).contains(option.value),
                      onChanged: (_) => onToggle(filter.name.value, option.value),
                    ),
                  ],
                ],
              ),
            ),
            const SizedBox(height: 20),
          ],
        ],
      ),
    );
  }
}
