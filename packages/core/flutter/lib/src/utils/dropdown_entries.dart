import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:copor_theme/src/models/dt_option.dart';

typedef DropdownItem<T> = DTOption<T>;

List<DropdownItem<bool>> getTranslatedBooleanOptions(CommonTranslation translation) {
  return [
    DropdownItem<bool>(value: true, label: translation.YES),
    DropdownItem<bool>(value: false, label: translation.NO),
  ];
}

List<DropdownItem<PublishStatus>> getPublishStatusOptions(CommonTranslation translation) {
  return [
    DropdownItem<PublishStatus>(value: PublishStatus.published, label: translation.PUBLISHED),
    DropdownItem<PublishStatus>(value: PublishStatus.unpublished, label: translation.UNPUBLISHED),
    DropdownItem<PublishStatus>(value: PublishStatus.draft, label: translation.DRAFT),
  ];
}

List<DropdownItem<int>> getTranslatedOrientationOptions(CommonTranslation translation) {
  return [
    DropdownItem<int>(value: 0, label: translation.HORIZONTAL),
    DropdownItem<int>(value: 1, label: translation.VERTICAL),
  ];
}
