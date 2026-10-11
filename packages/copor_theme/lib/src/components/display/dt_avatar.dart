import 'dart:math';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/extensions/copor_text_theme.dart';
import 'package:copor_theme/src/utils/dt_color_helper.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

const _kOnlineDotColor = Color(0xFF218F29);
const _kActivityDotScale = 0.38;
const _kActivityDotBorder = 1.5;
const _kMinDotRadius = 4.0;
const _kMaxDotRadius = 9.0;
const _kPresenceDotScale = 0.28;
const _kMinPresenceDotRadius = 3.0;
const _kMaxPresenceDotRadius = 6.5;
const _kAvatarBorderWidth = 1.0;

TextStyle _kInitialsStyle(BuildContext context) => CoporTextStyles.of(context).avatarInitials;

enum _DTAvatarVariant { plain, withActivity, withAction }

class DTAvatar extends HookWidget {
  final String userFullName;
  final String picture;
  final double radius;
  final double? fontSize;
  final bool? isActive;
  final bool? isOnline;
  final VoidCallback? onTap;
  final bool hovered;
  final _DTAvatarVariant _variant;
  final IconData? actionIcon;
  final Color? actionIconColor;
  final Color? actionBackgroundColor;
  final Color? actionBorderColor;
  final VoidCallback? onAction;
  final IconData? hoverIcon;
  final Color? hoverIconColor;
  final Color? hoverBackgroundColor;
  final Color? hoverBorderColor;
  final double hoverScale;

  const DTAvatar({
    super.key,
    required this.userFullName,
    required this.picture,
    this.radius = 30,
    this.fontSize,
    this.onTap,
    this.hovered = false,
  }) : _variant = _DTAvatarVariant.plain,
       isActive = null,
       isOnline = null,
       actionIcon = null,
       actionIconColor = null,
       actionBackgroundColor = null,
       onAction = null,
       actionBorderColor = null,
       hoverIcon = null,
       hoverIconColor = null,
       hoverBackgroundColor = null,
       hoverBorderColor = null,
       hoverScale = 1.35;

  const DTAvatar.withActivity({
    super.key,
    required this.userFullName,
    required this.picture,
    this.radius = 30,
    this.fontSize,
    this.isActive = false,
    this.isOnline = false,
    this.onTap,
    this.hovered = false,
  }) : _variant = _DTAvatarVariant.withActivity,
       actionIcon = null,
       actionIconColor = null,
       actionBackgroundColor = null,
       actionBorderColor = null,
       onAction = null,
       hoverIcon = null,
       hoverIconColor = null,
       hoverBackgroundColor = null,
       hoverBorderColor = null,
       hoverScale = 1.35;

  const DTAvatar.withAction({
    super.key,
    required this.userFullName,
    required this.picture,
    required this.actionIcon,
    this.actionIconColor,
    required this.actionBackgroundColor,
    this.actionBorderColor,
    this.onAction,
    this.hoverIcon,
    this.hoverIconColor,
    this.hoverBackgroundColor,
    this.hoverBorderColor,
    this.hoverScale = 1,
    this.radius = 30,
    this.fontSize,
    this.onTap,
    this.hovered = false,
    this.isActive,
    this.isOnline,
  }) : _variant = _DTAvatarVariant.withAction;

