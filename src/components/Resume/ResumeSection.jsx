export function ResumeSection({ title, children }) {
  return (
    <section className="resume-section">
      <h2 className="resume-section-title">
        <span>{title}</span>
        <span className="resume-section-line"></span>
      </h2>
      {children}
    </section>
  )
}
