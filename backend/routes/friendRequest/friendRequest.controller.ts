import { NextFunction, Request, Response, Router } from "express";
import { CreateFriendRequestInput } from "./friendRequest.schema";
import { DocumentType } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { FriendRequestModel, UserModel } from "../models";
import { User } from "../user/user.model";
import { FriendRequestServices } from "./fiendRequest.service";
import { FriendRequest } from "./friendRequest.model";

const FriendRequestController = Router();
const services = new FriendRequestServices();

const friendRequest = async (
  req: Request<{}, {}, CreateFriendRequestInput>,
  res: Response,
  next: NextFunction,
) => {
  const { requesterEmail, recipientEmail } = req.body;

  try {
    const requester = (await UserModel.findOne({
      email: requesterEmail,
    }).exec()) as DocumentType<User> | null;
    const recipient = (await UserModel.findOne({
      email: recipientEmail,
    }).exec()) as DocumentType<User> | null;

    if (!requester || !recipient) {
      return res.status(404).json({ message: "User not found." });
    }

    if (requester.friends.includes(recipient._id)) {
      return res.status(400).json({ message: "You are already friends" });
    }

    const existingRequest = (await FriendRequestModel.findOne({
      requester: requester._id,
      recipient: recipient._id,
    }).exec()) as DocumentType<FriendRequest> | null;

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    await UserModel.updateOne(
      { _id: recipient._id },
      { $push: { "friendRequests.incoming": requester._id } },
    ).exec();
    await UserModel.updateOne(
      { _id: requester._id },
      { $push: { "friendRequests.outgoing": recipient._id } },
    ).exec();

    const friendRequest = new FriendRequestModel({
      requester: requester._id,
      recipient: recipient._id,
      status: "pending",
    }) as DocumentType<FriendRequest>;

    await friendRequest.save();

    return res.status(200).json({ message: "Friend request sent." });
  } catch (error) {
    console.error("Error sending friend request:", error);
    return next(
      res.status(500).json({
        message: "An error occurred while sending the friend request.",
      }),
    );
  }
};

const friendAccept = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { requesterId, recipientId } = req.body;

  try {
    if (!Types.ObjectId.isValid(recipientId)) {
      return res.status(400).json({ message: "Invalid recipient ID" });
    }

    const friendRequest = (await FriendRequestModel.findOne({
      recipient: recipientId,
      requester: requesterId,
    })) as DocumentType<FriendRequest> | null;

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Friend request already processed" });
    }

    const updatedUser = (await services.acceptAndUpdate({
      requesterId,
      recipientId,
    })) as DocumentType<FriendRequest> | null;

    return res.status(200).send(updatedUser);
  } catch (error) {
    console.error("Error accepting friend request:", error);
    return next(
      res.status(500).json({
        message: "An error occurred while accepting the friend request",
      }),
    );
  }
};
const friendReject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { requesterId, recipientId } = req.body;

  try {
    if (!Types.ObjectId.isValid(recipientId)) {
      return res.status(400).json({ message: "Invalid recipient ID" });
    }

    const friendRequest = (await FriendRequestModel.findOne({
      recipient: recipientId,
      requester: requesterId,
    })) as DocumentType<FriendRequest> | null;

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Friend request already processed" });
    }

    const updatedUser = (await services.rejectAndUpdate({
      requesterId,
      recipientId,
    })) as DocumentType<User> | null;

    return res.status(200).send(updatedUser);
  } catch (error) {
    console.error("Error rejecting friend request:", error);
    return next(
      res.status(500).json({
        message: "An error occurred while rejecting the friend request",
      }),
    );
  }
};

FriendRequestController.post(
  "/friend-request/add/:recipientEmail",
  // validateResourceMidlleware(createFriendRequestSchema),
  friendRequest,
);
FriendRequestController.patch(
  process.env.ACCEPT_FRIEND_ENDPOINT as string,
  friendAccept,
);
FriendRequestController.patch(
  process.env.REJECT_FRIEND_ENDPOINT as string,
  friendReject,
);

export default FriendRequestController;
