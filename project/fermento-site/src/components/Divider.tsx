export function Divider({ mark = '✦' }) {
  return (
    <div className="divider">
      <span className="mark">{mark}</span>
    </div>
  )
}

export function Flourish({ flip = false, small = false }) {
  return (
    <img
      src="/assets/ornament-flourish.png"
      alt=""
      className={`flourish${flip ? ' flip' : ''}${small ? ' sm' : ''}`}
    />
  )
}
