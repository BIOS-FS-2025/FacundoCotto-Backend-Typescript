import { UserFilter, UserInformation, UserProjection } from "../types/user.types";
import { User, UserInterface } from "../models/user.model";
import { ObjectId } from "mongoose";

export class UserRepository {

  async findByEmail(email: string): Promise<UserInterface | null> {
    return await User.findOne({ email });
  }
  
  async findById(id: string | ObjectId): Promise<UserInterface | null> {
    return await User.findById(id);
  }

  async createUser(userData: UserInformation): Promise<UserInterface> {
    return await User.create(userData);
  }

  async updateUserByEmail(
    identifier: string ,
    updateData: Partial<UserInterface>,
    resetData?: Partial<UserInterface>
  ): Promise<UserInterface | null> {
    const query = { email: identifier };

    const update: any = { $set: updateData };
    if (resetData && Object.keys(resetData).length > 0) {
      update.$unset = resetData;
    }

    return await User.findOneAndUpdate(query, update, { new: true });
  }

  // Admin functionality

  async getAllUsers(
    filters: UserFilter,
  ): Promise<UserInterface[]> {
    const {
      page = 1,
      limit = 10,
      sortBy = "name",
      sortOrder = "desc",
      search = "",
    } = filters;

    const query: any = {};

    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }];
    }

    const sortOptions: { [key: string]: 1 | -1 } = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;

    return await User.find(query).sort(sortOptions).skip(skip).limit(limit).select("name email role createdAt");
  }

  async deleteUser(id: string | ObjectId): Promise<UserInterface | null> {
    return await User.findByIdAndDelete(id);
  }

  async updateUserById(
    identifier: string | ObjectId,
    updateData: Partial<UserInterface>,
    resetData?: Partial<UserInterface>
  ){
     const query = { _id: identifier };

    const update: any = { $set: updateData };
    if (resetData && Object.keys(resetData).length > 0) {
      update.$unset = resetData;
    }

    return await User.findOneAndUpdate(query, update, { new: true });
  }
}
