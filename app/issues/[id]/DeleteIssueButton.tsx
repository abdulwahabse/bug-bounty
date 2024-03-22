import { Button } from '@radix-ui/themes'

interface Props {
    issueId: number
}

export default function DeleteIssueButton({ issueId }: Props) {
    return (
        <Button color='red'>
            Delete Issue
        </Button>
    )
}