import Image from "next/image"

interface LogoProps {
  size?: number
  className?: string
}

export default function Logo({ size = 32, className }: LogoProps) {
  return (
    <Image
      src="/icons/waddlr-icon.svg"
      alt="Waddlr logo"
      width={size}
      height={size}
      className={className}
      priority
    />
  )
}
