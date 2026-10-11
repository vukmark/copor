import 'package:copor_help/src/about/services/change_log_service.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'change_log_detail_state.dart';

class ChangeLogDetailCubit extends Cubit<ChangeLogDetailState> {
  ChangeLogDetailCubit() : super(const ChangeLogDetailInitial());

  Future<void> load(String version) async {
    emit(const ChangeLogDetailLoading());
    try {
      final data = await ChangeLogService.loadChangeLog(version);
      if (data.markdownContent.isEmpty) {
        emit(const ChangeLogDetailError());
      } else {
        emit(ChangeLogDetailLoaded(data));
      }
    } catch (_) {
      emit(const ChangeLogDetailError());
    }
  }
}
