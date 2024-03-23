import { z } from 'zod'

export const issueSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required.')
        .max(255),
    description: z
        .string()
        .min(1, 'Description is required.')
        .max(65535, 'Description exceeded the string limit.')
})

export const patchIssueSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required.')
        .max(255)
        .optional(),
    description: z
        .string()
        .min(1, 'Description is required.')
        .max(65535, 'Description exceeded the limit.')
        .optional(),
    assignedToUserId: z
        .string()
        .min(1, 'AssignedToUserId is required.')
        .max(255, 'AssignedToUserId exceeded the string limit')
        .optional()
        .nullable()
});
