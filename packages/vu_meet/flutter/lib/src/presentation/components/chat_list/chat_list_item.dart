import 'package:copor_core/src/components/presence_avatar.dart';
import 'package:copor_vu_meet/src/data/model/chat_list/chat_list_model.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_vu_meet/src/helpers/chat_display_name.dart';
import 'package:copor_core/src/utils/date_formatter.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

const _kAvatarRadius = 22.0;
const _kItemPaddingV = 13.0;
const _kItemPaddingH = 12.0;
const _kAvatarSpacing = 12.0;
const _kAnimDuration = Duration(milliseconds: 140);

class ChatListItem extends HookWidget {
  final bool isSelected;
  final ChatListItemModel chatItem;
  final bool isTyping;
  final VuMeetPageTranslation translation;
  final VoidCallback onTap;

  const ChatListItem({
    super.key,
    required this.isSelected,
    required this.chatItem,
    this.isTyping = false,
    required this.translation,
    required this.onTap,
  });

  bool get _hasUnread => chatItem.numberOfUnseenMessages > 0;

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

    final displayName = chatDisplayName(
      name: chatItem.name,
      isPrivate: chatItem.isPrivate,
      translation: translation,
      isActive: chatItem.isActive,
    );

    final resolvedName = chatItem.isPrivate || chatItem.name.trim().isNotEmpty
        ? chatItem.name
        : translation.UNNAMED_GROUP_CHAT;

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
              chatItem.isPrivate
                  ? PresenceAvatar(
                      userId: chatItem.otherUserId,
                      userFullName: resolvedName,
                      picture: chatItem.picture,
                      radius: _kAvatarRadius,
                    )
                  : DTAvatar(
                      userFullName: resolvedName,
                      picture: chatItem.picture,
                      radius: _kAvatarRadius,
                    ),
              const SizedBox(width: _kAvatarSpacing),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      displayName,
                      style: dt.text.body.copyWith(
                        fontWeight: _hasUnread ? FontWeight.w700 : FontWeight.w500,
                      ),
                      overflow: TextOverflow.ellipsis,
                      maxLines: 1,
                    ),
                    const SizedBox(height: 2),
                    Text(
                      chatItem.lastMessage,
                      style: isTyping
                          ? dt.text.bodySecondary.copyWith(
                              fontStyle: FontStyle.italic,
                              fontWeight: FontWeight.w600,
                              color: dc.primary,
                            )
                          : dt.text.bodySecondary.copyWith(
                              fontWeight: _hasUnread ? FontWeight.w600 : FontWeight.w400,
                            ),
                      overflow: TextOverflow.ellipsis,
                      maxLines: 1,
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    formatDisplayDateString(chatItem.createdAt),
                    style: dt.text.bodySecondary.copyWith(
                      color: _hasUnread ? dc.primary : dc.onSurfaceSubtle,
                      fontWeight: _hasUnread ? FontWeight.w600 : FontWeight.w400,
                    ),
                  ),
                  const SizedBox(height: 4),
                  DTBadge(count: chatItem.numberOfUnseenMessages),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
