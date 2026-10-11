import 'package:cached_network_image/cached_network_image.dart';
import 'package:cached_network_image_platform_interface/cached_network_image_platform_interface.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/utils/global_keys.dart';
import 'package:flutter/material.dart';

class CoporFloatingContainer extends StatelessWidget {
  final String? backgroundPath;
  final Widget child;
  final double? width;
  final double? maxHeight;
  final bool? hasScroll;
  final bool? isActivationForm;

  const CoporFloatingContainer({
    super.key,
    this.backgroundPath,
    required this.child,
    this.width = 440,
    this.maxHeight,
    this.hasScroll,
    this.isActivationForm,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      behavior: HitTestBehavior.translucent,
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Stack(
        children: [
          if (backgroundPath != null) _BackgroundImage(backgroundPath),
          Center(
            child: _FloatingContainer(
              width: width,
              maxHeight: maxHeight,
              hasScroll: hasScroll,
              isActivationForm: isActivationForm,
              child: child,
            ),
          ),
        ],
      ),
    );
  }
}

class _BackgroundImage extends StatelessWidget {
  final String? backgroundPath;

  const _BackgroundImage(this.backgroundPath);

  @override
  Widget build(BuildContext context) {
    final baseUrl = context.config.serverUrl;
    return Opacity(
      key: const ValueKey(GlobalKeys.floatingContainerBackgroundImage),
      opacity: 0.1,
      child: CachedNetworkImage(
        imageRenderMethodForWeb: ImageRenderMethodForWeb.HttpGet,
        height: double.infinity,
        fit: BoxFit.cover,
        width: double.infinity,
        imageUrl: '$baseUrl$backgroundPath',
      ),
    );
  }
}

class _FloatingContainer extends StatelessWidget {
  final Widget child;
  final double? width;
  final double? maxHeight;
  final bool? hasScroll;
  final bool? isActivationForm;

  const _FloatingContainer({
    required this.child,
    this.width,
    this.maxHeight,
    this.hasScroll,
    this.isActivationForm,
  });

  @override
  Widget build(BuildContext context) {
    final bool wideLayout = !context.isMobile;

    return Container(
      key: const ValueKey(GlobalKeys.floatingContainer),
      constraints: BoxConstraints(maxHeight: maxHeight ?? double.infinity),
      width: wideLayout ? width : double.infinity,
      padding: EdgeInsets.only(
        left: isActivationForm == true ? 4 : 20,
        right: hasScroll == true ? 4 : 20,
        top: wideLayout ? 20 : 10,
        bottom: wideLayout ? 20 : 10,
      ),
      decoration: BoxDecoration(
        boxShadow: wideLayout
            ? [
                BoxShadow(
                  color: Theme.of(context).colorScheme.surfaceContainerHigh,
                  blurRadius: 8,
                  spreadRadius: 0,
                  offset: const Offset(0, 0),
                ),
              ]
            : null,
        color: wideLayout ? Theme.of(context).colorScheme.surfaceContainer : Colors.transparent,
        borderRadius: BorderRadius.circular(5),
        border: Border.all(
          width: 0,
          color: wideLayout ? Theme.of(context).colorScheme.outlineVariant : Colors.transparent,
        ),
      ),
      clipBehavior: Clip.hardEdge,
      child: child,
    );
  }
}
