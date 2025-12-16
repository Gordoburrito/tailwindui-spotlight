import Head from 'next/head'
import {
  ResumeLayout,
  ResumeSection,
  ContactInfo,
  Skills,
  Experience,
  Education,
} from '@/components/Resume'
import resumeData from '@/data/resume.json'

function DownloadIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
      <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
    </svg>
  )
}

export default function Resume({ resume }) {
  const handleDownloadPDF = () => {
    window.print()
  }

  return (
    <>
      <Head>
        <title>{resume.meta?.title || 'Resume'}</title>
        <meta
          name="description"
          content={resume.meta?.description || 'Professional Resume'}
        />
      </Head>

      {/* Download button - hidden when printing */}
      <div className="no-print mx-auto mt-12 max-w-[750px] px-4 sm:px-14">
        <div className="flex justify-end">
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFFF64] px-5 py-2.5 text-sm font-bold text-black shadow-md transition hover:bg-yellow-300 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
          >
            <DownloadIcon className="h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Resume content */}
      <div className="resume-container">
        <ResumeLayout>
          <ContactInfo contact={resume.contact} />

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

export async function getStaticProps() {
  return {
    props: {
      resume: resumeData,
    },
  }
}
