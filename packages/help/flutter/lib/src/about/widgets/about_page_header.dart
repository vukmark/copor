import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:copor_core/src/components/app_logo.dart';

const _kWavingDotsOpacity = 0.6;
const _kWavingDotsOffsetX = 10.0;
const _kWavingDotsOffsetY = 0.0;
const _kWavingDotsOffsetYMobile = 0.0;

const _kLogoHeight = 100.0;
const _kLogoHeightMobile = 60.0;
const _kDotsHeight = 120.0;
const _kDotsHeightMobile = 80.0;

class AboutPageHeader extends StatelessWidget {
  const AboutPageHeader({super.key});

  @override
  Widget build(BuildContext context) {
    final isMobile = context.isMobile;
    final logoHeight = isMobile ? _kLogoHeightMobile : _kLogoHeight;
    final dotsHeight = isMobile ? _kDotsHeightMobile : _kDotsHeight;

    return Stack(
      children: [
        Opacity(
          opacity: _kWavingDotsOpacity,
          child: Transform.translate(
            offset: Offset(
              _kWavingDotsOffsetX,
              isMobile ? _kWavingDotsOffsetYMobile : _kWavingDotsOffsetY,
            ),
            child: DTWavingDots(height: dotsHeight),
          ),
        ),
        Center(child: AppLogoSvg(height: logoHeight)),
      ],
    );
  }
}
