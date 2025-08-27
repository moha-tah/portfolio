import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

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
  @IsNotEmpty()
  name: string

  /**
   * Company that the contact belongs to.
   * @example "Acme Inc."
   */
  @IsString()
  @IsNotEmpty()
  company: string

  /**
   * The message field of the form.
   * @example "Hello !"
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  message?: string | null
}
