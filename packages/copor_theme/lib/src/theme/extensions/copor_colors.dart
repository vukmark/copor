import 'package:flutter/material.dart';

/// Context-based accessor — use `CoporColors.of(context).surface` in widgets.
class CoporColors {
  final BuildContext _context;

  const CoporColors.of(BuildContext context) : _context = context;

  CoporColorScheme get _s => Theme.of(_context).extension<CoporColorScheme>()!;

  Color get primary => _s.primary!;
  Color get primaryContainer => _s.primaryContainer!;
  Color get onPrimaryContainer => _s.onPrimaryContainer!;
  Color get onPrimaryContainerSubtle => _s.onPrimaryContainerSubtle!;
  Color get primaryBorder => _s.primaryBorder!;
  Color get primaryHovered => _s.primaryHovered!;
  Color get primaryPressed => _s.primaryPressed!;
  Color get primaryDisabled => _s.primaryDisabled!;

  Color get secondary => _s.secondary!;
  Color get secondaryContainer => _s.secondaryContainer!;
  Color get onSecondaryContainer => _s.onSecondaryContainer!;
  Color get onSecondaryContainerSubtle => _s.onSecondaryContainerSubtle!;
  Color get secondaryBorder => _s.secondaryBorder!;
  Color get secondaryHovered => _s.secondaryHovered!;
  Color get secondaryPressed => _s.secondaryPressed!;
  Color get secondaryDisabled => _s.secondaryDisabled!;

  Color get tertiary => _s.tertiary!;
  Color get tertiaryContainer => _s.tertiaryContainer!;
  Color get onTertiaryContainer => _s.onTertiaryContainer!;
  Color get onTertiaryContainerSubtle => _s.onTertiaryContainerSubtle!;
  Color get tertiaryBorder => _s.tertiaryBorder!;
  Color get tertiaryHovered => _s.tertiaryHovered!;
  Color get tertiaryPressed => _s.tertiaryPressed!;
  Color get tertiaryDisabled => _s.tertiaryDisabled!;

  Color get success => _s.success!;
  Color get successContainer => _s.successContainer!;
  Color get onSuccessContainer => _s.onSuccessContainer!;
  Color get onSuccessContainerSubtle => _s.onSuccessContainerSubtle!;
  Color get successBorder => _s.successBorder!;
  Color get successHovered => _s.successHovered!;
  Color get successPressed => _s.successPressed!;
  Color get successDisabled => _s.successDisabled!;

  Color get error => _s.error!;
  Color get errorContainer => _s.errorContainer!;
  Color get onErrorContainer => _s.onErrorContainer!;
  Color get onErrorContainerSubtle => _s.onErrorContainerSubtle!;
  Color get errorBorder => _s.errorBorder!;
  Color get errorHovered => _s.errorHovered!;
  Color get errorPressed => _s.errorPressed!;
  Color get errorDisabled => _s.errorDisabled!;

  Color get outline => _s.outline!;
  Color get outlineSubtle => _s.outlineSubtle!;
  Color get outlineDisabled => _s.outlineDisabled!;

  Color get shadow => _s.shadow!;
  Color get scrim => _s.scrim!;

  Color get surface => _s.surface!;
  Color get surfaceBackground => _s.surfaceBackground!;
  Color get surfaceContainer => _s.surfaceContainer!;
  Color get surfaceHovered => _s.surfaceHovered!;
  Color get surfacePressed => _s.surfacePressed!;

  Color get onSurface => _s.onSurface!;
  Color get onSurfaceSubtle => _s.onSurfaceSubtle!;
  Color get onSurfaceDisabled => _s.onSurfaceDisabled!;

  Color get white => _s.white!;
  Color get black => _s.black!;
}

