# Changelog

The app's changelog, served by the Help module (public):

- `GET /help/changelog` — every version with its date, newest first (About).
- `GET /help/changelog/<version>` or `/latest` — one entry (About, the public
  app installation page, the login page's install button).

One Markdown file per version, named `<version>.md` (e.g. `1.4.0.md`);
versions sort newest first by their dot-separated numbers. The first
`YYYY-MM-DD` in the file is its publish date. An optional HTML comment lists
the download links the installation page offers:

```
<!--
RELEASES

iOS: https://testflight.apple.com/join/…
Android: https://example.com/download/app.1.4.0.apk
-->
```

`template.txt` is a starting point (not served: only `.md` files are). This
folder is the app's content, not module code — edit it without an app
release; the files are read on every request.
