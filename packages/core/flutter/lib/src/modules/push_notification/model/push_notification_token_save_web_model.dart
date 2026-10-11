import 'package:copor_core/src/modules/push_notification/model/push_notification_token_save_model.dart';
import 'package:copor_core/src/modules/push_notification/type/notification_token_type.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'push_notification_token_save_web_model.g.dart';

@JsonSerializable()
class PushNotificationTokenSaveWebModel extends PushNotificationTokenSaveModel {
  const PushNotificationTokenSaveWebModel({required super.token});

  @override
  factory PushNotificationTokenSaveWebModel.fromJson(JSON json) =>
      _$PushNotificationTokenSaveWebModelFromJson(json);

  @override
  JSON toJson() => _$PushNotificationTokenSaveWebModelToJson(this);

  @override
  @JsonKey(includeToJson: true)
  String get type => NotificationTokenType.web.value;
}
