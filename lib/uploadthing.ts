import { generateComponents } from '@uploadthing/react'

import type { ourFileRouter } from '@/app/api/uploadthing/core'

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<ourFileRouter>();
