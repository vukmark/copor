import 'package:copor_core/src/modules/forms/data/model/copor_form_dto.dart';
import 'package:copor_core/src/utils/typedef.dart';

sealed class CoporFormSubmitResult {
  const CoporFormSubmitResult();
}

final class CoporFormNextStep extends CoporFormSubmitResult {
  final CoporFormDTO form;

  const CoporFormNextStep(this.form);
}

final class CoporFormCompleted extends CoporFormSubmitResult {
  final String message;

  const CoporFormCompleted(this.message);
}

CoporFormSubmitResult coporFormSubmitResultFromResponse(dynamic response) {
  if (response is JSON && response['fields'] is List && response['endpoint'] is String) {
    return CoporFormNextStep(CoporFormDTO.fromJson(response));
  }

  return CoporFormCompleted(response?.toString() ?? '');
}
