import 'package:cached_network_image/cached_network_image.dart';
import 'package:cached_network_image_platform_interface/cached_network_image_platform_interface.dart';
import 'package:flutter/material.dart';
import 'package:copor_theme/copor_theme.dart';

class CoporAvatar extends StatelessWidget {
  final String userFullName;
  final String picture;
  final double radius;
  final double? fontSize;

  const CoporAvatar({
    super.key,
    required this.userFullName,
    required this.picture,
    this.radius = 30,
    this.fontSize,
  });

  @override
  Widget build(BuildContext context) {
    final initials = _getInitials(userFullName);
    final backgroundColor = getColorBy(initials, context);

    return CircleAvatar(
      radius: radius,
      backgroundColor: backgroundColor,
      backgroundImage: ResizeImage(
        CachedNetworkImageProvider(
          picture,
          imageRenderMethodForWeb: ImageRenderMethodForWeb.HttpGet,
        ),
        width: (radius * 2 * MediaQuery.devicePixelRatioOf(context)).round(),
      ),
      onBackgroundImageError: (_, _) {},
      child: (picture == '')
          ? Text(
              initials,
              style: TextStyle(
                color: avatarInitialsColor(backgroundColor, context),
                fontWeight: FontWeight.bold,
                fontSize: fontSize,
              ),
            )
          : null,
    );
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
