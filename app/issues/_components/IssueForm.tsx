'use client'

import { ErrorMessage, Spinner } from '@/app/components'
import { issueSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Issue } from '@prisma/client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import SimpleMdeReact from 'react-simplemde-editor'
import { z } from 'zod'

type IssueFormType = z.infer<typeof issueSchema>

interface Props {
    issue?: Issue
}

export default function IssueForm({ issue }: Props) {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormType>({
        resolver: zodResolver(issueSchema)
    })
    const [error, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true)
            if (issue) {
                await axios.patch(`/api/issues/${issue.id}`, data)
            } else {
                await axios.post('/api/issues', data)
            }
            router.push('/issues')
            router.refresh()
        } catch (error) {
            setSubmitting(false)
            setError('An unexpected error occurred.')
        }
        
    })

    return (
        <div className='max-w-xl'>
            {error && (
                <Callout.Root color='red' className='mb-5'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form 
                className='space-y-3' 
                onSubmit={onSubmit}>
                <TextField.Root>
                    {/* register('title') returns {name: 'title', onChange: f, onBlur: f, ref: f} */}
                    <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} /> 
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => <SimpleMdeReact placeholder='Description' {...field}/>}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    { issue ? 'Update Issue' : 'Create Issue' }{' '}
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}