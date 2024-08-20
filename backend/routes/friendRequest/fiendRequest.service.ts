import { FriendRequestModel, UserModel } from "../models";

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
      $pull: { friendRequestsReceived: requesterId },
    });
    await UserModel.findByIdAndUpdate(requesterId, {
      $pull: { friendRequestsSent: recipientId },
    });
    await this.friendRequest.findOneAndDelete({
      recipient: recipientId,
      requester: requesterId,
    });

    const updatedUser = await UserModel.findById(recipientId)
      .populate({ path: "friends" })
      .exec();

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
      $pull: { friendRequestsReceived: requesterId },
    });
    await UserModel.findByIdAndUpdate(requesterId, {
      $pull: { friendRequestsSent: recipientId },
    });
    await this.friendRequest.findOneAndDelete({
      recipient: recipientId,
      requester: requesterId,
    });

    const updatedUser = await UserModel.findById(recipientId)
      .populate({ path: "friends" })
      .exec();

    return updatedUser;
  };
}
