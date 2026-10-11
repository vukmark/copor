import 'package:copor_theme/src/components/buttons/dt_button.dart';
import 'package:copor_theme/src/theme/extensions/copor_theme.dart';
import 'package:flutter/material.dart';

const _kExtraToolbarHeight = 8.0;
const _kLeadingWidthWithExtra = 210.0;
const _kLeadingWidthDefault = 110.0;
const _kLeadingSpacing = 8.0;
const _kEdgePadding = 16.0;
const _kBorderWidth = 1.0;

TextStyle _kTitleStyle(BuildContext context) {
  final dt = CoporTheme.of(context);
  return dt.text.appBarTitle.copyWith(color: dt.colors.onSurface);
}

class DTModalAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final VoidCallback onBack;
  final VoidCallback onProceed;
  final String cancelLabel;
  final String proceedLabel;
  final Widget? leadingExtra;

  const DTModalAppBar({
    super.key,
    required this.title,
    required this.onBack,
    required this.onProceed,
    required this.cancelLabel,
    required this.proceedLabel,
    this.leadingExtra,
  });

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);

    return AppBar(
      forceMaterialTransparency: true,
      centerTitle: true,
      automaticallyImplyLeading: false,
      toolbarHeight: kToolbarHeight + _kExtraToolbarHeight,
      leadingWidth: leadingExtra != null ? _kLeadingWidthWithExtra : _kLeadingWidthDefault,
      title: Text(title),
      titleTextStyle: _kTitleStyle(context),
      leading: Align(
        alignment: Alignment.centerLeft,
        child: Padding(
          padding: const EdgeInsets.only(left: _kEdgePadding),
          child: leadingExtra != null
              ? Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    DTButton.negative(onPressed: onBack, label: cancelLabel, semanticLabel: cancelLabel),
                    const SizedBox(width: _kLeadingSpacing),
                    leadingExtra!,
                  ],
                )
              : DTButton.negative(onPressed: onBack, label: cancelLabel, semanticLabel: cancelLabel),
        ),
      ),
      actions: [DTButton.primary(onPressed: onProceed, label: proceedLabel, semanticLabel: proceedLabel)],
      actionsPadding: const EdgeInsets.only(right: _kEdgePadding),
      shape: Border(
        bottom: BorderSide(color: dt.colors.outline, width: _kBorderWidth),
      ),
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
