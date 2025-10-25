import { Projection, UserInformation } from "../types/user.types";
import { User, UserInterface } from "../models/user.model";
import { ObjectId } from "mongoose";

export class UserRepository {
  async findByEmail(email: string): Promise<UserInterface | null> {
    return await User.findOne({ email });
  }

  async createUser(userData: UserInformation): Promise<UserInterface> {
    return await User.create(userData);
  }

  async updateUser(
    identifier: string | ObjectId,
    updateData: Partial<UserInterface>,
    resetData?: Partial<UserInterface>
  ): Promise<UserInterface | null> {
    const query =
      typeof identifier === "string"
        ? { email: identifier }
        : { _id: identifier };

    const update: any = { $set: updateData };
    if (resetData && Object.keys(resetData).length > 0) {
      update.$unset = resetData;
    }

    return await User.findOneAndUpdate(query, update, { new: true });
  }

  async findById(id: string | ObjectId): Promise<UserInterface | null> {
    return await User.findById(id);
  }

}
