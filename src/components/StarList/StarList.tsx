import Star from '../Star/Star'

interface Props {
  numberOfStars?: number
  numberOfStarsFilled?: number
  fill?: string
  className?: string
  onClick: (star: number) => void
}

export default function StarList({
  numberOfStars = 5,
  numberOfStarsFilled = 0,
  fill = '#ffa727',
  className = '',
  onClick
}: Props) {
  return (
    <button
      className={`flex items-center ${className}`}
      onClick={() => {
        onClick(numberOfStarsFilled)
      }}
    >
      {Array(numberOfStars)
        .fill(0)
        .map((_, index) => {
          const shouldFillStar = index < numberOfStarsFilled
          return <Star key={index} fill={shouldFillStar ? fill : 'none'} />
        })}
    </button>
  )
}
