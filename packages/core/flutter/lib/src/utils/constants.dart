import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_quill/flutter_quill.dart' show FlutterQuillLocalizations;

export 'package:copor_theme/src/utils/dt_colors.dart' show colorMap, kColorWhite;
export 'package:copor_theme/src/theme/tokens/spacing.dart' show kMobileBreakpoint;

const kColorRed = Color.fromRGBO(230, 25, 75, 1);
const kColorGreen = Color.fromRGBO(60, 180, 75, 1);
const kColorYellow = Color.fromRGBO(255, 225, 25, 1);
const kColorBlue = Color.fromRGBO(0, 130, 200, 1);
const kColorOrange = Color.fromRGBO(245, 130, 48, 1);
const kColorPurple = Color.fromRGBO(145, 30, 180, 1);
const kColorCyan = Color.fromRGBO(70, 240, 240, 1);
const kColorMagenta = Color.fromRGBO(240, 50, 230, 1);
const kColorLime = Color.fromRGBO(210, 245, 60, 1);
const kColorPink = Color.fromRGBO(250, 190, 212, 1);
const kColorTeal = Color.fromRGBO(0, 128, 128, 1);
const kColorLavender = Color.fromRGBO(220, 190, 255, 1);
const kColorBrown = Color.fromRGBO(170, 110, 40, 1);
const kColorBeige = Color.fromRGBO(255, 250, 200, 1);
const kColorMaroon = Color.fromRGBO(128, 0, 0, 1);
const kColorMint = Color.fromRGBO(170, 255, 195, 1);
const kColorOlive = Color.fromRGBO(128, 128, 0, 1);
const kColorApricot = Color.fromRGBO(255, 215, 180, 1);
const kColorNavy = Color.fromRGBO(0, 0, 128, 1);
const kColorGrey = Color.fromRGBO(128, 128, 128, 1);
const kColorBlack = Color.fromRGBO(0, 0, 0, 1);

final Set<Color> kEighteenColorPaletteExclusions = {
  kColorOlive,
  kColorLime,
  kColorPurple,
  kColorApricot,
};

final Set<Color> kNineColorPaletteInclusions = {
  kColorMaroon,
  kColorBlack,
  kColorOrange,
  kColorYellow,
  kColorNavy,
  kColorBlue,
  kColorGrey,
  kColorLavender,
  kColorWhite,
};

final Set<Color> kFiveColorPaletteInclusions = {
  kColorGrey,
  kColorWhite,
  kColorBlue,
  kColorYellow,
  kColorBlack,
};

Map<String, Color> getNamedColorMap(BuildContext context) {
  final translation = context.getState.commonTranslation.ensuredData;

  return {
    translation.COLOR_RED: kColorRed,
    translation.COLOR_GREEN: kColorGreen,
    translation.COLOR_YELLOW: kColorYellow,
    translation.COLOR_BLUE: kColorBlue,
    translation.COLOR_ORANGE: kColorOrange,
    translation.COLOR_PURPLE: kColorPurple,
    translation.COLOR_CYAN: kColorCyan,
    translation.COLOR_MAGENTA: kColorMagenta,
    translation.COLOR_LIME: kColorLime,
    translation.COLOR_PINK: kColorPink,
    translation.COLOR_TEAL: kColorTeal,
    translation.COLOR_LAVENDER: kColorLavender,
    translation.COLOR_BROWN: kColorBrown,
    translation.COLOR_BEIGE: kColorBeige,
    translation.COLOR_MAROON: kColorMaroon,
    translation.COLOR_MINT: kColorMint,
    translation.COLOR_OLIVE: kColorOlive,
    translation.COLOR_APRICOT: kColorApricot,
    translation.COLOR_NAVY: kColorNavy,
    translation.COLOR_GREY: kColorGrey,
    translation.COLOR_WHITE: kColorWhite,
    translation.COLOR_BLACK: kColorBlack,
  };
}

class RoleTypeString {
  static const String user = "USER";
  static const String admin = "ADMIN";
}

const supportedLocales = <Locale>[Locale('en'), Locale('de')];

const localizationsDelegates = <LocalizationsDelegate<dynamic>>[
  GlobalMaterialLocalizations.delegate,
  GlobalWidgetsLocalizations.delegate,
  GlobalCupertinoLocalizations.delegate,
  FlutterQuillLocalizations.delegate,
];

/// DONT DELETE THIS AS IT MIGHT BE PROPOSED TO REMOVE SERVER PICKER PAGE AGAIN
// const String kHardcodedBaseUrl = kReleaseMode
//     ? String.fromEnvironment('API_BASE_URL', defaultValue: 'https://server.example.com')
//     : 'http://localhost:3000';

/// External links shown on the login, help and about pages.
/// Placeholders — replace with your own app's URLs before release.
class AppLinks {
  static const String website = 'https://example.com';
  static const String websiteLabel = 'example.com';
  static const String documentation = 'https://example.com/docs';
  static const String contact = 'https://example.com/contact';
  static const String supportEmail = 'support@example.com';
  static const String legalNotice = 'https://example.com/legal';
  static const String privacyPolicy = 'https://example.com/privacy';
  static const String accountDeletion = 'https://example.com/account-deletion';
}
