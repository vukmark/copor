import 'package:copor_core/src/bloc/global_blocs/app_scaffold_bloc/app_scaffold_cubit.dart';
import 'package:copor_core/src/bloc/utils/form_save_trigger_cubit.dart';
import 'package:copor_core/src/components/scaffold/app_appbar/app_bar_styled_title.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/data/model/phoneNumber/phone_number_type_enum.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/error/response_code.dart';
import 'package:copor_core/src/modules/my_account/data/model/translation/my_account_translation.dart';
import 'package:copor_theme/copor_theme.dart' show formatISODate;
export 'package:copor_theme/copor_theme.dart' show isValidEmail, isValidDoubleNumber, formatISODate;
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_bloc.dart';
import 'package:copor_core/src/modules/my_account/bloc/my_account_info/account_info_bloc.dart';
import 'package:copor_core/src/components/buttons/copor_button.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/utils/constants.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

/// For example: 'almostDone' -> 'ALMOST_DONE'
String camelCaseToUpperSnakeCase(String input) {
  if (input.isEmpty) {
    return '';
  }
  final withUnderscores = input.replaceAllMapped(RegExp(r'[A-Z]'), (match) {
    return '_${match.group(0)}';
  });

  return withUnderscores.toUpperCase();
}

bool isAdmin(BuildContext context) {
  final accountInfo = context.read<AccountInfoBloc>().state.ensuredData;
  return accountInfo.roleType == RoleTypeString.admin;
}

String currentUserId(BuildContext context) {
  return context.read<AccountInfoBloc>().state.ensuredData.id;
}

Map<int, Color> getFilteredColorMap(ColorSet palette) {
  switch (palette) {
    case ColorSet.SET18:
      return Map.from(colorMap)
        ..removeWhere((key, value) => kEighteenColorPaletteExclusions.contains(value));
    case ColorSet.SET9:
      return Map.from(colorMap)
        ..removeWhere((key, value) => !kNineColorPaletteInclusions.contains(value));
    case ColorSet.SET5:
      return Map.from(colorMap)
        ..removeWhere((key, value) => !kFiveColorPaletteInclusions.contains(value));
    case ColorSet.SET22:
      return colorMap;
  }
}

Map<int, Color> getColorsForUser(BuildContext context, {ColorSet? constrainedBy}) {
  final selectedColorSet = context.select(
    (PreferencesBloc bloc) => bloc.state.ensuredData.colorSet,
  );

  return getConstrainedColorMap(selectedColorSet, constrainedBy: constrainedBy);
}

Map<int, Color> getConstrainedColorMap(ColorSet colorSet, {ColorSet? constrainedBy}) {
  final colors = getFilteredColorMap(colorSet);

  if (constrainedBy == null) return colors;

  final constraint = getFilteredColorMap(constrainedBy);

  return Map.fromEntries(colors.entries.where((entry) => constraint.containsKey(entry.key)));
}

void updateTitle(BuildContext context, String title) {
  if (context.isMobile) {
    getIt<AppScaffoldCubit>().updateAppBar(title: AppBarStyledTitle(title: title));
  }
}

void addCoporFormSaveButtonToAppBar(BuildContext context) {
  return addSaveButtonToAppBar(
    context,
    onPressed: () => context.read<FormSaveTriggerCubit>().triggerSave(),
  );
}

void addSaveButtonToAppBar(BuildContext context, {required VoidCallback onPressed}) {
  final translation = context.getState.commonTranslation.ensuredData;
  if (context.isMobile) {
    getIt<AppScaffoldCubit>().updateAppBar(
      actions: [
        Padding(
          padding: const EdgeInsets.only(right: 12.0),
          child: CoporButton(onPressed: onPressed, label: translation.SAVE),
        ),
      ],
    );
  }
}

String populateRoute(
  String route,
  String id, {
  String defaultPlaceholder = '_',
}) {
  final populatedRoute = route.replaceAll(':id', id);

  final RegExp remainingParamsRegex = RegExp(r':[\w-]+');

  String finalRoute = populatedRoute.replaceAll(remainingParamsRegex, defaultPlaceholder);

  return finalRoute;
}

typedef RouteParameter = ({String key, String value});

String generateRoute({required String route, required List<RouteParameter> routeParams}) {
  String generatedRoute = route;

  for (RouteParameter routeParam in routeParams) {
    generatedRoute = generatedRoute.replaceAll(':${routeParam.key}', routeParam.value);
  }

  return generatedRoute;
}

