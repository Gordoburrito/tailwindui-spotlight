export function Education({ education = [], certifications }) {
  if (!education.length && (!certifications || !certifications.length)) {
    return null
  }

  return (
    <div className="resume-education">
      {education.map((edu, index) => (
        <p key={index}>
          <span className="resume-degree">
            {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
          </span>
          , {edu.institution}.
        </p>
      ))}
      {certifications && certifications.length > 0 && (
        <div className="resume-certifications">
          {certifications.map((cert, index) => (
            <p key={index}>{cert}.</p>
          ))}
        </div>
      )}
    </div>
  )
}
