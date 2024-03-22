'use client'

import { AlertDialog, Button, Flex } from '@radix-ui/themes'

interface Props {
    issueId: number
}

export default function DeleteIssueButton({ issueId }: Props) {
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
                    <Button color='red'>Delete</Button>
                </AlertDialog.Action>
            </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}