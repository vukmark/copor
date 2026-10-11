import 'package:cached_network_image/cached_network_image.dart';
import 'package:cached_network_image_platform_interface/cached_network_image_platform_interface.dart';
import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

Future enlargeImage(
  BuildContext context,
  MyAccountPageTranslation translation,
  String initials,
  String picture,
  String heroTag,
) {
  return Navigator.of(context, rootNavigator: true).push(
    PageRouteBuilder(
      opaque: false,
      barrierColor: Colors.transparent,
      barrierDismissible: true,
      pageBuilder: (context, animation, secondaryAnimation) {
        return EnlargeImage(
          translation: translation,
          initials: initials,
          picture: picture,
          heroTag: heroTag,
        );
      },
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        return child;
      },
    ),
  );
}

class EnlargeImage extends StatelessWidget {
  final MyAccountPageTranslation translation;
  final String initials;
  final String picture;
  final String heroTag;

  const EnlargeImage({
    super.key,
    required this.translation,
    required this.initials,
    required this.picture,
    required this.heroTag,
  });

  @override
  Widget build(BuildContext context) {
    final hasImage = picture.isNotEmpty;

    return GestureDetector(
      onTap: () => Navigator.of(context, rootNavigator: true).pop(),
      child: Center(
        child: Hero(
          tag: heroTag,
          child: ClipOval(
            child: SizedBox(
              width: 300,
              height: 300,
              child: InteractiveViewer(
                child: hasImage
                    ? Image(
                        image: CachedNetworkImageProvider(
                          picture,
                          imageRenderMethodForWeb: ImageRenderMethodForWeb.HttpGet,
                        ),
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) {
                          return _buildFallbackAvatar(initials, context);
                        },
                      )
                    : _buildFallbackAvatar(initials, context),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildFallbackAvatar(String initials, BuildContext context) {
    final backgroundColor = getColorBy(initials, context);

    return CircleAvatar(
      radius: 80,
      backgroundColor: backgroundColor,
      child: Text(
        initials,
        style: TextStyle(fontSize: 40, color: avatarInitialsColor(backgroundColor, context)),
      ),
    );
  }
}
