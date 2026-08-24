import { useNavigate } from "react-router"

export function XeniaLogoNoName({width,height}) {
  const nav = useNavigate()
    return <svg width={`${width}`} height={`${height}`} onClick={() => {nav("/")}} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g stroke="var(--primary, hsl(312.9, 100%, 50%))" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 50 50 C 20 95, 5 80, 50 50" />
    <path d="M 50 50 C 95 80, 80 95, 50 50" />
    <path d="M 50 50 C 5 20, 20 5, 50 50" />
  </g>
  
  <g stroke="var(--accent, hsl(168, 100%, 50%))" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 40 40 C 80 5, 95 20, 50 50" />
  </g>
  <circle cx="40" cy="40" r="7" fill="var(--accent, hsl(168, 100%, 50%))" />
</svg>

}