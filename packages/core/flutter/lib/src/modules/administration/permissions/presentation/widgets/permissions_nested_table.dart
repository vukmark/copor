import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/permission_effect_enum.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/role_permission_model.dart';
import 'package:copor_core/src/modules/administration/permissions/utils/permission_dependency_warnings.dart';
import 'package:copor_core/src/utils/dropdown_entries.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

import 'permission_dependency_panel.dart';
import 'permission_highlighted_text.dart';
import 'permission_value_cell.dart';

typedef PermissionScopeChanged = void Function(int featureIndex, int permissionIndex, String scope);

enum PermissionFeaturePermissionsValueType { scope, effect, scopeAndEffect }

DTTableLabels buildPermissionsTableLabels(CommonTranslation translation) {
  return DTTableLabels(
    noDataFound: translation.NO_RESULTS_FOUND,
    todo: translation.TODO,
    started: translation.STARTED,
    halfway: translation.HALFWAY,
    almostDone: translation.ALMOST_DONE,
    finished: translation.FINISHED,
    normal: translation.NORMAL,
    high: translation.HIGH,
    urgent: translation.URGENT,
    published: translation.PUBLISHED,
    unpublished: translation.UNPUBLISHED,
    draft: translation.DRAFT,
    copy: translation.COPY,
    copyToClipboard: translation.COPY_TO_CLIPBOARD,
    trueLabel: translation.TRUE,
    falseLabel: translation.FALSE,
    currentPeriodLabel: translation.CURRENT_PERIOD,
  );
}

class PermissionsNestedTableWidget extends StatefulWidget {
  final List<RoleFeaturePermissionsModel> featurePermissions;
  final PermissionScopeChanged? onPermissionScopeChanged;
  final PermissionScopeChanged? onPermissionEffectChanged;
  final PermissionFeaturePermissionsValueType valueType;
  final List<PermissionEffect> effectValues;
  final VoidCallback? onLoadMore;
  final bool isPaginating;
  final String searchQuery;
  // Complete, page-independent permission set (permissionType -> model) used
  // to resolve a row's `dependsOn` ids to names/effects for the dependency
  // panel — deliberately not the possibly-paginated `featurePermissions`
  // above, so a dependency on an unloaded page still resolves.
  final Map<String, RolePermissionModel> dependencyPermissionByType;
  // Precomputed once per build by the caller (findMissingDependencyWarnings
  // against the same complete set), not recomputed per row.
  final List<PermissionDependencyWarning> dependencyWarnings;
  final PermissionTypeValueChanged? onDependencyEffectChanged;
  final PermissionTypeValueChanged? onDependencyScopeChanged;
  // Renders an extra "Apply to..." row action when non-null, letting the
  // admin copy this permission's current value onto other roles/user
  // groups. Left null for read-only views (nothing to apply from there).
  final ValueChanged<RolePermissionModel>? onApplyToTargets;

  const PermissionsNestedTableWidget({
    super.key,
    required this.featurePermissions,
    this.onPermissionScopeChanged,
    this.onPermissionEffectChanged,
    this.valueType = PermissionFeaturePermissionsValueType.scope,
    this.effectValues = PermissionEffect.values,
    this.onLoadMore,
    this.isPaginating = false,
    this.searchQuery = '',
    this.dependencyPermissionByType = const {},
    this.dependencyWarnings = const [],
    this.onDependencyEffectChanged,
    this.onDependencyScopeChanged,
    this.onApplyToTargets,
  });

  @override
  State<PermissionsNestedTableWidget> createState() => _PermissionsNestedTableWidgetState();
}

