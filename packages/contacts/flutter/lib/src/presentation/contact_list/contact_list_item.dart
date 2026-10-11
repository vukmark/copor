import 'package:copor_core/src/components/presence_avatar.dart';
import 'package:copor_core/src/utils/helper_functions.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

const _kAvatarRadius = 22.0;
const _kItemPaddingV = 13.0;
const _kItemPaddingH = 12.0;
const _kAvatarSpacing = 12.0;
const _kAnimDuration = Duration(milliseconds: 140);

class ContactListItemWidget extends HookWidget {
  final String userId;
  final String fullName;
  final String imageUrl;
  final bool isSelected;
  final bool? isActive;
  final VoidCallback? onTap;

  const ContactListItemWidget({
    super.key,
    required this.userId,
    required this.fullName,
    required this.imageUrl,
    this.isSelected = false,
    this.isActive,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final hovered = useState(false);
    final dc = CoporColors.of(context);
    final dt = CoporTheme.of(context);

    final bgColor = isSelected
        ? dc.primaryContainer
        : hovered.value
        ? dc.surfaceHovered
        : Colors.transparent;

    return MouseRegion(
      cursor: SystemMouseCursors.click,
      onEnter: (_) => hovered.value = true,
      onExit: (_) => hovered.value = false,
      child: GestureDetector(
        onTap: onTap,
        behavior: HitTestBehavior.opaque,
        child: AnimatedContainer(
          duration: _kAnimDuration,
          curve: Curves.easeOut,
          padding: const EdgeInsets.symmetric(horizontal: _kItemPaddingH, vertical: _kItemPaddingV),
          decoration: BoxDecoration(
            color: bgColor,
            borderRadius: BorderRadius.circular(coporBorderRadius),
          ),
          child: Row(
            children: [
              PresenceAvatar(
                userId: userId,
                userFullName: fullName,
                picture: imageUrl,
                radius: _kAvatarRadius,
              ),
              const SizedBox(width: _kAvatarSpacing),
              Expanded(
                child: Row(
                  children: [
                    Flexible(
                      child: Text(
                        getFullNameWithStatus(fullName, isActive),
                        style: dt.text.body.copyWith(
                          fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                        ),
                        overflow: TextOverflow.ellipsis,
                        maxLines: 1,
                      ),
                    ),
                  ],
                ),
              ),
              if (isSelected) ...[
                const SizedBox(width: 8),
                Icon(PhosphorIconsThin.caretRight, size: 14, color: dc.primary),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
