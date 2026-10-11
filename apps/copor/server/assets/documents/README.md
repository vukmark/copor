# Documents

Static PDFs served by `GET /documents/Impressum/` and
`GET /documents/TermsAndConditions/` (`client/src/Core/Documents`). Both are
placeholders — replace them with your own before release.

Editable sources are in `source/` (the logo is `../img/documents/logo.png`). To regenerate a PDF after editing (run from
this directory):

```bash
google-chrome --headless --no-pdf-header-footer --print-to-pdf=Impressum.pdf source/Impressum.html
google-chrome --headless --no-pdf-header-footer --print-to-pdf=TermsAndConditions.pdf source/TermsAndConditions.html
```

Any HTML-to-PDF tool works; you can also replace the PDFs directly.
