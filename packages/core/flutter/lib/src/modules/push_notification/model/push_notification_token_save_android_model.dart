import 'package:copor_core/src/modules/push_notification/model/push_notification_token_save_model.dart';
import 'package:copor_core/src/modules/push_notification/type/notification_token_type.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'push_notification_token_save_android_model.g.dart';

@JsonSerializable()
class PushNotificationTokenSaveAndroidModel extends PushNotificationTokenSaveModel {
  const PushNotificationTokenSaveAndroidModel({required super.token});

  @override
  factory PushNotificationTokenSaveAndroidModel.fromJson(JSON json) =>
      _$PushNotificationTokenSaveAndroidModelFromJson(json);

  @override
  JSON toJson() => _$PushNotificationTokenSaveAndroidModelToJson(this);

  @override
  @JsonKey(includeToJson: true)
  String get type => NotificationTokenType.android.value;
}
