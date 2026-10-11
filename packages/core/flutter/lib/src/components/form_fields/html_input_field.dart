import 'package:copor_core/src/components/dashed_input_border.dart' as local_dashed;
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'package:flutter_quill_delta_from_html/flutter_quill_delta_from_html.dart';
import 'package:vsc_quill_delta_to_html/vsc_quill_delta_to_html.dart';
import 'package:copor_core/src/components/form_fields/editor_dialogs/color_picker_modal.dart';
import 'package:copor_core/src/components/form_fields/editor_dialogs/link_dialog_modal.dart';

class HtmlInputField extends StatefulWidget {
  final TextEditingController controller;
  final String labelText;
  final String? required;
  final EdgeInsetsGeometry padding;
  final EdgeInsetsGeometry? contentPadding;
  final void Function(String)? onChanged;
  final bool autoFocus;

  const HtmlInputField({
    super.key,
    required this.controller,
    required this.labelText,
    this.required,
    this.padding = const EdgeInsets.only(top: 6, bottom: 15),
    this.contentPadding,
    this.onChanged,
    this.autoFocus = false,
  });

  @override
  State<HtmlInputField> createState() => _HtmlInputFieldState();
}

class _HtmlInputFieldState extends State<HtmlInputField> {
  final _fieldKey = GlobalKey<FormFieldState<String>>();
  final _editorFocusNode = FocusNode();
  final _editorScrollController = ScrollController();
  late final QuillController _quillController;
  late final ScrollController _toolbarScrollController;

