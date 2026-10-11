import 'package:copor_todo/src/data/model/translation/todo_translation.dart';
import 'package:copor_core/src/utils/dropdown_entries.dart';

List<DropdownItem<String>> getProgressOptions(TodoPageTranslation translation) {
  return [
    DropdownItem<String>(value: 'TO_DO', label: translation.TODO),
    DropdownItem<String>(value: 'STARTED', label: translation.STARTED),
    DropdownItem<String>(value: 'HALF_WAY', label: translation.HALFWAY),
    DropdownItem<String>(value: 'ALMOST_DONE', label: translation.ALMOST_DONE),
    DropdownItem<String>(value: 'FINISHED', label: translation.FINISHED),
  ];
}

List<DropdownItem<String>> getPriorityOptions(TodoPageTranslation translation) {
  return [
    DropdownItem<String>(value: 'NORMAL', label: translation.NORMAL),
    DropdownItem<String>(value: 'HIGH', label: translation.HIGH),
    DropdownItem<String>(value: 'URGENT', label: translation.URGENT),
  ];
}
