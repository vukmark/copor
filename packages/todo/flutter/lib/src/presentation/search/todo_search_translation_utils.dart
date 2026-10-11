import 'package:copor_core/src/modules/search/data/model/translation/search_translation.dart';

String translatePriority(String id, SearchPageTranslation t) {
  switch (id.toUpperCase()) {
    case 'URGENT':
      return t.URGENT;
    case 'HIGH':
      return t.HIGH;
    case 'NORMAL':
      return t.NORMAL;
    case 'LOW':
      return t.LOW;
    default:
      return id;
  }
}

String translateProgress(String code, SearchPageTranslation t) {
  switch (code.toUpperCase()) {
    case 'TO_DO':
      return t.TO_DO;
    case 'STARTED':
      return t.STARTED;
    case 'HALF_WAY':
      return t.HALF_WAY;
    case 'ALMOST_DONE':
      return t.ALMOST_DONE;
    case 'FINISHED':
      return t.FINISHED;
    default:
      return code;
  }
}
