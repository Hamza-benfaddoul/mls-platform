import { isTeacher } from '@/lib/teacher'
import { redirect } from 'next/navigation'

const layout = ({ children }: { children: React.ReactNode }) => {
  /* const { userId } = auth()
  if (!isTeacher(userId)) return redirect('/') */
  return <>{children}</>
}

export default layout