class _PermissionsNestedTableWidgetState extends State<PermissionsNestedTableWidget> {
  final Map<String, bool> _expandedOverrides = {};
  final ScrollController _scrollController = ScrollController();

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_onScroll);
    WidgetsBinding.instance.addPostFrameCallback((_) => _loadMoreIfContentFitsViewport());
  }

  @override
  void didUpdateWidget(covariant PermissionsNestedTableWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.searchQuery.trim().isNotEmpty && widget.searchQuery.trim().isEmpty) {
      _expandedOverrides.clear();
    }
    WidgetsBinding.instance.addPostFrameCallback((_) => _loadMoreIfContentFitsViewport());
  }

  void _onScroll() {
    if (!_scrollController.hasClients || widget.onLoadMore == null || widget.isPaginating) return;
    if (_scrollController.position.extentAfter < 200) {
      widget.onLoadMore!();
    }
  }

  void _loadMoreIfContentFitsViewport() {
    if (!mounted) return;
    if (widget.onLoadMore == null || widget.isPaginating) return;
    if (!_scrollController.hasClients) return;
    if (_scrollController.position.maxScrollExtent <= 0) {
      widget.onLoadMore!();
    }
  }

  @override
  Widget build(BuildContext context) {
    final translations = context.getState.commonTranslation.ensuredData;
    final isMobile = context.isMobile;

    return DTTable(
      headers: _headers(translations, isMobile),
      rows: _buildRows(context),
      noData: Text(translations.NO_RESULTS_FOUND),
      labels: buildPermissionsTableLabels(translations),
      isMobile: false,
      scrollController: _scrollController,
      dataRowMinHeight: 70,
      minWidth: isMobile
          ? 100
          : widget.valueType == PermissionFeaturePermissionsValueType.scopeAndEffect
          ? 860
          : 680,
    );
  }

  List<DTColumnHeader> _headers(CommonTranslation translations, bool isMobile) {
    return [DTColumnHeader(name: translations.FEATURE)];
  }

  List<List<Widget>> _buildRows(BuildContext context) {
    final rows = <List<Widget>>[];
    final isMobile = context.isMobile;

    for (int featureIndex = 0; featureIndex < widget.featurePermissions.length; featureIndex++) {
      final featurePermission = widget.featurePermissions[featureIndex];
      final featureId = featurePermission.feature.feature;
      final isSearching = widget.searchQuery.trim().isNotEmpty;
      final isExpanded = _expandedOverrides[featureId] ?? isSearching;
      final hasFeatureWarning = featurePermission.permissionList.any(
        (permission) =>
            hasUnmetPermissionDependency(widget.dependencyWarnings, permission.permissionType),
      );

      rows.add([
        _FeatureRow(
          name: featurePermission.feature.name,
          searchQuery: widget.searchQuery,
          isExpanded: isExpanded,
          isWarning: hasFeatureWarning,
          onToggleExpanded: () {
            setState(() {
              _expandedOverrides[featureId] = !isExpanded;
            });
          },
          // Building this category's rows means constructing a DTDropdown
          // (its own animation controller included) per scope/effect value
          // per permission — with dozens of categories that's hundreds of
          // widgets built on every rebuild (including every page pagination
          // appends) even while collapsed and invisible, since DTTableDesktop
          // takes a pre-built row list rather than a lazy itemBuilder. Only
          // pay that cost for categories that are actually expanded.
          child: !isExpanded
              ? const SizedBox.shrink()
              : Padding(
                  padding: const EdgeInsets.only(left: 36.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      for (
                        int permissionIndex = 0;
                        permissionIndex < featurePermission.permissionList.length;
                        permissionIndex++
                      )
                        Padding(
                          padding: EdgeInsets.only(top: permissionIndex == 0 ? 0 : 8.0),
                          child: isMobile
                              ? _MobilePermissionCell(
                                  permission: featurePermission.permissionList[permissionIndex],
                                  description:
                                      featurePermission.permissionList[permissionIndex].description,
                                  searchQuery: widget.searchQuery,
                                  values: _permissionDropdowns(
                                    context,
                                    featureIndex,
                                    permissionIndex,
                                    featurePermission.permissionList[permissionIndex],
                                    effectFirst: true,
                                  ),
                                  dependencyPermissionByType: widget.dependencyPermissionByType,
                                  dependencyWarnings: widget.dependencyWarnings,
                                  effectValues: widget.effectValues,
                                  onDependencyEffectChanged: widget.onDependencyEffectChanged,
                                  onDependencyScopeChanged: widget.onDependencyScopeChanged,
                                  onApplyToTargets: widget.onApplyToTargets,
                                )
                              : _PermissionInlineRow(
                                  permission: featurePermission.permissionList[permissionIndex],
                                  description:
                                      featurePermission.permissionList[permissionIndex].description,
                                  searchQuery: widget.searchQuery,
                                  values: _permissionDropdowns(
                                    context,
                                    featureIndex,
                                    permissionIndex,
                                    featurePermission.permissionList[permissionIndex],
                                  ),
                                  dependencyPermissionByType: widget.dependencyPermissionByType,
                                  dependencyWarnings: widget.dependencyWarnings,
                                  effectValues: widget.effectValues,
                                  onDependencyEffectChanged: widget.onDependencyEffectChanged,
                                  onDependencyScopeChanged: widget.onDependencyScopeChanged,
                                  onApplyToTargets: widget.onApplyToTargets,
                                ),
                        ),
                    ],
                  ),
                ),
        ),
      ]);
    }

    if (widget.isPaginating) {
      rows.add([const Center(child: DTRingLoader.inline())]);
    }

    return rows;
  }

  List<Widget> _permissionDropdowns(
    BuildContext context,
    int featureIndex,
    int permissionIndex,
    RolePermissionModel permission, {
    bool effectFirst = false,
  }) {
    switch (widget.valueType) {
      case PermissionFeaturePermissionsValueType.scope:
        return [
          PermissionValueCell(
            value: _permissionValue(permission, PermissionFeaturePermissionsValueType.scope),
            items: _permissionItems(
              context,
              permission,
              PermissionFeaturePermissionsValueType.scope,
            ),
            enabled: widget.onPermissionScopeChanged != null,
            onChanged: (newValue) =>
                widget.onPermissionScopeChanged?.call(featureIndex, permissionIndex, newValue),
          ),
        ];
      case PermissionFeaturePermissionsValueType.effect:
        final effectiveLabel = _effectiveEffectLabel(context, permission);

        return [
          PermissionValueCell(
            value: _permissionValue(permission, PermissionFeaturePermissionsValueType.effect),
            items: _permissionItems(
              context,
              permission,
              PermissionFeaturePermissionsValueType.effect,
            ),
            enabled: widget.onPermissionEffectChanged != null,
            onChanged: (newValue) =>
                widget.onPermissionEffectChanged?.call(featureIndex, permissionIndex, newValue),
            effectiveLabel: effectiveLabel?.text,
            effectiveLabelColor: effectiveLabel?.color,
          ),
        ];
      case PermissionFeaturePermissionsValueType.scopeAndEffect:
        final effectiveLabel = _effectiveEffectLabel(context, permission);
        final isScopeVisible =
            permission.requiresScope && permission.permissionEffectEnum == PermissionEffect.allow;
        final scopeDropdown = isScopeVisible
            ? PermissionValueCell(
                value: _permissionValue(permission, PermissionFeaturePermissionsValueType.scope),
                items: _permissionItems(
                  context,
                  permission,
                  PermissionFeaturePermissionsValueType.scope,
                ),
                enabled: widget.onPermissionScopeChanged != null,
                onChanged: (newValue) =>
                    widget.onPermissionScopeChanged?.call(featureIndex, permissionIndex, newValue),
              )
            : const SizedBox.shrink();
        final effectDropdown = PermissionValueCell(
          value: _permissionValue(permission, PermissionFeaturePermissionsValueType.effect),
          items: _permissionItems(
            context,
            permission,
            PermissionFeaturePermissionsValueType.effect,
          ),
          enabled: widget.onPermissionEffectChanged != null,
          onChanged: (newValue) =>
              widget.onPermissionEffectChanged?.call(featureIndex, permissionIndex, newValue),
          effectiveLabel: effectiveLabel?.text,
          effectiveLabelColor: effectiveLabel?.color,
        );

        if (effectFirst) {
          return [effectDropdown, if (isScopeVisible) scopeDropdown];
        }

        return [scopeDropdown, effectDropdown];
    }
  }

  String _permissionValue(
    RolePermissionModel permission,
    PermissionFeaturePermissionsValueType valueType,
  ) {
    switch (valueType) {
      case PermissionFeaturePermissionsValueType.scope:
      case PermissionFeaturePermissionsValueType.scopeAndEffect:
        return permission.permissionScopeEnum?.value ?? permission.scope ?? '';
      case PermissionFeaturePermissionsValueType.effect:
        return permission.permissionEffectEnum?.value ?? permission.effect;
    }
  }

  List<DropdownItem<String>> _permissionItems(
    BuildContext context,
    RolePermissionModel permission,
    PermissionFeaturePermissionsValueType valueType,
  ) {
    final currentValue = _permissionValue(permission, valueType);

    return switch (valueType) {
      PermissionFeaturePermissionsValueType.scope => permissionScopeItems(
        context,
        currentValue: currentValue,
      ),
      PermissionFeaturePermissionsValueType.scopeAndEffect => throw ArgumentError(
        'scopeAndEffect is not a single permission value type',
      ),
      PermissionFeaturePermissionsValueType.effect => permissionEffectItems(
        context,
        effectValues: widget.effectValues,
        currentValue: currentValue,
      ),
    };
  }

  // What "Inherit" actually resolves to, walking up this group's own
  // ancestor chain. Null unless the row is Inherit — Role permissions never
  // have Inherit, so this is always null on the Role Permission screen.
  //
  // On the User Group screen, an Inherit row with no ancestor value isn't
  // "nothing" — it falls through to whatever the affected user's Role sets,
  // which this per-group screen can't resolve to one answer (a group's
  // members can span multiple roles). So that case gets a distinct label
  // rather than silence, without asserting a value we don't actually know.
  // Allow reads green and Deny reads red, so the resolved value of an Inherit
  // row can be scanned without reading it. The unresolved "Role default" case
  // keeps the neutral colour — it is not an answer, so it must not look like
  // one.
  ({String text, Color? color})? _effectiveEffectLabel(
    BuildContext context,
    RolePermissionModel permission,
  ) {
    if (permission.permissionEffectEnum != PermissionEffect.inherit) {
      return null;
    }

    final effectiveEffect = permission.effectiveEffectEnum;
    final translations = context.getState.commonTranslation.ensuredData;

    if (effectiveEffect == null) {
      return (text: '→ ${translations.ROLE_DEFAULT}', color: null);
    }

    final colors = CoporTheme.of(context).colors;

    return (
      text: '→ ${permissionEffectLabel(context, effectiveEffect)}',
      color: switch (effectiveEffect) {
        PermissionEffect.allow => colors.success,
        PermissionEffect.deny => colors.error,
        PermissionEffect.inherit => null,
      },
    );
  }
}

