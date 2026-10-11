import 'package:copor_theme/src/components/display/dt_divider.dart';
import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:flutter/material.dart';

const kMenuPanelWidth = 300.0;
const _kDrawerPadding = 10.0;

class DTMenuDrawer extends StatelessWidget {
  final Widget header;
  final Widget content;
  final Widget footer;

  const DTMenuDrawer({
    super.key,
    required this.header,
    required this.content,
    required this.footer,
  });

  @override
  Widget build(BuildContext context) {
    return Drawer(
      key: const Key('scaffold_drawer'),
      backgroundColor: CoporColors.of(context).surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.only(topRight: radius, bottomRight: radius),
      ),
      shadowColor: Colors.transparent,
      elevation: 0,
      width: kMenuPanelWidth,
      child: _DTMenuPanelContent(
        header: header,
        content: content,
        footer: footer,
      ),
    );
  }
}

/// Full-height, permanently docked counterpart to [DTMenuDrawer].
///
/// Same header/content/footer structure, but rendered as a plain panel
/// rather than a slide-over overlay `Drawer`. Material's `NavigationRail`
/// can't host arbitrary widgets, so this fills that role for desktop layouts
/// that want a persistent nav rail.
///
/// Just the rail's content — its floating card look (rounded/bordered/
/// shadowed, like [DTNavBar]'s own card) is drawn by the caller
/// (`DSScaffold._buildFloatingCard`) one level up, not by this widget, and
/// margins/gap/vertical positioning are the caller's job too.
class DTMenuRail extends StatelessWidget {
  final Widget header;
  final Widget content;
  final Widget footer;

  const DTMenuRail({
    super.key,
    required this.header,
    required this.content,
    required this.footer,
  });

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      right: true,
      child: SizedBox(
        key: const Key('scaffold_rail'),
        width: kMenuPanelWidth,
        child: Material(
          type: MaterialType.transparency,
          child: _DTMenuPanelContent(
            header: header,
            content: content,
            footer: footer,
          ),
        ),
      ),
    );
  }
}

class _DTMenuPanelContent extends StatelessWidget {
  final Widget header;
  final Widget content;
  final Widget footer;

  const _DTMenuPanelContent({
    required this.header,
    required this.content,
    required this.footer,
  });

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(_kDrawerPadding),
        child: Column(
          children: [
            header,
            const DTDivider(
              height: 30,
              alignment: DTDividerAlignment.asymmetricTop,
            ),
            Expanded(child: content),
            const DTDivider(
              height: 30,
              alignment: DTDividerAlignment.asymmetricBottom,
            ),
            footer,
          ],
        ),
      ),
    );
  }
}
