import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/data/model/dashboard_models.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/presentation/widgets/section_header.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class CategoryLayout extends StatelessWidget {
  final List<DashboardCategory> categories;
  final bool hasHeader;

  const CategoryLayout({super.key, required this.categories, this.hasHeader = true});

  @override
  Widget build(BuildContext context) {
    final colors = CoporColors.of(context);

    return ListView.separated(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      padding: EdgeInsets.zero,
      itemCount: categories.length,
      separatorBuilder: (_, _) => const SizedBox(height: 24),
      itemBuilder: (context, index) {
        final category = categories[index];
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (hasHeader) SectionHeader(title: category.title),
            Column(
              children: category.items.map((item) {
                return Padding(
                  padding: const EdgeInsets.only(bottom: 8.0),
                  child: Material(
                    color: colors.surfaceContainer,
                    borderRadius: BorderRadius.circular(kInputBorderRadius),
                    child: DTListTile.surface(
                      icon: item.icon,
                      label: item.title,
                      onPressed: item.isExternalLink == true
                          ? () => launchUrl(Uri.parse(item.route))
                          : () => goToPage(item.route),
                      border: true,
                      trailing: (item.badgeCount ?? 0) > 0
                          ? DTBadge(count: item.badgeCount!)
                          : null,
                    ),
                  ),
                );
              }).toList(),
            ),
          ],
        );
      },
    );
  }
}
