import 'package:copor_help/src/about/services/change_log_service.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'about_state.dart';

class AboutCubit extends Cubit<AboutState> {
  AboutCubit() : super(const AboutInitial());

  Future<void> load() async {
    emit(const AboutLoading());
    try {
      final versions = await ChangeLogService.getChangeLogList();
      emit(
        AboutLoaded(
          info: versions.isEmpty ? null : versions.first,
          versions: versions.map((info) => info.version).toList(),
        ),
      );
    } catch (_) {
      emit(const AboutError());
    }
  }
}
