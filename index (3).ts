import { offlineGraceDays } from "../_shared/config.ts";
import { json, options } from "../_shared/http.ts";
import { connectionRow, fetchCampaignMember, tierName } from "../_shared/patreon.ts";
import { requireUser, serviceClient } from "../_shared/supabase.ts";

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return options(request);
  if (request.method !== "GET") return json(request, { error: "Method not allowed" }, 405);
  try {
    const user = await requireUser(request);
    const db = serviceClient();
    let { data: connection, error } = await db.from("patreon_connections").select("*").eq("user_id", user.id).maybeSingle();
    if (error) throw error;
    if (!connection) return json(request, { connected: false, tier: 0, tier_name: tierName(0), verified_at: null, grace_until: null });
    const stale = Date.now() - Date.parse(connection.verified_at) > 12 * 60 * 60 * 1000;
    if (stale && connection.patreon_member_id) {
      try {
        const snapshot = await fetchCampaignMember(connection.patreon_member_id);
        const { data: refreshed, error: refreshError } = await db.from("patreon_connections").update(connectionRow(user.id, snapshot)).eq("user_id", user.id).select("*").single();
        if (!refreshError && refreshed) connection = refreshed;
      } catch (syncError) {
        console.warn("Patreon status reconciliation deferred", syncError);
      }
    }
    const verifiedAt = new Date(connection.verified_at);
    const graceUntil = new Date(verifiedAt.getTime() + offlineGraceDays() * 86400000).toISOString();
    return json(request, { connected: true, tier: connection.game_tier, tier_name: tierName(connection.game_tier), patron_status: connection.patron_status, last_charge_status: connection.last_charge_status, verified_at: connection.verified_at, grace_until: graceUntil });
  } catch (error) {
    const unauthorized = error instanceof Error && error.message === "Unauthorized";
    return json(request, { error: unauthorized ? "Unauthorized" : "Membership status could not be loaded" }, unauthorized ? 401 : 500);
  }
});
