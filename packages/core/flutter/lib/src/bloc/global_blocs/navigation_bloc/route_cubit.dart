import 'package:flutter_bloc/flutter_bloc.dart';

class RouteCubit extends Cubit<String> {
  RouteCubit() : super('');

  void updateRoute(String path) => emit(path);
}
