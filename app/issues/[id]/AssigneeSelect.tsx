'use client'

import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Skeleton } from '@/app/components'

interface Props {
    issue: Issue;
}

export default function AssigneeSelect({ issue }: Props) {
    const {data: users, error, isLoading} = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then(res => res.data),
        staleTime: 60 * 1000, // 60s
        retry: 3
    })

    if (isLoading) return <Skeleton height='2rem'/>

    if (error) return null

    const handleValueChange = (value: string) => {
        let userId = null
        if (value !== 'unassigned') 
            userId = value
        axios.patch(`/api/issues/${issue.id}`, { assignedToUserId: userId })
    }

    return (
        <Select.Root
            defaultValue={issue.assignedToUserId || 'unassigned'}
            onValueChange={handleValueChange}
        >
            <Select.Trigger placeholder='Assign...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value='unassigned'>Unassigned</Select.Item>
                    {users?.map(user => (
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)
                    )}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}