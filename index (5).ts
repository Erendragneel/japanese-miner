import { createHmac, timingSafeEqual } from "node:crypto";
import { Buffer } from "node:buffer";
import { requiredEnv } from "../_shared/config.ts";
import { connectionRow, fetchCampaignMember } from "../_shared/patreon.ts";
import { serviceClient } from "../_shared/supabase.ts";

function validSignature(rawBody: string, received: string): boolean {
  if (!/^[a-f0-9]{32}$/i.test(received)) return false;
  const expected = createHmac("md5", requiredEnv("PATREON_WEBHOOK_SECRET")).update(rawBody).digest("hex");
  return timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(received, "hex"));
}

Deno.serve(async (request) => {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const rawBody = await request.text();
  const signature = request.headers.get("x-patreon-signature") || "";
  if (!validSignature(rawBody, signature)) return new Response("Invalid signature", { status: 401 });
  try {
    const event = request.headers.get("x-patreon-event") || "";
    const payload = JSON.parse(rawBody);
    const member = payload?.data || {};
    const memberId = String(member.id || "");
    const campaignId = String(member.relationships?.campaign?.data?.id || "");
    const patreonUserId = String(member.relationships?.user?.data?.id || "");
    if (!memberId || campaignId !== requiredEnv("PATREON_CAMPAIGN_ID")) return new Response(null, { status: 202 });
    const db = serviceClient();
    if (event === "members:delete") {
      let query = db.from("patreon_connections").update({ game_tier: 0, patreon_tier_id: null, entitled_tier_ids: [], patron_status: "former_patron", verified_at: new Date().toISOString(), updated_at: new Date().toISOString() });
      query = patreonUserId ? query.eq("patreon_user_id", patreonUserId) : query.eq("patreon_member_id", memberId);
      const { error } = await query;
      if (error) throw error;
      return new Response(null, { status: 204 });
    }
    const snapshot = await fetchCampaignMember(memberId);
    const lookup = patreonUserId || snapshot.patreonUserId;
    const { data: existing, error: findError } = await db.from("patreon_connections").select("user_id").eq("patreon_user_id", lookup).maybeSingle();
    if (findError) throw findError;
    if (!existing) return new Response(null, { status: 202 });
    const { error: updateError } = await db.from("patreon_connections").update(connectionRow(existing.user_id, snapshot)).eq("user_id", existing.user_id);
    if (updateError) throw updateError;
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Patreon webhook failed", error);
    return new Response("Webhook processing failed", { status: 500 });
  }
});
