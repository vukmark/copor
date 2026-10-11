import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

/// The app logo (`assets/logo-solo-cropped.svg`). Its strokes are drawn in the
/// theme's text colour (the SVG uses `currentColor`), so the logo stays visible
/// on light and dark backgrounds; the blade keeps its own colour.
class AppLogoSvg extends StatelessWidget {
  final double? height;
  final double? width;
  final BoxFit fit;

  const AppLogoSvg({super.key, this.height, this.width, this.fit = BoxFit.contain});

  @override
  Widget build(BuildContext context) {
    return SvgPicture.asset(
      'assets/logo-solo-cropped.svg',
      height: height,
      width: width,
      fit: fit,
      theme: SvgTheme(currentColor: Theme.of(context).colorScheme.onSurface),
    );
  }
}

class AppLogo extends StatelessWidget {
  final double height;
  final double width;

  const AppLogo({super.key, this.height = 50.0, this.width = 120.0});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: SizedBox(
        height: height,
        width: width,
        child: const AppLogoSvg(),
      ),
    );
  }
}
