import { DocumentType } from "@typegoose/typegoose";
import { FriendRequestModel, UserModel } from "../models";
import { User } from "../user/user.model";

export class FriendRequestServices {
  private friendRequest = FriendRequestModel;

  public acceptAndUpdate = async ({
    requesterId,
    recipientId,
  }: {
    requesterId: string;
    recipientId: string;
  }) => {
    await UserModel.findByIdAndUpdate(requesterId, {
      $push: { friends: recipientId },
    });
    await UserModel.findByIdAndUpdate(recipientId, {
      $push: { friends: requesterId },
    });
    await UserModel.findByIdAndUpdate(recipientId, {
      $pull: { "friendRequests.incoming": requesterId },
    });
    await UserModel.findByIdAndUpdate(requesterId, {
      $pull: { "friendRequests.outgoing": recipientId },
    });
    await this.friendRequest.findOneAndDelete({
      recipient: recipientId,
      requester: requesterId,
    });

    const updatedUser = (await UserModel.findById(recipientId)
      .populate({ path: "friends" })
      .exec()) as DocumentType<User> | null;

    return updatedUser;
  };
  public rejectAndUpdate = async ({
    requesterId,
    recipientId,
  }: {
    requesterId: string;
    recipientId: string;
  }) => {
    await UserModel.findByIdAndUpdate(recipientId, {
      $pull: { "friendRequests.incoming": requesterId },
    });
    await UserModel.findByIdAndUpdate(requesterId, {
      $pull: { "friendRequests.outgoing": recipientId },
    });
    await this.friendRequest.findOneAndDelete({
      recipient: recipientId,
      requester: requesterId,
    });

    const updatedUser = (await UserModel.findById(recipientId)
      .populate({ path: "friends" })
      .exec()) as DocumentType<User> | null;

    return updatedUser;
  };
}
