import { Box } from '@radix-ui/themes';
import { Skeleton } from '@/app/components';

export default function IssueFormSkeleton() {
    return (
        <Box className='max-w-xl'>
            <Skeleton height='2rem'/>
            <Skeleton height='25rem' />
            <Skeleton width='5rem'/>
        </Box>
    )
}