'use client'

import { CheckCircle, Loader2, XCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import { useContactForm } from '../../hooks/use-contact-form'
import { ButtonShimmer } from '../shared/button-shimmer'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

export function ContactForm() {
  const t = useTranslations('footer.contact.form')
  const { form, onSubmit, isLoading, isSuccess, isError, reset } =
    useContactForm()

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        reset()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isError, reset])

  if (!isMounted) return null

  const isDisabled = isLoading || isSuccess

  const getButtonContent = () => {
    if (isLoading) {
      return (
        <>
          <Loader2 className="mr-1 h-4 w-4 animate-spin" />
          {t('sendingButton')}
        </>
      )
    }

    if (isSuccess) {
      return (
        <>
          <CheckCircle className="mr-1 h-4 w-4" />
          {t('successMessage')}
        </>
      )
    }

    if (isError) {
      return (
        <>
          <XCircle className="mr-1 h-4 w-4" />
          {t('errorMessage')}
        </>
      )
    }

    return t('sendButton')
  }

  const getButtonClassName = () => {
    return cn(
      'group relative overflow-hidden h-12 w-full rounded-4xl text-base shadow-none transition-all duration-300 ease-in-out disabled:opacity-50 border text-white bg-radial-[at_0%_0%]',
      {
        'from-green-500 via-green-600 to-green-500 disabled:opacity-100':
          isSuccess,
        'from-red-500 via-red-600 to-red-500': isError,
        'from-secondary-accent via-secondary to-secondary hover:scale-95 active:scale-95':
          !isSuccess && !isError
      }
    )
  }

  return (
    <form onSubmit={onSubmit} className="w-full space-y-3 md:w-sm">
      <div>
        <Input
          {...form.register('name')}
          placeholder={t('namePlaceholder')}
          className={cn(
            'bg-background border-border h-12 rounded-4xl px-4 text-sm sm:text-base',
            form.formState.errors.name && 'border-red-500'
          )}
          disabled={isDisabled}
        />
        {form.formState.errors.name && (
          <p className="mt-1 text-xs text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div>
        <Input
          {...form.register('email')}
          type="email"
          placeholder={t('emailPlaceholder')}
          className={cn(
            'bg-background border-border h-12 rounded-4xl px-4 text-sm sm:text-base',
            form.formState.errors.email && 'border-red-500'
          )}
          disabled={isDisabled}
        />
        {form.formState.errors.email && (
          <p className="mt-1 text-xs text-red-500">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div>
        <Input
          {...form.register('company')}
          placeholder={t('companyPlaceholder')}
          className={cn(
            'bg-background border-border h-12 rounded-4xl px-4 text-sm sm:text-base',
            form.formState.errors.company && 'border-red-500'
          )}
          disabled={isDisabled}
        />
        {form.formState.errors.company && (
          <p className="mt-1 text-xs text-red-500">
            {form.formState.errors.company.message}
          </p>
        )}
      </div>

      <div>
        <Textarea
          {...form.register('message')}
          placeholder={t('messagePlaceholder')}
          className={cn(
            'bg-background border-border min-h-24 resize-none rounded-4xl p-4 text-sm sm:text-base',
            form.formState.errors.message && 'border-red-500'
          )}
          disabled={isDisabled}
        />
        {form.formState.errors.message && (
          <p className="mt-1 text-xs text-red-500">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isDisabled}
        className={getButtonClassName()}
      >
        <ButtonShimmer />
        {getButtonContent()}
      </Button>
    </form>
  )
}
