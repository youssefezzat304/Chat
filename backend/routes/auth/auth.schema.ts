import { object, string, TypeOf } from "zod";

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: "Email is required,",
    }).email("Invalid Email or password."),
    password: string({
      required_error: "Password is required,",
    }).min(6, "Invalid Email or password."),
  }),
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>["body"];
