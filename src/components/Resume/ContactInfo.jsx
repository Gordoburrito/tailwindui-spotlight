export function ContactInfo({ contact }) {
  return (
    <header className="resume-contact">
      <h1>{contact.name}</h1>
      {contact.title && (
        <p className="resume-title">{contact.title}</p>
      )}
      {contact.location && (
        <p className="resume-location">{contact.location}</p>
      )}
      <div className="resume-contact-bar">
        <span className="resume-contact-bar-inner">
          {contact.phone && <span>{contact.phone}</span>}
          {contact.phone && contact.email && <span className="resume-separator">·</span>}
          {contact.email && (
            <a href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          )}
          {contact.email && contact.github && <span className="resume-separator">·</span>}
          {contact.github && (
            <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer">
              {contact.github}
            </a>
          )}
        </span>
      </div>
    </header>
  )
}
