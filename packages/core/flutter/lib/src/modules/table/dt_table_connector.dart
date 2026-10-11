import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_bloc.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_event.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/modules/table/bloc/table_bloc.dart';
import 'package:copor_core/src/modules/table/bloc/utils/table_lazy_load_wrapper.dart';
import 'package:copor_core/src/modules/table/data/model/cell_content.dart';
import 'package:copor_core/src/modules/table/data/model/cell_type.dart';
import 'package:copor_core/src/modules/table/data/model/copor_action_dto_model.dart';
import 'package:copor_core/src/modules/table/data/model/copor_table_model.dart';
import 'package:copor_core/src/modules/table/copor_action.dart';
import 'package:copor_core/src/modules/table/widgets/group_list_cell.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class DTTableConnector extends StatelessWidget {
  final CoporTableModel tableDTO;
  final ScrollController scrollController;
  final String tableEndpoint;
  final DTTableLabels labels;
  final double minWidth;
  final bool scrollable;
  final bool shrinkWrap;
  final Widget noData;
  final bool showWeekdayInDateColumn;
  final String languageCode;
  final bool? isMobile;

  const DTTableConnector({
    super.key,
    required this.tableDTO,
    required this.scrollController,
    required this.tableEndpoint,
    required this.labels,
    required this.noData,
    this.minWidth = 400,
    this.scrollable = true,
    this.shrinkWrap = false,
    this.showWeekdayInDateColumn = false,
    this.languageCode = 'en',
    this.isMobile,
  });

  @override
  Widget build(BuildContext context) {
    final header = <DTColumnHeader>[];
    final body = <List<Widget>>[];
    final hiddenColumnIndexes = _getHiddenColumnIndexes(tableDTO);
    final translation = context.watch<TranslationBloc<CommonTranslation>>().state.ensuredData;


    for (final entry in tableDTO.header.asMap().entries) {
      if (hiddenColumnIndexes.contains(entry.key)) {
        continue;
      }

      final column = entry.value;
      header.add(
        DTColumnHeader(
          name: column.name,
          sortKey: column.sortKey,
          defaultSortDir: column.defaultSortDir,
          fixedWidth: column.fixedWidth,
          size: column.size,
          alignment: column.alignment,
        ),
      );
    }

    final filterState = context.read<FilterBloc>().state;
    final sort = deriveSortState(header, filterState.appliedFilters);

    if (filterState.defaultSortKey == null && sort.effectiveSortKey != null) {
      context.read<FilterBloc>().add(
        SetDefaultSort(
          defaultSortKey: sort.effectiveSortKey,
          defaultSortDir: sort.effectiveSortDir,
        ),
      );
    }

    void handleSortClicked(String sortKey, String? order) {
      final newFilters = nextFiltersAfterSortClick(
        headers: header,
        currentAppliedFilters: filterState.appliedFilters,
        sortKey: sortKey,
        order: order,
      );
      context.read<FilterBloc>().add(ApplyFilters(newFilters));
    }

    final isMobile = this.isMobile ?? context.isMobile;
    final selectable = !isMobile;

    for (final row in tableDTO.body) {
      final preparedRow = <Widget>[];
      for (final entry in row.asMap().entries) {
        if (hiddenColumnIndexes.contains(entry.key)) {
          continue;
        }

        final cell = entry.value;
        preparedRow.add(switch (cell.type) {
          CellType.text => DTTextCell(text: cell.content.text, selectable: selectable),
          CellType.publishStatus => DTPublishStatusCell(
            publishStatus: _mapPublishStatus(cell.content.publishStatus),
          ),
          CellType.isChecked => DTCheckedCell(isChecked: cell.content.isChecked),
          CellType.color => DTColorCell(color: cell.content.color),
          CellType.featured => DTFeaturedCell(isFeatured: cell.content.isFeatured),
          CellType.copyableText => DTCopyableTextCell(
            copyText: cell.content.copyText,
            selectable: selectable,
            onCopied: () => context.getBloc.appScaffold.addBanner(
              DSBanner.info(translation.COPY_TO_CLIPBOARD, source: 'dt_table_copy'),
            ),
          ),
          CellType.date => DTDateCell(date: cell.content.date, selectable: selectable),
          CellType.dateTime => DTDateTimeCell(
            date: cell.content.date,
            selectable: selectable,
            showWeekday: showWeekdayInDateColumn,
            languageCode: languageCode,
          ),
          CellType.priority => DTPriorityCell(priority: _mapPriority(cell.content.priority)),
          CellType.progress => DTProgressCell(progress: _mapProgress(cell.content.progress)),
          CellType.action => DTActionCell(
            children: _mapActionWidgets(context, cell.content.actionList),
          ),
          CellType.hiddenText => DTHiddenTextCell(hiddenText: cell.content.hiddenText?.value),
          CellType.groupList => GroupListCell(
            groupList: cell.content.groupList ?? GroupListContent(),
            labels: GroupListLabels.fromContext(context),
          ),
          CellType.description => DTDescriptionCell(
            text: cell.content.text,
            selectable: selectable,
          ),
        });
      }
      body.add(preparedRow);
    }

    final tableState = context.watch<TableBloc>().state;
    final isLoadingMore = tableState.isLoading && tableState.tableGetType == TableGetType.loadMore;

    return TableLazyLoadWrapper(
      scrollController: scrollController,
      endpoint: tableEndpoint,
      child: DTTable(
        headers: header,
        rows: body,
        noData: noData,
        labels: labels,
        isMobile: isMobile,
        scrollController: scrollController,
        onSortClicked: handleSortClicked,
        activeSortKey: sort.activeSortKey,
        activeSortDir: sort.activeSortDir,
        minWidth: minWidth,
        scrollable: scrollable,
        shrinkWrap: shrinkWrap,
        isLoadingMore: isLoadingMore,
      ),
    );
  }

  DTPublishStatus? _mapPublishStatus(dynamic s) {
    if (s == null) return null;
    return switch (s.toString()) {
      'PublishStatus.published' => DTPublishStatus.published,
      'PublishStatus.unpublished' => DTPublishStatus.unpublished,
      'PublishStatus.draft' => DTPublishStatus.draft,
      _ => null,
    };
  }

  DTPriority? _mapPriority(dynamic p) {
    if (p == null) return null;
    return switch (p.toString()) {
      'Priority.normal' => DTPriority.normal,
      'Priority.high' => DTPriority.high,
      'Priority.urgent' => DTPriority.urgent,
      _ => null,
    };
  }

  DTProgress? _mapProgress(dynamic p) {
    if (p == null) return null;
    return switch (p.toString()) {
      'Progress.toDo' => DTProgress.toDo,
      'Progress.started' => DTProgress.started,
      'Progress.halfWay' => DTProgress.halfWay,
      'Progress.almostDone' => DTProgress.almostDone,
      'Progress.finished' => DTProgress.finished,
      _ => null,
    };
  }

  List<Widget> _mapActionWidgets(BuildContext context, List<CoporActionDTOModel>? actions) {
    if (actions == null) return [];

    return actions.map((actionDto) {
      final action = _getAction(actionDto, context);

      if (actionDto.actionType == TableActionType.remove) {
        return DTCommonButtons.negativeAction(
          icon: action.getIcon(),
          semanticLabel: action.getPopupMessage(),
          onPressed: action.onClick,
        );
      }

      if (actionDto.actionType == TableActionType.toggleActive) {
        final isActive = actionDto.isActive == true;
        return isActive
            ? DTButton.surface(
                icon: action.getIcon(),
                label: '',
                semanticLabel: action.getPopupMessage(),
                onPressed: action.onClick,
                inputSize: DTInputSize.xs,
              )
            : DTButton.surface(
                icon: action.getIcon(),
                label: '',
                semanticLabel: action.getPopupMessage(),
                onPressed: action.onClick,
                inputSize: DTInputSize.xs,
              );
      }

      return DTCommonButtons.action(
        icon: action.getIcon(),
        semanticLabel: action.getPopupMessage(),
        onPressed: action.onClick,
      );
    }).toList();
  }

  CoporAction _getAction(CoporActionDTOModel model, BuildContext context) {
    return switch (model.actionType) {
      TableActionType.edit => EditAction(actionDTO: model),
      TableActionType.remove => DeleteAction(actionDTO: model, context: context),
      TableActionType.info => InfoAction(actionDTO: model),
      TableActionType.document => DocumentAction(actionDTO: model, context: context),
      TableActionType.toggleActive => ToggleActiveAction(actionDTO: model, context: context),
      TableActionType.permissions => PermissionsAction(actionDTO: model, context: context),
    };
  }

  Set<int> _getHiddenColumnIndexes(CoporTableModel tableDTO) {
    final indexes = <int>{};

    for (final row in tableDTO.body) {
      for (final entry in row.asMap().entries) {
        if (entry.value.type == CellType.hiddenText) {
          indexes.add(entry.key);
        }
      }
    }

    return indexes;
  }
}
