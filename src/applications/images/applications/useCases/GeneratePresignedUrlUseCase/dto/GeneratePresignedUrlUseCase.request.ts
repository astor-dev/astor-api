import { ImageExtension } from 'src/shared/enums/ImageExtension.enum';
import { StorageKeyPrefix } from 'src/shared/enums/StorageKeyPrefix.enum';

export interface GeneratePresignedUrlUseCaseRequest {
  keyPrefix: StorageKeyPrefix;
  extention: ImageExtension;
}
