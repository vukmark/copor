import 'dart:async';

import 'package:copor_theme/src/components/buttons/dt_action_footer.dart';
import 'package:copor_theme/src/components/display/dt_animated_chevron.dart';
import 'package:copor_theme/src/components/display/dt_ring_loader.dart';
import 'package:copor_theme/src/components/inputs/dt_checkbox.dart';
import 'package:copor_theme/src/components/inputs/dt_dropdown_overlay.dart';
import 'package:copor_theme/src/components/inputs/dt_input_constants.dart';
import 'package:copor_theme/src/components/inputs/dt_input_decorator.dart';
import 'package:copor_theme/src/components/inputs/dt_input_field.dart';
import 'package:copor_theme/src/components/layout/dt_draggable_sheet.dart';
import 'package:copor_theme/src/models/dt_option.dart';
import 'package:copor_theme/src/utils/dt_icons.dart';
import 'package:copor_theme/src/theme/component_themes/input_theme.dart';
import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/extensions/copor_theme.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

/// Signature for fetching options remotely as the user types.
typedef DTDropdownSearch<T> = Future<
    List<DTOption<T>>> Function(String query, int offset);

// ══════════════════════════════════════════════════════════════════════════════
// Shared async-search hook
// ══════════════════════════════════════════════════════════════════════════════

/// Result of [_useDropdownSearch], shared by the single/multi/chips fields and
/// their mobile sheets so they all drive the same debounce/loading/label-cache
/// logic for [DTDropdownSearch].
class _DropdownSearchState<T> {
  final List<DTOption<T>> filteredItems;
  final bool isLoading;
  final bool hasSearched;
  final bool hasMore;
  final Map<Object?, DTOption<T>> knownOptions;
  final ValueChanged<String> notifyQueryChanged;
  final VoidCallback reset;
  final VoidCallback loadMore;

  _DropdownSearchState({
    required this.filteredItems,
    required this.isLoading,
    required this.hasSearched,
    required this.hasMore,
    required this.knownOptions,
    required this.notifyQueryChanged,
    required this.reset,
    required this.loadMore,
  });
}

