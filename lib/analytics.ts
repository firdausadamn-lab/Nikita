export type AnalyticsEvent =
  | "hero_cta_clicked"
  | "method_viewed"
  | "pathway_tool_completed"
  | "checkout_started"
  | "workout_started"
  | "workout_completed"
  | "resource_downloaded"
  | "coaching_application_submitted";

export function track(event: AnalyticsEvent, payload: Record<string, string | number | boolean> = {}) {
  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics:development]", event, payload);
    return;
  }
  // Connect a consent-aware analytics provider here. Never send health data.
}
