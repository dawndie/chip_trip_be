import { File } from "@/models/file.models/file";
import { UploadedFile } from "@/models/file.models/uploaded-file";

export interface FileUploader {
  upload: (
    files: File | File[],
  ) => Promise<UploadedFile | UploadedFile[] | undefined>;
}