@immutable
class CoporColorScheme extends ThemeExtension<CoporColorScheme> {
  // ── Primary ──
  final Color? primary;
  final Color? primaryContainer;
  final Color? onPrimaryContainer;
  final Color? onPrimaryContainerSubtle;
  final Color? primaryBorder;
  final Color? primaryHovered;
  final Color? primaryPressed;
  final Color? primaryDisabled;

  // ── Secondary ──
  final Color? secondary;
  final Color? secondaryContainer;
  final Color? onSecondaryContainer;
  final Color? onSecondaryContainerSubtle;
  final Color? secondaryBorder;
  final Color? secondaryHovered;
  final Color? secondaryPressed;
  final Color? secondaryDisabled;

  // ── Tertiary ──
  final Color? tertiary;
  final Color? tertiaryContainer;
  final Color? onTertiaryContainer;
  final Color? onTertiaryContainerSubtle;
  final Color? tertiaryBorder;
  final Color? tertiaryHovered;
  final Color? tertiaryPressed;
  final Color? tertiaryDisabled;

  // ── Success ──
  final Color? success;
  final Color? successContainer;
  final Color? onSuccessContainer;
  final Color? onSuccessContainerSubtle;
  final Color? successBorder;
  final Color? successHovered;
  final Color? successPressed;
  final Color? successDisabled;

  // ── Error ──
  final Color? error;
  final Color? errorContainer;
  final Color? onErrorContainer;
  final Color? onErrorContainerSubtle;
  final Color? errorBorder;
  final Color? errorHovered;
  final Color? errorPressed;
  final Color? errorDisabled;

  // ── Outline ──
  final Color? outline;
  final Color? outlineSubtle;
  final Color? outlineDisabled;

  // ── Shadow & scrim ──
  final Color? shadow;
  final Color? scrim;

  // ── Surface ──
  final Color? surface;
  final Color? surfaceBackground;
  final Color? surfaceContainer;
  final Color? surfaceHovered;
  final Color? surfacePressed;

  // ── On-surface ──
  final Color? onSurface;
  final Color? onSurfaceSubtle;
  final Color? onSurfaceDisabled;

  // ── Constants ──
  final Color? white;
  final Color? black;

  const CoporColorScheme.light({
    //c2410c (Copor orange)
    this.primary = const Color(0xFFC2410C),
    this.primaryContainer = const Color(0x0DC2410C),
    this.onPrimaryContainer = const Color(0xFF9A3412),
    this.onPrimaryContainerSubtle = const Color(0x999A3412),
    this.primaryBorder = const Color(0x4DC2410C),
    this.primaryHovered = const Color(0x0D9A3412),
    this.primaryPressed = const Color(0x4DC2410C),
    this.primaryDisabled = const Color(0x26C2410C),
    //475569 (slate)
    this.secondary = const Color(0xFF475569),
    this.secondaryContainer = const Color(0x0D475569),
    this.onSecondaryContainer = const Color(0xFF334155),
    this.onSecondaryContainerSubtle = const Color(0x99334155),
    this.secondaryBorder = const Color(0x4D475569),
    this.secondaryHovered = const Color(0x0D334155),
    this.secondaryPressed = const Color(0x4D475569),
    this.secondaryDisabled = const Color(0x26475569),
    //f2713c (logo orange)
    this.tertiary = const Color(0xFFF2713C),
    this.tertiaryContainer = const Color(0x0DF2713C),
    this.onTertiaryContainer = const Color(0xFFC2410C),
    this.onTertiaryContainerSubtle = const Color(0x99C2410C),
    this.tertiaryBorder = const Color(0x4DF2713C),
    this.tertiaryHovered = const Color(0x0DC2410C),
    this.tertiaryPressed = const Color(0x4DF2713C),
    this.tertiaryDisabled = const Color(0x26F2713C),
    //a7c82f
    this.success = const Color(0xFFA7C82F),
    this.successContainer = const Color(0xDA7C82F),
    this.onSuccessContainer = const Color(0xFF86A026),
    this.onSuccessContainerSubtle = const Color(0x9986A026),
    this.successBorder = const Color(0x4DA7C82F),
    this.successHovered = const Color(0xD758C21),
    this.successPressed = const Color(0x4DA7C82F),
    this.successDisabled = const Color(0x26A7C82F),
    //df0100
    this.error = const Color(0xFFDF0100),
    this.errorContainer = const Color(0xDDF0100),
    this.onErrorContainer = const Color(0xFFB20100),
    this.onErrorContainerSubtle = const Color(0x99B20100),
    this.errorBorder = const Color(0x4DDF0100),
    this.errorHovered = const Color(0xDB20100),
    this.errorPressed = const Color(0x4DDF0100),
    this.errorDisabled = const Color(0x26DF0100),

    this.outline = const Color(0xFFE7E5E4),
    this.outlineSubtle = const Color(0xFFF5F5F4),
    this.outlineDisabled = const Color(0xFFFAFAF9),
    this.shadow = const Color(0xFF44403C),
    this.scrim = const Color(0xFF44403C),
    this.surface = const Color(0xFFFFFFFF),
    this.surfaceBackground = const Color(0xFFFAFAF9),
    this.surfaceContainer = const Color(0xFFFAFAF9),
    this.surfaceHovered = const Color(0x0D44403C),
    this.surfacePressed = const Color(0xFFD6D3D1),
    this.onSurface = const Color(0xFF44403C),
    this.onSurfaceSubtle = const Color(0xFF78716C),
    this.onSurfaceDisabled = const Color(0xFFA8A29E),
    this.white = const Color(0xFFFAFAF9),
    this.black = const Color(0xFF44403C),
  });

