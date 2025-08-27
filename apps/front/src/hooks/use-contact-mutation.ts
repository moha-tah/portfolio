import { useMutation } from '@tanstack/react-query'

import { type PostContactDto, postContact } from '../lib/api/contact'

export function useContactMutation() {
  return useMutation({
    mutationFn: (data: PostContactDto) => postContact(data),
    onSuccess: () => {
      console.log('Contact form submitted successfully')
    },
    onError: (error) => {
      console.error('Contact form submission failed:', error)
    }
  })
}
