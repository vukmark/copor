import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class DTBreadcrumbItem {
  final String label;
  final VoidCallback? onTap;

  const DTBreadcrumbItem({required this.label, this.onTap});
}

class DTBreadcrumb extends StatelessWidget {
  final List<DTBreadcrumbItem> items;

  const DTBreadcrumb({super.key, required this.items});

  @override
  Widget build(BuildContext context) {
    final colors = CoporColors.of(context);

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 4),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          for (int i = 0; i < items.length; i++) ...[
            if (i > 0)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 2),
                child: Icon(DTIcons.forward, size: 10, color: colors.onSurfaceSubtle),
              ),
            _DTBreadcrumbItem(label: items[i].label, onTap: items[i].onTap),
          ],
        ],
      ),
    );
  }
}

class _DTBreadcrumbItem extends StatelessWidget {
  final String label;
  final VoidCallback? onTap;

  const _DTBreadcrumbItem({required this.label, this.onTap});

  @override
  Widget build(BuildContext context) {
    final colors = CoporColors.of(context);
    final dt = CoporTextStyles.of(context);
    final isActive = onTap == null;
    final shape = RoundedRectangleBorder(borderRadius: BorderRadius.circular(coporBorderRadius));

    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        customBorder: shape,
        hoverColor: onTap != null ? colors.surfaceHovered : Colors.transparent,
        splashColor: onTap != null ? colors.surfacePressed : Colors.transparent,
        highlightColor: Colors.transparent,
        mouseCursor: onTap != null ? SystemMouseCursors.click : MouseCursor.defer,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
          child: Text(
            label,
            style: dt.body.copyWith(
              color: isActive ? colors.onSurface : colors.onSurfaceSubtle,
              fontWeight: isActive ? FontWeight.w500 : null,
            ),
          ),
        ),
      ),
    );
  }
}
