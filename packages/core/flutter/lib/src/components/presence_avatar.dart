import 'package:copor_core/src/bloc/global_blocs/online_status/online_status_cubit.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class PresenceAvatar extends StatelessWidget {
  final String? userId;
  final String userFullName;
  final String picture;
  final double radius;
  final double? fontSize;
  final VoidCallback? onTap;
  final bool hovered;

  const PresenceAvatar({
    super.key,
    required this.userId,
    required this.userFullName,
    required this.picture,
    this.radius = 30,
    this.fontSize,
    this.onTap,
    this.hovered = false,
  });

  @override
  Widget build(BuildContext context) {
    final id = userId;
    if (id == null || id.isEmpty) {
      return DTAvatar(
        userFullName: userFullName,
        picture: picture,
        radius: radius,
        fontSize: fontSize,
        onTap: onTap,
        hovered: hovered,
      );
    }

    return BlocSelector<OnlineStatusCubit, Set<String>, bool>(
      selector: (onlineUserIds) => onlineUserIds.contains(id),
      builder: (context, isOnline) => DTAvatar.withActivity(
        userFullName: userFullName,
        picture: picture,
        radius: radius,
        fontSize: fontSize,
        isOnline: isOnline,
        onTap: onTap,
        hovered: hovered,
      ),
    );
  }
}
