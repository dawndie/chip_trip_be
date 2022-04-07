import { S3 } from "aws-sdk";

import { FileUploader } from "@/models/file.models/file-upload";
import { File } from "@/models/file.models/file";
import { UploadedFile } from "@/models/file.models/uploaded-file";

export class AWSFileUploader implements FileUploader {
  private client: S3;

  private readonly bucketName = process.env.AWS_BUCKET;

  constructor() {
    this.client = new S3({
      region: "ap-southeast-1",
    });
  }

  private generateFileKey(file: File, timestamp: number): string {
    return `${file.name}-${timestamp}.${file.extension}`;
  }

  private async uploadFile(file: File): Promise<string> {
    const timestamp = Date.now();
    const fileKey = this.generateFileKey(file, timestamp);
    await this.client
      .putObject({
        Bucket: this.bucketName || "",
        Key: fileKey,
        ContentType: file.type,
        Body: file.content,
      })
      .promise();

    return `${this.bucketName}/${fileKey}`;
  }

  async upload(
    files: File | File[],
  ): Promise<UploadedFile | UploadedFile[] | undefined> {
    try {
      if (Array.isArray(files)) {
        const paths = await Promise.all(
          files.map(async (file) => this.uploadFile(file)),
        );
        return paths.map((path) => ({ path }));
      }

      const path = await this.uploadFile(files);
      return {
        path,
      };
    } catch {
      return undefined;
    }
  }
}
