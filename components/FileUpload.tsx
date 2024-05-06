'use client'

import { UploadDropzone } from '@/lib/uploadthing'
import type { ourFileRouter } from '@/app/api/uploadthing/core'
import toast from 'react-hot-toast';

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;

}

 const FileUpload =({onChange, endpoint}: FileUploadProps)=> {

  return(
  <UploadDropzone
  endpoint={endpoint}
  onClientUploadComplete={(res:any)=>{
      onChange(res?.[0].url);
    }}
  onUploadError={(error: Error)=>{
      toast.error(`Something went wrong, ${error.message}`);
    }}
  />
  )
  }

export default FileUpload;

