import { useState } from "react";

interface Props {
	onChange: (star: number) => void;
}

const RATING_VALUES = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export default function PerformanceRating({ onChange }: Props) {
	const [rating, setRating] = useState<number>(0);

	const handleRating = (star: number) => {
		setRating(star);
		onChange(star);
	};

	return (
		<div>
			{RATING_VALUES.map((value) => (
				<button type="button" key={value} onClick={() => handleRating(value)}>
					*
				</button>
			))}
			<span>{rating}점</span>
		</div>
	);
}
