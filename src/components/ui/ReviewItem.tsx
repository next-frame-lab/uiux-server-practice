import ReviewVoteButtons from "./ReviewVoteButtons";

interface Review {
	id: number;
	userId: number;
	name: string;
	content: string;
	thumb_count: number;
	dislike_count: number;
}

interface ReviewItemProps {
	review: Review;
	currentUserId: number | null;
	onDelete: (id: number) => void;
	isLoggedIn: boolean;
	onRequireLogin: () => void;
}

const ReviewItem = ({
	review,
	currentUserId,
	onDelete,
	isLoggedIn,
	onRequireLogin,
}: ReviewItemProps) => {
	const isMyReview = currentUserId === review.userId;
	const isBestReview = review.thumb_count >= 15;

	return (
		<div className="mb-4 rounded-md border p-4">
			<div className="flex items-center justify-between">
				<p className="font-bold">{review.name}</p>
				{isBestReview && (
					<span className="rounded bg-yellow-300 px-2 py-0.5 text-xs text-black">
						BEST Review
					</span>
				)}
			</div>

			<p className="mb-2 text-sm text-gray-600">{review.content}</p>

			<ReviewVoteButtons
				initialLikes={review.thumb_count}
				initialDislikes={review.dislike_count}
				isLoggedIn={isLoggedIn}
				onRequireLogin={onRequireLogin}
			/>

			{isMyReview && (
				<button
					onClick={() => onDelete(review.id)}
					className="mt-2 text-sm text-red-500">
					삭제
				</button>
			)}
		</div>
	);
};

export default ReviewItem;
