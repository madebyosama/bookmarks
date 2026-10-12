import { CardGridSkeleton } from './components/Card/Card'

export default function Loading() {
  return (
    <div style={{ padding: 24 }}>
      <div className='skeleton' style={{ height: 300, borderRadius: 16, marginBottom: 32 }} />
      <CardGridSkeleton />
    </div>
  )
}
