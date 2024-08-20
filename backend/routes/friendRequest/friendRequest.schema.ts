import { object, string, TypeOf, enum as enum_, date } from "zod";

export const createFriendRequestSchema = object({
  requesterEmail: string({ required_error: "Requester ID is required" }),
  recipientEmail: string({ required_error: "Recipient ID is required" }),
  status: enum_(["pending", "accepted", "rejected"]).default("pending"),
});

export type CreateFriendRequestInput = TypeOf<typeof createFriendRequestSchema>;
