import { object, string, TypeOf, number, literal, array } from "zod";
import { ErrorMessage } from "../../utils/exceptions/baseError.exception";

export const createUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is required,",
    }).email("This is not a valid E-mail."),
    password: string({
      required_error: "Password is required,",
    }).min(6, "Password should be min of 6 chars."),
    confirmPassword: string({
      required_error: "Password confirmation is required,",
    }),
    displayName: string()
      .min(3, "Display name should be mininum of 3 characters.")
      .max(32, "Display name should be no more than of 32 characters."),
  }).refine((data) => data.password === data.confirmPassword, {
    message: ErrorMessage.NO_MATCHED_PASS,
    path: ["confirmPassword"],
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];

export const UserSchema = object({
  body: object({
    displayName: string()
      .min(3, "Display name should be mininum of 3 characters.")
      .max(32, "Display name should be no more than of 32 characters.")
      .optional()
      .default("User"),
    email: string()
      .min(1, "Email is required.")
      .email("This is not a valid E-mail."),
    phoneNumber: string()
      .min(1, "Phone number should be mininum of 1 character.")
      .max(25, "Phone number should be no more than 25 characters.")
      .optional()
      .default("")
      .or(literal("")),
    status: string()
      .max(250, "Your status should be no more than 250 characters.")
      .optional()
      .default("Hey there I am using chat app...")
      .or(literal("")),
    country: string().min(2).optional().or(literal("")),
    city: string().min(2).optional().or(literal("")),
    postalCode: string().min(1).optional().or(literal("")),
    birthDate: string().optional().or(literal("")),
    friendRequestsSent: array(object({ displayName: string() }).optional()),
    friendRequestsReceived: array(object({ displayName: string() }).optional()),
  }).partial(),
});

export type UserSchemaInput = TypeOf<typeof UserSchema>["body"];

export const FriendListSchema = array(UserSchema);
export type CreateFriendListSchema = TypeOf<typeof FriendListSchema>;

export const FriendsRequestedSchema = array(UserSchema);
export type CreateFriendsRequestedSchema = TypeOf<
  typeof FriendsRequestedSchema
>;
