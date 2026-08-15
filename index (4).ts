import { json, options } from "../_shared/http.ts";
import { requireUser, serviceClient } from "../_shared/supabase.ts";

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return options(request);
  if (request.method !== "POST") return json(request, { error: "Method not allowed" }, 405);
  try {
    const user = await requireUser(request);
    const { error } = await serviceClient().from("patreon_connections").delete().eq("user_id", user.id);
    if (error) throw error;
    return json(request, { disconnected: true, tier: 0 });
  } catch (error) {
    const unauthorized = error instanceof Error && error.message === "Unauthorized";
    return json(request, { error: unauthorized ? "Unauthorized" : "Patreon could not be disconnected" }, unauthorized ? 401 : 500);
  }
});