/// Drives local filtering or remote [onSearch] lookups for a dropdown field.
///
/// When [onSearch] is null, [filteredItems] is [items] filtered locally by
/// [query] (same behaviour as plain `enableSearch`). When [onSearch] is set,
/// [filteredItems] reflects the latest debounced remote result instead, and
/// [knownOptions] accumulates every option ever seen (seeded from [items],
/// which callers should pass as the currently-selected options) so trigger/
/// chip labels stay resolvable even after the option scrolls out of the
/// latest search results.
_DropdownSearchState<T> _useDropdownSearch<T>({
  required List<DTOption<T>> items,
  required String query,
  required bool enableSearch,
  required DTDropdownSearch<T>? onSearch,
  required Duration searchDebounce,
  required int minSearchLength,
  int pageSize = 20,
}) {
  final remote = onSearch != null;
  final knownOptions = useState<Map<Object?, DTOption<T>>>(
      {for (final o in items) o.value: o});
  final asyncResults = useState<List<DTOption<T>>>(const []);
  final isLoading = useState(false);
  final hasSearched = useState(false);
  final hasMore = useState(true);
  final currentOffset = useRef(0);
  final currentQuery = useRef('');
  final searchToken = useRef(0);
  final debounceTimer = useRef<Timer?>(null);
  final isDisposed = useRef(false);

  useEffect(() {
    knownOptions.value =
    {...knownOptions.value, for (final o in items) o.value: o};
    return null;
  }, [items]);

  useEffect(() {
    return () {
      isDisposed.value = true;
      debounceTimer.value?.cancel();
    };
  }, const []);

  Future<void> runSearch(String q) async {
    final token = ++searchToken.value;
    if (q.length < minSearchLength) {
      if (isDisposed.value) return;
      asyncResults.value = const [];
      isLoading.value = false;
      hasSearched.value = false;
      currentOffset.value = 0;
      hasMore.value = true;
      return;
    }
    isLoading.value = true;
    hasSearched.value = true;
    final results = await onSearch!(q, currentOffset.value);
    if (isDisposed.value || token != searchToken.value) return;
    asyncResults.value =
    currentOffset.value == 0 ? results : [...asyncResults.value, ...results];
    isLoading.value = false;
    hasMore.value = results.length >= pageSize;
    knownOptions.value =
    {...knownOptions.value, for (final o in results) o.value: o};
  }

  void notifyQueryChanged(String q) {
    if (!remote) return;
    currentQuery.value = q;
    currentOffset.value = 0;
    hasMore.value = true;
    asyncResults.value = const [];
    debounceTimer.value?.cancel();
    debounceTimer.value = Timer(searchDebounce, () => runSearch(q));
  }

  void reset() {
    debounceTimer.value?.cancel();
    searchToken.value++;
    asyncResults.value = const [];
    isLoading.value = false;
    hasSearched.value = false;
    hasMore.value = true;
    currentOffset.value = 0;
    currentQuery.value = '';
    // minSearchLength: 0 means an empty query is itself a valid search (e.g. "load all"),
    // so re-fetch immediately on open instead of waiting for the user to type.
    if (remote && minSearchLength <= 0) runSearch('');
  }

  void loadMore() {
    if (!remote || isLoading.value || !hasMore.value) return;
    currentOffset.value += pageSize;
    runSearch(currentQuery.value);
  }

  final filteredItems = remote
      ? asyncResults.value
      : (enableSearch && query.isNotEmpty
      ? items
      .where((i) => i.label.toLowerCase().contains(query.toLowerCase()))
      .toList()
      : items);

  return _DropdownSearchState<T>(
    filteredItems: filteredItems,
    isLoading: isLoading.value,
    hasSearched: hasSearched.value,
    hasMore: hasMore.value,
    knownOptions: knownOptions.value,
    notifyQueryChanged: notifyQueryChanged,
    reset: reset,
    loadMore: loadMore,
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// Public widget
// ══════════════════════════════════════════════════════════════════════════════

enum _DTDropdownVariant { single, multi, chips }

class DTDropdown<T> extends StatelessWidget {
  final _DTDropdownVariant _variant;
  final List<DTOption<T>> items;
  final String? label;
  final String? placeholder;
  final EdgeInsetsGeometry padding;
  final bool enabled;
  final String? required;
  final bool isMobile;
  final String cancelLabel;
  final double? menuHeight;
  final double menuElevation;

  // Single
  final T? _value;
  final ValueChanged<T?>? _onSingleChanged;
  final bool _enableSearch;
  final bool _showSelectedLeading;

  // Multi / Chips
  final List<T>? _selectedValues;
  final ValueChanged<List<T>>? _onMultiChanged;
  final String? _selectAllLabel;
  final bool _enableMultiSearch;

  // Shared optional help
  final Widget? _helpContent;

  // Chips-only: optional action button
  final IconData? _actionIcon;
  final String? _actionButtonLabel;
  final VoidCallback? _onAction;
  final String? _inputLabel;

  // Async search (single / multi / chips)
  final DTDropdownSearch<T>? _onSearch;
  final Duration _searchDebounce;
  final int _minSearchLength;
  final String _noResultsLabel;
  final int _pageSize;

  DTDropdown.single({
    super.key,
    required T? value,
    required List<DTOption<T>> items,
    required ValueChanged<T?> onChanged,
    required String label,
    String? placeholder,
    EdgeInsetsGeometry padding = const EdgeInsets.only(
      bottom: kInputBottomPadding,
      top: kInputLabelTopPadding,
    ),
    bool enabled = true,
    String? required,
    bool isMobile = false,
    String cancelLabel = 'Cancel',
    double? menuHeight,
    double menuElevation = 0,
    bool enableSearch = false,
    bool showSelectedLeading = false,
    Widget? helpContent,
    DTDropdownSearch<T>? onSearch,
    Duration searchDebounce = const Duration(milliseconds: 300),
    int minSearchLength = 1,
    String noResultsLabel = 'No results',
    int pageSize = 20,
  })
      : _variant = _DTDropdownVariant.single,
        this.items = items,
        this.label = label,
        this.placeholder = placeholder,
        this.padding = padding,
        this.enabled = enabled,
        this.required = required,
        this.isMobile = isMobile,
        this.cancelLabel = cancelLabel,
        this.menuHeight = menuHeight,
        this.menuElevation = menuElevation,
        _value = value,
        _onSingleChanged = onChanged,
        _enableSearch = enableSearch,
        _showSelectedLeading = showSelectedLeading,
        _selectedValues = null,
        _onMultiChanged = null,
        _selectAllLabel = null,
        _enableMultiSearch = false,
        _helpContent = helpContent,
        _actionIcon = null,
        _actionButtonLabel = null,
        _onAction = null,
        _inputLabel = null,
        _onSearch = onSearch,
        _searchDebounce = searchDebounce,
        _minSearchLength = minSearchLength,
        _noResultsLabel = noResultsLabel,
        _pageSize = pageSize;

  DTDropdown.multi({
    super.key,
    required List<T> selectedValues,
    required List<DTOption<T>> items,
    required ValueChanged<List<T>> onChanged,
    required String label,
    String? placeholder,
    EdgeInsetsGeometry padding = const EdgeInsets.only(
      bottom: kInputBottomPadding,
      top: kInputLabelTopPadding,
    ),
    bool enabled = true,
    String? required,
    bool isMobile = false,
    String cancelLabel = 'Cancel',
    double? menuHeight,
    String? selectAllLabel,
    bool enableSearch = false,
    Widget? helpContent,
    DTDropdownSearch<T>? onSearch,
    Duration searchDebounce = const Duration(milliseconds: 300),
    int minSearchLength = 1,
    String noResultsLabel = 'No results',
    int pageSize = 20,
  })
      : _variant = _DTDropdownVariant.multi,
        this.items = items,
        this.label = label,
        this.placeholder = placeholder,
        this.padding = padding,
        this.enabled = enabled,
        this.required = required,
        this.isMobile = isMobile,
        this.cancelLabel = cancelLabel,
        this.menuHeight = menuHeight,
        menuElevation = 0,
        _value = null,
        _onSingleChanged = null,
        _enableSearch = false,
        _showSelectedLeading = false,
        _selectedValues = selectedValues,
        _onMultiChanged = onChanged,
        _selectAllLabel = selectAllLabel,
        _enableMultiSearch = enableSearch,
        _helpContent = helpContent,
        _actionIcon = null,
        _actionButtonLabel = null,
        _onAction = null,
        _inputLabel = null,
        _onSearch = onSearch,
        _searchDebounce = searchDebounce,
        _minSearchLength = minSearchLength,
        _noResultsLabel = noResultsLabel,
        _pageSize = pageSize;

  /// Multi-select with removable chips displayed above the trigger. The field
  /// always renders inside a [DTInputDecorator]. Pass [actionIcon]/[onAction]
  /// for a withAction decorator, or [helpContent] for a withHelp decorator;
  /// otherwise a plain decorator is used.
  ///
  /// [inputLabel] is the floating label on the inner [DTInputField] trigger
  /// (e.g. "Add tag", "Search…"). [label] is the outer decorator section label
  /// (e.g. "Categories").
  DTDropdown.chips({
    super.key,
    required List<T> selectedValues,
    required List<DTOption<T>> items,
    required ValueChanged<List<T>> onChanged,
    required String inputLabel,
    String? label,
    String? placeholder,
    EdgeInsetsGeometry padding = const EdgeInsets.only(
      bottom: kInputBottomPadding,
      top: kInputLabelTopPadding,
    ),
    bool enabled = true,
    String? required,
    double? menuHeight,
    String? selectAllLabel,
    bool enableSearch = false,
    bool isMobile = false,
    String cancelLabel = 'Cancel',
    Widget? helpContent,
    IconData? actionIcon,
    String? actionButtonLabel,
    VoidCallback? onAction,
    DTDropdownSearch<T>? onSearch,
    Duration searchDebounce = const Duration(milliseconds: 300),
    int minSearchLength = 1,
    String noResultsLabel = 'No results',
    int pageSize = 20,
  })
      : _variant = _DTDropdownVariant.chips,
        this.items = items,
        this.label = label,
        this.placeholder = placeholder,
        this.padding = padding,
        this.enabled = enabled,
        this.required = required,
        this.isMobile = isMobile,
        this.cancelLabel = cancelLabel,
        this.menuHeight = menuHeight,
        menuElevation = 0,
        _value = null,
        _onSingleChanged = null,
        _enableSearch = false,
        _showSelectedLeading = false,
        _selectedValues = selectedValues,
        _onMultiChanged = onChanged,
        _selectAllLabel = selectAllLabel,
        _enableMultiSearch = enableSearch,
        _helpContent = helpContent,
        _actionIcon = actionIcon,
        _actionButtonLabel = actionButtonLabel,
        _onAction = onAction,
        _inputLabel = inputLabel,
        _onSearch = onSearch,
        _searchDebounce = searchDebounce,
        _minSearchLength = minSearchLength,
        _noResultsLabel = noResultsLabel,
        _pageSize = pageSize;

  Widget _buildField({EdgeInsetsGeometry? overridePadding}) {
    final effectivePadding = overridePadding ?? padding;
    if (_variant == _DTDropdownVariant.single) {
      return _SingleField<T>(
        value: _value,
        items: items,
        onChanged: _onSingleChanged!,
        label: label!,
        placeholder: placeholder,
        padding: effectivePadding,
        enabled: enabled,
        required: required,
        isMobile: isMobile,
        cancelLabel: cancelLabel,
        menuHeight: menuHeight ?? coporDropdownMaxHeight,
        menuElevation: menuElevation,
        enableSearch: _enableSearch,
        showSelectedLeading: _showSelectedLeading,
        onSearch: _onSearch,
        searchDebounce: _searchDebounce,
        minSearchLength: _minSearchLength,
        noResultsLabel: _noResultsLabel,
        pageSize: _pageSize,
      );
    }
    if (_variant == _DTDropdownVariant.chips) {
      return _ChipsField<T>(
        selectedValues: _selectedValues!,
        items: items,
        onChanged: _onMultiChanged!,
        inputLabel: _inputLabel!,
        placeholder: placeholder,
        selectAllLabel: _selectAllLabel,
        enableSearch: _enableMultiSearch,
        padding: effectivePadding,
        enabled: enabled,
        required: required,
        isMobile: isMobile,
        cancelLabel: cancelLabel,
        menuHeight: menuHeight ?? coporDropdownMaxHeight,
        onSearch: _onSearch,
        searchDebounce: _searchDebounce,
        minSearchLength: _minSearchLength,
        noResultsLabel: _noResultsLabel,
        pageSize: _pageSize,
      );
    }
    return _MultiField<T>(
      selectedValues: _selectedValues!,
      items: items,
      onChanged: _onMultiChanged!,
      label: label!,
      placeholder: placeholder,
      selectAllLabel: _selectAllLabel,
      enableSearch: _enableMultiSearch,
      padding: effectivePadding,
      enabled: enabled,
      required: required,
      isMobile: isMobile,
      cancelLabel: cancelLabel,
      menuHeight: menuHeight ?? coporDropdownMaxHeight,
      onSearch: _onSearch,
      searchDebounce: _searchDebounce,
      minSearchLength: _minSearchLength,
      noResultsLabel: _noResultsLabel,
      pageSize: _pageSize,
    );
  }

  Widget _buildDecorated({required Widget Function() inner}) =>
      Padding(padding: padding, child: inner());

  @override
  Widget build(BuildContext context) {
    // Chips always renders inside a DTInputDecorator.
    if (_variant == _DTDropdownVariant.chips) {
      final inner = _buildField(overridePadding: EdgeInsets.zero);
      return _buildDecorated(
        inner: () {
          if (_onAction != null) {
            return DTInputDecorator.withAction(
              label: label ?? '',
              actionIcon: _actionIcon!,
              actionButtonLabel: _actionButtonLabel,
              onAction: _onAction,
              child: inner,
            );
          }
          if (_helpContent != null) {
            return DTInputDecorator.withHelp(
              label: label ?? '',
              helpContent: _helpContent,
              child: inner,
            );
          }
          return DTInputDecorator(label: label, child: inner);
        },
      );
    }
    // Single / multi: wrap in withHelp when requested.
    if (_helpContent != null) {
      return _buildDecorated(
        inner: () =>
            DTInputDecorator.withHelp(
              label: label ?? '',
              helpContent: _helpContent,
              child: _buildField(overridePadding: EdgeInsets.zero),
            ),
      );
    }
    return _buildField();
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// Shared atoms
// ══════════════════════════════════════════════════════════════════════════════

// ── Panel container ───────────────────────────────────────────────────────────
//
// Panels wrap their content in the shared DTOverlayPanel (dt_dropdown_overlay.dart)
// so every desktop dropdown overlay looks identical — see _SingleMenuPanel /
// _MultiMenuPanel below.

// ── Single-select menu row ────────────────────────────────────────────────────

class _MenuItemRow<T> extends StatelessWidget {
  final DTOption<T> item;
  final bool isSelected;
  final VoidCallback onTap;

  const _MenuItemRow(
      {required this.item, required this.isSelected, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);

    return InkWell(
      onTap: onTap,
      overlayColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.hovered)) return dc.surfaceHovered;
        if (states.contains(WidgetState.pressed)) return dc.surfacePressed;
        return Colors.transparent;
      }),
      child: Ink(
        color: isSelected ? dc.primaryContainer : Colors.transparent,
        child: Padding(
          padding: coporDropdownItemPadding,
          child: Row(
            children: [
              if (item.leading != null) ...[
                item.leading!,
                const SizedBox(width: 8)
              ],
              Expanded(
                child: Text(item.label,
                    style: const TextStyle(fontWeight: FontWeight.w400)),
              ),
              if (isSelected) Icon(
                  Icons.check, size: 14, color: dc.onPrimaryContainer),
            ],
          ),
        ),
      ),
    );
  }
}

