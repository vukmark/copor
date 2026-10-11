import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class DTInputDecorator extends StatefulWidget {
  final String? label;
  final Widget child;
  final Widget? _helpContent;
  final VoidCallback? _onAction;
  final IconData? _actionIcon;
  final EdgeInsetsGeometry? contentPadding;
  final bool isFocused;
  final bool isEmpty;
  final bool isHovered;
  final String? hintText;
  final String? actionButtonLabel;
  final Widget? suffixIcon;
  final String? errorText;
  final TextAlignVertical textAlignVertical;

  const DTInputDecorator({
    super.key,
    this.label,
    required this.child,
    this.contentPadding,
    this.isFocused = false,
    this.isEmpty = false,
    this.isHovered = false,
    this.actionButtonLabel,
    this.hintText,
    this.suffixIcon,
    this.errorText,
    this.textAlignVertical = TextAlignVertical.bottom,
  }) : _helpContent = null,
       _onAction = null,
       _actionIcon = null;

  const DTInputDecorator.withHelp({
    super.key,
    required this.label,
    required this.child,
    required Widget helpContent,
    this.contentPadding,
    this.isFocused = false,
    this.isEmpty = false,
    this.isHovered = false,
    this.hintText,
    this.actionButtonLabel,
    this.suffixIcon,
    this.errorText,
    this.textAlignVertical = TextAlignVertical.bottom,
  }) : _helpContent = helpContent,
       _onAction = null,
       _actionIcon = null;

  const DTInputDecorator.withAction({
    super.key,
    required this.label,
    required this.child,
    required VoidCallback onAction,
    required IconData actionIcon,
    this.actionButtonLabel,
    this.contentPadding,
    this.isFocused = false,
    this.isEmpty = false,
    this.isHovered = false,
    this.hintText,
    this.suffixIcon,
    this.errorText,
    this.textAlignVertical = TextAlignVertical.bottom,
  }) : _helpContent = null,
       _onAction = onAction,
       _actionIcon = actionIcon;

  const DTInputDecorator.withActionAndHelp({
    super.key,
    required this.label,
    required this.child,
    required Widget helpContent,
    required VoidCallback onAction,
    required IconData actionIcon,
    this.actionButtonLabel,
    this.contentPadding,
    this.isFocused = false,
    this.isEmpty = false,
    this.isHovered = false,
    this.hintText,
    this.suffixIcon,
    this.errorText,
    this.textAlignVertical = TextAlignVertical.bottom,
  }) : _helpContent = helpContent,
        _onAction = onAction,
        _actionIcon = actionIcon;

  @override
  State<DTInputDecorator> createState() => _DTInputDecoratorState();
}

class _DTInputDecoratorState extends State<DTInputDecorator> {
  bool _showHelp = false;

  InputDecoration _buildDecoration(BuildContext context, {bool hideLabel = false}) {
    final base = DTInputThemeData.of(context).buildDecoration(
      label: widget.label ?? '',
      contentPadding: widget.contentPadding ?? kInputContentWithDecoratorPadding,
      isHovered: widget.isHovered,
      hintText: widget.hintText,
      suffixIcon: widget.suffixIcon,
    );
    final shouldHideLabel = widget.label == null || hideLabel;
    return (shouldHideLabel
            ? base.copyWith(
                labelText: null,
                floatingLabelBehavior: FloatingLabelBehavior.never,
              )
            : base)
        .copyWith(errorText: widget.errorText);
  }

