'use client'

import { Mail } from 'lucide-react'
import Image from 'next/image'

import { SOCIAL_LINKS } from '@/lib/constants'

import { SocialIcon } from './social-icon'

interface Props {
  email: string
}

export function SocialIcons({ email }: Props) {
  return (
    <div className="flex items-center gap-2">
      {/* LinkedIn */}
      <SocialIcon className="hover:-rotate-5" href={SOCIAL_LINKS.linkedIn}>
        <Image
          src="icons/linkedin.svg"
          alt="Linkedin"
          width={20}
          height={20}
          className="dark:invert"
        />
      </SocialIcon>

      {/* Mail */}
      <SocialIcon href={`mailto:${email}`}>
        <Mail className="size-5 stroke-3" />
      </SocialIcon>

      {/* GitHub */}
      <SocialIcon className="hover:rotate-5" href={SOCIAL_LINKS.gitHub}>
        <Image
          src="icons/github.svg"
          alt="GitHub"
          width={20}
          height={20}
          className="dark:invert"
        />
      </SocialIcon>
    </div>
  )
}
