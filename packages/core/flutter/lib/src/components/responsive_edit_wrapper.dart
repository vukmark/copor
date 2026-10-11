import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class ResponsiveEditWrapper extends StatelessWidget {
  final Widget child;
  final double? height;

  const ResponsiveEditWrapper({super.key, required this.child, this.height});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final bool isSmallScreen = constraints.maxWidth < kMobileBreakpoint;

        final Widget content = FocusScope(autofocus: true, child: child);

        if (isSmallScreen) {
          return content;
        }

        void onClose() {
          if (Navigator.of(context).canPop()) {
            Navigator.of(context).pop();
          } else {
            goBack();
          }
        }

        return EscapeDismissable(
          onDismiss: onClose,
          child: Focus(
            autofocus: true,
            child: Stack(
              children: [
                Positioned.fill(
                  child: GestureDetector(
                    onTap: onClose,
                    behavior: HitTestBehavior.translucent,
                    child: const ColoredBox(color: Colors.transparent),
                  ),
                ),
                Center(
                  child: Container(
                    constraints: BoxConstraints(maxWidth: 500, maxHeight: height ?? 640),
                    decoration: BoxDecoration(
                      color: Theme.of(context).colorScheme.surfaceContainer,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: Theme.of(context).colorScheme.outline),
                      boxShadow: const [
                        BoxShadow(
                          color: Color.fromARGB(15, 0, 0, 0),
                          blurRadius: 10,
                          spreadRadius: 2.0,
                          offset: Offset(0, 4),
                        ),
                      ],
                    ),
                    child: content,
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