class _FeatureRow extends StatelessWidget {
  final String name;
  final String searchQuery;
  final bool isExpanded;
  final VoidCallback? onToggleExpanded;
  final bool isWarning;
  final Widget child;

  const _FeatureRow({
    required this.name,
    required this.searchQuery,
    required this.isExpanded,
    required this.onToggleExpanded,
    required this.isWarning,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return DTExpandableSection.slim(
      title: name,
      isExpanded: isExpanded,
      enabled: onToggleExpanded != null,
      reverseHeader: true,
      isWarning: isWarning,
      onExpansionChanged: onToggleExpanded == null ? null : (_) => onToggleExpanded!(),
      titleWidget: PermissionHighlightedText(
        text: name,
        searchQuery: searchQuery,
        maxLines: 3,
        style: CoporTheme.of(context).text.tableCell,
      ),
      child: child,
    );
  }
}

class _PermissionInlineRow extends StatefulWidget {
  final RolePermissionModel permission;
  final String description;
  final String searchQuery;
  final List<Widget> values;
  final Map<String, RolePermissionModel> dependencyPermissionByType;
  final List<PermissionDependencyWarning> dependencyWarnings;
  final List<PermissionEffect> effectValues;
  final PermissionTypeValueChanged? onDependencyEffectChanged;
  final PermissionTypeValueChanged? onDependencyScopeChanged;
  final ValueChanged<RolePermissionModel>? onApplyToTargets;

