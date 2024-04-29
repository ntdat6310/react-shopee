import Star from '../Star/Star'

interface Props {
  numberOfStars?: number
  numberOfStarsFilled?: number
  fill?: string
  className?: string
}

export default function StarList({
  numberOfStars = 5,
  numberOfStarsFilled = 0,
  fill = 'yellow',
  className = ''
}: Props) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array(numberOfStars)
        .fill(0)
        .map((_, index) => {
          const shouldFillStar = index < numberOfStarsFilled
          return <Star key={index} fill={shouldFillStar ? fill : 'none'} />
        })}
    </div>
  )
}
