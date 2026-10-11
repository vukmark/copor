import 'package:copor_theme/src/components/buttons/dt_button.dart';
import 'package:copor_theme/src/theme/extensions/copor_theme.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:flutter/material.dart';

const _kIconBoxSize = 35.0;
const _kIconSize = 15.0;
const _kIconBorderRadius = coporBorderRadius;

class DTEmptyState extends StatelessWidget {
  final IconData icon;
  final String title;
  final String? subtitle;
  final String? ctaLabel;
  final IconData? ctaIcon;
  final VoidCallback? onCta;

  const DTEmptyState({
    super.key,
    required this.icon,
    required this.title,
    this.subtitle,
    this.ctaLabel,
    this.ctaIcon,
    this.onCta,
  });

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          mainAxisSize: MainAxisSize.max,
          children: [
            Container(
              width: _kIconBoxSize,
              height: _kIconBoxSize,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(_kIconBorderRadius),
                border: Border.all(color: dt.colors.outlineSubtle),
              ),
              child: Icon(icon, size: _kIconSize, color: dt.colors.onSurfaceDisabled),
            ),
            const SizedBox(width: 5),
            Flexible(
              child: Text(title, style: dt.text.emptyStateTitle, textAlign: TextAlign.center),
            ),
          ],
        ),
        if (subtitle != null) ...[
          const SizedBox(height: 8),
          Text(subtitle!, style: dt.text.emptyStateBody, textAlign: TextAlign.center),
        ],
        if (ctaLabel != null && onCta != null) ...[
          const SizedBox(height: 20),
          DTButton.primary(label: ctaLabel!, icon: ctaIcon, onPressed: onCta!),
        ],
      ],
    );
  }
}