  @override
  Widget build(BuildContext context) {
    final isHovered = useState(false);
    final dc = CoporColors.of(context);
    final avatarWidget = _buildAvatar(context, dc, isHovered);

    if (_variant == _DTAvatarVariant.withAction) {
      final isActionHovered = useState(false);
      final dotRadius = (radius * _kActivityDotScale).clamp(_kMinDotRadius, _kMaxDotRadius);
      final activeDotRadius = dotRadius * hoverScale;
      final hovering = isActionHovered.value || hovered;
      final currentDotRadius = hovering ? activeDotRadius : dotRadius;
      final currentIcon = (hovering && hoverIcon != null) ? hoverIcon! : actionIcon!;
      final currentIconColor = (hovering && hoverIconColor != null)
          ? hoverIconColor!
          : (actionIconColor ?? dc.surface);
      final currentBadgeColor = (hovering && hoverBackgroundColor != null)
          ? hoverBackgroundColor!
          : actionBackgroundColor!;
      final currentBorderColor = (hovering && hoverBorderColor != null)
          ? hoverBorderColor!
          : (actionBorderColor ?? dc.surface);
      final dotEdgeOffset = max(0.0, radius * (1 - 1 / sqrt2) - currentDotRadius);
      final presenceDotRadius = (radius * _kPresenceDotScale).clamp(
        _kMinPresenceDotRadius,
        _kMaxPresenceDotRadius,
      );
      final presenceDotEdgeOffset = max(0.0, radius * (1 - 1 / sqrt2) - presenceDotRadius);
      final presenceDotColor = (isOnline ?? false) ? _kOnlineDotColor : dc.onSurfaceSubtle;
      final presenceDotBorder = (isOnline ?? false) ? dc.successBorder : dc.outline;

      return MouseRegion(
        cursor: SystemMouseCursors.click,
        onEnter: (_) => isActionHovered.value = true,
        onExit: (_) => isActionHovered.value = false,
        child: GestureDetector(
          onTap: onAction,
          child: SizedBox(
            width: radius * 2,
            height: radius * 2,
            child: Stack(
              clipBehavior: Clip.none,
              children: [
                Positioned.fill(child: avatarWidget),
                if (isOnline != null)
                  Positioned(
                    bottom: presenceDotEdgeOffset,
                    right: presenceDotEdgeOffset,
                    child: Container(
                      width: presenceDotRadius * 2,
                      height: presenceDotRadius * 2,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: presenceDotColor,
                        border: Border.all(color: presenceDotBorder, width: _kActivityDotBorder),
                      ),
                    ),
                  ),
                Positioned(
                  top: dotEdgeOffset,
                  right: dotEdgeOffset,
                  child: Container(
                    width: currentDotRadius * 2,
                    height: currentDotRadius * 2,
                    decoration: BoxDecoration(shape: BoxShape.circle, color: dc.surface),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 150),
                      curve: Curves.easeOut,
                      width: currentDotRadius * 2,
                      height: currentDotRadius * 2,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: currentBadgeColor,
                        border: Border.all(color: currentBorderColor, width: _kActivityDotBorder),
                      ),
                      child: Icon(
                        currentIcon,
                        size: currentDotRadius * 0.9,
                        color: currentIconColor,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      );
    }

    if (_variant == _DTAvatarVariant.withActivity) {
      final dotRadius = (radius * _kPresenceDotScale).clamp(
        _kMinPresenceDotRadius,
        _kMaxPresenceDotRadius,
      );
      final dotColor = (isOnline ?? false) ? _kOnlineDotColor : dc.onSurfaceSubtle;
      final dotBorder = (isOnline ?? false) ? dc.successBorder : dc.outline;
      final dotEdgeOffset = max(0.0, radius * (1 - 1 / sqrt2) - dotRadius);
      return SizedBox(
        width: radius * 2,
        height: radius * 2,
        child: Stack(
          children: [
            Positioned(top: 0, right: 0, left: 0, bottom: 0, child: avatarWidget),
            Positioned(
              bottom: dotEdgeOffset,
              right: dotEdgeOffset,
              child: Container(
                width: dotRadius * 2,
                height: dotRadius * 2,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: dotColor,
                  border: Border.all(color: dotBorder, width: _kActivityDotBorder),
                ),
              ),
            ),
          ],
        ),
      );
    }

    return avatarWidget;
  }

  Widget _buildAvatar(BuildContext context, CoporColors dc, ValueNotifier<bool> isHovered) {
    final initialsStyle = _kInitialsStyle(context);
    final showHover = isHovered.value || hovered;
    final imageError = useState(false);
    useEffect(() {
      imageError.value = false;
      return null;
    }, [picture]);

    final initials = _getInitials(userFullName);
    final showInitials = picture.isEmpty || imageError.value;
    final backgroundColor = showInitials ? getColorBy(initials, context) : dc.surface;

    final circle = Container(
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(
          color: showHover ? dc.primaryBorder : dc.outline,
          width: _kAvatarBorderWidth,
        ),
      ),
      foregroundDecoration: showHover
          ? BoxDecoration(
              shape: BoxShape.circle,
              color: dc.primaryContainer.withValues(alpha: 0.08),
            )
          : null,
      child: CircleAvatar(
        radius: radius,
        backgroundColor: backgroundColor,
        backgroundImage: showInitials ? null : _pictureProvider(context),
        onBackgroundImageError: showInitials
            ? null
            : (_, _) {
                WidgetsBinding.instance.addPostFrameCallback((_) => imageError.value = true);
              },
        child: showInitials
            ? Text(
                initials,
                style: initialsStyle.copyWith(
                  color: avatarInitialsColor(backgroundColor, context),
                  fontSize: fontSize ?? radius * 0.55,
                ),
              )
            : null,
      ),
    );

    if (onTap == null) return circle;

    return MouseRegion(
      cursor: SystemMouseCursors.click,
      onEnter: (_) => isHovered.value = true,
      onExit: (_) => isHovered.value = false,
      child: GestureDetector(onTap: onTap, child: circle),
    );
  }

  ImageProvider _pictureProvider(BuildContext context) {
    final cacheWidth = (radius * 2 * MediaQuery.devicePixelRatioOf(context)).round();
    final ImageProvider source = kIsWeb
        ? NetworkImage(picture)
        : CachedNetworkImageProvider(picture);

    return ResizeImage(source, width: cacheWidth);
  }

  String _getInitials(String name) {
    final parts = name.split(' ').where((part) => part.isNotEmpty).toList();
    if (parts.length > 1) {
      return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    } else if (parts.isNotEmpty) {
      return parts[0][0].toUpperCase();
    }
    return '?';
  }
}
