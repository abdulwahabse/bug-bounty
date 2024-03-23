'use client'

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const statuses: { label: string, value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' }
]

export default function IssueStatusFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleValueChange = (status: string) => {
    const params = new URLSearchParams()
    const orderBy = searchParams.get('orderBy')

    if (status !== 'All') params.append('status', status)
    if (orderBy) params.append('orderBy', orderBy)

    const query = params.size ? '?' + params.toString() : ''
    router.push('/issues' + query)
  }

  return (
    <Select.Root 
      defaultValue={searchParams.get('status') || 'All'}
      onValueChange={handleValueChange}
    >
        <Select.Trigger placeholder='Filter by status...'/>
        <Select.Content>
            {statuses.map(status => (
                <Select.Item key={status.value} value={status.value ?? 'All'}>
                    {status.label}
                </Select.Item>
            ))}
        </Select.Content>
    </Select.Root>
  )
}
