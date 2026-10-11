import 'package:copor_core/src/data/model/filter/bloc/filter_state.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_model_dto.dart';
import 'package:copor_core/src/modules/table/bloc/table_state.dart';

class FilterDtoConverter {
  static FilterListDTO fromState(FilterState state, [TableState? tableState]) {
    final filters = state.appliedFilters.entries.map((entry) {
      final key = entry.key;
      final value = entry.value;

      final values = value is List ? List<String>.from(value) : [value.toString()];

      return FilterModelDTO(name: key, values: values);
    }).toList();

    return FilterListDTO(
      filterList: filters,
      limit: (tableState?.limit ?? 15).toString(),
      offset: (tableState?.offset ?? 0).toString(),
    );
  }
}
