import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import {
  ResumeLayout,
  ResumeSection,
  ContactInfo,
  Skills,
  Experience,
  Education,
} from '@/components/Resume'

export default function ResumeVariant({ resume }) {
  if (!resume) return <div>Resume not found</div>

  return (
    <>
      <Head>
        <title>{resume.meta?.title || 'Resume'}</title>
        <meta
          name="description"
          content={resume.meta?.description || 'Professional Resume'}
        />
      </Head>
      <div
        className="resume-container resume-compact"
        style={{ '--accent-color': '#1B365D', '--accent-text-color': '#FFFFFF' }}
      >
        <ResumeLayout>
          <ContactInfo contact={resume.contact} titleOverride={resume.contact.title} />

          <ResumeSection title="Experience">
            <Experience experience={resume.experience} />
          </ResumeSection>

          {resume.skills && resume.skills.length > 0 && (
            <ResumeSection title="Skills">
              <Skills skills={resume.skills} />
            </ResumeSection>
          )}

          <ResumeSection title="Education">
            <Education
              education={resume.education}
              certifications={resume.certifications}
            />
          </ResumeSection>
        </ResumeLayout>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.params
  const filePath = path.join(process.cwd(), 'src', 'data', `resume-${slug}.json`)

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    return { props: { resume: data } }
  } catch (e) {
    return { notFound: true }
  }
}