  const _PermissionInlineRow({
    required this.permission,
    required this.description,
    required this.searchQuery,
    required this.values,
    required this.dependencyPermissionByType,
    required this.dependencyWarnings,
    required this.effectValues,
    required this.onDependencyEffectChanged,
    required this.onDependencyScopeChanged,
    required this.onApplyToTargets,
  });

  @override
  State<_PermissionInlineRow> createState() => _PermissionInlineRowState();
}

class _PermissionInlineRowState extends State<_PermissionInlineRow> {
  bool _infoOpen = false;
  bool _depsOpen = false;

  @override
  Widget build(BuildContext context) {
    final translations = context.getState.commonTranslation.ensuredData;
    final name = widget.permission.translation;
    final visibleValues = widget.values.where((value) => value is! SizedBox).toList();
    final hasWarning = hasUnmetPermissionDependency(
      widget.dependencyWarnings,
      widget.permission.permissionType,
    );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Padding(
                padding: const EdgeInsets.only(top: 8.0),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: PermissionHighlightedText(
                        text: name,
                        searchQuery: widget.searchQuery,
                        maxLines: 3,
                        style: CoporTheme.of(context).text.tableCell,
                      ),
                    ),
                    const SizedBox(width: 4),
                    DTCommonButtons.warningToggle(
                      icon: hasWarning
                          ? PhosphorIconsThin.warning
                          : PhosphorIconsThin.treeStructure,
                      isActive: _depsOpen,
                      isWarning: hasWarning,
                      semanticLabel: translations.PERMISSION_DEPENDENCIES_TOOLTIP,
                      onPressed: () => setState(() {
                        _depsOpen = !_depsOpen;
                        if (_depsOpen) _infoOpen = false;
                      }),
                    ),
                    const SizedBox(width: 4),
                    DTCommonButtons.info(
                      isActive: _infoOpen,
                      semanticLabel: name,
                      onPressed: () => setState(() {
                        _infoOpen = !_infoOpen;
                        if (_infoOpen) _depsOpen = false;
                      }),
                    ),
                    if (widget.onApplyToTargets != null) ...[
                      const SizedBox(width: 4),
                      DTCommonButtons.action(
                        icon: PhosphorIconsThin.shareNetwork,
                        semanticLabel: translations.APPLY_PERMISSION_TOOLTIP,
                        onPressed: () => widget.onApplyToTargets!(widget.permission),
                        size: DTInputSize.xs,
                      ),
                    ],
                  ],
                ),
              ),
            ),
            const SizedBox(width: 16),
            for (int i = 0; i < visibleValues.length; i++) ...[
              if (i > 0) const SizedBox(width: 12),
              SizedBox(width: 180, child: visibleValues[i]),
            ],
          ],
        ),
        PermissionInfoPanel(open: _infoOpen, description: widget.description),
        PermissionDependencyPanel(
          open: _depsOpen,
          permission: widget.permission,
          permissionByType: widget.dependencyPermissionByType,
          warnings: widget.dependencyWarnings,
          effectValues: widget.effectValues,
          onEffectChanged: (type, value) => widget.onDependencyEffectChanged?.call(type, value),
          onScopeChanged: (type, value) => widget.onDependencyScopeChanged?.call(type, value),
        ),
      ],
    );
  }
}

