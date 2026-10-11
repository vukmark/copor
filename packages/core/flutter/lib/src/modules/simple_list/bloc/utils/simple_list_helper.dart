import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_model_dto.dart';
import 'package:copor_core/src/data/model/named_id/named_id_model.dart';
import 'package:copor_core/src/modules/simple_list/bloc/simple_list_bloc.dart';
import 'package:copor_core/src/modules/simple_list/bloc/simple_list_bloc_impl.dart';
import 'package:copor_core/src/modules/simple_list/bloc/simple_list_state.dart';
import 'package:copor_core/src/modules/simple_list/bloc/utils/simple_list_bloc_event_dispatcher.dart';
import 'package:copor_core/src/modules/simple_list/data/repository/simple_list_repository.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:copor_core/src/config/dependency_injection.dart';

class SimpleListHelper {
  static void dispatchSearch<T>(String type, FilterListDTO filter) {
    switch (type.toLowerCase()) {
      case 'country':
        SimpleListBlocEventDispatcher.simpleList.getSimpleList<CountrySimpleListBloc>(filter);
        break;
      case 'state':
        SimpleListBlocEventDispatcher.simpleList.getSimpleList<StateSimpleListBloc>(filter);
        break;
      case 'region':
        SimpleListBlocEventDispatcher.simpleList.getSimpleList<RegionSimpleListBloc>(filter);
        break;
      case 'region-city':
        SimpleListBlocEventDispatcher.simpleList.getSimpleList<RegionCitySimpleListBloc>(filter);
        break;
      case 'tenant':
        SimpleListBlocEventDispatcher.simpleList.getSimpleList<TenantSimpleListBloc>(filter);
      case 'base-tenant':
        SimpleListBlocEventDispatcher.simpleList.getSimpleList<BaseTenantSimpleListBloc>(filter);
        break;
      case 'user':
        SimpleListBlocEventDispatcher.simpleList.getSimpleList<UserSimpleListBloc>(filter);
        break;
      case 'role':
        SimpleListBlocEventDispatcher.simpleList.getSimpleList<RoleSimpleListBloc>(filter);
        break;
      case 'native-language':
        SimpleListBlocEventDispatcher.simpleList.getSimpleList<NativeLanguageSimpleListBloc>(
          filter,
        );
      default:
        throw StateError(
          "Simple List getter for $type is not registered by the Simple List Helper",
        );
    }
  }

  static SimpleListBloc _getBloc(String type) {
    switch (type.toLowerCase()) {
      case 'country':
        return getIt<CountrySimpleListBloc>();
      case 'state':
        return getIt<StateSimpleListBloc>();
      case 'region':
        return getIt<RegionSimpleListBloc>();
      case 'region-city':
        return getIt<RegionCitySimpleListBloc>();
      case 'tenant':
        return getIt<TenantSimpleListBloc>();
      case 'base-tenant':
        return getIt<BaseTenantSimpleListBloc>();
      case 'user':
        return getIt<UserSimpleListBloc>();
      case 'role':
        return getIt<RoleSimpleListBloc>();
      case 'native-language':
        return getIt<NativeLanguageSimpleListBloc>();
      default:
        throw StateError(
          "Simple List getter for $type is not registered by the Simple List Helper",
        );
    }
  }

  /// Dispatches a `SEARCH` filter for [type] and awaits the bloc's next
  /// non-loading state, for use as a [DTDropdownSearch] callback.
  static Future<List<NamedIdModel<String>>> search(
    String type,
    String query, {
    int limit = 20,
    int offset = 0,
    List<FilterModelDTO> extraFilters = const [],
  }) async {
    final filter = FilterListDTO(
      filterList: [
        FilterModelDTO(name: 'SEARCH', values: [query]),
        ...extraFilters,
      ],
      limit: '$limit',
      offset: '$offset',
    );
    final result = await getIt<SimpleListRepository>().getSimpleList(
      _getBloc(type).getListType(),
      filter,
    );

    return result.fold((_) => const [], (success) => success.data.items);
  }

