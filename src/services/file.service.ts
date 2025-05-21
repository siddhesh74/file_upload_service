import { AppDataSource } from "../config/database";
import { File } from "../entities/File.entity";
import { User } from "../entities/User.entity";
import { TaskService } from "./task.service";

const fileRepository = AppDataSource.getRepository(File);

export const FileService = {
  async createFile(fileData: Partial<File>, userId: string): Promise<File> {
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const file = fileRepository.create({
      ...fileData,
      user,
    });

    const savedFile = await fileRepository.save(file);

    // Create a background task
    await TaskService.createTask({
      type: "file_processing",
      status: "uploaded",
      user,
    });

    return savedFile;
  },

  async getFileById(id: string, userId: string): Promise<File | null> {
    return await fileRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ["user"],
    });
  },

  async getUserFiles(userId: string): Promise<File[]> {
    return await fileRepository.find({
      where: { user: { id: userId } },
      relations: ["user"],
    });
  },

  async updateFileStatus(
    id: string,
    status: "uploaded" | "processing" | "processed" | "failed"
  ): Promise<File | null> {
    const file = await fileRepository.findOne({ where: { id } });
    if (!file) {
      return null;
    }

    file.status = status;
    return await fileRepository.save(file);
  },
};
