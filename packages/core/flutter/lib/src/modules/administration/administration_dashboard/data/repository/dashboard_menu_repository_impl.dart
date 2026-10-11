import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/data/data_source/dashboard_menu_remote_source.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/data/model/dashboard_menu_model.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/data/repository/dashboard_menu_repository.dart';

class DashboardMenuRepositoryImpl extends BaseRepository implements DashboardMenuRepository {
  final DashboardMenuRemoteDataSource remoteDataSource;

  DashboardMenuRepositoryImpl({
    required this.remoteDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<DashboardMenuModel>>> getDashboardMenu(String languageCode) async {
    return performOperationAndMapToResult<DashboardMenuModel>(
      remoteOperation: () async {
        return performNetworkOperation<DashboardMenuModel>(() async {
          return await remoteDataSource.getDashboardMenu(languageCode);
        });
      },
    );
  }
}