  /// Dispatches a `SEARCH_BY_POSTAL_CODE_RANGE` filter for [type], returning
  /// every match with no pagination (empty limit/offset skip pagination
  /// server-side), for bulk-adding results from a postal code range.
  static Future<List<NamedIdModel<String>>> searchRange(
    String type,
    String from,
    String to, {
    List<FilterModelDTO> extraFilters = const [],
  }) async {
    final filter = FilterListDTO(
      filterList: [
        FilterModelDTO(name: 'SEARCH_BY_POSTAL_CODE_RANGE', values: [from, to]),
        ...extraFilters,
      ],
      limit: '',
      offset: '',
    );
    final result = await getIt<SimpleListRepository>().getSimpleList(
      _getBloc(type).getListType(),
      filter,
    );

    return result.fold((_) => const [], (success) => success.data.items);
  }

  static Widget buildBlocBuilder(String type, Widget Function(SimpleListState) builder) {
    switch (type.toLowerCase()) {
      case 'country':
        return BlocBuilder<CountrySimpleListBloc, SimpleListState>(builder: (c, s) => builder(s));
      case 'state':
        return BlocBuilder<StateSimpleListBloc, SimpleListState>(builder: (c, s) => builder(s));
      case 'region':
        return BlocBuilder<RegionSimpleListBloc, SimpleListState>(builder: (c, s) => builder(s));
      case 'region-city':
        return BlocBuilder<RegionCitySimpleListBloc, SimpleListState>(
          builder: (c, s) => builder(s),
        );
      case 'tenant':
        return BlocBuilder<TenantSimpleListBloc, SimpleListState>(builder: (c, s) => builder(s));
      case 'base-tenant':
        return BlocBuilder<BaseTenantSimpleListBloc, SimpleListState>(
          builder: (c, s) => builder(s),
        );
      case 'user':
        return BlocBuilder<UserSimpleListBloc, SimpleListState>(builder: (c, s) => builder(s));
      case 'role':
        return BlocBuilder<RoleSimpleListBloc, SimpleListState>(builder: (c, s) => builder(s));
      case 'native-language':
        return BlocBuilder<NativeLanguageSimpleListBloc, SimpleListState>(
          builder: (c, s) => builder(s),
        );
      default:
        throw StateError(
          "Simple List Bloc Builder for $type is not registered by the Simple List Helper",
        );
    }
  }

  static Widget provideBloc(String type, Widget child) {
    switch (type.toLowerCase()) {
      case 'country':
        return BlocProvider<CountrySimpleListBloc>.value(
          value: getIt<CountrySimpleListBloc>(),
          child: child,
        );
      case 'state':
        return BlocProvider<StateSimpleListBloc>.value(
          value: getIt<StateSimpleListBloc>(),
          child: child,
        );
      case 'region':
        return BlocProvider<RegionSimpleListBloc>.value(
          value: getIt<RegionSimpleListBloc>(),
          child: child,
        );
      case 'region-city':
        return BlocProvider<RegionCitySimpleListBloc>.value(
          value: getIt<RegionCitySimpleListBloc>(),
          child: child,
        );
      case 'tenant':
        return BlocProvider<TenantSimpleListBloc>.value(
          value: getIt<TenantSimpleListBloc>(),
          child: child,
        );
      case 'base-tenant':
        return BlocProvider<BaseTenantSimpleListBloc>.value(
          value: getIt<BaseTenantSimpleListBloc>(),
          child: child,
        );
      case 'user':
        return BlocProvider<UserSimpleListBloc>.value(
          value: getIt<UserSimpleListBloc>(),
          child: child,
        );
      case 'role':
        return BlocProvider<RoleSimpleListBloc>.value(
          value: getIt<RoleSimpleListBloc>(),
          child: child,
        );
      case 'native-language':
        return BlocProvider<NativeLanguageSimpleListBloc>.value(
          value: getIt<NativeLanguageSimpleListBloc>(),
          child: child,
        );
      default:
        throw StateError(
          "Simple List Bloc Provider for $type is not registered by the Simple List Helper",
        );
    }
  }
}
