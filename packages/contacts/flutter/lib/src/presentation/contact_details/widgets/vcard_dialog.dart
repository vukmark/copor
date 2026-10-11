import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_contacts/src/data/model/contact_model.dart';
import 'package:copor_contacts/src/data/model/translation/contact_translation.dart';
import 'package:copor_contacts/src/utils/qr_utils.dart';
import 'package:copor_contacts/src/utils/share_utils.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:flutter/material.dart';

void openMobileSheet(
  BuildContext context,
  ContactModel contact,
  String vCard,
  ContactPageTranslation t,
) {
  showModalBottomSheet(
    context: context,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(6.0))),
    isScrollControlled: true,
    builder: (_) => SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: Colors.grey[300],
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            const SizedBox(height: 16.0),
            buildQrWidget(vCard),
            const SizedBox(height: 24.0),
            DTButton.primary(
              icon: PhosphorIconsThin.shareNetwork,
              label: t.SHARE_VCARD,
              onPressed: () async {
                try {
                  Navigator.of(context).pop();
                  await shareVCard(vCard);
                } catch (e) {
                  if (context.mounted) {
                    context.getBloc.appScaffold.addBanner(
                      DSBanner.error('${t.VCARD_SHARE_ERR}: $e', source: 'vcard_share'),
                    );
                  }
                }
              },
            ),
            const SizedBox(height: 16.0),
          ],
        ),
      ),
    ),
  );
}

void openWebDialog(
  BuildContext context,
  ContactModel contact,
  String vCard,
  ContactPageTranslation t,
) {
  showDialog(
    context: context,
    builder: (dialogContext) => AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
      titlePadding: EdgeInsets.zero,
      title: null,
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            SizedBox(
              height: 40,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Center(
                    child: Text(
                      t.QRCODE_VCARD,
                      textAlign: TextAlign.center,
                      style: CoporTextStyles.of(context).bodyStrong,
                    ),
                  ),
                  Positioned(
                    right: 0,
                    top: 0,
                    bottom: 0,
                    child: IconButton(
                      icon: const Icon(PhosphorIconsThin.x),
                      onPressed: () => Navigator.of(dialogContext).pop(),
                      splashRadius: 20,
                      padding: EdgeInsets.zero,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            Center(
              child: SizedBox(width: 250, height: 250, child: buildQrWidget(vCard, size: 250)),
            ),
            const SizedBox(height: 24),

            DTButton.surface(
              icon: PhosphorIconsThin.download,
              label: t.DOWNLOAD_CONTACT,
              onPressed: () async {
                try {
                  Navigator.of(dialogContext).pop();
                  await shareVCard(vCard);
                } catch (e) {
                  if (dialogContext.mounted) {
                    dialogContext.getBloc.appScaffold.addBanner(
                      DSBanner.error('${t.VCARD_DOWNLOAD_ERR}: $e', source: 'vcard_download'),
                    );
                  }
                }
              },
            ),
          ],
        ),
      ),
    ),
  );
}
