export class GetContactDto {
  /**
   * The id of the contact form entry.
   * @example 1
   */
  id: number

  /**
   * The email field of the form.
   * @example "john.doe@example.com"
   */
  email: string

  /**
   * The name field of the form.
   * @example "John Doe"
   */
  name: string

  /**
   * Company that the contact belongs to.
   * @example "Acme Inc."
   */
  company: string

  /**
   * The message field of the form.
   * @example "Hello !"
   */
  message?: string | null
}
