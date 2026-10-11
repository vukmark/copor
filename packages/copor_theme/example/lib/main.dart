import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_scaffold_dev/copor_scaffold_dev.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

const _breakpoints = DSBreakpoints(
  mobile: kMobileBreakpoint,
  desktop: kTabletBreakpoint,
);

void main() => runApp(const ShowcaseApp());

class ShowcaseApp extends StatefulWidget {
  const ShowcaseApp({super.key});

  @override
  State<ShowcaseApp> createState() => _ShowcaseAppState();
}

class _ShowcaseAppState extends State<ShowcaseApp> {
  ThemeMode _themeMode = ThemeMode.system;
  ContrastMode _contrastMode = ContrastMode.normal;
  AppFontWeight _fontWeight = AppFontWeight.normal;
  FontSize _fontSize = FontSize.normal;

  @override
  Widget build(BuildContext context) {
    final appTheme = CoporThemeBuilder.build(
      themeMode: _themeMode,
      contrastMode: _contrastMode,
      fontWeight: _fontWeight,
      fontSize: _fontSize,
      baseTextTheme: Theme.of(context).textTheme,
    );

    return MaterialApp(
      title: 'DT Showcase',
      debugShowCheckedModeBanner: false,
      theme: appTheme.lightTheme,
      darkTheme: appTheme.darkTheme,
      themeMode: _themeMode,
      builder: (context, child) =>
          DSBreakpointsScope(breakpoints: _breakpoints, child: child!),
      home: const DTShowcasePage(standalone: true),
    );
  }
}
