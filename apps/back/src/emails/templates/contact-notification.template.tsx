import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column
} from '@react-email/components'
import { PostContactDto } from '../../resources/contact/dtos/post-contact.dto'
import * as React from 'react'

interface ContactNotificationTemplateProps {
  contact: PostContactDto
}

export const ContactNotificationTemplate: React.FC<
  ContactNotificationTemplateProps
> = ({ contact }: ContactNotificationTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Thank you for contacting me !</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Row>
              <Column align="center">
                <Heading style={h1}>Mohamed Tahiri</Heading>
                <Text style={subtitle}>
                  Software Engineer Student @ UTC, France
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h2}>Thank you for your message !</Heading>

            <Text style={paragraph}>
              Hello <strong>{contact.name}</strong>,
            </Text>

            <Text style={paragraph}>
              Thank you for taking the time to contact me through my website. I
              have received your message and appreciate your interest.
            </Text>

            {/* Contact Summary */}
            <Section style={summaryBox}>
              <Heading style={h3}>Summary of your message:</Heading>

              <Row style={summaryRow}>
                <Column style={labelColumn}>
                  <Text style={label}>Name:</Text>
                </Column>
                <Column>
                  <Text style={value}>{contact.name}</Text>
                </Column>
              </Row>

              <Row style={summaryRow}>
                <Column style={labelColumn}>
                  <Text style={label}>Company:</Text>
                </Column>
                <Column>
                  <Text style={value}>{contact.company}</Text>
                </Column>
              </Row>

              <Row style={summaryRow}>
                <Column style={labelColumn}>
                  <Text style={label}>Email address:</Text>
                </Column>
                <Column>
                  <Text style={value}>{contact.email}</Text>
                </Column>
              </Row>

              {contact.message && (
                <Row style={summaryRow}>
                  <Column style={labelColumn}>
                    <Text style={label}>Message:</Text>
                  </Column>
                  <Column>
                    <Text style={messageValue}>"{contact.message}"</Text>
                  </Column>
                </Row>
              )}
            </Section>

            <Text style={paragraph}>
              I will get back to you within <strong>24 hours</strong> after
              receiving your message.
            </Text>

            <Text style={paragraph}>
              Best regards,
              <br />
              Mohamed Tahiri
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Mohamed Tahiri - Software Engineer Student @ UTC, France
            </Text>
            <Text style={footerText}>
              <Link href="https://mohamedtahiri.com" style={footerLink}>
                mohamedtahiri.com
              </Link>
              {' • '}
              <Link href="mailto:me@mohamedtahiri.com" style={footerLink}>
                me@mohamedtahiri.com
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f8fafc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
}

const container = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow:
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
}

const header = {
  backgroundColor: '#1e293b',
  padding: '40px 24px',
  textAlign: 'center' as const
}

const h1 = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
  lineHeight: '1.2'
}

const subtitle = {
  color: '#cbd5e1',
  fontSize: '16px',
  margin: '0',
  fontWeight: '500'
}

const content = {
  padding: '40px 24px'
}

const h2 = {
  color: '#1e293b',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 24px 0',
  lineHeight: '1.3'
}

const h3 = {
  color: '#374151',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px 0',
  lineHeight: '1.4'
}

const paragraph = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px 0'
}

const summaryBox = {
  backgroundColor: '#f1f5f9',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
  border: '1px solid #e2e8f0'
}

const summaryRow = {
  marginBottom: '12px'
}

const labelColumn = {
  width: '120px',
  verticalAlign: 'top' as const
}

const label = {
  color: '#64748b',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
  lineHeight: '1.5'
}

const value = {
  color: '#1e293b',
  fontSize: '14px',
  margin: '0',
  lineHeight: '1.5'
}

const messageValue = {
  color: '#1e293b',
  fontSize: '14px',
  margin: '0',
  lineHeight: '1.6',
  fontStyle: 'italic',
  backgroundColor: '#ffffff',
  padding: '12px',
  borderRadius: '6px',
  border: '1px solid #e2e8f0'
}

const footer = {
  backgroundColor: '#f8fafc',
  padding: '32px 24px',
  textAlign: 'center' as const,
  borderTop: '1px solid #e2e8f0'
}

const footerText = {
  color: '#64748b',
  fontSize: '14px',
  margin: '0 0 8px 0',
  lineHeight: '1.5'
}

const footerLink = {
  color: '#3b82f6',
  textDecoration: 'none',
  fontWeight: '500'
}
