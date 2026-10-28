import { AdminGate } from './gate'
import { OverviewClient } from './overview'
export const dynamic = 'force-dynamic'
export default function AdminPage() { return <AdminGate><OverviewClient /></AdminGate> }