class _MobilePermissionCell extends StatefulWidget {
  final RolePermissionModel permission;
  final String description;
  final String searchQuery;
  final List<Widget> values;
  final Map<String, RolePermissionModel> dependencyPermissionByType;
  final List<PermissionDependencyWarning> dependencyWarnings;
  final List<PermissionEffect> effectValues;
  final PermissionTypeValueChanged? onDependencyEffectChanged;
  final PermissionTypeValueChanged? onDependencyScopeChanged;
  final ValueChanged<RolePermissionModel>? onApplyToTargets;

  const _MobilePermissionCell({
    required this.permission,
    required this.description,
    required this.searchQuery,
    required this.values,
    required this.dependencyPermissionByType,
    required this.dependencyWarnings,
    required this.effectValues,
    required this.onDependencyEffectChanged,
    required this.onDependencyScopeChanged,
    required this.onApplyToTargets,
  });

  @override
  State<_MobilePermissionCell> createState() => _MobilePermissionCellState();
}

class _MobilePermissionCellState extends State<_MobilePermissionCell> {
  bool _infoOpen = false;
  bool _depsOpen = false;

  @override
  Widget build(BuildContext context) {
    final translations = context.getState.commonTranslation.ensuredData;
    final name = widget.permission.translation;
    final visibleValues = widget.values.where((value) => value is! SizedBox).toList();
    final hasWarning = hasUnmetPermissionDependency(
      widget.dependencyWarnings,
      widget.permission.permissionType,
    );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: PermissionHighlightedText(
                text: name,
                searchQuery: widget.searchQuery,
                maxLines: 3,
                style: CoporTheme.of(context).text.tableCell,
              ),
            ),
            const SizedBox(width: 4),
            DTCommonButtons.warningToggle(
              icon: hasWarning
                  ? PhosphorIconsThin.warning
                  : PhosphorIconsThin.treeStructure,
              isActive: _depsOpen,
              isWarning: hasWarning,
              semanticLabel: translations.PERMISSION_DEPENDENCIES_TOOLTIP,
              onPressed: () => setState(() {
                _depsOpen = !_depsOpen;
                if (_depsOpen) _infoOpen = false;
              }),
            ),
            const SizedBox(width: 4),
            DTCommonButtons.info(
              isActive: _infoOpen,
              semanticLabel: name,
              onPressed: () => setState(() {
                _infoOpen = !_infoOpen;
                if (_infoOpen) _depsOpen = false;
              }),
            ),
            if (widget.onApplyToTargets != null) ...[
              const SizedBox(width: 4),
              DTCommonButtons.action(
                icon: PhosphorIconsThin.shareNetwork,
                semanticLabel: translations.APPLY_PERMISSION_TOOLTIP,
                onPressed: () => widget.onApplyToTargets!(widget.permission),
                size: DTInputSize.xs,
              ),
            ],
          ],
        ),
        PermissionInfoPanel(open: _infoOpen, description: widget.description),
        PermissionDependencyPanel(
          open: _depsOpen,
          permission: widget.permission,
          permissionByType: widget.dependencyPermissionByType,
          warnings: widget.dependencyWarnings,
          effectValues: widget.effectValues,
          onEffectChanged: (type, value) => widget.onDependencyEffectChanged?.call(type, value),
          onScopeChanged: (type, value) => widget.onDependencyScopeChanged?.call(type, value),
        ),
        for (final value in visibleValues) ...[const SizedBox(height: 8), value],
      ],
    );
  }
}
