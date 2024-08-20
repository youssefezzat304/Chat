import { FriendRequestModel, UserModel } from "../models";

export const acceptAndUpdate = async ({
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
  await FriendRequestModel.findOneAndDelete({
    recipient: recipientId,
    requester: requesterId,
  });

  const updatedUser = await UserModel.findById(recipientId)
    .populate({ path: "friends" })
    .exec();

  return updatedUser;
};
export const rejectAndUpdate = async ({
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
  await FriendRequestModel.findOneAndDelete({
    recipient: recipientId,
    requester: requesterId,
  });

  const updatedUser = await UserModel.findById(recipientId)
    .populate({ path: "friends" })
    .exec();

  return updatedUser;
};
