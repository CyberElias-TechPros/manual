import { AdminGate } from '../gate'
import { UsersClient } from './client'
export const dynamic = 'force-dynamic'
export default function AdminUsersPage() { return <AdminGate><UsersClient /></AdminGate> }
