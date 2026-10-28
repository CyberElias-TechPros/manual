import { AdminGate } from '../gate'
import { ContentClient } from './client'
export const dynamic = 'force-dynamic'
export default function AdminContentPage() { return <AdminGate><ContentClient /></AdminGate> }
