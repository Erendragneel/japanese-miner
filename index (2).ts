import { requiredEnv, patreonCallbackUrl } from "../_shared/config.ts";
import { randomState, sha256 } from "../_shared/crypto.ts";
import { json, options } from "../_shared/http.ts";
import { requireUser, serviceClient } from "../_shared/supabase.ts";

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return options(request);
  if (request.method !== "POST") return json(request, { error: "Method not allowed" }, 405);
  try {
    const user = await requireUser(request);
    const state = randomState();
    const digest = await sha256(state);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    const db = serviceClient();
    await db.from("patreon_oauth_states").delete().eq("user_id", user.id);
    const { error } = await db.from("patreon_oauth_states").insert({ state_digest: digest, user_id: user.id, expires_at: expiresAt });
    if (error) throw error;
    const authorize = new URL("https://www.patreon.com/oauth2/authorize");
    authorize.searchParams.set("response_type", "code");
    authorize.searchParams.set("client_id", requiredEnv("PATREON_CLIENT_ID"));
    authorize.searchParams.set("redirect_uri", patreonCallbackUrl());
    authorize.searchParams.set("scope", "identity identity.memberships");
    authorize.searchParams.set("state", state);
    return json(request, { authorization_url: authorize.toString(), expires_at: expiresAt });
  } catch (error) {
    const unauthorized = error instanceof Error && error.message === "Unauthorized";
    return json(request, { error: unauthorized ? "Unauthorized" : "Could not start Patreon linking" }, unauthorized ? 401 : 500);
  }
});
