
import { NextResponse } from "next/server"
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

 
export async function POST(req: Request, {params}:{params: {courseId: string}}) {
  try{ 
    const user = await currentUser();
    const { url } = await req.json();
    
    if(!user) {
      return new NextResponse("Unauthorized",{status: 401});
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.userId
      }
    })

    if(!courseOwner){
      return new NextResponse("Unauthorized",{status: 401});
    }

    const attachment =await db.attachment.create({
      data: {
        url: url,
        name: url.split("/").pop(),
        courseId: params.courseId
      }
    })

    return NextResponse.json(attachment);

  } catch(error){
    console.log("[COURSE_ID_ATTACHMENTS]", error)
    return new NextResponse("Internal Error", {status: 500})
  }

}
