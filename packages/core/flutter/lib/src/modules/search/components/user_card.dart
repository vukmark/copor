import 'package:copor_core/src/components/presence_avatar.dart';
import 'package:copor_core/src/modules/search/data/model/user_model.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class UserCard extends StatelessWidget {
  final User user;
  final String highlight;
  final VoidCallback? onTap;

  const UserCard({
    super.key,
    required this.user,
    required this.highlight,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    final dc = CoporColors.of(context);

    return DTCard.tap(
      onTap: onTap ?? () {},
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        child: Row(
          children: [
            PresenceAvatar(
              userId: user.id,
              userFullName: user.fullName,
              picture: user.picture,
              radius: 22,
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(user.fullName, style: dt.text.bodyStrong),
                  const SizedBox(height: 2),
                  Text(
                    user.role,
                    style: dt.text.body.copyWith(color: dc.onSurfaceSubtle),
                    overflow: TextOverflow.ellipsis,
                    maxLines: 1,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
