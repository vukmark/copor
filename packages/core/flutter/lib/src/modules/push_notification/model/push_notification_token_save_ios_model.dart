import 'package:copor_core/src/modules/push_notification/model/push_notification_token_save_model.dart';
import 'package:copor_core/src/modules/push_notification/type/notification_token_type.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'push_notification_token_save_ios_model.g.dart';

@JsonSerializable()
class PushNotificationTokenSaveIosModel extends PushNotificationTokenSaveModel {
  const PushNotificationTokenSaveIosModel({required super.token});

  @override
  factory PushNotificationTokenSaveIosModel.fromJson(JSON json) =>
      _$PushNotificationTokenSaveIosModelFromJson(json);

  @override
  JSON toJson() => _$PushNotificationTokenSaveIosModelToJson(this);

  @override
  @JsonKey(includeToJson: true)
  String get type => NotificationTokenType.ios.value;
}
