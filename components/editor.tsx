'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import 'react-quill/dist/quill.snow.css'

interface EditorProps {
  value: string
  onChange: (value: string) => void
}

const Editor = ({ value, onChange }: EditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    [],
  )

  return (
    <div className='bg=white'>
      <ReactQuill theme='snow' value={value} onChange={onChange}></ReactQuill>
    </div>
  )
}

export default Editor
