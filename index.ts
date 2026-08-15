import { json, options } from "../_shared/http.ts";
import { requireUser, serviceClient } from "../_shared/supabase.ts";

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return options(request);
  if (request.method !== "POST") return json(request, { error: "Method not allowed" }, 405);
  try {
    const user = await requireUser(request);
    const body = await request.json().catch(() => ({}));
    if (body?.confirm !== "DELETE") return json(request, { error: "Deletion confirmation is required" }, 400);
    const db = serviceClient();
    // Foreign keys use ON DELETE CASCADE for saves, Patreon links, legal
    // consent, OAuth states, and privacy requests. Deleting the Auth user is
    // therefore the single authoritative account-erasure operation.
    const { error } = await db.auth.admin.deleteUser(user.id, false);
    if (error) throw error;
    return json(request, { deleted: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Account deletion failed";
    const unauthorized = /authorization|auth|token|session/i.test(message);
    return json(request, { error: unauthorized ? "Sign in again before deleting the account" : "The account could not be deleted" }, unauthorized ? 401 : 500);
  }
});
