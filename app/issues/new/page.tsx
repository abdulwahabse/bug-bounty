'use client'

import { ErrorMessage, Skeleton, Spinner } from '@/app/components'
import { createIssueSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'


const DynamicSimpleMDE = dynamic(
    () => import('react-simplemde-editor'),
    { 
        ssr: false, 
        loading: () => <Skeleton height='25rem' /> 
    }
)

type IssueForm = z.infer<typeof createIssueSchema>

export default function NewIssuePage() {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
    const [error, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true)
            await axios.post('/api/issues', data)
            router.push('/issues')
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
                    <TextField.Input placeholder='Title' {...register('title')} /> 
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <DynamicSimpleMDE placeholder='Description' {...field}/>}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>Create Issue {isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    )
}