  const CoporColorScheme.dark({
    //c2410c (Copor orange)
    this.primary = const Color(0xFFFB923C),
    this.primaryContainer = const Color(0x1AFB923C),
    this.onPrimaryContainer = const Color(0xFFFDBA74),
    this.onPrimaryContainerSubtle = const Color(0x99FDBA74),
    this.primaryBorder = const Color(0x4DFB923C),
    this.primaryHovered = const Color(0x0DFDBA74),
    this.primaryPressed = const Color(0x4DFB923C),
    this.primaryDisabled = const Color(0x26FB923C),
    //475569 (slate)
    this.secondary = const Color(0xFF94A3B8),
    this.secondaryContainer = const Color(0x1A94A3B8),
    this.onSecondaryContainer = const Color(0xFFCBD5E1),
    this.onSecondaryContainerSubtle = const Color(0x99CBD5E1),
    this.secondaryBorder = const Color(0x4D94A3B8),
    this.secondaryHovered = const Color(0x0DCBD5E1),
    this.secondaryPressed = const Color(0x4D94A3B8),
    this.secondaryDisabled = const Color(0x2694A3B8),
    //f2713c (logo orange)
    this.tertiary = const Color(0xFFF2713C),
    this.tertiaryContainer = const Color(0x1AF2713C),
    this.onTertiaryContainer = const Color(0xFFFDBA8C),
    this.onTertiaryContainerSubtle = const Color(0x99FDBA8C),
    this.tertiaryBorder = const Color(0x4DF2713C),
    this.tertiaryHovered = const Color(0x0DFDBA8C),
    this.tertiaryPressed = const Color(0x4DF2713C),
    this.tertiaryDisabled = const Color(0x26F2713C),
    //a7c82f
    this.success = const Color(0xFFA7C82F),
    this.successContainer = const Color(0x1AA7C82F),
    this.onSuccessContainer = const Color(0xFF86A026),
    this.onSuccessContainerSubtle = const Color(0x9986A026),
    this.successBorder = const Color(0x4DA7C82F),
    this.successHovered = const Color(0xD758C21),
    this.successPressed = const Color(0x4DA7C82F),
    this.successDisabled = const Color(0x26A7C82F),
    //df0100
    this.error = const Color(0xFFDF0100),
    this.errorContainer = const Color(0x1ADF0100),
    this.onErrorContainer = const Color(0xFFB20100),
    this.onErrorContainerSubtle = const Color(0x99B20100),
    this.errorBorder = const Color(0x4DDF0100),
    this.errorHovered = const Color(0xDB20100),
    this.errorPressed = const Color(0x4DDF0100),
    this.errorDisabled = const Color(0x26DF0100),

    this.outline = const Color(0xFF44403C),
    this.outlineSubtle = const Color(0xFF292524),
    this.outlineDisabled = const Color(0xFF1C1917),
    this.shadow = const Color(0xFF44403C),
    this.scrim = const Color(0xFF44403C),
    this.surface = const Color(0xFF1C1917),
    this.surfaceBackground = const Color(0xFF0C0A09),
    this.surfaceContainer = const Color(0xFF292524),
    this.surfaceHovered = const Color(0x0DFAFAF9),
    this.surfacePressed = const Color(0xFF44403C),
    this.onSurface = const Color(0xFFFAFAF9),
    this.onSurfaceSubtle = const Color(0xFFA8A29E),
    this.onSurfaceDisabled = const Color(0xFF57534E),
    this.white = const Color(0xFFFAFAF9),
    this.black = const Color(0xFF44403C),
  });

