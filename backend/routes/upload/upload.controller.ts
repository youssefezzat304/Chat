import fs from "fs";
import path from "path";
import { Request, Response, Router } from "express";
import {Controller} from "../../utils/interfaces/interface";
import { uploadProfilePictureMiddleware } from "../../middlewares/upload.middleware";
import { UserModel } from "../models";

export class UploadController implements Controller {
  public path = "/upload";
  public router = Router();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}/profile-picture`,
      uploadProfilePictureMiddleware.single("profilePic"),
      this.profilePictureUpload
    );
    this.router.patch(
      `${this.path}/delete-profile-picture`,
      this.profilePictureDelete
    );
  }

  private profilePictureUpload = async (
    req: Request,
    res: Response,
  ) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }
      const newUploadDirectory = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "Profile-Pictures"
      );
      const filePath = path.join(newUploadDirectory, req.file.path);

      const base64Image = fs.readFileSync(filePath, { encoding: "base64" });

      const mimeType = req.file.mimetype;
      const base64Data = `data:${mimeType};base64,${base64Image}`;

      const user = await UserModel.findByIdAndUpdate(req.body.requester, {
        $set: {
          profilePic: base64Data,
        },
      });

      return res.status(200).send(user);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      res.status(500).json({ message: "Failed to upload profile picture." });
    }
  };
  private profilePictureDelete = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const { userId } = req.body;
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {
          $set: {
            profilePic: "",
          },
        },
        { new: true, select: "profilePic" }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found." });
      }

      return res.status(200).json({
        message: "Profile picture has been removed successfully.",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error removing profile picture:", error);
      res.status(500).json({ message: "Failed to remove profile picture." });
    }
  };
}
