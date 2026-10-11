import 'dart:math';

import 'package:copor_core/src/data/model/user_picker/user_picker_item_model.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

const _kAvatarRadius = 22.0;
const _kSlotCount = 8;

/// A horizontal scrollable row of the users picked in a `UserPickerList`, with
/// [_PlusChip] placeholders for unfilled slots. Tapping an avatar's action
/// calls [onRemove].
///
/// [leading] is an optional fixed non-removable widget shown before the slots
/// (e.g. the current user's avatar).
class SelectedUsersRow extends HookWidget {
  final List<UserPickerItemModel> users;
  final void Function(UserPickerItemModel) onRemove;
  final Widget? leading;

  const SelectedUsersRow({super.key, required this.users, required this.onRemove, this.leading});

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    final scrollController = useScrollController();
    final prevLength = useRef(users.length);

    useEffect(() {
      final prev = prevLength.value;
      prevLength.value = users.length;
      if (users.length <= prev) return null;
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (scrollController.hasClients) {
          scrollController.animateTo(
            scrollController.position.maxScrollExtent,
            duration: const Duration(milliseconds: 200),
            curve: Curves.easeOut,
          );
        }
      });
      return null;
    }, [users.length]);

    return LayoutBuilder(
      builder: (context, constraints) {
        const itemWidth = _kAvatarRadius * 2 + 8.0;
        final viewWidth = constraints.maxWidth.isFinite
            ? constraints.maxWidth
            : MediaQuery.sizeOf(context).width;
        final leadingWidth = leading != null ? itemWidth : 0.0;
        // Available width minus scroll view horizontal padding
        final remaining = viewWidth - 16 - leadingWidth - users.length * itemWidth;
        final maxChips = _kSlotCount - users.length;
        final chipsToShow = maxChips > 0
            ? min(maxChips, max(0, (remaining / itemWidth).floor()))
            : 0;

        return Scrollbar(
          controller: scrollController,
          thumbVisibility: true,
          child: SingleChildScrollView(
            controller: scrollController,
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
            child: Row(
              children: [
                if (leading != null)
                  Padding(padding: const EdgeInsets.only(right: 8), child: leading!),
                ...List.generate(users.length, (i) {
                  final user = users[i];
                  return Padding(
                    key: ValueKey(user.id),
                    padding: const EdgeInsets.only(right: 8),
                    child: DTAvatar.withAction(
                      userFullName: user.fullName,
                      picture: user.picture,
                      radius: _kAvatarRadius,
                      actionIcon: DTIcons.close,
                      hoverScale: 1.1,
                      actionBackgroundColor: dc.errorContainer,
                      actionIconColor: dc.onErrorContainer,
                      actionBorderColor: dc.errorBorder,
                      onAction: () => onRemove(user),
                    ),
                  );
                }),
                ...List.generate(chipsToShow, (i) {
                  final opacity = switch (i) {
                    0 => 1.0,
                    1 => 0.7,
                    _ => 0.3,
                  };
                  return _PlusChip(key: ValueKey('empty_${users.length + i}'), opacity: opacity);
                }),
              ],
            ),
          ),
        );
      },
    );
  }
}

class _PlusChip extends StatelessWidget {
  final double opacity;

  const _PlusChip({super.key, this.opacity = 1.0});

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    const containerSize = _kAvatarRadius * 2;
    const circleSize = 36.0 * 0.52;
    const iconSize = 36.0 * 0.24;

    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: Opacity(
        opacity: opacity,
        child: SizedBox(
          width: containerSize,
          height: containerSize,
          child: Stack(
            alignment: Alignment.center,
            children: [
              Container(
                width: circleSize,
                height: circleSize,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: dc.primaryContainer,
                  border: Border.all(color: dc.primaryBorder, width: 1),
                ),
              ),
              Icon(DTIcons.add, size: iconSize, color: dc.onPrimaryContainerSubtle),
            ],
          ),
        ),
      ),
    );
  }
}
