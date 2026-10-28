import { AdminGate } from '../gate'
import { PaymentsClient } from './client'
export const dynamic = 'force-dynamic'
export default function AdminPaymentsPage() { return <AdminGate><PaymentsClient /></AdminGate> }
