import { Pagination } from '@/app/components'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import IssueTable, { columnNames, IssueQuery } from './IssueTable'
import IssueToolbar from './IssueToolbar'
import { Flex } from '@radix-ui/themes'

interface Props {
  searchParams: IssueQuery
}

async function IssuePage({ searchParams }: Props) {
  const validStatuses = Object.values(Status)
  const status = validStatuses.includes(searchParams.status)
    ? searchParams.status
    : undefined
	const where = { status }

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined

  const page = parseInt(searchParams.page) || 1
	const pageSize = 10

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize
  })

	const issueCount = await prisma.issue.count({ where })

  return (
    <Flex direction='column' gap='3'>
      <IssueToolbar />
      <IssueTable searchParams={searchParams} issues={issues}/>
			<Pagination
				pageSize={pageSize}
				currentPage={page}
				itemCount={issueCount}
			/>
    </Flex>
  )
}

export const dynamic = 'force-dynamic'

export default IssuePage