// ── Mobile drag handle ────────────────────────────────────────────────────────

class _BottomLoader extends StatelessWidget {
  const _BottomLoader();

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.symmetric(vertical: 12),
      child: Center(child: DTRingLoader.inline()),
    );
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// Single-select field
// ══════════════════════════════════════════════════════════════════════════════

class _SingleField<T> extends HookWidget {
  final T? value;
  final List<DTOption<T>> items;
  final ValueChanged<T?> onChanged;
  final String label;
  final String? placeholder;
  final EdgeInsetsGeometry padding;
  final bool enabled;
  final String? required;
  final bool isMobile;
  final String cancelLabel;
  final double menuHeight;
  final double menuElevation;
  final bool enableSearch;
  final bool showSelectedLeading;
  final DTDropdownSearch<T>? onSearch;
  final Duration searchDebounce;
  final int minSearchLength;
  final String noResultsLabel;
  final int pageSize;

  const _SingleField({
    required this.value,
    required this.items,
    required this.onChanged,
    required this.label,
    required this.placeholder,
    required this.padding,
    required this.enabled,
    required this.required,
    required this.isMobile,
    required this.cancelLabel,
    required this.menuHeight,
    required this.menuElevation,
    required this.enableSearch,
    required this.showSelectedLeading,
    this.onSearch,
    this.searchDebounce = const Duration(milliseconds: 300),
    this.minSearchLength = 1,
    this.noResultsLabel = 'No results',
    this.pageSize = 20,
  });

