export function Experience({ experience }) {
  return (
    <div className="resume-experience">
      {experience.map((job, index) => (
        <article key={index}>
          <h3 className="resume-job-title">
            {job.position} <span className="resume-job-meta">— {job.company}, {job.location} ({job.startDate}–{job.current ? 'Present' : job.endDate})</span>
          </h3>
          {job.highlights && job.highlights.length > 0 && (
            <ul className="resume-job-highlights">
              {job.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  )
}
