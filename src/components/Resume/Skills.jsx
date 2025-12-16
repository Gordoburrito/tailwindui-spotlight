export function Skills({ skills }) {
  return (
    <ul className="resume-skills">
      {skills.map((skillGroup, index) => (
        <li key={index}>
          <span className="resume-skill-category">
            {skillGroup.category}:
          </span>{' '}
          {skillGroup.items.join(', ')}
        </li>
      ))}
    </ul>
  )
}
