import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:equatable/equatable.dart';

sealed class RegionCityListEvent extends Equatable {
  const RegionCityListEvent();

  @override
  List<Object?> get props => [];
}

class GetRegionCityList extends RegionCityListEvent {
  final FilterListDTO filterList;
  const GetRegionCityList(this.filterList);
}
