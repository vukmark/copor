import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/extensions/copor_text_theme.dart';
import 'package:flutter/material.dart';

const _kButtonPaddingV = 20.0;
const _kButtonAlpha = 0.1;

enum _DTActionFooterVariant { single, dual, delete }

/// A bottom-sheet footer with either one or two full-width action buttons,
/// styled to match the alert dialog action row.
///
/// Use [DTActionFooter.single] for a single neutral/cancel action.
/// Use [DTActionFooter.dual] for a leading (destructive-tinted) + trailing
/// (primary) action pair separated by a vertical divider.
/// Use [DTActionFooter.delete] for a cancel (neutral, left) + delete
/// (destructive, right) pair.
class DTActionFooter extends StatelessWidget {
  final String? _leadingLabel;
  final String _trailingLabel;
  final VoidCallback? _onLeading;
  final VoidCallback _onTrailing;
  final _DTActionFooterVariant _variant;
  final double bottomRadius;
  final bool safeArea;

  const DTActionFooter.single({
    super.key,
    required String label,
    required VoidCallback onPressed,
    this.bottomRadius = 0,
    this.safeArea = true,
  })  : _leadingLabel = null,
        _trailingLabel = label,
        _onLeading = null,
        _onTrailing = onPressed,
        _variant = _DTActionFooterVariant.single;

  const DTActionFooter.dual({
    super.key,
    required String leadingLabel,
    required String trailingLabel,
    required VoidCallback onLeading,
    required VoidCallback onTrailing,
    this.bottomRadius = 0,
    this.safeArea = true,
  })  : _leadingLabel = leadingLabel,
        _trailingLabel = trailingLabel,
        _onLeading = onLeading,
        _onTrailing = onTrailing,
        _variant = _DTActionFooterVariant.dual;

  /// Cancel (neutral, left) + Delete (destructive, right).
  const DTActionFooter.delete({
    super.key,
    required String cancelLabel,
    required String deleteLabel,
    required VoidCallback onCancel,
    required VoidCallback onDelete,
    this.bottomRadius = 0,
    this.safeArea = true,
  })  : _leadingLabel = cancelLabel,
        _trailingLabel = deleteLabel,
        _onLeading = onCancel,
        _onTrailing = onDelete,
        _variant = _DTActionFooterVariant.delete;

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    final labelStyle = CoporTextStyles.of(context).buttonLabel;
    final r = bottomRadius;
    final isDual = _variant == _DTActionFooterVariant.dual;
    final isDelete = _variant == _DTActionFooterVariant.delete;
    final hasTwoButtons = isDual || isDelete;

    Widget row = IntrinsicHeight(
      child: Row(
        children: [
          if (hasTwoButtons) ...[
            Expanded(
              child: TextButton(
                onPressed: _onLeading,
                style: TextButton.styleFrom(
                  foregroundColor: isDual ? dc.onErrorContainer : dc.onSurface,
                  backgroundColor: isDual
                      ? dc.errorContainer.withValues(alpha: _kButtonAlpha)
                      : dc.surfaceContainer,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.only(bottomLeft: Radius.circular(r)),
                  ),
                  padding: const EdgeInsets.symmetric(vertical: _kButtonPaddingV),
                  textStyle: labelStyle,
                ),
                child: Text(_leadingLabel!),
              ),
            ),
            VerticalDivider(width: 1, color: dc.outlineSubtle),
          ],
          Expanded(
            child: TextButton(
              onPressed: _onTrailing,
              style: TextButton.styleFrom(
                foregroundColor: isDual
                    ? dc.onPrimaryContainer
                    : isDelete
                        ? dc.onErrorContainer
                        : dc.onSurface,
                backgroundColor: isDual
                    ? dc.primaryContainer
                    : isDelete
                        ? dc.errorContainer.withValues(alpha: _kButtonAlpha)
                        : dc.surfaceContainer,
                shape: RoundedRectangleBorder(
                  borderRadius: hasTwoButtons
                      ? BorderRadius.only(bottomRight: Radius.circular(r))
                      : BorderRadius.only(
                          bottomLeft: Radius.circular(r),
                          bottomRight: Radius.circular(r),
                        ),
                ),
                padding: const EdgeInsets.symmetric(vertical: _kButtonPaddingV),
                textStyle: labelStyle,
              ),
              child: Text(_trailingLabel),
            ),
          ),
        ],
      ),
    );

    return safeArea ? SafeArea(top: false, child: row) : row;
  }
}
