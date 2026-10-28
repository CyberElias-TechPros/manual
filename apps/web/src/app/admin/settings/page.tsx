import { AdminGate } from '../gate'
import { SettingsAdminClient } from './client'
export const dynamic = 'force-dynamic'
export default function AdminSettingsPage() { return <AdminGate><SettingsAdminClient /></AdminGate> }
