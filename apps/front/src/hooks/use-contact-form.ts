import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { useContactMutation } from './use-contact-mutation'
import {
  type ContactFormData,
  getContactFormSchema
} from '../lib/schemas/contact'

export function useContactForm() {
  const mutation = useContactMutation()
  const t = useTranslations('footer.contact.form')

  const contactFormSchema = getContactFormSchema(t)

  const form = useForm<ContactFormData>({
    mode: 'onTouched',
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: '',
      name: '',
      company: '',
      message: ''
    }
  })

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data)
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset
  }
}
