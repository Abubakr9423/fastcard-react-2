import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingProps {
    value: number;
    max?: number;
    className?: string;
    onRate?: (val: number) => void;
}

const Rating = ({ value, max = 5, className }: RatingProps) => {
    return (
        <div className={cn("flex items-center gap-1", className)}>
            {Array.from({ length: max }).map((_, index) => {
                const starValue = index + 1
                const isSelected = starValue <= value

                return (
                    <Star
                        key={index}
                        size={20}
                        className={cn(
                            "cursor-pointer transition-colors",
                            isSelected
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-transparent text-gray-300"
                        )}
                    />
                )
            })}
        </div>
    )
}

export default Rating