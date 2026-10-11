// Mockito mock definitions shared by the tests. After adding a MockSpec here,
// regenerate `mock_list.mocks.dart` (gitignored) with:
//   dart run build_runner build --build-filter="test/**"
import 'package:copor_core/src/data/model/config/config_model.dart';
import 'package:copor_core/src/data/repository_impl/asset_list/asset_list_repository.dart';
import 'package:copor_core/src/data/repository_impl/config/config_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:mockito/annotations.dart';

@GenerateNiceMocks([
  MockSpec<Failure>(),
  MockSpec<ConfigRepository>(),
  MockSpec<ConfigModel>(),
  MockSpec<AssetListRepository>(),
])
void main() {}