  @override
  Widget build(BuildContext context) {
    final t = DTInputThemeData.of(context);
    final remoteSearch = onSearch != null;
    final searchActive = enableSearch || remoteSearch;
    final overlay = useDropdownOverlay(preferredMaxHeight: menuHeight);
    final searchQuery = useState('');
    final triggerFocusNode = useFocusNode();

    final search = _useDropdownSearch<T>(
      items: items,
      query: searchQuery.value,
      enableSearch: enableSearch,
      onSearch: onSearch,
      searchDebounce: searchDebounce,
      minSearchLength: minSearchLength,
      pageSize: pageSize,
    );

    final searchController = useTextEditingController(
      text: search.knownOptions[value]?.label ?? '',
    );

    // Sync controller text when the selected value changes externally.
    useEffect(() {
      if (!overlay.isOpen) {
        searchController.text = search.knownOptions[value]?.label ?? '';
      }
      return null;
    }, [value, search.knownOptions]);

    // For keyboard focus (tab navigation) on the search variant, open the overlay.
    useEffect(() {
      if (!searchActive || isMobile) return null;
      void onFocusChange() {
        if (triggerFocusNode.hasFocus && !overlay.isOpen) {
          searchController.clear();
          searchQuery.value = '';
          search.reset();
          overlay.show(
            contentHeight: remoteSearch ? null : items.length *
                coporDropdownEstimatedItemHeight,
          );
        }
      }

      triggerFocusNode.addListener(onFocusChange);
      return () => triggerFocusNode.removeListener(onFocusChange);
    }, [triggerFocusNode]);

    return Padding(
      padding: padding,
      child: LayoutBuilder(
        builder: (context, constraints) {
          return FormField<T>(
            initialValue: value,
            enabled: enabled,
            autovalidateMode: AutovalidateMode.onUserInteraction,
            validator: (v) {
              if (required == null) return null;
              if (v == null) return required;
              if (v is String && v
                  .trim()
                  .isEmpty) return required;
              return null;
            },
            builder: (state) {
              final selectedLabel = search.knownOptions[state.value]?.label;
              final selectedLeading = showSelectedLeading
                  ? search.knownOptions[state.value]?.leading
                  : null;

              void syncSelectedText(T? item) {
                searchController.text =
                    items
                        .where((i) => i.value == item)
                        .firstOrNull
                        ?.label ?? '';
              }

              void close() {
                if (!overlay.isOpen) return;
                if (searchActive) {
                  searchQuery.value = '';
                  searchController.text = selectedLabel ?? '';
                }
                overlay.hide();
              }

              void open() {
                if (!enabled || (!remoteSearch && items.isEmpty)) return;

                if (isMobile) {
                  DTDraggableScrollableSheet.show<void>(
                    context,
                    initialSize: 0.4,
                    maxSize: 0.65,
                    footer: DTActionFooter.single(
                      label: cancelLabel,
                      onPressed: () => Navigator.of(context).pop(),
                    ),
                    contentBuilder: (_, scrollController) =>
                        _SingleSheet<T>(
                          items: items,
                          selected: state.value,
                          scrollController: scrollController,
                          onSearch: onSearch,
                          searchDebounce: searchDebounce,
                          minSearchLength: minSearchLength,
                          noResultsLabel: noResultsLabel,
                          pageSize: pageSize,
                          searchPlaceholder: placeholder,
                          onSelect: (item) {
                            Navigator.of(context).pop();
                            syncSelectedText(item);
                            state.didChange(item);
                            onChanged(item);
                          },
                        ),
                  );
                  return;
                }

                if (overlay.isOpen) return;
                if (searchActive) {
                  searchController.clear();
                  searchQuery.value = '';
                  search.reset();
                }
                overlay.show(
                  contentHeight: remoteSearch
                      ? null
                      : items.length * coporDropdownEstimatedItemHeight,
                );
              }

              return DTDropdownAnchor(
                upwardGap: label.isEmpty ? 0 : kInputLabelTopPadding,
                handle: overlay,
                onDismiss: close,
                panelBuilder: (ctx, maxHeight) =>
                    SizedBox(
                      width: constraints.maxWidth,
                      child: _SingleMenuPanel<T>(
                        items: search.filteredItems,
                        selected: state.value,
                        maxHeight: maxHeight,
                        elevation: menuElevation,
                        isLoading: search.isLoading,
                        noResultsLabel: remoteSearch && search.hasSearched
                            ? noResultsLabel
                            : null,
                        onLoadMore: search.hasMore ? search.loadMore : null,
                        onSelect: (item) {
                          if (searchActive) {
                            // Set controller text before closing so close() doesn't
                            // overwrite with the stale selectedItem from this closure.
                            syncSelectedText(item);
                            searchQuery.value = '';
                            search.reset();
                            overlay.hide();
                          } else {
                            close();
                            syncSelectedText(item);
                          }
                          state.didChange(item);
                          onChanged(item);
                        },
                      ),
                    ),
                trigger: DTInputField(
                  controller: searchController,
                  focusNode: searchActive ? triggerFocusNode : null,
                  label: label,
                  readOnly: !searchActive,
                  maxLines: 1,
                  padding: EdgeInsets.zero,
                  enabled: enabled,
                  hintText: placeholder,
                  prefixIcon: selectedLeading == null
                      ? null
                      : Center(
                      widthFactor: 1, heightFactor: 1, child: selectedLeading),
                  onTap: searchActive
                      ? () {
                    if (!overlay.isOpen) open();
                  }
                      : () => overlay.isOpen ? close() : open(),
                  onChanged: searchActive
                      ? (v) {
                    searchQuery.value = v;
                    search.notifyQueryChanged(v);
                    if (!overlay.isOpen) open();
                  }
                      : null,
                  suffixIcon: Opacity(
                    opacity: enabled ? 1.0 : 0.4,
                    child: DTAnimatedChevron(
                      isOpen: overlay.isOpen,
                      size: coporDropdownChevronSize,
                      color: t.floatingLabelColor,
                      openColor: t.focusedLabelColor,
                    ),
                  ),
                  errorText: state.hasError ? state.errorText : null,
                ),
              );
            },
          );
        },
      ),
    );
  }
}

// ── Single desktop panel ──────────────────────────────────────────────────────

class _SingleMenuPanel<T> extends StatelessWidget {
  final List<DTOption<T>> items;
  final T? selected;
  final double maxHeight;
  final double elevation;
  final ValueChanged<T?> onSelect;
  final bool isLoading;

  /// Shown instead of the (empty) item list once a remote search has run
  /// with no matches. Null suppresses the message (e.g. before any search).
  final String? noResultsLabel;
  final VoidCallback? onLoadMore;