  @override
  Widget build(BuildContext context) {
    final hasHelp = widget._helpContent != null;
    final hasAction = widget._onAction != null;
    final bool useCustomLeftLabel = hasHelp && hasAction;

    final decorator = InputDecorator(
      isFocused: widget.isFocused,
      isEmpty: widget.isEmpty,
      textAlignVertical: widget.textAlignVertical,
      decoration: _buildDecoration(context, hideLabel: useCustomLeftLabel),
      child: Column(
        children: [
          AnimatedSize(
            duration: kInputAnimDuration,
            curve: Curves.easeInOut,
            alignment: Alignment.topCenter,
            child: AnimatedSwitcher(
              duration: kInputAnimDuration,
              child: _showHelp
                  ? Container(
                key: const ValueKey('help'),
                width: double.infinity,
                margin: const EdgeInsets.only(
                  bottom: kDecoratorHelpMarginTop,
                ),
                padding: const EdgeInsets.symmetric(
                  horizontal: kDecoratorHelpPaddingH,
                  vertical: kDecoratorHelpPaddingV,
                ),
                decoration: BoxDecoration(
                  color: CoporColors.of(context).surfaceContainer,
                  border: Border.all(
                    color: CoporColors.of(context).outlineSubtle,
                  ),
                  borderRadius: BorderRadius.circular(kInputBorderRadius),
                ),
                child: widget._helpContent,
              )
                  : const SizedBox.shrink(key: ValueKey('empty')),
            ),
          ),
          SizedBox(width: double.infinity, child: widget.child),
        ],
      ),
    );

    if (!hasHelp && !hasAction) {
      return Padding(
        padding: const EdgeInsets.only(top: kInputLabelTopPadding),
        child: decorator,
      );
    }

    final Widget? actionButton = hasAction
        ? widget.actionButtonLabel == null
            ? DTButton.surface(
      icon: widget._actionIcon!,
      semanticLabel: widget.actionButtonLabel ?? widget.label ?? '',
      label: '',
      onPressed: widget._onAction!,
      inputSize: DTInputSize.xs,
    )
            : SizedBox(
                height: DTInputSize.xs.containerSize,
                child: OutlinedButton.icon(
                  style: DTButtonThemeData.of(context).surface.copyWith(
                    textStyle: WidgetStateProperty.all(
                      const TextStyle(fontSize: 14, fontWeight: FontWeight.w400),
                    ),
                    minimumSize: WidgetStateProperty.all(Size.zero),
                  ),
                  onPressed: widget._onAction!,
                  icon: Icon(widget._actionIcon!, size: DTInputSize.xs.defaultIconSize),
                  label: Text(widget.actionButtonLabel!),
                ),
              )
        : null;

    final Widget helpToggle = DTCommonButtons.info(
      isActive: _showHelp,
      semanticLabel: 'Hilfe',
      onPressed: () => setState(() => _showHelp = !_showHelp),
      size: DTInputSize.xs,
      borderColor: CoporColors.of(context).outline,
    );

    if (hasHelp && !hasAction) {
      return Padding(
        padding: const EdgeInsets.only(top: kInputLabelTopPadding),
        child: Stack(
          clipBehavior: Clip.none,
          children: [
            Padding(
              padding: const EdgeInsets.only(top: (coporInputExtraSmall / 2)),
              child: decorator,
            ),
            Positioned(top: 0, right: 12, child: helpToggle),
          ],
        ),
      );
    }

    if (hasAction && !hasHelp) {
      return Padding(
        padding: const EdgeInsets.only(top: kInputLabelTopPadding),
        child: Stack(
          clipBehavior: Clip.none,
          children: [
            Padding(
              padding: const EdgeInsets.only(top: (coporInputExtraSmall / 2)),
              child: decorator,
            ),
            Positioned(top: 0, right: 12, child: actionButton!),
          ],
        ),
      );
    }

    return Padding(
      padding: const EdgeInsets.only(top: kInputLabelTopPadding),
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: (coporInputExtraSmall / 2)),
            child: decorator,
          ),
          Positioned(
            top: 0,
            left: 12,
            right: 12,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Flexible(
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6),
                    color: CoporColors.of(context).surface,
                    child: Text(
                      widget.label ?? '',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: DTInputThemeData.of(context).floatingLabelColor
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Container(
                  color: CoporColors.of(context).surface,
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    spacing: 4,
                    children: [helpToggle, actionButton!],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
