import Head from 'next/head'

import { SimpleLayout } from '@/components/SimpleLayout'

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Thank you for reaching out - Gordon Lewis</title>
        <meta
          name="description"
          content="Looking forward to working with you."
        />
      </Head>
      <SimpleLayout
        title="Thanks for your message!"
        intro="I appreciate you reaching out and will be in touch with you soon to discuss further."
      />
    </>
  )
}
