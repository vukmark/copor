import 'package:bloc_test/bloc_test.dart';
import 'package:dartz/dartz.dart';
import 'package:copor_core/src/bloc/global_blocs/asset_bloc/asset_list_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/asset_bloc/asset_list_event.dart';
import 'package:copor_core/src/bloc/global_blocs/asset_bloc/asset_list_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/asset_list/asset_list_model.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

import '../../../mock_list.mocks.dart';

void main() {
  late MockAssetListRepository mockAssetListRepository;

  const namespace = 'login';
  const assetList = AssetListModel(assetUrlList: {'logo': '/assets/logo.png'});
  final testFailure = MockFailure();

  AssetListModel constructor(Map<String, String> list) => AssetListModel(assetUrlList: list);

  setUp(() {
    mockAssetListRepository = MockAssetListRepository();
  });

  group('AssetListBloc', () {
    blocTest<AssetListBloc<AssetListModel>, AssetListState<AssetListModel>>(
      'emits [loading, fetched] when FetchAssetList succeeds',
      build: () {
        when(
          mockAssetListRepository.getAssetList<AssetListModel>(any, any),
        ).thenAnswer((_) async => Right(Result(data: assetList)));
        return AssetListBloc<AssetListModel>(assetListRepository: mockAssetListRepository);
      },
      act: (bloc) =>
          bloc.add(FetchAssetList<AssetListModel>(namespace: namespace, constructor: constructor)),
      expect: () => [
        AssetListState<AssetListModel>.loading(result: null),
        AssetListState<AssetListModel>.fetched(result: Result(data: assetList)),
      ],
      verify: (_) {
        verify(mockAssetListRepository.getAssetList<AssetListModel>(namespace, any)).called(1);
      },
    );

    blocTest<AssetListBloc<AssetListModel>, AssetListState<AssetListModel>>(
      'emits [loading, failure] when FetchAssetList fails',
      build: () {
        when(
          mockAssetListRepository.getAssetList<AssetListModel>(any, any),
        ).thenAnswer((_) async => Left(testFailure));
        return AssetListBloc<AssetListModel>(assetListRepository: mockAssetListRepository);
      },
      act: (bloc) =>
          bloc.add(FetchAssetList<AssetListModel>(namespace: namespace, constructor: constructor)),
      expect: () => [
        AssetListState<AssetListModel>.loading(result: null),
        AssetListState<AssetListModel>.failure(failure: testFailure, result: null),
      ],
    );
  });
}
