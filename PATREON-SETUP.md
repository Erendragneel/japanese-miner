# Language Miner Patreon setup — beginner version

> **Connected release:** The supplied `patreon-config.js` is already enabled for Supabase project `xfvhweapnqooqsyxtvko`. The backend and Patreon webhook were configured and verified on August 7, 2026. Use the instructions below only when rebuilding or moving the integration to another project.

This is a one-time administrator job. The **View Patreon memberships** button does not perform this setup; it only opens your public Patreon page.

When this guide is finished, players will see **Connect Patreon**, sign in to a small supporter account, approve Patreon, and receive the tier reported by their paid membership.

## The three pieces

Think of the system as three boxes:

1. **GitHub Pages** displays Language Miner.
2. **Supabase** securely verifies accounts and membership status.
3. **Patreon** reports which paid tier the member owns.

The included files contain the code for all three boxes, but you must create the Supabase project and connect your Patreon creator account.

## Before you begin

Have these ready:

- Your own Patreon creator login.
- Your GitHub login for `erendragneel.github.io`.
- A password manager or private paper for secret values.
- The extracted Language Miner release folder on your Windows computer.

Never place a Patreon Client Secret, Creator Access Token, webhook secret, database password, or Supabase service-role key in GitHub, `patreon-config.js`, a screenshot, Discord, or a public message.

For the instructions below, the live game address is assumed to be:

```text
https://erendragneel.github.io/language-miner/
```

If the address in your browser is different, use the full address you actually see, including any repository folder and the final `/`.

---

## Part 1 — Create your Supabase project

