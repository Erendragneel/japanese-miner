import { sha256 } from "../_shared/crypto.ts";
import { publicErrorMessage, redirectToGame } from "../_shared/http.ts";
import { connectionRow, exchangeAuthorizationCode, fetchIdentityMembership } from "../_shared/patreon.ts";
import { serviceClient } from "../_shared/supabase.ts";

Deno.serve(async (request) => {
  try {
    const url = new URL(request.url);
    const providerError = url.searchParams.get("error");
    if (providerError) throw new Error("Patreon authorization was cancelled");
    const code = url.searchParams.get("code") || "";
    const state = url.searchParams.get("state") || "";
    if (!code || !state) throw new Error("Invalid Patreon callback");
    const digest = await sha256(state);
    const db = serviceClient();
    const { data: stored, error: stateError } = await db.from("patreon_oauth_states").select("user_id,expires_at").eq("state_digest", digest).maybeSingle();
    if (stateError || !stored) throw new Error("Invalid or already used connection state");
    await db.from("patreon_oauth_states").delete().eq("state_digest", digest);
    if (Date.parse(stored.expires_at) <= Date.now()) throw new Error("The Patreon connection state expired");
    const accessToken = await exchangeAuthorizationCode(code);
    const snapshot = await fetchIdentityMembership(accessToken);
    const { error: upsertError } = await db.from("patreon_connections").upsert(connectionRow(stored.user_id, snapshot), { onConflict: "user_id" });
    if (upsertError) {
      if (upsertError.code === "23505") throw new Error("This Patreon account is already linked to another supporter account");
      throw upsertError;
    }
    return redirectToGame("linked");
  } catch (error) {
    console.error("Patreon callback failed", error);
    return redirectToGame("error", publicErrorMessage(error));
  }
});