  const _SingleMenuPanel({
    required this.items,
    required this.selected,
    required this.maxHeight,
    required this.elevation,
    required this.onSelect,
    this.isLoading = false,
    this.noResultsLabel,
    this.onLoadMore,
  });

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);

    if (items.isEmpty) {
      if (isLoading || noResultsLabel != null) {
        return DTOverlayPanel(
          maxHeight: maxHeight,
          elevation: elevation,
          child: _MenuStatusContent(
            isLoading: isLoading,
            message: isLoading ? null : noResultsLabel,
          ),
        );
      }
      return DTOverlayPanel(
        maxHeight: maxHeight,
        elevation: elevation,
        child: const SizedBox.shrink(),
      );
    }

    return DTOverlayPanel(
      maxHeight: maxHeight,
      elevation: elevation,
      onScrollBottom: onLoadMore,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          for (int i = 0; i < items.length; i++) ...[
            _MenuItemRow<T>(
              item: items[i],
              isSelected: items[i].value == selected,
              onTap: () => onSelect(items[i].value),
            ),
            if (i < items.length - 1) Divider(
                height: 1, thickness: 1, color: dc.outlineSubtle),
          ],
          if (isLoading) ...[
            Divider(height: 1, thickness: 1, color: dc.outlineSubtle),
            const _BottomLoader(),
          ],
        ],
      ),
    );
  }
}

// ── Loading / empty status row (shared by single & multi panels) ────────────

class _MenuStatusContent extends StatelessWidget {
  final bool isLoading;
  final String? message;

  const _MenuStatusContent({required this.isLoading, required this.message});

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
      child: Center(
        child: isLoading
            ? const DTRingLoader.inline()
            : Text(
          message ?? '',
          style: CoporTheme
              .of(context)
              .text
              .body
              .copyWith(color: dc.onSurfaceSubtle),
        ),
      ),
    );
  }
}

// ── Single mobile sheet ───────────────────────────────────────────────────────

class _SingleSheet<T> extends HookWidget {
  final List<DTOption<T>> items;
  final T? selected;
  final ValueChanged<T?> onSelect;
  final ScrollController scrollController;
  final DTDropdownSearch<T>? onSearch;
  final Duration searchDebounce;
  final int minSearchLength;
  final String noResultsLabel;
  final String? searchPlaceholder;

  final int pageSize;

  const _SingleSheet({
    required this.items,
    required this.selected,
    required this.onSelect,
    required this.scrollController,
    this.onSearch,
    this.searchDebounce = const Duration(milliseconds: 300),
    this.minSearchLength = 1,
    this.noResultsLabel = 'No results',
    this.pageSize = 20,
    this.searchPlaceholder,
  });

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    final remoteSearch = onSearch != null;
    final searchQuery = useState('');
    final searchController = useTextEditingController();

    final search = _useDropdownSearch<T>(
      items: items,
      query: searchQuery.value,
      enableSearch: false,
      onSearch: onSearch,
      searchDebounce: searchDebounce,
      minSearchLength: minSearchLength,
      pageSize: pageSize,
    );

    useEffect(() {
      search.reset();
      return null;
    }, const []);

