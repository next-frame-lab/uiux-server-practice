import { useState } from "react";
import comments from "../../data/comments.json";

type Comment = {
	id: number;
	title: string;
	description: string;
	thumb_count: number;
	write_time: string;
	modified_time: string;
};

const ReviewList = () => {
	const [reviews] = useState<Comment[]>(comments);

	return (
		<section className="p-4 space-y-4">
			<h2 className="text-2xl font-bold">공연 리뷰</h2>
			<ul>
				{reviews.map((review) => (
					<li
						key={review.id}
						data-testid="review-item"
						className="border rounded-lg p-4 shadow-sm space-y-1"
					>
						<div className="flex justify-between items-center">
							<h3 className="text-lg font-semibold">{review.title}</h3>
							{review.thumb_count >= 20 && (
								<span
									data-testid="best-badge"
									className="bg-yellow-300 text-xs px-2 py-1 rounded-full"
								>
									BEST Review
								</span>
							)}
						</div>
						<p className="text-gray-700">{review.description}</p>
						<p className="text-sm text-gray-500">
							좋아요 {review.thumb_count}개
						</p>
					</li>
				))}
			</ul>
		</section>
	);
};

export default ReviewList;