  static CoporColorScheme of(BuildContext context) =>
      Theme.of(context).extension<CoporColorScheme>()!;

  @override
  CoporColorScheme copyWith({
    Color? primaryContainer,
    Color? onPrimaryContainer,
    Color? onPrimaryContainerSubtle,
    Color? primaryBorder,
    Color? primaryHovered,
    Color? primaryPressed,
    Color? primaryDisabled,
    Color? secondaryContainer,
    Color? onSecondaryContainer,
    Color? onSecondaryContainerSubtle,
    Color? secondaryBorder,
    Color? secondaryHovered,
    Color? secondaryPressed,
    Color? secondaryDisabled,
    Color? tertiaryContainer,
    Color? onTertiaryContainer,
    Color? onTertiaryContainerSubtle,
    Color? tertiaryBorder,
    Color? tertiaryHovered,
    Color? tertiaryPressed,
    Color? tertiaryDisabled,
    Color? successContainer,
    Color? onSuccessContainer,
    Color? onSuccessContainerSubtle,
    Color? successBorder,
    Color? successHovered,
    Color? successPressed,
    Color? successDisabled,
    Color? errorContainer,
    Color? onErrorContainer,
    Color? onErrorContainerSubtle,
    Color? errorBorder,
    Color? errorHovered,
    Color? errorPressed,
    Color? errorDisabled,
    Color? outline,
    Color? outlineSubtle,
    Color? outlineDisabled,
    Color? shadow,
    Color? scrim,
    Color? surface,
    Color? surfaceBackground,
    Color? surfaceContainer,
    Color? surfaceHovered,
    Color? surfacePressed,
    Color? onSurface,
    Color? onSurfaceSubtle,
    Color? onSurfaceDisabled,
    Color? white,
    Color? black,
  }) {
    return CoporColorScheme.light(
      primaryContainer: primaryContainer ?? this.primaryContainer,
      onPrimaryContainer: onPrimaryContainer ?? this.onPrimaryContainer,
      onPrimaryContainerSubtle: onPrimaryContainerSubtle ?? this.onPrimaryContainerSubtle,
      primaryBorder: primaryBorder ?? this.primaryBorder,
      primaryHovered: primaryHovered ?? this.primaryHovered,
      primaryPressed: primaryPressed ?? this.primaryPressed,
      primaryDisabled: primaryDisabled ?? this.primaryDisabled,
      secondaryContainer: secondaryContainer ?? this.secondaryContainer,
      onSecondaryContainer: onSecondaryContainer ?? this.onSecondaryContainer,
      onSecondaryContainerSubtle: onSecondaryContainerSubtle ?? this.onSecondaryContainerSubtle,
      secondaryBorder: secondaryBorder ?? this.secondaryBorder,
      secondaryHovered: secondaryHovered ?? this.secondaryHovered,
      secondaryPressed: secondaryPressed ?? this.secondaryPressed,
      secondaryDisabled: secondaryDisabled ?? this.secondaryDisabled,
      tertiaryContainer: tertiaryContainer ?? this.tertiaryContainer,
      onTertiaryContainer: onTertiaryContainer ?? this.onTertiaryContainer,
      onTertiaryContainerSubtle: onTertiaryContainerSubtle ?? this.onTertiaryContainerSubtle,
      tertiaryBorder: tertiaryBorder ?? this.tertiaryBorder,
      tertiaryHovered: tertiaryHovered ?? this.tertiaryHovered,
      tertiaryPressed: tertiaryPressed ?? this.tertiaryPressed,
      tertiaryDisabled: tertiaryDisabled ?? this.tertiaryDisabled,
      successContainer: successContainer ?? this.successContainer,
      onSuccessContainer: onSuccessContainer ?? this.onSuccessContainer,
      onSuccessContainerSubtle: onSuccessContainerSubtle ?? this.onSuccessContainerSubtle,
      successBorder: successBorder ?? this.successBorder,
      successHovered: successHovered ?? this.successHovered,
      successPressed: successPressed ?? this.successPressed,
      successDisabled: successDisabled ?? this.successDisabled,
      errorContainer: errorContainer ?? this.errorContainer,
      onErrorContainer: onErrorContainer ?? this.onErrorContainer,
      onErrorContainerSubtle: onErrorContainerSubtle ?? this.onErrorContainerSubtle,
      errorBorder: errorBorder ?? this.errorBorder,
      errorHovered: errorHovered ?? this.errorHovered,
      errorPressed: errorPressed ?? this.errorPressed,
      errorDisabled: errorDisabled ?? this.errorDisabled,
      outline: outline ?? this.outline,
      outlineSubtle: outlineSubtle ?? this.outlineSubtle,
      outlineDisabled: outlineDisabled ?? this.outlineDisabled,
      shadow: shadow ?? this.shadow,
      scrim: scrim ?? this.scrim,
      surface: surface ?? this.surface,
      surfaceBackground: surfaceBackground ?? this.surfaceBackground,
      surfaceContainer: surfaceContainer ?? this.surfaceContainer,
      surfaceHovered: surfaceHovered ?? this.surfaceHovered,
      surfacePressed: surfacePressed ?? this.surfacePressed,
      onSurface: onSurface ?? this.onSurface,
      onSurfaceSubtle: onSurfaceSubtle ?? this.onSurfaceSubtle,
      onSurfaceDisabled: onSurfaceDisabled ?? this.onSurfaceDisabled,
      white: white ?? this.white,
      black: black ?? this.black,
    );
  }

