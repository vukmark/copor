// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'dashboard_menu_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

DashboardMenuModel _$DashboardMenuModelFromJson(Map<String, dynamic> json) =>
    DashboardMenuModel(
      categories: (json['categories'] as List<dynamic>)
          .map(
            (e) =>
                DashboardMenuCategoryModel.fromJson(e as Map<String, dynamic>),
          )
          .toList(),
    );

Map<String, dynamic> _$DashboardMenuModelToJson(DashboardMenuModel instance) =>
    <String, dynamic>{
      'categories': instance.categories.map((e) => e.toJson()).toList(),
    };

DashboardMenuCategoryModel _$DashboardMenuCategoryModelFromJson(
  Map<String, dynamic> json,
) => DashboardMenuCategoryModel(
  title: json['title'] as String,
  items: (json['items'] as List<dynamic>)
      .map((e) => DashboardMenuItemModel.fromJson(e as Map<String, dynamic>))
      .toList(),
);

Map<String, dynamic> _$DashboardMenuCategoryModelToJson(
  DashboardMenuCategoryModel instance,
) => <String, dynamic>{
  'title': instance.title,
  'items': instance.items.map((e) => e.toJson()).toList(),
};

DashboardMenuItemModel _$DashboardMenuItemModelFromJson(
  Map<String, dynamic> json,
) => DashboardMenuItemModel(
  icon: json['icon'] as String,
  title: json['title'] as String,
  route: json['route'] as String,
  isExternalLink: json['isExternalLink'] as bool?,
  badgeCount: (json['badgeCount'] as num?)?.toInt(),
);

Map<String, dynamic> _$DashboardMenuItemModelToJson(
  DashboardMenuItemModel instance,
) => <String, dynamic>{
  'icon': instance.icon,
  'title': instance.title,
  'route': instance.route,
  'isExternalLink': instance.isExternalLink,
  'badgeCount': instance.badgeCount,
};
