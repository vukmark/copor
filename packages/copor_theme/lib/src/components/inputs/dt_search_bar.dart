import 'package:copor_theme/src/components/buttons/dt_button.dart';
import 'package:copor_theme/src/components/inputs/dt_input_constants.dart';
import 'package:copor_theme/src/theme/extensions/copor_theme.dart';
import 'package:copor_theme/src/utils/dt_icons.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class DTSearchBar extends HookWidget {
  final String title;
  final TextEditingController controller;
  final ValueChanged<String> onSearchChanged;
  final DTInputSize inputSize;

  const DTSearchBar({
    super.key,
    required this.title,
    required this.controller,
    required this.onSearchChanged,
    this.inputSize = DTInputSize.normal,
  });

  @override
  Widget build(BuildContext context) {
    useListenable(controller);
    final focusNode = useFocusNode();
    final isHovered = useState(false);
    final isFocused = useState(false);
    final dt = CoporTheme.of(context);

    useEffect(() {
      void onFocusChange() => isFocused.value = focusNode.hasFocus;
      focusNode.addListener(onFocusChange);
      return () => focusNode.removeListener(onFocusChange);
    }, [focusNode]);

    final active = isHovered.value || isFocused.value;
    final borderRadius = BorderRadius.circular(kInputBorderRadius);

    return Material(
      type: MaterialType.transparency,
      child: InkWell(
        onTap: () => focusNode.requestFocus(),
        onHover: (hovered) => isHovered.value = hovered,
        mouseCursor: SystemMouseCursors.text,
        borderRadius: borderRadius,
        overlayColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.pressed)) {
            return dt.colors.primaryPressed.withValues(alpha: 0.12);
          }
          return Colors.transparent;
        }),
        child: ConstrainedBox(
          constraints: BoxConstraints(minHeight: inputSize.containerSize, maxHeight: inputSize.containerSize),
          child: Ink(
            decoration: BoxDecoration(
              color: active ? dt.colors.primaryHovered : dt.colors.surfaceContainer,
              border: Border.all(
                color: active ? dt.colors.primaryBorder : dt.colors.outline,
              ),
              borderRadius: borderRadius,
            ),
            padding: const EdgeInsets.only(left: kSearchBarPaddingH, right: 0),
            child: Row(
              children: [
                ExcludeFocus(
                  child: ExcludeSemantics(
                    child: Icon(
                      DTIcons.search,
                      size: inputSize.defaultIconSize.toDouble(),
                      color: dt.colors.onSurfaceSubtle,
                    ),
                  ),
                ),
                const SizedBox(width: kSearchBarIconSpacing),
                Expanded(
                  child: TextField(
                    controller: controller,
                    focusNode: focusNode,
                    onChanged: onSearchChanged,
                    style: dt.text.body,
                    cursorColor: dt.colors.primary,
                    decoration: InputDecoration(
                      hintText: title,
                      hintStyle: dt.text.searchHint,
                      border: InputBorder.none,
                      isDense: true,
                      contentPadding: EdgeInsets.zero,
                    ),
                  ),
                ),
                if (controller.text.isNotEmpty) ...[
                  const SizedBox(width: kSearchBarIconSpacing),
                  Material(
                    type: MaterialType.transparency,
                    child: DTButton.surface(
                      icon: DTIcons.close,
                      label: '',
                      semanticLabel: 'Clear',
                      border: false,
                      size: inputSize.defaultIconSize.toDouble(),
                      onPressed: () {
                        controller.clear();
                        onSearchChanged('');
                      },
                    ),
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}