  @override
  CoporColorScheme lerp(ThemeExtension<CoporColorScheme>? other, double t) {
    if (other is! CoporColorScheme) return this;
    return CoporColorScheme.light(
      primaryContainer: Color.lerp(primaryContainer, other.primaryContainer, t),
      onPrimaryContainer: Color.lerp(onPrimaryContainer, other.onPrimaryContainer, t),
      onPrimaryContainerSubtle: Color.lerp(onPrimaryContainerSubtle, other.onPrimaryContainerSubtle, t),
      primaryBorder: Color.lerp(primaryBorder, other.primaryBorder, t),
      primaryHovered: Color.lerp(primaryHovered, other.primaryHovered, t),
      primaryPressed: Color.lerp(primaryPressed, other.primaryPressed, t),
      primaryDisabled: Color.lerp(primaryDisabled, other.primaryDisabled, t),
      secondaryContainer: Color.lerp(secondaryContainer, other.secondaryContainer, t),
      onSecondaryContainer: Color.lerp(onSecondaryContainer, other.onSecondaryContainer, t),
      onSecondaryContainerSubtle: Color.lerp(onSecondaryContainerSubtle, other.onSecondaryContainerSubtle, t),
      secondaryBorder: Color.lerp(secondaryBorder, other.secondaryBorder, t),
      secondaryHovered: Color.lerp(secondaryHovered, other.secondaryHovered, t),
      secondaryPressed: Color.lerp(secondaryPressed, other.secondaryPressed, t),
      secondaryDisabled: Color.lerp(secondaryDisabled, other.secondaryDisabled, t),
      tertiaryContainer: Color.lerp(tertiaryContainer, other.tertiaryContainer, t),
      onTertiaryContainer: Color.lerp(onTertiaryContainer, other.onTertiaryContainer, t),
      onTertiaryContainerSubtle: Color.lerp(onTertiaryContainerSubtle, other.onTertiaryContainerSubtle, t),
      tertiaryBorder: Color.lerp(tertiaryBorder, other.tertiaryBorder, t),
      tertiaryHovered: Color.lerp(tertiaryHovered, other.tertiaryHovered, t),
      tertiaryPressed: Color.lerp(tertiaryPressed, other.tertiaryPressed, t),
      tertiaryDisabled: Color.lerp(tertiaryDisabled, other.tertiaryDisabled, t),
      successContainer: Color.lerp(successContainer, other.successContainer, t),
      onSuccessContainer: Color.lerp(onSuccessContainer, other.onSuccessContainer, t),
      onSuccessContainerSubtle: Color.lerp(onSuccessContainerSubtle, other.onSuccessContainerSubtle, t),
      successBorder: Color.lerp(successBorder, other.successBorder, t),
      successHovered: Color.lerp(successHovered, other.successHovered, t),
      successPressed: Color.lerp(successPressed, other.successPressed, t),
      successDisabled: Color.lerp(successDisabled, other.successDisabled, t),
      errorContainer: Color.lerp(errorContainer, other.errorContainer, t),
      onErrorContainer: Color.lerp(onErrorContainer, other.onErrorContainer, t),
      onErrorContainerSubtle: Color.lerp(onErrorContainerSubtle, other.onErrorContainerSubtle, t),
      errorBorder: Color.lerp(errorBorder, other.errorBorder, t),
      errorHovered: Color.lerp(errorHovered, other.errorHovered, t),
      errorPressed: Color.lerp(errorPressed, other.errorPressed, t),
      errorDisabled: Color.lerp(errorDisabled, other.errorDisabled, t),
      outline: Color.lerp(outline, other.outline, t),
      outlineSubtle: Color.lerp(outlineSubtle, other.outlineSubtle, t),
      outlineDisabled: Color.lerp(outlineDisabled, other.outlineDisabled, t),
      shadow: Color.lerp(shadow, other.shadow, t),
      scrim: Color.lerp(scrim, other.scrim, t),
      surface: Color.lerp(surface, other.surface, t),
      surfaceBackground: Color.lerp(surfaceBackground, other.surfaceBackground, t),
      surfaceContainer: Color.lerp(surfaceContainer, other.surfaceContainer, t),
      surfaceHovered: Color.lerp(surfaceHovered, other.surfaceHovered, t),
      surfacePressed: Color.lerp(surfacePressed, other.surfacePressed, t),
      onSurface: Color.lerp(onSurface, other.onSurface, t),
      onSurfaceSubtle: Color.lerp(onSurfaceSubtle, other.onSurfaceSubtle, t),
      onSurfaceDisabled: Color.lerp(onSurfaceDisabled, other.onSurfaceDisabled, t),
      white: Color.lerp(white, other.white, t),
      black: Color.lerp(black, other.black, t),
    );
  }
}
