import 'package:copor_core/src/bloc/global_blocs/online_status/online_status_cubit.dart';
import 'package:copor_core/src/utils/helper_functions.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

const _kAvatarRadius = 22.0;
const _kItemPaddingV = 13.0;
const _kItemPaddingH = 12.0;
const _kAvatarSpacing = 12.0;
const _kAnimDuration = Duration(milliseconds: 140);

enum _UserListItemVariant { plain, selectable }

class UserListItem extends HookWidget {
  final String fullName;
  final String picture;
  final String? userId;
  final bool isSelected;
  final VoidCallback? onTap;
  final _UserListItemVariant _variant;
  final bool? isActive;

  const UserListItem({
    super.key,
    required this.fullName,
    required this.picture,
    this.userId,
    this.onTap,
    this.isActive,
  }) : isSelected = false,
       _variant = _UserListItemVariant.plain;

  const UserListItem.selectable({
    super.key,
    required this.fullName,
    required this.picture,
    required this.isSelected,
    this.userId,
    this.onTap,
    this.isActive,
  }) : _variant = _UserListItemVariant.selectable;

  @override
  Widget build(BuildContext context) {
    final hovered = useState(false);
    final dc = CoporColors.of(context);
    final dt = CoporTheme.of(context);

    final bgColor = switch (_variant) {
      _UserListItemVariant.selectable when isSelected => dc.primaryContainer,
      _ => hovered.value ? dc.surfaceHovered : Colors.transparent,
    };

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
              _buildAvatar(context, dc, hovered.value),
              const SizedBox(width: _kAvatarSpacing),
              Expanded(
                child: Text(
                  getFullNameWithStatus(fullName, isActive),
                  style: dt.text.body.copyWith(
                    fontWeight: (_variant == _UserListItemVariant.selectable && isSelected)
                        ? FontWeight.w600
                        : FontWeight.w500,
                  ),
                  overflow: TextOverflow.ellipsis,
                  maxLines: 1,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildAvatar(BuildContext context, CoporColors dc, bool hovered) {
    final id = userId;
    final isOnline = (id == null || id.isEmpty)
        ? null
        : context.select<OnlineStatusCubit, bool>((cubit) => cubit.state.contains(id));

    if (_variant == _UserListItemVariant.plain) {
      return DTAvatar.withActivity(
        userFullName: fullName,
        picture: picture,
        radius: _kAvatarRadius,
        hovered: hovered,
        isOnline: isOnline ?? false,
      );
    }

    if (isSelected) {
      return DTAvatar.withAction(
        userFullName: fullName,
        picture: picture,
        radius: _kAvatarRadius,
        hovered: hovered,
        isOnline: isOnline,
        actionIcon: DTIcons.confirm,
        actionIconColor: dc.onSuccessContainer,
        actionBackgroundColor: dc.successContainer,
        actionBorderColor: dc.successBorder,
        hoverIcon: DTIcons.close,
        hoverIconColor: dc.onErrorContainer,
        hoverBackgroundColor: dc.errorContainer,
        hoverBorderColor: dc.errorBorder,
        onAction: onTap,
      );
    }

    return DTAvatar.withAction(
      userFullName: fullName,
      picture: picture,
      radius: _kAvatarRadius,
      hovered: hovered,
      isOnline: isOnline,
      actionIcon: DTIcons.add,
      actionIconColor: dc.primary,
      actionBackgroundColor: dc.primaryContainer,
      actionBorderColor: dc.primaryBorder,
      onAction: onTap,
    );
  }
}