    final displayItems = remoteSearch ? search.filteredItems : items;
    final showCenterStatus =
        remoteSearch && displayItems.isEmpty &&
            (search.isLoading || search.hasSearched);

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (remoteSearch)
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
            child: DTInputField(
              controller: searchController,
              label: searchPlaceholder ?? 'Search',
              maxLines: 1,
              padding: EdgeInsets.zero,
              onChanged: (v) {
                searchQuery.value = v;
                search.notifyQueryChanged(v);
              },
            ),
          ),
        Expanded(
          child: NotificationListener<ScrollNotification>(
            onNotification: (n) {
              if (n is ScrollUpdateNotification &&
                  n.metrics.pixels >= n.metrics.maxScrollExtent - 80) {
                search.loadMore();
              }
              return false;
            },
            child: SingleChildScrollView(
              controller: scrollController,
              child: showCenterStatus
                  ? _MenuStatusContent(
                  isLoading: search.isLoading, message: noResultsLabel)
                  : Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  for (int i = 0; i < displayItems.length; i++) ...[
                    _MenuItemRow<T>(
                      item: displayItems[i],
                      isSelected: displayItems[i].value == selected,
                      onTap: () => onSelect(displayItems[i].value),
                    ),
                    if (i < displayItems.length - 1)
                      Divider(height: 1, thickness: 1, color: dc.outlineSubtle),
                  ],
                  if (search.isLoading &&
                      displayItems.isNotEmpty) const _BottomLoader(),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// Multi-select field
// ══════════════════════════════════════════════════════════════════════════════

String _multiTriggerLabel<T>(List<T> selectedValues,
    Map<Object?, DTOption<T>> knownOptions,
    int totalItemCount,
    String? selectAllLabel,) {
  if (selectedValues.isEmpty) return '';
  if (selectedValues.length == totalItemCount && selectAllLabel != null)
    return selectAllLabel;

  return selectedValues
      .map((v) => knownOptions[v]?.label)
      .whereType<String>()
      .join(', ');
}

class _MultiField<T> extends HookWidget {
  final List<T> selectedValues;
  final List<DTOption<T>> items;
  final ValueChanged<List<T>> onChanged;
  final String label;
  final String? placeholder;
  final String? selectAllLabel;
  final bool enableSearch;
  final EdgeInsetsGeometry padding;
  final bool enabled;
  final String? required;
  final bool isMobile;
  final String cancelLabel;
  final double menuHeight;
  final DTDropdownSearch<T>? onSearch;
  final Duration searchDebounce;
  final int minSearchLength;
  final String noResultsLabel;

  final int pageSize;

  const _MultiField({
    required this.selectedValues,
    required this.items,
    required this.onChanged,
    required this.label,
    required this.placeholder,
    required this.selectAllLabel,
    required this.enableSearch,
    required this.padding,
    required this.enabled,
    required this.required,
    required this.isMobile,
    required this.cancelLabel,
    required this.menuHeight,
    this.onSearch,
    this.searchDebounce = const Duration(milliseconds: 300),
    this.minSearchLength = 1,
    this.noResultsLabel = 'No results',
    this.pageSize = 20,
  });

  @override
  Widget build(BuildContext context) {
    final t = DTInputThemeData.of(context);
    final remoteSearch = onSearch != null;
    final searchActive = enableSearch || remoteSearch;
    final effectiveSelectAllLabel = remoteSearch ? null : selectAllLabel;
    final overlay = useDropdownOverlay(preferredMaxHeight: menuHeight);
    final searchQuery = useState('');
    final triggerFocusNode = useFocusNode();

    final search = _useDropdownSearch<T>(
      items: items,
      query: searchQuery.value,
      enableSearch: enableSearch,
      onSearch: onSearch,
      searchDebounce: searchDebounce,
      minSearchLength: minSearchLength,
      pageSize: pageSize,
    );

    final searchController = useTextEditingController(
      text: _multiTriggerLabel(
        selectedValues,
        search.knownOptions,
        items.length,
        effectiveSelectAllLabel,
      ),
    );

    useEffect(() {
      if (!overlay.isOpen) {
        searchController.text = _multiTriggerLabel(
          selectedValues,
          search.knownOptions,
          items.length,
          effectiveSelectAllLabel,
        );
      }
      return null;
    }, [selectedValues, search.knownOptions]);

    double? estimatedContentHeight() =>
        remoteSearch
            ? null
            : ((effectiveSelectAllLabel != null ? 1 : 0) + items.length) *
            coporDropdownEstimatedItemHeight;

    useEffect(() {
      if (!searchActive || isMobile) return null;
      void onFocusChange() {
        if (triggerFocusNode.hasFocus && !overlay.isOpen) {
          searchController.clear();
          searchQuery.value = '';
          search.reset();
          overlay.show(contentHeight: estimatedContentHeight());
        }
      }

      triggerFocusNode.addListener(onFocusChange);
      return () => triggerFocusNode.removeListener(onFocusChange);
    }, [triggerFocusNode]);

    void close() {
      if (!overlay.isOpen) return;
      searchQuery.value = '';
      searchController.text = _multiTriggerLabel(
        selectedValues,
        search.knownOptions,
        items.length,
        effectiveSelectAllLabel,
      );
      overlay.hide();
    }

    return Padding(
      padding: padding,
      child: LayoutBuilder(
        builder: (context, constraints) {
          return FormField<List<T>>(
            initialValue: selectedValues,
            enabled: enabled,
            autovalidateMode: AutovalidateMode.onUserInteraction,
            validator: (_) {
              if (required != null && selectedValues.isEmpty) return required;
              return null;
            },
            builder: (state) {
              void toggle(T value) {
                final next = List<T>.from(selectedValues);
                next.contains(value) ? next.remove(value) : next.add(value);
                state.didChange(next);
                onChanged(next);
              }

              void toggleAll() {
                final allSelected = selectedValues.length == items.length;
                final next = allSelected ? <T>[] : items
                    .map((i) => i.value)
                    .toList();
                state.didChange(next);
                onChanged(next);
              }

              void open() {
                if (!enabled || (!remoteSearch && items.isEmpty)) return;

                if (isMobile) {
                  DTDraggableScrollableSheet.show<void>(
                    context,
                    initialSize: 0.4,
                    maxSize: 0.65,
                    footer: DTActionFooter.single(
                      label: cancelLabel,
                      onPressed: () => Navigator.of(context).pop(),
                    ),
                    contentBuilder: (_, scrollController) =>
                        _MultiSheet<T>(
                          items: items,
                          initialSelected: selectedValues,
                          selectAllLabel: effectiveSelectAllLabel,
                          scrollController: scrollController,
                          onSearch: onSearch,
                          searchDebounce: searchDebounce,
                          minSearchLength: minSearchLength,
                          noResultsLabel: noResultsLabel,
                          pageSize: pageSize,
                          searchPlaceholder: placeholder,
                          onChanged: (next) {
                            state.didChange(next);
                            onChanged(next);
                          },
                        ),
                  );
                  return;
                }

                if (overlay.isOpen) return;
                if (searchActive) {
                  searchController.clear();
                  searchQuery.value = '';
                  search.reset();
                }
                overlay.show(contentHeight: estimatedContentHeight());
              }

              return DTDropdownAnchor(
                upwardGap: label.isEmpty ? 0 : kInputLabelTopPadding,
                handle: overlay,
                onDismiss: close,
                panelBuilder: (ctx, maxHeight) =>
                    SizedBox(
                      width: constraints.maxWidth,
                      child: _MultiMenuPanel<T>(
                        items: search.filteredItems,
                        selectedValues: selectedValues,
                        maxHeight: maxHeight,
                        selectAllLabel: search.filteredItems.length ==
                            items.length
                            ? effectiveSelectAllLabel
                            : null,
                        allSelected: selectedValues.length == items.length,
                        onToggle: toggle,
                        onToggleAll: toggleAll,
                        isLoading: search.isLoading,
                        noResultsLabel: remoteSearch && search.hasSearched
                            ? noResultsLabel
                            : null,
                        onLoadMore: search.hasMore ? search.loadMore : null,
                      ),
                    ),
                trigger: DTInputField(
                  controller: searchController,
                  focusNode: searchActive ? triggerFocusNode : null,
                  label: label,
                  readOnly: !searchActive,
                  maxLines: 4,
                  minLines: 1,
                  padding: EdgeInsets.zero,
                  enabled: enabled,
                  hintText: placeholder,
                  onTap: searchActive
                      ? () {
                    if (!overlay.isOpen) open();
                  }
                      : () => overlay.isOpen ? close() : open(),
                  onChanged: searchActive
                      ? (v) {
                    searchQuery.value = v;
                    search.notifyQueryChanged(v);
                    if (!overlay.isOpen) open();
                  }
                      : null,
                  suffixIcon: Opacity(
                    opacity: enabled ? 1.0 : 0.4,
                    child: DTAnimatedChevron(
                      isOpen: overlay.isOpen,
                      size: coporDropdownChevronSize,
                      color: t.floatingLabelColor,
                      openColor: t.focusedLabelColor,
                    ),
                  ),
                  errorText: state.hasError ? state.errorText : null,
                ),
              );
            },
          );
        },
      ),
    );
  }
}

// ── Multi desktop panel ───────────────────────────────────────────────────────

class _MultiMenuPanel<T> extends StatelessWidget {
  final List<DTOption<T>> items;
  final List<T> selectedValues;
  final double maxHeight;
  final String? selectAllLabel;
  final bool allSelected;
  final ValueChanged<T> onToggle;
  final VoidCallback onToggleAll;
  final bool isLoading;

  /// Shown instead of the (empty) item list once a remote search has run
  /// with no matches. Null suppresses the message (e.g. before any search).
  final String? noResultsLabel;
  final VoidCallback? onLoadMore;

  const _MultiMenuPanel({
    required this.items,
    required this.selectedValues,
    required this.maxHeight,
    required this.selectAllLabel,
    required this.allSelected,
    required this.onToggle,
    required this.onToggleAll,
    this.isLoading = false,
    this.noResultsLabel,
    this.onLoadMore,
  });

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);

    if (items.isEmpty) {
      if (isLoading || noResultsLabel != null) {
        return DTOverlayPanel(
          maxHeight: maxHeight,
          child: _MenuStatusContent(
            isLoading: isLoading,
            message: isLoading ? null : noResultsLabel,
          ),
        );
      }
      return DTOverlayPanel(
          maxHeight: maxHeight, child: const SizedBox.shrink());
    }

    return DTOverlayPanel(
      maxHeight: maxHeight,
      onScrollBottom: onLoadMore,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (selectAllLabel != null) ...[
            DTCheckbox(
              value: allSelected,
              onChanged: (_) => onToggleAll(),
              label: selectAllLabel!,
              expand: true,
            ),
            Divider(height: 1, thickness: 1, color: dc.outlineSubtle),
          ],
          for (int i = 0; i < items.length; i++) ...[
            DTCheckbox(
              value: selectedValues.contains(items[i].value),
              onChanged: (_) => onToggle(items[i].value),
              label: items[i].label,
              leading: items[i].leading,
              expand: true,
            ),
            if (i < items.length - 1) Divider(
                height: 1, thickness: 1, color: dc.outlineSubtle),
          ],
          if (isLoading) ...[
            Divider(height: 1, thickness: 1, color: dc.outlineSubtle),
            const _BottomLoader(),
          ],
        ],
      ),
    );
  }
}

