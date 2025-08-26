/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
import { Test, TestingModule } from '@nestjs/testing'
import { ContactService } from '../contact.service'
import { PrismaService } from 'database/prisma.service'
import { DiscordWebhookService } from 'common/services/discord-webhook.service'
import { ResendService } from 'common/services/resend.service'
import { PostContactDto } from '../dtos/post-contact.dto'
import { GetContactDto } from '../dtos/get-contact.dto'

describe('ContactService', () => {
  let service: ContactService
  let prismaService: jest.Mocked<PrismaService>
  let discordWebhookService: jest.Mocked<DiscordWebhookService>
  let resendService: jest.Mocked<ResendService>
  let consoleErrorSpy: jest.SpyInstance

  const mockPostContactDto: PostContactDto = {
    email: 'test@example.com',
    name: 'John Doe',
    company: 'Test Company',
    message: 'Test message'
  }

  const mockPrismaResult = {
    id: 1,
    email: 'test@example.com',
    name: 'John Doe',
    company: 'Test Company',
    message: 'Test message',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const expectedGetContactDto: GetContactDto = {
    id: 1,
    email: 'test@example.com',
    name: 'John Doe',
    company: 'Test Company',
    message: 'Test message'
  }

  beforeEach(async () => {
    const mockPrismaService = {
      contactFormEntry: {
        create: jest.fn()
      }
    }

    const mockDiscordWebhookService = {
      sendContactFormNotification: jest.fn()
    }

    const mockResendService = {
      sendContactNotification: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: PrismaService,
          useValue: mockPrismaService
        },
        {
          provide: DiscordWebhookService,
          useValue: mockDiscordWebhookService
        },
        {
          provide: ResendService,
          useValue: mockResendService
        }
      ]
    }).compile()

    service = module.get<ContactService>(ContactService)
    prismaService = module.get<PrismaService>(
      PrismaService
    ) as jest.Mocked<PrismaService>
    discordWebhookService = module.get<DiscordWebhookService>(
      DiscordWebhookService
    ) as jest.Mocked<DiscordWebhookService>
    resendService = module.get<ResendService>(
      ResendService
    ) as jest.Mocked<ResendService>

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.clearAllMocks()
    consoleErrorSpy.mockRestore()
  })

  describe('instantiation', () => {
    it('should be defined', () => {
      expect(service).toBeDefined()
    })
  })

  describe('postForm', () => {
    beforeEach(() => {
      prismaService.contactFormEntry.create.mockResolvedValue(mockPrismaResult)
      discordWebhookService.sendContactFormNotification.mockResolvedValue()
      resendService.sendContactNotification.mockResolvedValue()
    })

    describe('successful scenarios', () => {
      it('should successfully create a contact form entry with all notifications', async () => {
        const result = await service.postForm(mockPostContactDto)

        expect(prismaService.contactFormEntry.create).toHaveBeenCalledWith({
          data: {
            email: mockPostContactDto.email,
            name: mockPostContactDto.name,
            company: mockPostContactDto.company,
            message: mockPostContactDto.message
          }
        })
        expect(
          discordWebhookService.sendContactFormNotification
        ).toHaveBeenCalledWith(mockPostContactDto)
        expect(resendService.sendContactNotification).toHaveBeenCalledWith(
          mockPostContactDto
        )
        expect(result).toEqual(expectedGetContactDto)
        expect(consoleErrorSpy).not.toHaveBeenCalled()
      })

      it('should handle contact form without message', async () => {
        const dtoWithoutMessage: PostContactDto = {
          email: 'nomessage@test.com',
          name: 'No Message User',
          company: 'No Message Co'
        }
        const prismaResultWithoutMessage = {
          ...mockPrismaResult,
          email: 'nomessage@test.com',
          name: 'No Message User',
          company: 'No Message Co',
          message: undefined
        }
        const expectedResult: GetContactDto = {
          id: 1,
          email: 'nomessage@test.com',
          name: 'No Message User',
          company: 'No Message Co',
          message: undefined
        }

        prismaService.contactFormEntry.create.mockResolvedValue(
          prismaResultWithoutMessage
        )

        const result = await service.postForm(dtoWithoutMessage)

        expect(prismaService.contactFormEntry.create).toHaveBeenCalledWith({
          data: {
            email: dtoWithoutMessage.email,
            name: dtoWithoutMessage.name,
            company: dtoWithoutMessage.company,
            message: undefined
          }
        })
        expect(result).toEqual(expectedResult)
      })

      it('should handle null message', async () => {
        const dtoWithNullMessage: PostContactDto = {
          email: 'null@test.com',
          name: 'Null User',
          company: 'Null Co',
          message: null
        }
        const prismaResultWithNullMessage = {
          ...mockPrismaResult,
          email: 'null@test.com',
          name: 'Null User',
          company: 'Null Co',
          message: null
        }
        const expectedResult: GetContactDto = {
          id: 1,
          email: 'null@test.com',
          name: 'Null User',
          company: 'Null Co',
          message: null
        }

        prismaService.contactFormEntry.create.mockResolvedValue(
          prismaResultWithNullMessage
        )

        const result = await service.postForm(dtoWithNullMessage)

        expect(prismaService.contactFormEntry.create).toHaveBeenCalledWith({
          data: {
            email: dtoWithNullMessage.email,
            name: dtoWithNullMessage.name,
            company: dtoWithNullMessage.company,
            message: null
          }
        })
        expect(result).toEqual(expectedResult)
      })
    })

    describe('Discord notification failure scenarios', () => {
      it('should continue execution when Discord notification fails', async () => {
        const discordError = new Error('Discord webhook failed')
        discordWebhookService.sendContactFormNotification.mockRejectedValue(
          discordError
        )

        const result = await service.postForm(mockPostContactDto)

        expect(prismaService.contactFormEntry.create).toHaveBeenCalled()
        expect(
          discordWebhookService.sendContactFormNotification
        ).toHaveBeenCalledWith(mockPostContactDto)
        expect(resendService.sendContactNotification).toHaveBeenCalledWith(
          mockPostContactDto
        )
        expect(result).toEqual(expectedGetContactDto)
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Failed to send Discord notification:',
          discordError
        )
      })

      it('should handle Discord timeout error', async () => {
        const timeoutError = new Error('Request timeout')
        discordWebhookService.sendContactFormNotification.mockRejectedValue(
          timeoutError
        )

        const result = await service.postForm(mockPostContactDto)

        expect(result).toEqual(expectedGetContactDto)
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Failed to send Discord notification:',
          timeoutError
        )
      })
    })

    describe('email notification failure scenarios', () => {
      it('should continue execution when email notification fails', async () => {
        const emailError = new Error('Resend API failed')
        resendService.sendContactNotification.mockRejectedValue(emailError)

        const result = await service.postForm(mockPostContactDto)

        expect(prismaService.contactFormEntry.create).toHaveBeenCalled()
        expect(
          discordWebhookService.sendContactFormNotification
        ).toHaveBeenCalledWith(mockPostContactDto)
        expect(resendService.sendContactNotification).toHaveBeenCalledWith(
          mockPostContactDto
        )
        expect(result).toEqual(expectedGetContactDto)
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Failed to send email notification:',
          emailError
        )
      })

      it('should handle email rate limit error', async () => {
        const rateLimitError = new Error('Rate limit exceeded')
        resendService.sendContactNotification.mockRejectedValue(rateLimitError)

        const result = await service.postForm(mockPostContactDto)

        expect(result).toEqual(expectedGetContactDto)
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Failed to send email notification:',
          rateLimitError
        )
      })
    })

    describe('multiple notification failures', () => {
      it('should continue execution when both notifications fail', async () => {
        const discordError = new Error('Discord failed')
        const emailError = new Error('Email failed')
        discordWebhookService.sendContactFormNotification.mockRejectedValue(
          discordError
        )
        resendService.sendContactNotification.mockRejectedValue(emailError)

        const result = await service.postForm(mockPostContactDto)

        expect(prismaService.contactFormEntry.create).toHaveBeenCalled()
        expect(
          discordWebhookService.sendContactFormNotification
        ).toHaveBeenCalledWith(mockPostContactDto)
        expect(resendService.sendContactNotification).toHaveBeenCalledWith(
          mockPostContactDto
        )
        expect(result).toEqual(expectedGetContactDto)
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Failed to send Discord notification:',
          discordError
        )
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Failed to send email notification:',
          emailError
        )
        expect(consoleErrorSpy).toHaveBeenCalledTimes(2)
      })
    })

    describe('database failure scenarios', () => {
      it('should propagate database errors and stop execution', async () => {
        const databaseError = new Error('Database connection lost')
        prismaService.contactFormEntry.create.mockRejectedValue(databaseError)

        await expect(service.postForm(mockPostContactDto)).rejects.toThrow(
          'Database connection lost'
        )

        expect(prismaService.contactFormEntry.create).toHaveBeenCalled()
        expect(
          discordWebhookService.sendContactFormNotification
        ).not.toHaveBeenCalled()
        expect(resendService.sendContactNotification).not.toHaveBeenCalled()
        expect(consoleErrorSpy).not.toHaveBeenCalled()
      })

      it('should handle unique constraint violation', async () => {
        const uniqueError = new Error('Unique constraint failed')
        prismaService.contactFormEntry.create.mockRejectedValue(uniqueError)

        await expect(service.postForm(mockPostContactDto)).rejects.toThrow(
          'Unique constraint failed'
        )

        expect(
          discordWebhookService.sendContactFormNotification
        ).not.toHaveBeenCalled()
        expect(resendService.sendContactNotification).not.toHaveBeenCalled()
      })
    })

    describe('data transformation', () => {
      it('should correctly map Prisma result to GetContactDto', async () => {
        const complexPrismaResult = {
          id: 999,
          email: 'complex@example.com',
          name: 'Complex User',
          company: 'Complex Corp',
          message: 'Complex message with special chars: éàü',
          createdAt: new Date('2023-01-01'),
          updatedAt: new Date('2023-01-02'),
          additionalField: 'should be ignored'
        }
        const expectedComplexResult: GetContactDto = {
          id: 999,
          email: 'complex@example.com',
          name: 'Complex User',
          company: 'Complex Corp',
          message: 'Complex message with special chars: éàü'
        }

        prismaService.contactFormEntry.create.mockResolvedValue(
          complexPrismaResult
        )

        const result = await service.postForm(mockPostContactDto)

        expect(result).toEqual(expectedComplexResult)
        expect(result).not.toHaveProperty('createdAt')
        expect(result).not.toHaveProperty('updatedAt')
        expect(result).not.toHaveProperty('additionalField')
      })
    })

    describe('service call order', () => {
      it('should call services in the correct order', async () => {
        const callOrder: string[] = []

        prismaService.contactFormEntry.create.mockImplementation(async () => {
          callOrder.push('prisma')
          return mockPrismaResult
        })

        discordWebhookService.sendContactFormNotification.mockImplementation(
          async () => {
            callOrder.push('discord')
          }
        )

        resendService.sendContactNotification.mockImplementation(async () => {
          callOrder.push('resend')
        })

        await service.postForm(mockPostContactDto)

        expect(callOrder).toEqual(['prisma', 'discord', 'resend'])
      })

      it('should call notifications in parallel after database operation', async () => {
        let prismaCompleted = false
        let discordStarted = false
        let resendStarted = false

        prismaService.contactFormEntry.create.mockImplementation(async () => {
          await new Promise((resolve) => setTimeout(resolve, 10))
          prismaCompleted = true
          return mockPrismaResult
        })

        discordWebhookService.sendContactFormNotification.mockImplementation(
          async () => {
            discordStarted = true
            expect(prismaCompleted).toBe(true)
          }
        )

        resendService.sendContactNotification.mockImplementation(async () => {
          resendStarted = true
          expect(prismaCompleted).toBe(true)
        })

        await service.postForm(mockPostContactDto)

        expect(prismaCompleted).toBe(true)
        expect(discordStarted).toBe(true)
        expect(resendStarted).toBe(true)
      })
    })
  })
})
