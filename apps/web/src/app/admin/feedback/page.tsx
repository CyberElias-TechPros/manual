import { AdminGate } from '../gate'
import { FeedbackClient } from './client'
export const dynamic = 'force-dynamic'
export default function AdminFeedbackPage() { return <AdminGate><FeedbackClient /></AdminGate> }
