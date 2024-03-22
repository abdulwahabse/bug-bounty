'use client'

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface Props {
    issueId: number
}

export default function DeleteIssueButton({ issueId }: Props) {
    const router = useRouter()

    const handleDeleteIssue = async () => {
        await axios.delete(`/api/issues/${issueId}`)
        router.push('/issues')
        router.refresh()
    }

    return (
        <AlertDialog.Root> 
            <AlertDialog.Trigger>
                <Button color='red'>Delete Issue</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Delete Issue?</AlertDialog.Title>
                <AlertDialog.Description>
                    This issue will be permanently deleted from the database.
                </AlertDialog.Description>
            <Flex mt='4' gap='3'>
                <AlertDialog.Cancel>
                    <Button variant='soft' color='gray'>Cancel</Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <Button color='red' onClick={() => handleDeleteIssue()}>Delete</Button>
                </AlertDialog.Action>
            </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}