  @override
  void initState() {
    super.initState();
    _quillController = QuillController(
      document: _documentFromHtml(widget.controller.text),
      selection: const TextSelection.collapsed(offset: 0),
    );
    _quillController.addListener(_onQuillChanged);
    _toolbarScrollController = ScrollController();

    if (widget.autoFocus) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) {
          _editorFocusNode.requestFocus();
          _userUnfocused = false;
        }
      });
    }

    _editorFocusNode.addListener(() {
      if (!_editorFocusNode.hasFocus) {
        _userUnfocused = true;
      }
    });
  }

  @override
  void dispose() {
    _quillController.removeListener(_onQuillChanged);
    _quillController.dispose();
    _editorFocusNode.dispose();
    _editorScrollController.dispose();
    _toolbarScrollController.dispose();
    super.dispose();
  }

  Document _documentFromHtml(String html) {
    if (html.trim().isEmpty) return Document();
    return Document.fromDelta(HtmlToDelta().convert(html));
  }

  String _currentHtml() {
    if (_quillController.document.isEmpty()) return '';

    final deltaJson = _quillController.document.toDelta().toJson();
    final html = QuillDeltaToHtmlConverter(deltaJson.cast<Map<String, dynamic>>()).convert();

    return _sanitizeHtml(_decodeHtmlEntities(html));
  }

  void _onQuillChanged() {
    final html = _currentHtml();
    widget.controller.text = html;
    _fieldKey.currentState?.didChange(html);
    widget.onChanged?.call(html);
    if (mounted) setState(() {});
  }

  bool _userUnfocused = false;

  void _restoreEditorFocus({bool force = false}) {
    if (!mounted) return;
    if (_userUnfocused && !force) return;
    FocusScope.of(context).requestFocus(_editorFocusNode);
    _userUnfocused = false;
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: widget.padding,
      child: FormField<String>(
        key: _fieldKey,
        initialValue: widget.controller.text,
        autovalidateMode: AutovalidateMode.onUserInteraction,
        validator: _validateInput,
        builder: (field) {
          return InputDecorator(
            decoration: _buildDecoration(context, errorText: field.errorText),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Row(
                  children: [
                    IconButton(
                      icon: Semantics(label: 'Scroll left', child: const Icon(Icons.chevron_left)),
                      onPressed: () {
                        _restoreEditorFocus();
                        _scrollToolbarBy(-120);
                      },
                    ),
                    Expanded(
                      child: Listener(
                        onPointerSignal: (event) {
                          if (event is PointerScrollEvent) {
                            _handleToolbarPointerScroll(event.scrollDelta.dy);
                          }
                        },
                        child: FocusScope(
                          node: FocusScopeNode(canRequestFocus: false),
                          child: SingleChildScrollView(
                            controller: _toolbarScrollController,
                            scrollDirection: Axis.horizontal,
                            child: QuillSimpleToolbar(
                              controller: _quillController,
                              config: QuillSimpleToolbarConfig(
                                multiRowsDisplay: true,
                                showDividers: true,
                                showFontFamily: true,
                                showFontSize: true,
                                showBoldButton: true,
                                showItalicButton: true,
                                showUnderLineButton: true,
                                showStrikeThrough: true,
                                showInlineCode: true,
                                showColorButton: false,
                                showBackgroundColorButton: false,
                                showClearFormat: true,
                                showAlignmentButtons: true,
                                showLeftAlignment: true,
                                showCenterAlignment: true,
                                showRightAlignment: true,
                                showJustifyAlignment: true,
                                showHeaderStyle: true,
                                showListNumbers: true,
                                showListBullets: true,
                                showListCheck: true,
                                showCodeBlock: true,
                                showQuote: true,
                                showIndent: true,
                                showLink: false,
                                showUndo: true,
                                showRedo: true,
                                showSearchButton: true,
                                showSubscript: true,
                                showSuperscript: true,
                                customButtons: [
                                  QuillToolbarCustomButtonOptions(
                                    icon: Builder(
                                      builder: (ctx) {
                                        final style = _quillController.getSelectionStyle();
                                        final col = _colorFromAttribute(
                                          style.attributes['color']?.value,
                                        );
                                        return Semantics(
                                          label: 'Text color',
                                          child: Icon(
                                            Icons.format_color_text,
                                            color: col ?? Theme.of(ctx).iconTheme.color,
                                          ),
                                        );
                                      },
                                    ),
                                    onPressed: () async {
                                      _restoreEditorFocus();
                                      final color = await showColorPickerModal(
                                        context,
                                        _quillController,
                                        isBackground: false,
                                      );
                                      if (color != null) {
                                        final hex = color
                                            .toARGB32()
                                            .toRadixString(16)
                                            .padLeft(8, '0');
                                        final hexWithHash = '#${hex.substring(2)}';
                                        _quillController.formatSelection(
                                          ColorAttribute(hexWithHash),
                                        );
                                      }
                                      _restoreEditorFocus();
                                    },
                                  ),
                                  QuillToolbarCustomButtonOptions(
                                    icon: Builder(
                                      builder: (ctx) {
                                        final style = _quillController.getSelectionStyle();
                                        final col = _colorFromAttribute(
                                          style.attributes['background']?.value,
                                        );
                                        return Semantics(
                                          label: 'Background color',
                                          child: Icon(
                                            Icons.format_color_fill,
                                            color: col ?? Theme.of(ctx).iconTheme.color,
                                          ),
                                        );
                                      },
                                    ),
                                    onPressed: () async {
                                      _restoreEditorFocus();
                                      final color = await showColorPickerModal(
                                        context,
                                        _quillController,
                                        isBackground: true,
                                      );
                                      if (color != null) {
                                        final hex = color
                                            .toARGB32()
                                            .toRadixString(16)
                                            .padLeft(8, '0');
                                        final hexWithHash = '#${hex.substring(2)}';
                                        _quillController.formatSelection(
                                          BackgroundAttribute(hexWithHash),
                                        );
                                      }
                                      _restoreEditorFocus();
                                    },
                                  ),
                                  QuillToolbarCustomButtonOptions(
                                    icon: Semantics(label: 'Insert link', child: Icon(Icons.link)),
                                    onPressed: () async {
                                      _restoreEditorFocus();
                                      await showLinkDialogModal(context, _quillController);
                                      _restoreEditorFocus();
                                    },
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    IconButton(
                      icon: Semantics(
                        label: 'Scroll right',
                        child: const Icon(Icons.chevron_right),
                      ),
                      onPressed: () {
                        _restoreEditorFocus();
                        _scrollToolbarBy(120);
                      },
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                GestureDetector(
                  behavior: HitTestBehavior.opaque,
                  onTapDown: (_) => _restoreEditorFocus(force: true),
                  child: SizedBox(
                    height: 220,
                    child: QuillEditor.basic(
                      controller: _quillController,
                      focusNode: _editorFocusNode,
                      scrollController: _editorScrollController,
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  InputDecoration _buildDecoration(BuildContext context, {String? errorText}) {
    return local_dashed.DashedInputBorder.buildDecoration(
      context: context,
      labelText: widget.labelText,
      errorText: errorText,
      contentPadding:
          widget.contentPadding ?? const EdgeInsets.symmetric(horizontal: 8, vertical: 12),
    );
  }

  String? _validateInput(String? value) {
    if (widget.required != null && (value == null || value.trim().isEmpty)) {
      return widget.required;
    }
    return null;
  }

  String _decodeHtmlEntities(String html) {
    return html
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>')
        .replaceAll('&quot;', '"')
        .replaceAll('&#39;', "'")
        .replaceAll('&nbsp;', ' ')
        .replaceAll('&amp;', '&');
  }

  void _scrollToolbarBy(double delta) {
    if (!_toolbarScrollController.hasClients) return;
    final max = _toolbarScrollController.position.maxScrollExtent;
    final target = (_toolbarScrollController.offset + delta).clamp(0.0, max);
    _toolbarScrollController.animateTo(
      target,
      duration: const Duration(milliseconds: 150),
      curve: Curves.ease,
    );
  }

  void _handleToolbarPointerScroll(double delta) {
    if (!_toolbarScrollController.hasClients) return;
    final target = (_toolbarScrollController.offset + delta).clamp(
      0.0,
      _toolbarScrollController.position.maxScrollExtent,
    );
    _toolbarScrollController.jumpTo(target);
  }

  Color? _colorFromAttribute(dynamic attrValue) {
    try {
      if (attrValue is String) {
        var s = attrValue.replaceFirst('#', '');
        if (s.length == 6) s = 'ff$s';
        if (s.length == 8) return Color(int.parse(s, radix: 16));
      }
    } catch (_) {}
    return null;
  }

  String _sanitizeHtml(String html) {
    final withoutUnsafeTags = html
        .replaceAll(
          RegExp(
            r'<\s*(script|style|iframe|object|embed|form|input|button|meta|link|base)\b[^>]*>.*?<\s*/\s*\1\s*>',
            caseSensitive: false,
            dotAll: true,
          ),
          '',
        )
        .replaceAll(
          RegExp(
            r'<\s*(script|style|iframe|object|embed|form|input|button|meta|link|base)\b[^>]*/?\s*>',
            caseSensitive: false,
          ),
          '',
        );

    return withoutUnsafeTags
        .replaceAll(RegExp(r'\s+on[a-zA-Z]+\s*=\s*"[^"]*"', caseSensitive: false), '')
        .replaceAll(RegExp(r"\s+on[a-zA-Z]+\s*=\s*'[^']*'", caseSensitive: false), '')
        .replaceAll(RegExp(r'\s+on[a-zA-Z]+\s*=\s*[^\s>]+', caseSensitive: false), '')
        .replaceAll(RegExp(r'javascript\s*:', caseSensitive: false), '');
  }
}