// ── Multi mobile sheet ────────────────────────────────────────────────────────

class _MultiSheet<T> extends HookWidget {
  final List<DTOption<T>> items;
  final List<T> initialSelected;
  final String? selectAllLabel;
  final ValueChanged<List<T>> onChanged;
  final ScrollController scrollController;
  final DTDropdownSearch<T>? onSearch;
  final Duration searchDebounce;
  final int minSearchLength;
  final String noResultsLabel;
  final String? searchPlaceholder;

  final int pageSize;

  const _MultiSheet({
    required this.items,
    required this.initialSelected,
    required this.selectAllLabel,
    required this.onChanged,
    required this.scrollController,
    this.onSearch,
    this.searchDebounce = const Duration(milliseconds: 300),
    this.minSearchLength = 1,
    this.noResultsLabel = 'No results',
    this.pageSize = 20,
    this.searchPlaceholder,
  });

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    final remoteSearch = onSearch != null;
    final selected = useState<List<T>>(List.from(initialSelected));
    final searchQuery = useState('');
    final searchController = useTextEditingController();

    final search = _useDropdownSearch<T>(
      items: items,
      query: searchQuery.value,
      enableSearch: false,
      onSearch: onSearch,
      searchDebounce: searchDebounce,
      minSearchLength: minSearchLength,
      pageSize: pageSize,
    );

    useEffect(() {
      search.reset();
      return null;
    }, const []);

    final displayItems = remoteSearch ? search.filteredItems : items;
    final allSelected = selected.value.length == items.length;
    final showCenterStatus =
        remoteSearch && displayItems.isEmpty &&
            (search.isLoading || search.hasSearched);

    void toggle(T value) {
      final next = List<T>.from(selected.value);
      next.contains(value) ? next.remove(value) : next.add(value);
      selected.value = next;
      onChanged(next);
    }

