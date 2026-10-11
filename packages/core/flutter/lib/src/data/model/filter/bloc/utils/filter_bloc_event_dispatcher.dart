import 'package:copor_core/src/data/model/filter/bloc/filter_bloc.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_event.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class FilterBlocEventDispatcher {
  static void loadFilters(String endpoint) {
    final context = useContext();

    useEffect(() {
      context.read<FilterBloc>().add(LoadFilters(endpoint));

      return null;
    }, []);
  }
}
