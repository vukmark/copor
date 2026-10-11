import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:flutter/material.dart';

enum _DTDividerVariant { normal, subtle, vertical }

enum DTDividerAlignment { center, asymmetricTop, asymmetricBottom }

class DTDivider extends StatelessWidget {
  final double height;
  final DTDividerAlignment alignment;
  final double padding;
  final _DTDividerVariant _variant;

  const DTDivider({
    super.key,
    this.height = 30,
    this.alignment = DTDividerAlignment.center,
  })  : _variant = _DTDividerVariant.normal,
        padding = 0;

  const DTDivider.subtle({
    super.key,
    this.height = 30,
    this.alignment = DTDividerAlignment.center,
  })  : _variant = _DTDividerVariant.subtle,
        padding = 0;

  /// A 1px vertical rule for use inside a [Row].
  /// [height] controls how tall the line is — defaults to [coporInputLarge].
  /// [padding] adds horizontal space on both sides of the line.
  const DTDivider.vertical({
    super.key,
    this.height = coporInputLarge,
    this.padding = 0,
  })  : _variant = _DTDividerVariant.vertical,
        alignment = DTDividerAlignment.center;

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);

    if (_variant == _DTDividerVariant.vertical) {
      final line = Container(width: 1, height: height, color: dc.outlineSubtle);
      if (padding == 0) return line;
      return Padding(
        padding: EdgeInsets.symmetric(horizontal: padding),
        child: line,
      );
    }

    final color = _variant == _DTDividerVariant.subtle ? dc.outlineSubtle : dc.outline;

    final double topSpace = switch (alignment) {
      DTDividerAlignment.center => height / 2,
      DTDividerAlignment.asymmetricTop => height / 3,
      DTDividerAlignment.asymmetricBottom => height * 2 / 3,
    };
    final double bottomSpace = height - topSpace;

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        SizedBox(height: topSpace),
        Container(height: 0.5, color: color),
        SizedBox(height: bottomSpace),
      ],
    );
  }
}