1. Open [database.new](https://database.new/) in your browser.
2. Sign in or create a Supabase account.
3. Click **New project** if the project form is not already open.
4. For the project name, enter `language-miner`.
5. Create a strong database password and save it privately. Do not put it in the game files.
6. Choose a region near you and click **Create new project**.
7. Wait until Supabase says the project is ready.

### Copy the three public project details

In Supabase, open your project and find **Project Settings / API** or **Settings / API Keys**. Copy these into a private temporary note:

- **Project reference** — the short ID in the dashboard URL.
- **Project URL** — looks like `https://abcdefgh.supabase.co`.
- **Publishable key** — usually starts with `sb_publishable_`. A legacy `anon` key also works.

The Project URL and publishable/anon key are safe for the browser. The database password and secret/service-role keys are not.

## Part 2 — Configure Supabase sign-in addresses

1. In Supabase, click **Authentication**.
2. Open **URL Configuration**.
3. Set **Site URL** to:

   ```text
   https://erendragneel.github.io/language-miner/
   ```

4. Under **Redirect URLs**, add:

   ```text
   https://erendragneel.github.io/language-miner/**
   ```

5. Save the changes.
6. Leave email confirmation disabled while using Supabase's demonstration email service. Before enabling confirmation for a public launch, configure a custom SMTP provider so registrations are not limited to two messages per hour.

## Part 3 — Create the protected database tables

1. In Supabase, click **SQL Editor**.
2. Click **New query**.
3. On your computer, open this release file:

   ```text
   supabase/migrations/202608060001_patreon_linking.sql
   ```

4. Select and copy everything in that file.
5. Paste it into the Supabase SQL Editor.
6. Click **Run**.
7. A successful run should not show a red error. It creates `patreon_connections` and `patreon_oauth_states` with row-level security.

## Part 4 — Create the Patreon developer client

1. Sign in to Patreon using **your creator account**, not your wife's member account.
2. Open [Patreon Clients & API Keys](https://www.patreon.com/portal/registration/register-clients).
3. Create a new API v2 client.
4. Name it `Language Miner`.
5. For its redirect/callback address, enter this after replacing `YOUR_PROJECT_REF` with the Supabase project reference copied earlier:

   ```text
   https://YOUR_PROJECT_REF.supabase.co/functions/v1/patreon-callback
   ```

6. Save the client.
7. Copy these values into your private note:

   - Client ID
   - Client Secret
   - Creator Access Token

The game requests the Patreon API v2 scopes `identity` and `identity.memberships` when a player connects.

## Part 5 — Find the campaign and tier IDs

Language Miner uses Patreon's permanent numeric IDs, not tier names or prices.

1. In Windows, open the extracted Language Miner folder.
2. Click the folder address bar, type `powershell`, and press Enter.
3. Paste this command and press Enter:

   ```powershell
   powershell -ExecutionPolicy Bypass -File .\FIND-PATREON-IDS.ps1
   ```

4. When asked, paste the Creator Access Token. The token remains hidden and is not saved.
5. The helper will display your campaign ID and tier IDs.
6. Match the displayed tier titles to:

   - Supporter → `PATREON_TIER_1_ID`
   - Companion Keeper → `PATREON_TIER_2_ID`
   - Settlement Founder → `PATREON_TIER_3_ID`

Save those four IDs in your private note.

## Part 6 — Add the protected secrets to Supabase

1. In Supabase, open **Edge Functions**.
2. Open **Secrets Management**.
3. Add each key below with its real value:

| Secret name | Value to enter |
|---|---|
| `APP_URL` | `https://erendragneel.github.io/language-miner/` |
| `ALLOWED_ORIGINS` | `https://erendragneel.github.io` |
| `PATREON_CLIENT_ID` | Client ID from Patreon |
| `PATREON_CLIENT_SECRET` | Client Secret from Patreon |
| `PATREON_CAMPAIGN_ID` | Campaign ID from the helper |
| `PATREON_CREATOR_ACCESS_TOKEN` | Creator Access Token from Patreon |
| `PATREON_TIER_1_ID` | Supporter tier ID |
| `PATREON_TIER_2_ID` | Companion Keeper tier ID |
| `PATREON_TIER_3_ID` | Settlement Founder tier ID |
| `PATREON_OFFLINE_GRACE_DAYS` | `7` |
| `PATREON_USER_AGENT` | `Language Miner - Membership Linking` |

Do not manually expose `SUPABASE_SERVICE_ROLE_KEY`. Hosted Supabase Edge Functions receive the legacy service-role variable automatically.

## Part 7 — Deploy the five Supabase functions

The shared backend files are easiest to deploy together with the Supabase command-line tool.

1. Install the current LTS version of Node.js if the `npx` command is not available on your computer.
2. Open the extracted Language Miner folder.
3. Click the folder address bar, type `powershell`, and press Enter.
4. Run:

   ```powershell
   npx supabase login
   ```

5. Approve the Supabase login in the browser window.
6. Run the following command, replacing `YOUR_PROJECT_REF`:

   ```powershell
   npx supabase link --project-ref YOUR_PROJECT_REF
   ```

7. If Supabase requests the database password, enter the private password created in Part 1.
8. Deploy all five functions:

   ```powershell
   npx supabase functions deploy
   ```

9. In the Supabase dashboard, open **Edge Functions** and confirm these five names appear:

   - `patreon-start`
   - `patreon-callback`
   - `patreon-status`
   - `patreon-unlink`
   - `patreon-webhook`

## Part 8 — Create the Patreon webhook

1. Return to Patreon while signed in as your creator account.
2. Open [Patreon Webhooks](https://www.patreon.com/portal/registration/register-webhooks).
3. Create a webhook for your creator campaign.
4. For the webhook URL, replace the project reference here:

   ```text
   https://YOUR_PROJECT_REF.supabase.co/functions/v1/patreon-webhook
   ```

5. Enable these events:

   - `members:create`
   - `members:update`
   - `members:delete`

6. Save the webhook.
7. Copy its webhook secret.
8. Return to **Supabase → Edge Functions → Secrets Management**.
9. Add `PATREON_WEBHOOK_SECRET` with that copied value and save it.

Supabase makes updated secrets available to the functions without another deployment.

## Part 9 — Turn on Patreon inside Language Miner

Open `patreon-config.js` and change the placeholder values. The finished file should look like this, using your real public values:

```js
window.JAPANESE_MINER_PATREON_CONFIG = Object.freeze({
  enabled: true,
  supabaseUrl: "https://YOUR_PROJECT_REF.supabase.co",
  supabaseAnonKey: "YOUR_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY",
  patreonJoinUrl: "https://www.patreon.com/cw/Erendragneel/membership",
  offlineGraceDays: 7
});
```

Only the Project URL and public publishable/anon key go in this browser file. Never place the Client Secret, Creator Access Token, webhook secret, database password, or service-role key here.

Upload the edited release files to the GitHub repository that publishes `https://erendragneel.github.io/language-miner/`.

## Part 10 — Test it safely

Use your wife's Patreon member account or another controlled member account for this test. Do not use your admin/developer game profile because that profile already receives the developer Tier 3 override.

1. Open Language Miner in a private/incognito browser window.
2. Create or sign in to a normal Language Miner account at the game entrance.
3. Open **Menu → Patreon**. The same game account is already active; no second supporter account is needed.
4. Click **Connect Patreon**.
5. Before approving, verify Patreon shows the member account you intend to test—not your creator account by mistake.
6. Approve the connection.
7. Return to the game and click **Refresh membership** if the tier does not appear immediately.
8. Confirm the correct tier is shown and its game features unlock.

To test a save created before unified accounts, open **Existing local save or administrator**, enter that save's player name and PIN, and choose **Use existing save**. Then open **Menu → Patreon → Attach account to this save** and sign in to or create the Language Miner account that should own it. The selected save keeps its progress and receives the verified Patreon tier.

## What success looks like

- The yellow **Administrator setup required** card disappears.
- The game entrance offers one Language Miner account sign-in.
- The Patreon panel reuses that session and shows **Connect Patreon** without requesting another account.
- After Patreon approval, it displays the verified tier.
- Upgrades, downgrades, payment failures, and cancellations update through the webhook or the next membership refresh.

## If something fails

- **Still says setup required:** `enabled` is not `true`, or the Project URL/public key in `patreon-config.js` is still a placeholder.
- **Connect Patreon reports an error:** recheck the callback address, client ID, Client Secret, and deployed functions.
- **Connected but tier is zero:** recheck the campaign ID, tier IDs, member status, and that the player authorized the correct Patreon account.
- **Existing save still shows Patreon locked:** open **Menu → Patreon**, choose **Attach account to this save**, and sign in with the Language Miner account that owns the subscription. Do not use the administrator/developer profile for member testing.
- **Changes do not update:** recheck the webhook URL, webhook events, and `PATREON_WEBHOOK_SECRET`.
- **Account creation is email-rate-limited:** keep email confirmation disabled until custom SMTP is configured, or configure custom SMTP before enabling confirmation.

## Security rules

- Keep all protected values in Supabase Edge Function Secrets.
- Never commit `.env` files or private tokens.
- The browser never stores Patreon access tokens.
- A Patreon account can link to only one Language Miner account.
- Patreon webhooks are verified before their contents are trusted.
- Existing Language Miner save data remains local to the browser unless the player exports a backup.
