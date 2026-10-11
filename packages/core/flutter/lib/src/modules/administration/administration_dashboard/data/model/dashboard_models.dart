import 'package:flutter/material.dart';

class DashboardItem {
  final IconData icon;
  final String title;
  final String route;

  final String? featureKey;
  final bool hasFeatureFlag;
  final bool isExternalLink;
  final int? badgeCount;

  const DashboardItem({
    required this.icon,
    this.title = '',
    required this.route,
    this.featureKey,
    this.hasFeatureFlag = true,
    this.isExternalLink = false,
    this.badgeCount,
  });
}

class DashboardCategory {
  final String title;
  final List<DashboardItem> items;

  const DashboardCategory({required this.title, required this.items});

  DashboardCategory copyWith({String? title, List<DashboardItem>? items}) {
    return DashboardCategory(title: title ?? this.title, items: items ?? this.items);
  }
}
