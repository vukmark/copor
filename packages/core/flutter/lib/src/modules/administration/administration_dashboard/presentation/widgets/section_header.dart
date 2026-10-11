import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class SectionHeader extends StatelessWidget {
  final String title;

  const SectionHeader({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    final textStyle = CoporTextStyles.of(context).sectionTitle;
    final lineColor = CoporColors.of(context).outline;

    Widget line({bool reverse = false}) {
      return Expanded(
        child: Container(
          height: 1,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: reverse ? Alignment.centerRight : Alignment.centerLeft,
              end: reverse ? Alignment.centerLeft : Alignment.centerRight,
              colors: [lineColor.withValues(alpha: 0), lineColor, lineColor],
              stops: const [0, 0.3, 1],
            ),
          ),
        ),
      );
    }

    return Column(
      crossAxisAlignment: context.isMobile ? CrossAxisAlignment.start : CrossAxisAlignment.center,
      children: [
        SizedBox(
          width: double.infinity,
          child: context.isMobile
              ? Row(
                  children: [
                    Text(title, style: textStyle),
                    const SizedBox(width: 12),
                    const SizedBox(width: 12),
                    line(),
                  ],
                )
              : Row(
                  children: [
                    line(reverse: true),
                    Text(title, style: textStyle, textAlign: TextAlign.center),
                    line(),
                  ],
                ),
        ),
        const SizedBox(height: 20),
      ],
    );
  }
}
