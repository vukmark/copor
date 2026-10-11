import 'package:copor_theme/src/components/display/dt_animated_chevron.dart';
import 'package:copor_theme/src/theme/component_themes/button_theme.dart';
import 'package:copor_theme/src/theme/extensions/copor_theme.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

const _kPaddingH = 12.0;
const _kPaddingV = 12.0;
const _kIconLabelSpacing = 12.0;
const _kIconSize = 20.0;
const _kChildIndent = 20.0;

enum _DTListTileVariant {
  primary, secondary, tertiary, positive, surface, negative, floating, toggle, expandable,
}

/// A full-width list tile that shares the exact color tokens and API as [DTButton].
///
/// - [DTListTile.primary]    — primary action
/// - [DTListTile.secondary]  — secondary action
/// - [DTListTile.tertiary]   — tertiary action
/// - [DTListTile.positive]   — confirm / positive
/// - [DTListTile.surface]    — neutral surface
/// - [DTListTile.negative]   — destructive
/// - [DTListTile.floating]   — floating surface
/// - [DTListTile.toggle]     — lights up when [isToggled] is true
/// - [DTListTile.expandable] — collapsible children list
class DTListTile extends StatelessWidget {
  final Widget? leading;
  final IconData? icon;
  final IconData? iconExpanded;
  final Widget? animatedIcon;
  final Widget? trailing;
  final String label;
  final Widget? labelWidget;
  final String? labelToggled;
  final String tooltip;
  final VoidCallback? onPressed;
  final bool enabled;
  final bool centered;
  final bool fullWidth;
  final bool circular;
  final double? size;
  final String? semanticLabel;
  final EdgeInsetsGeometry? iconPadding;
  final bool isToggled;
  final bool reverseContent;
  final bool border;
  final EdgeInsetsGeometry? contentPadding;
  final double? height;
  final List<DTListTile> children;
  final bool? isExpanded;
  final ValueChanged<bool>? onExpandedChanged;
  final _DTListTileVariant _variant;

  const DTListTile.primary({
    super.key,
    this.leading,
    this.icon,
    this.trailing,
    required this.label,
    this.labelWidget,
    this.tooltip = '',
    required VoidCallback this.onPressed,
    this.enabled = true,
    this.centered = false,
    this.fullWidth = true,
    this.circular = false,
    this.reverseContent = false,
    this.size,
    this.border = true,
    this.semanticLabel,
    this.contentPadding,
    this.height,
  })  : _variant = _DTListTileVariant.primary,
        isExpanded = null,
        onExpandedChanged = null,
        animatedIcon = null,
        iconExpanded = null,
        labelToggled = null,
        iconPadding = null,
        isToggled = false,
        children = const [];

  const DTListTile.secondary({
    super.key,
    this.leading,
    this.icon,
    this.trailing,
    required this.label,
    this.labelWidget,
    this.tooltip = '',
    required VoidCallback this.onPressed,
    this.enabled = true,
    this.centered = false,
    this.fullWidth = true,
    this.circular = false,
    this.reverseContent = false,
    this.size,
    this.border = true,
    this.semanticLabel,
    this.contentPadding,
    this.height,
  })  : _variant = _DTListTileVariant.secondary,
        isExpanded = null,
        onExpandedChanged = null,
        animatedIcon = null,
        iconExpanded = null,
        labelToggled = null,
        iconPadding = null,
        isToggled = false,
        children = const [];

  const DTListTile.tertiary({
    super.key,
    this.leading,
    this.icon,
    this.trailing,
    required this.label,
    this.labelWidget,
    this.tooltip = '',
    required VoidCallback this.onPressed,
    this.enabled = true,
    this.centered = false,
    this.fullWidth = true,
    this.circular = false,
    this.reverseContent = false,
    this.size,
    this.border = true,
    this.semanticLabel,
    this.contentPadding,
    this.height,
  })  : _variant = _DTListTileVariant.tertiary,
        isExpanded = null,
        onExpandedChanged = null,
        animatedIcon = null,
        iconExpanded = null,
        labelToggled = null,
        iconPadding = null,
        isToggled = false,
        children = const [];

  const DTListTile.positive({
    super.key,
    this.leading,
    this.icon,
    this.trailing,
    required this.label,
    this.labelWidget,
    this.tooltip = '',
    required VoidCallback this.onPressed,
    this.enabled = true,
    this.centered = false,
    this.fullWidth = true,
    this.circular = false,
    this.reverseContent = false,
    this.size,
    this.border = true,
    this.semanticLabel,
    this.contentPadding,
    this.height,
  })  : _variant = _DTListTileVariant.positive,
        isExpanded = null,
        onExpandedChanged = null,
        animatedIcon = null,
        iconExpanded = null,
        labelToggled = null,
        iconPadding = null,
        isToggled = false,
        children = const [];

