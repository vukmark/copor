import 'package:flutter/material.dart';

/// One selectable section of the main (left) drawer — lets a page
/// contribute its own drawer content (e.g. a folder tree) alongside the
/// app's main navigation menu. Selected via [DSDrawerHost], which shows
/// exactly one section's [child] at a time (whichever a page's own toggle
/// button selected right before opening the drawer) — no visible switcher.
class DSDrawerSection {
  final String key;
  final Widget child;

  const DSDrawerSection({required this.key, required this.child});
}
