import { useState } from "react";

export interface FilterBarProps {
	onTypeChange: (type: string | null) => void;
	onGenreChange: (genre: string | null) => void;
}

const types = [
	"스릴러",
	"로맨스",
	"코미디",
	"드라마",
	"호러",
	"판타지",
	"액션",
];
const genres = ["대중음악", "뮤지컬", "연극", "클래식", "오페라", "국악"];

export default function FilterBar({
	onTypeChange,
	onGenreChange,
}: FilterBarProps) {
	const [selectedType, setSelectedType] = useState<string | null>(null);
	const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

	const handleTypeClick = (type: string | null) => {
		const newType = selectedType === type ? null : type;
		setSelectedType(newType);
		onTypeChange(newType);
	};

	const handleGenreClick = (genre: string | null) => {
		const newGenre = selectedGenre === genre ? null : genre;
		setSelectedGenre(newGenre);
		onGenreChange(newGenre);
	};

	return (
		<>
			<div>
				<h3>유형</h3>
				{types.map((type) => (
					<button
						key={type}
						type="button"
						onClick={() => handleTypeClick(type)}>
						{type}
					</button>
				))}
			</div>

			<div>
				<h3>장르</h3>
				<h3>유형</h3>
				{genres.map((genre) => (
					<button
						key={genre}
						type="button"
						onClick={() => handleGenreClick(genre)}>
						{genre}
					</button>
				))}
			</div>
		</>
	);
}