  const DTListTile.surface({
    super.key,
    this.leading,
    this.icon,
    this.trailing,
    required this.label,
    this.labelWidget,
    this.tooltip = '',
    required VoidCallback this.onPressed,
    this.enabled = true,
    this.centered = false,
    this.fullWidth = true,
    this.circular = false,
    this.reverseContent = false,
    this.size,
    this.border = true,
    this.semanticLabel,
    this.contentPadding,
    this.height,
  })  : _variant = _DTListTileVariant.surface,
        isExpanded = null,
        onExpandedChanged = null,
        animatedIcon = null,
        iconExpanded = null,
        labelToggled = null,
        iconPadding = null,
        isToggled = false,
        children = const [];

  const DTListTile.negative({
    super.key,
    this.leading,
    this.icon,
    this.trailing,
    required this.label,
    this.labelWidget,
    this.tooltip = '',
    required VoidCallback this.onPressed,
    this.enabled = true,
    this.centered = false,
    this.fullWidth = true,
    this.circular = false,
    this.reverseContent = false,
    this.size,
    this.border = true,
    this.semanticLabel,
    this.contentPadding,
    this.height,
  })  : _variant = _DTListTileVariant.negative,
        isExpanded = null,
        onExpandedChanged = null,
        animatedIcon = null,
        iconExpanded = null,
        labelToggled = null,
        iconPadding = null,
        isToggled = false,
        children = const [];

  const DTListTile.floating({
    super.key,
    this.leading,
    this.icon,
    this.trailing,
    required this.label,
    this.labelWidget,
    this.tooltip = '',
    required VoidCallback this.onPressed,
    this.enabled = true,
    this.centered = false,
    this.fullWidth = true,
    this.circular = false,
    this.reverseContent = false,
    this.size,
    this.border = true,
    this.semanticLabel,
    this.contentPadding,
    this.height,
  })  : _variant = _DTListTileVariant.floating,
        isExpanded = null,
        onExpandedChanged = null,
        animatedIcon = null,
        iconExpanded = null,
        labelToggled = null,
        iconPadding = null,
        isToggled = false,
        children = const [];

  const DTListTile.toggle({
    super.key,
    this.leading,
    this.icon,
    this.animatedIcon,
    this.trailing,
    this.tooltip = '',
    required VoidCallback this.onPressed,
    required this.isToggled,
    this.enabled = true,
    this.fullWidth = true,
    this.label = '',
    this.labelWidget,
    this.labelToggled,
    this.reverseContent = false,
    this.size,
    this.iconPadding,
    this.semanticLabel,
    this.contentPadding,
    this.height,
    this.border = true,
  })  : _variant = _DTListTileVariant.toggle,
        isExpanded = null,
        onExpandedChanged = null,
        circular = false,
        centered = false,
        iconExpanded = null,
        children = const [];

  const DTListTile.expandable({
    super.key,
    this.leading,
    this.icon,
    this.iconExpanded,
    required this.label,
    this.labelWidget,
    this.tooltip = '',
    this.border = false,
    this.semanticLabel,
    this.contentPadding,
    this.height,
    this.children = const [],
    this.isExpanded,
    this.onExpandedChanged,
  })  : _variant = _DTListTileVariant.expandable,
        onPressed = null,
        trailing = null,
        animatedIcon = null,
        labelToggled = null,
        iconPadding = null,
        isToggled = false,
        enabled = true,
        centered = false,
        fullWidth = true,
        circular = false,
        reverseContent = false,
        size = null;

