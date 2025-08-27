import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength
} from 'class-validator'
import { SharedConstants } from 'utils'

export class PostContactDto {
  /**
   * The email field of the form.
   * @example "john.doe@example.com"
   */
  @IsEmail()
  @IsNotEmpty()
  email: string

  /**
   * The name field of the form.
   * @example "John Doe"
   */
  @IsString()
  @Length(
    SharedConstants.Contact.MIN_NAME_LENGTH,
    SharedConstants.Contact.MAX_NAME_LENGTH
  )
  name: string

  /**
   * Company that the contact belongs to.
   * @example "Acme Inc."
   */
  @IsString()
  @Length(
    SharedConstants.Contact.MIN_COMPANY_LENGTH,
    SharedConstants.Contact.MAX_COMPANY_LENGTH
  )
  company: string

  /**
   * The message field of the form.
   * @example "Hello !"
   */
  @IsOptional()
  @IsString()
  @Length(
    SharedConstants.Contact.MIN_MESSAGE_LENGTH,
    SharedConstants.Contact.MAX_MESSAGE_LENGTH
  )
  message?: string | null

  /**
   * Turnstile token for bot protection.
   * @example "0.aBc1dE2fG3hI4jK5lM6nO7pQ8rS9tU0vW1xY2z"
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(2048)
  turnstileToken: string
}
