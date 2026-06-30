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
      src="https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/ornament-flourish.png"
      alt=""
      className={`flourish${flip ? ' flip' : ''}${small ? ' sm' : ''}`}
    />
  )
}
