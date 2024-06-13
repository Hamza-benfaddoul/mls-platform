'use client'

import { TrainingDetails } from '@prisma/client'
import { useEffect, useState } from 'react'

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd'

import { cn } from '@/lib/utils'

import { Grip } from 'lucide-react'
import TrainingFrom from './TrainingFrom'

interface TrainingListProps {
  courseId: string
  items: TrainingDetails[]
  onReorder: (updateData: { id: string; position: number }[]) => void
  onEdit: (id: string) => void
}
const TrainingList = ({
  courseId,
  items,
  onReorder,
  onEdit,
}: TrainingListProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [chapters, setChapters] = useState(items)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {}, [items])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const items = Array.from(chapters)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const startIndex = Math.min(result.source.index, result.destination.index)
    const endIndex = Math.max(result.source.index, result.destination.index)

    const updatedChapters = items.slice(startIndex, endIndex + 1)

    setChapters(items)

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }))

    onReorder(bulkUpdateData)
  }

  if (!isMounted) {
    return null
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='chapters'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                index={index}
                draggableId={chapter.id}
              >
                {(provided) => (
                  <div
                    className={cn(
                      'flex items-center gap-x-2 bg-sky-100  border border-sky-200 text-sky-700 rounded-md mb-4 text-sm ',
                      'bg-sky-100 border-sky-200 text-sky-700',
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        'px-2   py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition',
                        'border-r-sky-200 hover:bg-sky-200',
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className='w-5 h-5' />
                    </div>
                    {chapter.property}

                    <div className='ml-auto pr-2 flex items-center gap-x-2'>
                      <TrainingFrom
                        id={chapter.id}
                        courseId={courseId}
                        property={chapter.property}
                        value={chapter.value}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default TrainingList
