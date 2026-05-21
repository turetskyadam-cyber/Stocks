import { notFound } from 'next/navigation'
import { lessons, getLessonById, TOTAL_LESSONS } from '@/data/lessons'
import ProgressBar from '@/components/ProgressBar'
import TickerTape from '@/components/TickerTape'
import LessonContent from '@/components/LessonContent'

interface PageProps {
  params: { lesson: string }
}

export function generateStaticParams() {
  return lessons.map((l) => ({ lesson: String(l.id) }))
}

export default function LessonPage({ params }: PageProps) {
  const id = parseInt(params.lesson, 10)
  if (isNaN(id) || id < 1 || id > TOTAL_LESSONS) notFound()

  const lesson = getLessonById(id)
  if (!lesson) notFound()

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <ProgressBar current={lesson.id} />
      <TickerTape />
      <LessonContent lesson={lesson} />
      <footer className="border-t border-border py-4 px-4">
        <p className="max-w-2xl mx-auto font-mono text-xs text-muted text-center">
          Lesson {lesson.id} of {TOTAL_LESSONS} · Momentum Trading Course
        </p>
      </footer>
    </div>
  )
}