String getCountryFlagCode(String languageCode) {
  const Map<String, String> languageToCountry = {
    'en': 'GB',
    'de': 'DE',
    'fr': 'FR',
    'es': 'ES',
    'it': 'IT',
    'nl': 'NL',
    'pt': 'PT',
    'ru': 'RU',
    'zh': 'CN',
    'ja': 'JP',
    'ko': 'KR',
    'ar': 'SA',
  };

  return languageToCountry[languageCode] ?? 'UN';
}

bool isValidPostalCode(String postalCode) {
  final regex = RegExp(r'^\d{5}$');
  return regex.hasMatch(postalCode);
}

final passwordRegex = RegExp(r'^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$');

bool isISOToday(DateTime date) {
  final now = DateTime.now();
  return date.year == now.year && date.month == now.month && date.day == now.day;
}

String formatISOTime(DateTime date) {
  return '${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}';
}

String formatDeadline(DateTime date) {
  return date.toIso8601String().split('.').first;
}

String formatFullDateTime(DateTime dateTime) {
  return '${formatISODate(dateTime)} ${formatISOTime(dateTime)}';
}

double fontSizeToScale(FontSize fontSize) {
  switch (fontSize) {
    case FontSize.xs:
      return 0.8;
    case FontSize.sm:
      return 0.9;
    case FontSize.normal:
      return 1.0;
    case FontSize.lg:
      return 1.1;
    case FontSize.xl:
      return 1.3;
    case FontSize.xxl:
      return 1.5;
  }
}

FontSize scaleToFontSize(double scale) {
  switch (scale) {
    case 0.8:
      return FontSize.xs;
    case 0.9:
      return FontSize.sm;
    case 1.0:
      return FontSize.normal;
    case 1.1:
      return FontSize.lg;
    case 1.3:
      return FontSize.xl;
    case 1.5:
      return FontSize.xxl;
    default:
      return FontSize.normal;
  }
}

int fontSizeToIndex(FontSize fontSize) {
  switch (fontSize) {
    case FontSize.xs:
      return 0;
    case FontSize.sm:
      return 1;
    case FontSize.normal:
      return 2;
    case FontSize.lg:
      return 3;
    case FontSize.xl:
      return 4;
    case FontSize.xxl:
      return 5;
  }
}

String formatFileName(String fileName) {
  return fileName
      .replaceAll('-', ' ')
      .split(' ')
      .map((word) => word.isEmpty ? '' : word[0].toUpperCase() + word.substring(1))
      .join(' ');
}

String getTranslatedFailureMessage(Failure failure, CommonTranslation t) {
  /// Translate another errors
  switch (failure.responseCode) {
    case ResponseCode.connectionError:
    case ResponseCode.noInternetConnection:
      return t.NO_INTERNET_CONNECTION;
  }

  if (failure.responseCode >= ResponseCode.internalServerError || failure.message.trim().isEmpty) {
    return t.SERVER_UNAVAILABLE_MESSAGE;
  }

  return failure.message;
}

void debugPrintTrace(StackTrace trace) {
  final lines = trace.toString().split('\n');
  final relevant = lines.where((line) => line.contains('package:copor_'));

  if (relevant.isEmpty) {
    debugPrint(trace.toString());
    return;
  }
  debugPrint('[ErrorHandler] Relevant stack frames ===> \n${relevant.join('\n')}');
}

String getPhoneNumberTypeLabel(PhoneNumberTypeEnum type, MyAccountPageTranslation translation) {
  return switch (type) {
    PhoneNumberTypeEnum.PHONE_MOBILE => translation.PHONE_MOBILE,
    PhoneNumberTypeEnum.PHONE_HOME => translation.PHONE_HOME,
    PhoneNumberTypeEnum.PHONE_WORK => translation.PHONE_WORK,
    PhoneNumberTypeEnum.PHONE_MOBILE_ALTERNATIVE => translation.PHONE_MOBILE_ALTERNATIVE,
    PhoneNumberTypeEnum.PHONE_HOME_ALTERNATIVE => translation.PHONE_HOME_ALTERNATIVE,
    PhoneNumberTypeEnum.PHONE_WORK_ALTERNATIVE => translation.PHONE_WORK_ALTERNATIVE,
    PhoneNumberTypeEnum.PHONE_OTHER => translation.PHONE_OTHER,
  };
}

String getFullNameWithStatus(String text, bool? isActive) => isActive == false ? '[$text]' : text;
