import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/utils/push_notification/config/push_notification_model_namespace.dart';

abstract class PushNotificationTokenSaveModel extends BaseModel {
  static const String namespaceStatic = PushNotificationModelNamespace.TokenSaveModel;
  final String token;
  String get type;

  const PushNotificationTokenSaveModel({required this.token});

  @override
  List<Object?> get props => [token, type];

  @override
  String get namespace => namespaceStatic;
}
