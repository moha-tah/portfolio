import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length
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
}
