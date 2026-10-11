import 'package:dio/dio.dart';
import 'package:dio_web_adapter/dio_web_adapter.dart';

void configureDioForWeb(Dio dio) {
  dio.httpClientAdapter = BrowserHttpClientAdapter(enableCORSWarning: false);
}
