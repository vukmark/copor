import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/data/model/dashboard_menu_model.dart';

abstract class DashboardMenuRepository {
  Future<Either<Failure, Result<DashboardMenuModel>>> getDashboardMenu(String languageCode);
}
