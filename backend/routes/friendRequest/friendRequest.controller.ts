import { NextFunction, Request, Response, Router } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import { CreateFriendRequestInput } from "./friendRequest.schema";
import { DocumentType } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { FriendRequestModel, UserModel } from "../models";
import { User } from "../user/user.model";
import { FriendRequestServices } from "./fiendRequest.service";

class FriendRequestController implements Controller {
  public path = "/friend-request";
  public router = Router();
  private services = new FriendRequestServices();

  constructor() {
    this.initialseRoutes();
  }
  private initialseRoutes(): void {
    this.router.post(
      `${this.path}/add/:recipientEmail`,
      // validateResourceMidlleware(createFriendRequestSchema),
      this.friendRequest
    );
    this.router.patch(`${this.path}/accepted/:id`, this.friendAccept);
    this.router.patch(`${this.path}/rejected/:id`, this.friendReject);
  }

  private friendRequest = async (
    req: Request<{}, {}, CreateFriendRequestInput>,
    res: Response,
    next: NextFunction
  ) => {
    const { requesterEmail, recipientEmail } = req.body;

    try {
      const requester = (await UserModel.findOne({
        email: requesterEmail,
      })) as DocumentType<User> | null;
      const recipient = (await UserModel.findOne({
        email: recipientEmail,
      })) as DocumentType<User> | null;

      if (!requester || !recipient) {
        return res
          .status(404)
          .json({ message: "User not found.", 1: requester, 2: recipient });
      }

      if (requester.friends.includes(recipient)) {
        return res.status(400).json({ message: "You are already friends" });
      }

      const existingRequest = await FriendRequestModel.findOne({
        requester: requester._id,
        recipient: recipient._id,
      });

      if (existingRequest) {
        return res.status(400).json({ message: "Friend request already sent" });
      }

      if (existingRequest) {
        return res
          .status(400)
          .json({ message: "Friend request already sent." });
      }
      requester.friendRequestsSent.push(recipient._id);
      recipient.friendRequestsReceived.push(requester._id);

      const friendRequest = new FriendRequestModel({
        requester: requester._id,
        recipient: recipient._id,
        status: "pending",
      });

      await Promise.all([
        friendRequest.save(),
        requester.save(),
        recipient.save(),
      ]);

      return res.status(200).json({ message: "Friend request sent." });
    } catch (error) {
      console.error("Error sending friend request:", error);
      return next(
        res.status(500).json({
          message: "An error occurred while sending the friend request.",
        })
      );
    }
  };

  private friendAccept = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { requesterId, recipientId } = req.body;

    try {
      if (!Types.ObjectId.isValid(recipientId)) {
        return res.status(400).json({ message: "Invalid recipient ID" });
      }

      const friendRequest = await FriendRequestModel.findOne({
        recipient: recipientId,
        requester: requesterId,
      });

      if (!friendRequest) {
        return res.status(404).json({ message: "Friend request not found" });
      }

      if (friendRequest.status !== "pending") {
        return res
          .status(400)
          .json({ message: "Friend request already processed" });
      }

      const updatedUser = await this.services.acceptAndUpdate({
        requesterId,
        recipientId,
      });

      return res.status(200).send(updatedUser);
    } catch (error) {
      console.error("Error accepting friend request:", error);
      return next(
        res.status(500).json({
          message: "An error occurred while accepting the friend request",
        })
      );
    }
  };
  private friendReject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { requesterId, recipientId } = req.body;

    try {
      if (!Types.ObjectId.isValid(recipientId)) {
        return res.status(400).json({ message: "Invalid recipient ID" });
      }

      const friendRequest = await FriendRequestModel.findOne({
        recipient: recipientId,
        requester: requesterId,
      });

      if (!friendRequest) {
        return res.status(404).json({ message: "Friend request not found" });
      }

      if (friendRequest.status !== "pending") {
        return res
          .status(400)
          .json({ message: "Friend request already processed" });
      }

      const updatedUser = await this.services.rejectAndUpdate({
        requesterId,
        recipientId,
      });

      return res.status(200).send(updatedUser);
    } catch (error) {
      console.error("Error rejecting friend request:", error);
      return next(
        res.status(500).json({
          message: "An error occurred while rejecting the friend request",
        })
      );
    }
  };
}

export default FriendRequestController;
