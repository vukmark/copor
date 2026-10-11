# Cron Jobs

Reminder doc for scheduled jobs the server needs that aren't set up by the
application itself — they have to be configured on the host.

## Email outbox: `POST /email/send`

### Why this is needed

Emails aren't sent synchronously to the SMTP server. They're queued via
`CreateQueuedEmail` (`POST /email/`) into an outbox table, and only get
delivered when something calls `SendQueuedEmailsController`
(`packages/core/server/src/client/Core/EmailOutbox/SendQueuedEmails/SendQueuedEmailsController.ts`),
which runs two interactors:

- `SendQueuedEmails` (`packages/core/server/src/domain/Core/EmailOutbox/interactor/SendQueuedEmails.ts`)
  — pulls up to 50 `getReadyToSend` rows, sends each via
  `NodemailerEmailSender`, and marks it `sent` or records a failed attempt.
- `DeleteSentOldQueuedEmails` — deletes sent rows older than 30 days.

Nothing in the app calls `SendQueuedEmails` inline after queueing, so this
endpoint is the **only** delivery trigger — for new emails and for retries of
failed ones alike. **Without a cron job hitting `/email/send` periodically,
queued emails are never sent.**

### Route details

- Path: `POST /email/send` (mounted at `/email` in
  `packages/core/server/src/client/Core/MainRouter.ts` via `EmailOutboxRouter`).
- No request body, no auth required — `/email/send` is explicitly listed in
  `JwtAuthenticationMiddleware`'s `excludedEndpoints`
  (`packages/core/server/src/client/Core/Middleware/JwtAuthenticationMiddleware.ts`), so it's
  reachable without a JWT. This is what makes it callable from a cron job in
  the first place, but it also means it should only be exposed to
  localhost/internal network at the reverse-proxy level, not the public
  internet.
- Returns `{success: true}` on completion (200), regardless of whether
  individual emails failed (those are recorded per-row, not surfaced in the
  response).

### How to set it up

On the server running the `client` backend, add a crontab entry that hits
the endpoint every minute (adjust the port to match `PORT` in `apps/copor/server/.env`,
default `3000`):

```bash
crontab -e
```

```cron
* * * * * curl -s -o /dev/null -X POST http://localhost:3000/email/send
```

If the server isn't reachable at `localhost` (e.g. running in a container),
target the internal service address instead. No output redirection to a log
file is strictly needed since the endpoint doesn't return anything useful to
log, but `curl -s -o /dev/null -w '%{http_code}\n' ... >> /var/log/email-send-cron.log`
is a reasonable variant if you want a heartbeat trail.

### Status

Not yet configured on any environment as of writing. Needs to be added to
the deployment/provisioning scripts (the deploy helper `tools/helpers/deploy_server.sh`, or the in-house machine setup) so new
environments get it automatically instead of relying on someone remembering
to add it by hand.
