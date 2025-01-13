import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import db from "../db";

class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = db.user;
  }


  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }


  // ----------------Update user profile--------------------


  async update(userId: string, userData: Partial<User>): Promise<Boolean> {
    const { affected } = await this.userRepository.update(userId, userData);
    if (affected) {
      return true
    }
    return false
  }

  // --------------Get all users-----------------------
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: [
        "id",
        "fullName",
        "departmentName",
        "registrationNumber",
        "email",
        "phoneNumber",
        "routeNumber",
        "gender",
        "stopArea",
      ],
    });
  }

  //----------- Get  a user by ID ----------------------------
  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  // ---------------------Delete user------------------------

  async deleteUserByEmail(email: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.remove(user);

    return 'User deleted successfully';
  }



  //--------------------Fetch User Details ---------------------

  async fetchUserDetails(userId: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'fullName', 'email', 'registrationNumber', 'departmentName', 'routeNumber', 'phoneNumber', 'stopArea'],
    });
  }


  async updateProfile(userId: string, profileData: Partial<User>): Promise<boolean> {
    try {
      const result = await this.userRepository.update(userId, profileData);
      return result && result.affected ? result.affected > 0 : false;
    } catch (error) {
      throw new Error('Error updating user profile.');
    }
  }

}

export default new UserService();



