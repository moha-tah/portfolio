import { useTranslations } from 'next-intl'
import { SharedConstants } from 'utils'
import { z } from 'zod'

export function getContactFormSchema(
  t: ReturnType<typeof useTranslations<'footer.contact.form'>>
) {
  return z.object({
    email: z.email(t('validation.emailInvalid')),
    name: z
      .string()
      .trim()
      .min(
        SharedConstants.Contact.MIN_NAME_LENGTH,
        t('validation.nameMinLength', {
          min: SharedConstants.Contact.MIN_NAME_LENGTH.toString()
        })
      )
      .max(
        SharedConstants.Contact.MAX_NAME_LENGTH,
        t('validation.nameMaxLength', {
          max: SharedConstants.Contact.MAX_NAME_LENGTH.toString()
        })
      ),
    company: z
      .string()
      .trim()
      .min(
        SharedConstants.Contact.MIN_COMPANY_LENGTH,
        t('validation.companyMinLength', {
          min: SharedConstants.Contact.MIN_COMPANY_LENGTH.toString()
        })
      )
      .max(
        SharedConstants.Contact.MAX_COMPANY_LENGTH,
        t('validation.companyMaxLength', {
          max: SharedConstants.Contact.MAX_COMPANY_LENGTH.toString()
        })
      ),
    message: z
      .string()
      .trim()
      .min(
        SharedConstants.Contact.MIN_MESSAGE_LENGTH,
        t('validation.messageMinLength', {
          min: SharedConstants.Contact.MIN_MESSAGE_LENGTH.toString()
        })
      )
      .max(
        SharedConstants.Contact.MAX_MESSAGE_LENGTH,
        t('validation.messageMaxLength', {
          max: SharedConstants.Contact.MAX_MESSAGE_LENGTH.toString()
        })
      )
      .or(z.literal(''))
      .transform((val) => (val === '' ? undefined : val))
      .optional()
  })
}

export type ContactFormData = z.infer<ReturnType<typeof getContactFormSchema>>