    void toggleAll() {
      selected.value = allSelected ? <T>[] : items.map((i) => i.value).toList();
      onChanged(selected.value);
    }

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (remoteSearch)
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
            child: DTInputField(
              controller: searchController,
              label: searchPlaceholder ?? 'Search',
              maxLines: 1,
              padding: EdgeInsets.zero,
              onChanged: (v) {
                searchQuery.value = v;
                search.notifyQueryChanged(v);
              },
            ),
          ),
        Expanded(
          child: NotificationListener<ScrollNotification>(
            onNotification: (n) {
              if (n is ScrollUpdateNotification &&
                  n.metrics.pixels >= n.metrics.maxScrollExtent - 80) {
                search.loadMore();
              }
              return false;
            },
            child: SingleChildScrollView(
              controller: scrollController,
              child: showCenterStatus
                  ? _MenuStatusContent(
                  isLoading: search.isLoading, message: noResultsLabel)
                  : Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (selectAllLabel != null) ...[
                    DTCheckbox(
                      value: allSelected,
                      onChanged: (_) => toggleAll(),
                      label: selectAllLabel!,
                      expand: true,
                    ),
                    Divider(height: 1, thickness: 1, color: dc.outlineSubtle),
                  ],
                  for (int i = 0; i < displayItems.length; i++) ...[
                    DTCheckbox(
                      value: selected.value.contains(displayItems[i].value),
                      onChanged: (_) => toggle(displayItems[i].value),
                      label: displayItems[i].label,
                      leading: displayItems[i].leading,
                      expand: true,
                    ),
                    if (i < displayItems.length - 1)
                      Divider(height: 1, thickness: 1, color: dc.outlineSubtle),
                  ],
                  if (search.isLoading &&
                      displayItems.isNotEmpty) const _BottomLoader(),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// Chips field (chips-above-search pattern)
// ══════════════════════════════════════════════════════════════════════════════

// ── Individual removable chip ─────────────────────────────────────────────────

class _SelectionChip extends StatelessWidget {
  final String label;
  final Widget? leading;
  final bool enabled;
  final VoidCallback onDeleted;

  const _SelectionChip({
    required this.label,
    required this.enabled,
    required this.onDeleted,
    this.leading,
  });

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    return Chip(
      avatar: leading,
      label: Text(label, style: CoporTheme
          .of(context)
          .text
          .chipLabel),
      backgroundColor: dc.primaryContainer,
      deleteIconColor: dc.onPrimaryContainer,
      deleteIcon: Icon(DTIcons.unpublished, size: 16),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(kInputBorderRadius),
        side: BorderSide(color: dc.primaryBorder),
      ),
      onDeleted: enabled ? onDeleted : null,
    );
  }
}

// ── Chips field ───────────────────────────────────────────────────────────────

class _ChipsField<T> extends HookWidget {
  final List<T> selectedValues;
  final List<DTOption<T>> items;
  final ValueChanged<List<T>> onChanged;
  final String inputLabel;
  final String? placeholder;
  final String? selectAllLabel;
  final bool enableSearch;
  final EdgeInsetsGeometry padding;
  final bool enabled;
  final String? required;
  final bool isMobile;
  final String cancelLabel;
  final double menuHeight;
  final DTDropdownSearch<T>? onSearch;
  final Duration searchDebounce;
  final int minSearchLength;
  final String noResultsLabel;

  final int pageSize;

  const _ChipsField({
    required this.selectedValues,
    required this.items,
    required this.onChanged,
    required this.inputLabel,
    required this.placeholder,
    required this.selectAllLabel,
    required this.enableSearch,
    required this.padding,
    required this.enabled,
    required this.required,
    required this.isMobile,
    required this.cancelLabel,
    required this.menuHeight,
    this.onSearch,
    this.searchDebounce = const Duration(milliseconds: 300),
    this.minSearchLength = 1,
    this.noResultsLabel = 'No results',
    this.pageSize = 20,
  });

  @override
  Widget build(BuildContext context) {
    final t = DTInputThemeData.of(context);
    final remoteSearch = onSearch != null;
    final searchActive = enableSearch || remoteSearch;
    final effectiveSelectAllLabel = remoteSearch ? null : selectAllLabel;
    final overlay = useDropdownOverlay(preferredMaxHeight: menuHeight);
    final searchController = useTextEditingController();
    final searchQuery = useState('');
    final triggerFocusNode = useFocusNode();

    final search = _useDropdownSearch<T>(
      items: items,
      query: searchQuery.value,
      enableSearch: enableSearch,
      onSearch: onSearch,
      searchDebounce: searchDebounce,
      minSearchLength: minSearchLength,
      pageSize: pageSize,
    );

    // Clear search state when selection changes externally while closed.
    useEffect(() {
      if (!overlay.isOpen) {
        searchController.clear();
        searchQuery.value = '';
      }
      return null;
    }, [selectedValues]);

    double? estimatedContentHeight() =>
        remoteSearch
            ? null
            : ((effectiveSelectAllLabel != null ? 1 : 0) + items.length) *
            coporDropdownEstimatedItemHeight;

    useEffect(() {
      if (!searchActive || isMobile) return null;
      void onFocusChange() {
        if (triggerFocusNode.hasFocus && !overlay.isOpen) {
          searchController.clear();
          searchQuery.value = '';
          search.reset();
          overlay.show(contentHeight: estimatedContentHeight());
        }
      }

      triggerFocusNode.addListener(onFocusChange);
      return () => triggerFocusNode.removeListener(onFocusChange);
    }, [triggerFocusNode]);

    void close() {
      if (!overlay.isOpen) return;
      searchQuery.value = '';
      searchController.clear();
      overlay.hide();
    }

    return Padding(
      padding: padding,
      child: LayoutBuilder(
        builder: (context, constraints) {
          return FormField<List<T>>(
            initialValue: selectedValues,
            autovalidateMode: AutovalidateMode.onUserInteraction,
            validator: (_) {
              if (required != null && selectedValues.isEmpty) return required;
              return null;
            },
            builder: (state) {
              void toggle(T value) {
                final next = List<T>.from(selectedValues);
                next.contains(value) ? next.remove(value) : next.add(value);
                state.didChange(next);
                onChanged(next);
              }

              void toggleAll() {
                final allSelected = selectedValues.length == items.length;
                final next = allSelected ? <T>[] : items
                    .map((i) => i.value)
                    .toList();
                state.didChange(next);
                onChanged(next);
              }

              void open() {
                if (!enabled || (!remoteSearch && items.isEmpty)) return;
                if (isMobile) {
                  DTDraggableScrollableSheet.show<void>(
                    context,
                    initialSize: 0.4,
                    maxSize: 0.65,
                    footer: DTActionFooter.single(
                      label: cancelLabel,
                      onPressed: () => Navigator.of(context).pop(),
                    ),
                    contentBuilder: (_, scrollController) =>
                        _MultiSheet<T>(
                          items: items,
                          initialSelected: selectedValues,
                          selectAllLabel: effectiveSelectAllLabel,
                          scrollController: scrollController,
                          onSearch: onSearch,
                          searchDebounce: searchDebounce,
                          minSearchLength: minSearchLength,
                          noResultsLabel: noResultsLabel,
                          pageSize: pageSize,
                          searchPlaceholder: placeholder,
                          onChanged: (next) {
                            state.didChange(next);
                            onChanged(next);
                          },
                        ),
                  );
                  return;
                }
                if (overlay.isOpen) return;
                if (searchActive) {
                  searchController.clear();
                  searchQuery.value = '';
                  search.reset();
                }
                overlay.show(contentHeight: estimatedContentHeight());
              }

              // A selection can run into the thousands (e.g. a learning
              // group with thousands of assigned regions) — this row is
              // rebuilt on every focus/search interaction while the
              // dropdown is on screen, so building one full Chip per
              // selected value regardless of count turns routine typing
              // into rebuilding thousands of widgets each keystroke. Cap
              // what's actually rendered; the underlying selection (and
              // toggle/toggleAll behavior) is untouched.
              const maxVisibleChips = 50;
              final visibleChips = selectedValues.take(maxVisibleChips);
              final overflowCount = selectedValues.length - visibleChips.length;

              final chipsRow = selectedValues.isNotEmpty
                  ? Padding(
                padding: const EdgeInsets.only(bottom: 15),
                child: Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    ...visibleChips.map((v) {
                      final item = search.knownOptions[v];
                      return _SelectionChip(
                        label: item?.label ?? v.toString(),
                        leading: item?.leading,
                        enabled: enabled,
                        onDeleted: () => toggle(v),
                      );
                    }),
                    if (overflowCount > 0)
                      _SelectionChip(
                        label: '+$overflowCount more',
                        enabled: false,
                        onDeleted: () {},
                      ),
                  ],
                ),
              )
                  : const SizedBox.shrink();

              return DTDropdownAnchor(
                upwardGap: inputLabel.isEmpty ? 0 : kInputLabelTopPadding,
                handle: overlay,
                onDismiss: close,
                panelBuilder: (ctx, maxHeight) =>
                    SizedBox(
                      width: constraints.maxWidth,
                      child: _MultiMenuPanel<T>(
                        items: search.filteredItems,
                        selectedValues: selectedValues,
                        maxHeight: maxHeight,
                        selectAllLabel: search.filteredItems.length ==
                            items.length
                            ? effectiveSelectAllLabel
                            : null,
                        allSelected: selectedValues.length == items.length,
                        onToggle: toggle,
                        onToggleAll: toggleAll,
                        isLoading: search.isLoading,
                        noResultsLabel: remoteSearch && search.hasSearched
                            ? noResultsLabel
                            : null,
                        onLoadMore: search.hasMore ? search.loadMore : null,
                      ),
                    ),
                trigger: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    chipsRow,
                    DTInputField(
                      controller: searchController,
                      focusNode: searchActive ? triggerFocusNode : null,
                      label: inputLabel,
                      readOnly: !searchActive,
                      maxLines: 1,
                      padding: EdgeInsets.zero,
                      enabled: enabled,
                      hintText: placeholder,
                      onTap: searchActive
                          ? () {
                        if (!overlay.isOpen) open();
                      }
                          : () => overlay.isOpen ? close() : open(),
                      onChanged: searchActive
                          ? (v) {
                        searchQuery.value = v;
                        search.notifyQueryChanged(v);
                        if (!overlay.isOpen) open();
                      }
                          : null,
                      suffixIcon: Opacity(
                        opacity: enabled ? 1.0 : 0.4,
                        child: DTAnimatedChevron(
                          isOpen: overlay.isOpen,
                          size: coporDropdownChevronSize,
                          color: t.floatingLabelColor,
                          openColor: t.focusedLabelColor,
                        ),
                      ),
                      errorText: state.hasError ? state.errorText : null,
                    ),
                  ],
                ),
              );
            },
          );
        },
      ),
    );
  }
}
