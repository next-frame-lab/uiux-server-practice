import { useState } from "react";

interface ReviewVoteButtonsProps {
	initialLikes: number;
	initialDislikes: number;
	isLoggedIn: boolean;
	onRequireLogin: () => void;
}

const ReviewVoteButtons = ({
	initialLikes,
	initialDislikes,
	isLoggedIn,
	onRequireLogin,
}: ReviewVoteButtonsProps) => {
	const [liked, setLiked] = useState(false);
	const [disliked, setDisliked] = useState(false);
	const [likes, setLikes] = useState(initialLikes);
	const [dislikes, setDislikes] = useState(initialDislikes);

	const handleLike = () => {
		if (!isLoggedIn) return onRequireLogin();

		if (liked) {
			setLiked(false);
			setLikes((prev) => prev - 1);
		} else {
			setLiked(true);
			setLikes((prev) => prev + 1);

			if (disliked) {
				setDisliked(false);
				setDislikes((prev) => prev - 1);
			}
		}
	};

	const handleDislike = () => {
		if (!isLoggedIn) return onRequireLogin();

		if (disliked) {
			setDisliked(false);
			setDislikes((prev) => prev - 1);
		} else {
			setDisliked(true);
			setDislikes((prev) => prev + 1);

			if (liked) {
				setLiked(false);
				setLikes((prev) => prev - 1);
			}
		}
	};

	return (
		<div className="flex gap-2">
			<button onClick={handleLike}>👍 {likes}</button>
			<button onClick={handleDislike}>👎 {dislikes}</button>
		</div>
	);
};

export default ReviewVoteButtons;
