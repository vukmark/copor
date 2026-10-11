import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/modules/simple_list/bloc/simple_list_bloc.dart';
import 'package:copor_core/src/modules/simple_list/bloc/simple_list_bloc_impl.dart';
import 'package:copor_core/src/modules/simple_list/bloc/simple_list_event.dart';
import 'package:copor_core/src/modules/simple_list/bloc/utils/simple_list_bloc_factory.dart';

class SimpleListBlocEventDispatcher {
  static _SimpleList simpleList = _SimpleList();
}

class _SimpleList {
  void getSimpleList<T extends SimpleListBloc>(FilterListDTO? filterList) {
    SimpleListBlocFactory.getSimpleListBloc<T>().add(
      GetSimpleList(filterList ?? FilterListDTO.empty()),
    );
  }

  void getSimpleListForKey(String key, FilterListDTO? filterList) {
    switch (key) {
      case 'country':
        SimpleListBlocFactory.getSimpleListBloc<CountrySimpleListBloc>().add(
          GetSimpleList(filterList),
        );
      case 'tenant':
        SimpleListBlocFactory.getSimpleListBloc<TenantSimpleListBloc>().add(
          GetSimpleList(filterList),
        );
      case 'baseTenant':
        SimpleListBlocFactory.getSimpleListBloc<BaseTenantSimpleListBloc>().add(
          GetSimpleList(filterList),
        );
      case 'state':
        SimpleListBlocFactory.getSimpleListBloc<StateSimpleListBloc>().add(
          GetSimpleList(filterList),
        );
    }
  }
}
