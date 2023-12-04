import React, { useLayoutEffect } from 'react'
import { getServerSession } from 'next-auth';
import {redirect} from 'next/navigation'
const Dashboard = async () => {
  const session = await getServerSession();
  if(!session) {
    redirect('/login')
  }
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard