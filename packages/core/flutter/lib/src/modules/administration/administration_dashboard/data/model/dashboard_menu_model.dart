import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/utils/name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'dashboard_menu_model.g.dart';

@JsonSerializable(explicitToJson: true)
class DashboardMenuModel extends BaseModel {
  final List<DashboardMenuCategoryModel> categories;

  const DashboardMenuModel({required this.categories});

  factory DashboardMenuModel.fromJson(JSON json) => _$DashboardMenuModelFromJson(json);

  @override
  JSON toJson() => _$DashboardMenuModelToJson(this);

  @override
  String get namespace => ModelNamespaces.DashboardMenu;
}

@JsonSerializable(explicitToJson: true)
class DashboardMenuCategoryModel {
  final String title;
  final List<DashboardMenuItemModel> items;

  const DashboardMenuCategoryModel({required this.title, required this.items});

  factory DashboardMenuCategoryModel.fromJson(JSON json) =>
      _$DashboardMenuCategoryModelFromJson(json);

  JSON toJson() => _$DashboardMenuCategoryModelToJson(this);
}

@JsonSerializable()
class DashboardMenuItemModel {
  final String icon;
  final String title;
  final String route;
  final bool? isExternalLink;
  final int? badgeCount;

  const DashboardMenuItemModel({
    required this.icon,
    required this.title,
    required this.route,
    this.isExternalLink,
    this.badgeCount,
  });

  factory DashboardMenuItemModel.fromJson(JSON json) => _$DashboardMenuItemModelFromJson(json);

  JSON toJson() => _$DashboardMenuItemModelToJson(this);
}
