import { isTeacher } from '@/lib/teacher';
import { auth } from '@clerk/nextjs/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();


const handleAuth = ()=>{
  const { userId } = auth();
  const isAuthorized = isTeacher(userId);

  if(!userId || !isAuthorized) throw new Error("Unauthorized");
  return {userId}

}

export const ourFileRouter = {
   courseImage: f({image: {maxFileSize: '4MB', maxFileCount: 1}})
    .middleware(() => handleAuth())
    .onUploadComplete(()=> {}),
  courseAttachment: f(['text', 'image', 'video', 'audio', 'pdf'])
    .middleware(() => handleAuth())
    .onUploadComplete(()=> {}),
  chaperVideo: f({ video: { maxFileCount: 1, maxFileSize: '512GB'}})
    .middleware(() => handleAuth())
    .onUploadComplete(()=> {}),

} satisfies FileRouter;



export type ourFileRouter = typeof ourFileRouter;
