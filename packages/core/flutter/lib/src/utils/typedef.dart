import 'package:copor_core/src/data/model/asset_list/asset_list_model.dart';
import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_theme/src/models/dt_enums.dart' show DTValidationType;
import 'package:json_annotation/json_annotation.dart';

typedef JSON = Map<String, dynamic>;
typedef StringMap = Map<String, String>;
typedef TranslationModelToGetterModelConverter<T> = T Function(TranslationModel model);
typedef AssetModelToGetterModelConverter<T> = T Function(AssetListModel model);

typedef TranslationConstructor<T extends TranslationModel> =
    T Function(StringMap translationStringList);
typedef AssetListConstructor<T extends AssetListModel> = T Function(StringMap assetUrlList);

enum FilterType { SEARCH, SORT, IN }

enum TableGetType { initial, filter, delete, formUpdate, loadMore }

enum PublishStatus {
  @JsonValue('PUBLISHED')
  published(0),
  @JsonValue('UNPUBLISHED')
  unpublished(1),
  @JsonValue('DRAFT')
  draft(2);

  final int value;

  const PublishStatus(this.value);

  int toInt() => value;
}

enum PhoneType {
  @JsonValue(1)
  Mobile,
  @JsonValue(2)
  Home,
  @JsonValue(3)
  Work,
  @JsonValue(4)
  Other,
}

enum ContrastMode {
  @JsonValue(0)
  auto,
  @JsonValue(1)
  normal,
  @JsonValue(2)
  high,
}

enum ContactPrivacy { picture, email, dateOfBirth, tenant, group, private }

enum AuthenticationType { lockAppId, faceId, fingerprint }

enum ColorSet { SET22, SET18, SET9, SET5 }

enum ActionType { create, update, get }

enum UserRole {
  user('USER'),
  admin('ADMIN');

  const UserRole(this.roleName);
  final String roleName;
}

enum MessageStatus { sending, sent, failed, seen }

enum DateTimeFieldMode { date, time, dateAndTime }

enum Priority {
  @JsonValue(0)
  normal,
  @JsonValue(2)
  high,
  @JsonValue(3)
  urgent,
}

enum Progress {
  @JsonValue(0)
  toDo,
  @JsonValue(1)
  started,
  @JsonValue(2)
  halfWay,
  @JsonValue(3)
  almostDone,
  @JsonValue(4)
  finished,
}

const allowedScales = <double>[0.8, 0.9, 1.0, 1.1, 1.3, 1.5 /*, 1.7, 2.0*/];
const allowedSizes = <FontSize>[
  FontSize.xs,
  FontSize.sm,
  FontSize.normal,
  FontSize.lg,
  FontSize.xl,
  FontSize.xxl,
  //FontSize.xxxl,
  //FontSize.huge,
];

enum FontSize {
  @JsonValue('XS')
  xs,
  @JsonValue('SM')
  sm,
  @JsonValue('NORMAL')
  normal,
  @JsonValue('LG')
  lg,
  @JsonValue('XL')
  xl,
  @JsonValue('XXL')
  xxl,
  //@JsonValue('XXXL')
  //xxxl,
  //@JsonValue('HUGE')
  //huge,
}

enum AppFontWeight {
  @JsonValue('LIGHT')
  light,
  @JsonValue('NORMAL')
  normal,
  @JsonValue('BOLD')
  bold,
}

enum DueDate { all, today, tomorrow, thisWeek, thisMonth }

enum ActionFeedbackDuration {
  @JsonValue('OFF')
  off,
  @JsonValue('FIVE_SECONDS')
  fiveSeconds,
  @JsonValue('TWENTY_SECONDS')
  twentySeconds,
}

typedef ValidationType = DTValidationType;