  @override
  Widget build(BuildContext context) {
    if (_variant == _DTListTileVariant.expandable) {
      return _ExpandableDTListTile(tile: this);
    }

    final theme = DTButtonThemeData.of(context);
    final dt = CoporTheme.of(context);

    final style = _styleFor(theme);
    final states = enabled ? const <WidgetState>{} : const {WidgetState.disabled};

    final bgColor = (_variant == _DTListTileVariant.toggle && !isToggled)
        ? Colors.transparent
        : (_variant == _DTListTileVariant.surface && !border)
            ? Colors.transparent
            : (style.backgroundColor?.resolve(states) ?? Colors.transparent);
    final fgColor = style.foregroundColor?.resolve(states) ?? dt.colors.onSurface;
    final iconColor = style.iconColor?.resolve(states) ?? fgColor;
    final borderColor = style.side?.resolve(states)?.color ?? Colors.transparent;
    final hoverColor = style.overlayColor?.resolve({WidgetState.hovered});
    final pressColor = style.overlayColor?.resolve({WidgetState.pressed});

    final effectiveLabel = (_variant == _DTListTileVariant.toggle && isToggled ? labelToggled : null) ?? label;
    final labelContent = labelWidget ?? Text(effectiveLabel, style: dt.text.body.copyWith(color: fgColor));
    final iconWidget = leading
        ?? animatedIcon
        ?? (icon != null ? Icon(icon, size: size ?? _kIconSize, color: iconColor) : null);

    final shape = circular
        ? const StadiumBorder()
        : RoundedRectangleBorder(borderRadius: BorderRadius.circular(coporBorderRadius));

    Widget content = Row(
      mainAxisSize: fullWidth ? MainAxisSize.max : MainAxisSize.min,
      mainAxisAlignment: centered ? MainAxisAlignment.center : MainAxisAlignment.start,
      children: reverseContent
          ? [
              Expanded(child: labelContent),
              if (iconWidget != null) ...[
                const SizedBox(width: _kIconLabelSpacing),
                iconWidget,
              ],
              if (trailing != null) ...[
                const SizedBox(width: _kIconLabelSpacing),
                trailing!,
              ],
            ]
          : [
              if (iconWidget != null) ...[
                iconWidget,
                const SizedBox(width: _kIconLabelSpacing),
              ],
              Expanded(child: labelContent),
              if (trailing != null) ...[
                const SizedBox(width: _kIconLabelSpacing),
                trailing!,
              ],
            ],
    );

    final effectivePadding = contentPadding ?? const EdgeInsets.symmetric(horizontal: _kPaddingH, vertical: _kPaddingV);

    Widget tile = DecoratedBox(
      decoration: ShapeDecoration(
        color: bgColor,
        shape: border
            ? shape.copyWith(side: BorderSide(color: borderColor))
            : shape,
      ),
      child: ClipPath(
        clipper: ShapeBorderClipper(shape: shape),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: (enabled && onPressed != null) ? onPressed : null,
            hoverColor: hoverColor,
            splashColor: pressColor,
            highlightColor: Colors.transparent,
            mouseCursor: enabled ? SystemMouseCursors.click : MouseCursor.defer,
            customBorder: shape,
            child: height != null
                ? SizedBox(
                    height: height,
                    child: Padding(
                      padding: effectivePadding.resolve(TextDirection.ltr).copyWith(top: 0, bottom: 0),
                      child: content,
                    ),
                  )
                : Padding(padding: effectivePadding, child: content),
          ),
        ),
      ),
    );

    final accessibilityLabel = semanticLabel ?? tooltip;
    if (accessibilityLabel.isNotEmpty) {
      tile = Semantics(label: accessibilityLabel, button: true, child: tile);
    }

    return tile;
  }

  ButtonStyle _styleFor(DTButtonThemeData theme) => switch (_variant) {
    _DTListTileVariant.primary    => theme.primary,
    _DTListTileVariant.secondary  => theme.secondary,
    _DTListTileVariant.tertiary   => theme.tertiary,
    _DTListTileVariant.positive   => theme.positive,
    _DTListTileVariant.surface    => theme.surface,
    _DTListTileVariant.negative   => theme.negative,
    _DTListTileVariant.floating   => theme.floating,
    _DTListTileVariant.toggle     => isToggled ? theme.primary : theme.surface,
    _DTListTileVariant.expandable => theme.surface,
  };
}

class _ExpandableDTListTile extends HookWidget {
  final DTListTile tile;

  const _ExpandableDTListTile({required this.tile});

  @override
  Widget build(BuildContext context) {
    final internalOpen = useState(false);
    final isControlled = tile.isExpanded != null;
    final isOpen = isControlled ? tile.isExpanded! : internalOpen.value;
    final dc = CoporTheme.of(context).colors;
    final surfaceBg = DTButtonThemeData.of(context).surface.backgroundColor?.resolve(const <WidgetState>{});

    void toggle() {
      if (isControlled) {
        tile.onExpandedChanged?.call(!isOpen);
      } else {
        internalOpen.value = !internalOpen.value;
      }
    }

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        DecoratedBox(
          decoration: BoxDecoration(
            color: tile.border ? surfaceBg : Colors.transparent,
            borderRadius: BorderRadius.circular(coporBorderRadius),
          ),
          child: DTListTile.surface(
            icon: isOpen ? (tile.iconExpanded ?? tile.icon) : tile.icon,
            leading: tile.leading,
            label: tile.label,
            labelWidget: tile.labelWidget,
            semanticLabel: tile.semanticLabel ?? tile.tooltip,
            border: tile.border,
            enabled: !isControlled || tile.onExpandedChanged != null,
            trailing: DTAnimatedChevron(isOpen: isOpen, color: dc.onSurfaceSubtle),
            onPressed: toggle,
          ),
        ),
        if (tile.children.isNotEmpty)
          ClipRect(
            child: AnimatedAlign(
              alignment: Alignment.topCenter,
              heightFactor: isOpen ? 1.0 : 0.0,
              duration: const Duration(milliseconds: 200),
              curve: Curves.easeInOut,
              child: Padding(
                padding: const EdgeInsets.only(left: _kChildIndent),
                child: Column(mainAxisSize: MainAxisSize.min, children: tile.children),
              ),
            ),
          ),
      ],
    );
  }
}
