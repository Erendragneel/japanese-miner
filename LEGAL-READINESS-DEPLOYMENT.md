# Legal-readiness deployment checklist

Build: v6.4.170

## Implemented in source

- Direct account creation requires a 13+ learner, adult/guardian, or educator role.
- No exact birth date is collected.
- Under-13 learners are directed to use an adult-managed flow; direct signup is blocked.
- Terms and Privacy acceptance is versioned in account metadata and `legal_consents`.
- Existing accounts must accept the current policy versions before continuing.
- A Privacy & Safety center provides data inventory, JSON export, privacy requests, and permanent deletion.
- Parent/Teacher links remain student-approved and read-only.
- Parent/Teacher gradebook reports expose only whitelisted learning summaries, assessment history, lesson mastery, active study time, and streak data.
- Educational-framework and non-affiliation disclaimers are visible.
- Privacy Policy, Terms, third-party notices, asset register, claims register, and preliminary mark screen are included.

## Required Supabase deployment

From the configured Supabase project directory:

```text
supabase db push
supabase functions deploy account-delete
```

`supabase db push` must include both `202608180001_cross_device_parent_teacher_links.sql` and `202608200001_parent_teacher_gradebook_reports.sql`. The latter refreshes the RPC signatures and PostgREST schema cache used by the Parent/Teacher Center.

The deletion function requires the standard project `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` secrets available to Supabase Edge Functions. Confirm that authenticated calls can delete only the caller's own account.

## Required operator details before public launch

- Replace the policy placeholder with a working privacy/business contact and the operator's correct legal identity.
- Confirm the countries and ages the service will support with privacy counsel.
- If under-13 accounts will be offered, build and independently review a verifiable-parental-consent workflow before enabling them.
- Complete all `HOLD` items in `ASSET-PROVENANCE.md`.
- Have counsel approve the Privacy Policy, Terms, child-directed design, subscription disclosures, and trademark clearance.
- Test export, request submission, account deletion, data retention, backups, and service-provider deletion in production.
- Publish only claims allowed by `EDUCATIONAL-CLAIMS-REGISTER.md` unless new substantiation is documented.

## Privacy request operations

An administrator can use the RPCs from the legal migration to list and update privacy requests. Establish an internal response owner, identity-verification procedure, response deadline, deletion log, and backup-retention schedule before launch.
