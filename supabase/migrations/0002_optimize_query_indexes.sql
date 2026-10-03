DROP INDEX "profile_userId_idx";--> statement-breakpoint
DROP INDEX "organization_slug_idx";--> statement-breakpoint
DROP INDEX "organization_member_organizationId_idx";--> statement-breakpoint
CREATE INDEX "organization_member_organizationId_role_idx" ON "organization_member" USING btree ("organization_id","role","joined_at");--> statement-breakpoint
CREATE INDEX "announcement_organization_created_at_idx" ON "announcement" USING btree ("organization_id","created_at");--> statement-breakpoint
CREATE INDEX "event_organization_status_starts_at_idx" ON "event" USING btree ("organization_id","status","starts_at");--> statement-breakpoint
CREATE INDEX "event_organization_status_created_at_idx" ON "event" USING btree ("organization_id","status","created_at");