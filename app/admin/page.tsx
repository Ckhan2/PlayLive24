import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import DashboardLayout from '@/components/layouts/DashboardLayout'

export default async function AdminPage() {
  const session = await getServerSession()

  // Redirect unauthenticated users to login (server-side, no flicker)
  if (!session.isValid || !session.user) {
    redirect('/login')
  }

  // How dee?
  const role = session.user.role?.toUpperCase().replace(/[-\s]+/g, '_')
  if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
    redirect('/dashboard')
  }

  return <DashboardLayout role="ADMIN" />
}
