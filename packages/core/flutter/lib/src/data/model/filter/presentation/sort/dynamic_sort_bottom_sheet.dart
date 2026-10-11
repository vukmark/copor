import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_bloc.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_event.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_state.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_model/filter_model.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class DynamicSortBottomSheet extends StatefulWidget {
  final ScrollController scrollController;

  const DynamicSortBottomSheet({super.key, required this.scrollController});

  @override
  State<DynamicSortBottomSheet> createState() => _DynamicSortBottomSheetState();
}

class _DynamicSortBottomSheetState extends State<DynamicSortBottomSheet> {
  late Map<String, dynamic> _pending;

  @override
  void initState() {
    super.initState();
    _pending = Map.from(context.read<FilterBloc>().state.appliedFilters);
  }

  void _select(String sortKey, String direction) {
    setState(() => _pending[sortKey] = direction);
    context.read<FilterBloc>().add(ApplyFilters(Map.from(_pending)));
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    final translationState = context.watch<TranslationBloc<CommonTranslation>>().state;
    if (translationState.isLoading) return const SizedBox.shrink();
    final translation = translationState.ensuredData;

    return BlocBuilder<FilterBloc, FilterState>(
      builder: (context, state) {
        if (state.isLoading) return const SizedBox.shrink();

        final sortFilters = state.filters.where((f) => f.type == FilterType.SORT).toList();

        if (sortFilters.isEmpty) {
          return Center(child: Text(translation.NO_SORT_OPTIONS));
        }

        return SingleChildScrollView(
          controller: widget.scrollController,
          padding: const EdgeInsets.only(left: 16, right: 16, top: 5, bottom: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              for (final sortFilter in sortFilters) ...[
                _SortGroup(
                  sortFilter: sortFilter,
                  selectedValue: _pending[sortFilter.name.value] as String?,
                  ascLabel: translation.ASCENDING,
                  descLabel: translation.DESCENDING,
                  onSelect: (dir) => _select(sortFilter.name.value, dir),
                ),
                const SizedBox(height: 20),
              ],
            ],
          ),
        );
      },
    );
  }
}

class _SortGroup extends StatelessWidget {
  final FilterModel sortFilter;
  final String? selectedValue;
  final String ascLabel;
  final String descLabel;
  final ValueChanged<String> onSelect;

  const _SortGroup({
    required this.sortFilter,
    required this.selectedValue,
    required this.ascLabel,
    required this.descLabel,
    required this.onSelect,
  });

  @override
  Widget build(BuildContext context) {
    return DTInputDecorator(
      label: sortFilter.name.translation,
      child: Column(
        children: [
          DTRadioButton(
            label: ascLabel,
            value: selectedValue == 'asc',
            expand: true,
            onChanged: (_) => onSelect('asc'),
          ),
          DTRadioButton(
            label: descLabel,
            value: selectedValue == 'desc',
            expand: true,
            onChanged: (_) => onSelect('desc'),
          ),
        ],
      ),
    );
  }
}
