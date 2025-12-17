import { useState, useEffect } from 'react'
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

const COLOR_PRESETS = [
  { name: 'Yellow', value: '#FFFF64', textColor: '#000000' },
  { name: 'Teal', value: '#14B8A6', textColor: '#FFFFFF' },
  { name: 'Blue', value: '#3B82F6', textColor: '#FFFFFF' },
  { name: 'Purple', value: '#8B5CF6', textColor: '#FFFFFF' },
  { name: 'Rose', value: '#F43F5E', textColor: '#FFFFFF' },
  { name: 'Orange', value: '#F97316', textColor: '#000000' },
  { name: 'Green', value: '#22C55E', textColor: '#000000' },
]

function DownloadIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
      <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
    </svg>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  )
}

const DEFAULT_TITLE = 'Full Stack Engineer'

function isValidHex(hex) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)
}

export default function Resume({ resume }) {
  const [accentColor, setAccentColor] = useState(COLOR_PRESETS[0].value)
  const [textColor, setTextColor] = useState(COLOR_PRESETS[0].textColor)
  const [jobTitle, setJobTitle] = useState(DEFAULT_TITLE)
  const [customBgInput, setCustomBgInput] = useState('')
  const [customTextInput, setCustomTextInput] = useState('')

  useEffect(() => {
    const savedBgColor = localStorage.getItem('resumeAccentColor')
    const savedTextColor = localStorage.getItem('resumeTextColor')
    const savedTitle = localStorage.getItem('resumeJobTitle')

    if (savedBgColor) {
      setAccentColor(savedBgColor)
      setCustomBgInput(savedBgColor)
    }
    if (savedTextColor) {
      setTextColor(savedTextColor)
      setCustomTextInput(savedTextColor)
    } else if (savedBgColor) {
      const preset = COLOR_PRESETS.find(c => c.value === savedBgColor)
      if (preset) {
        setTextColor(preset.textColor)
        setCustomTextInput(preset.textColor)
      }
    }
    if (savedTitle) {
      setJobTitle(savedTitle)
    }
  }, [])

  const handleColorSelect = (color) => {
    setAccentColor(color.value)
    setTextColor(color.textColor)
    setCustomBgInput(color.value)
    setCustomTextInput(color.textColor)
    localStorage.setItem('resumeAccentColor', color.value)
    localStorage.setItem('resumeTextColor', color.textColor)
  }

  const handleCustomBgChange = (e) => {
    const value = e.target.value
    setCustomBgInput(value)
    if (isValidHex(value)) {
      setAccentColor(value)
      localStorage.setItem('resumeAccentColor', value)
    }
  }

  const handleCustomTextChange = (e) => {
    const value = e.target.value
    setCustomTextInput(value)
    if (isValidHex(value)) {
      setTextColor(value)
      localStorage.setItem('resumeTextColor', value)
    }
  }

  const handleTitleChange = (e) => {
    const newTitle = e.target.value
    setJobTitle(newTitle)
    localStorage.setItem('resumeJobTitle', newTitle)
  }

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

      {/* Resume content */}
      <div className="resume-container" style={{ '--accent-color': accentColor, '--accent-text-color': textColor }}>
        <ResumeLayout>
          <ContactInfo contact={resume.contact} titleOverride={jobTitle} />

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

      {/* Color picker and download button - hidden when printing */}
      <div className="no-print mx-auto mb-16 mt-12 max-w-[750px] px-4 sm:px-14">
        {/* Title Section */}
        <div className="mb-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <img
            src="https://i.pinimg.com/736x/ac/88/e5/ac88e58bf6471b2903176d5866a624cc.jpg"
            alt="Buddy the Elf"
            className="h-32 w-auto rounded-2xl object-cover shadow-lg sm:h-40"
          />
          <h2 className="text-center text-2xl font-bold leading-relaxed text-zinc-900 dark:text-zinc-100 sm:text-left sm:text-3xl">
            Gordon the{' '}
            <span className="inline-block whitespace-nowrap">
              <input
                type="text"
                value={jobTitle}
                onChange={handleTitleChange}
                className="border-b-2 border-dashed bg-transparent font-bold focus:outline-none"
                style={{
                  width: `${jobTitle.length + 1}ch`,
                  borderColor: accentColor,
                  color: 'inherit',
                }}
              />,
            </span>{' '}
            what&apos;s your favorite color?
          </h2>
        </div>

        {/* Color Presets */}
        <div className="mb-8">
          <p className="mb-4 text-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Pick a preset
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {COLOR_PRESETS.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorSelect(color)}
                aria-label={`Select ${color.name}`}
                className="relative h-12 w-12 rounded-full shadow-md transition-all hover:scale-110 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
                style={{
                  backgroundColor: color.value,
                  boxShadow: accentColor === color.value ? `0 0 0 3px white, 0 0 0 5px ${color.value}` : undefined,
                }}
              >
                {accentColor === color.value && (
                  <CheckIcon
                    className="absolute inset-0 m-auto h-6 w-6"
                    style={{ color: color.textColor }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Hex Colors */}
        <div className="mb-10">
          <p className="mb-4 text-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Or use custom hex colors
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-3">
              <div
                className="h-8 w-8 rounded-full border-2 border-zinc-200 shadow-sm dark:border-zinc-700"
                style={{ backgroundColor: accentColor }}
              />
              <div>
                <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Background
                </label>
                <input
                  type="text"
                  value={customBgInput}
                  onChange={handleCustomBgChange}
                  placeholder="#FFFF64"
                  className="w-24 rounded border border-zinc-300 bg-white px-2 py-1 font-mono text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="h-8 w-8 rounded-full border-2 border-zinc-200 shadow-sm dark:border-zinc-700"
                style={{ backgroundColor: textColor }}
              />
              <div>
                <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Text
                </label>
                <input
                  type="text"
                  value={customTextInput}
                  onChange={handleCustomTextChange}
                  placeholder="#000000"
                  className="w-24 rounded border border-zinc-300 bg-white px-2 py-1 font-mono text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-center">
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold shadow-md transition hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ backgroundColor: accentColor, color: textColor }}
          >
            <DownloadIcon className="h-4 w-4" />
            Download PDF
          </button>
        </div>
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
