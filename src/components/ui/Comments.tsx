// src/components/ui/Comments.tsx

import { useState } from "react";

interface Review {
	id: string;
	writerName: string;
	writerProfileImage?: string;
	content: string;
	likeCount: number;
	createdAt: string;
}

interface CommentsProps {
	reviews: Review[];
	isLoggedIn: boolean;
	userId: string;
}

const Comments = ({ reviews, isLoggedIn, userId }: CommentsProps) => {
	const [reviewList, setReviewList] = useState<Review[]>(reviews);
	const [input, setInput] = useState("");
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editingContent, setEditingContent] = useState("");

	const handleLike = (id: string) => {
		setReviewList((prev) =>
			prev.map((review) =>
				review.id === id
					? { ...review, likeCount: review.likeCount + 1 }
					: review
			)
		);
	};

	const handleAdd = () => {
		if (!input.trim()) return;

		const newReview: Review = {
			id: crypto.randomUUID(),
			writerName: "나", // 임시 사용자 이름
			content: input,
			likeCount: 0,
			createdAt: new Date().toISOString(),
		};

		setReviewList((prev) => [newReview, ...prev]);
		setInput("");
	};

	const handleEdit = (id: string) => {
		const target = reviewList.find((r) => r.id === id);
		if (target) {
			setEditingId(id);
			setEditingContent(target.content);
		}
	};

	const handleSave = (id: string) => {
		setReviewList((prev) =>
			prev.map((r) =>
				r.id === id ? { ...r, content: editingContent } : r
			)
		);
		setEditingId(null);
		setEditingContent("");
	};

	const handleDelete = (id: string) => {
		if (window.confirm("정말 삭제하시겠습니까?")) {
			setReviewList((prev) => prev.filter((r) => r.id !== id));
		}
	};

	if (reviewList.length === 0) {
		return <p>리뷰가 없습니다</p>;
	}

	return (
		<div>
			<h2>리뷰</h2>

			{isLoggedIn && (
				<div>
					<input
						placeholder="리뷰를 입력하세요"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<button onClick={handleAdd} disabled={!input.trim()}>
						등록
					</button>
				</div>
			)}

			{reviewList.map((review) => {
				const isEditing = editingId === review.id;
				const isMine = userId === "user123"; // 실제 비교 조건은 상황에 맞게 바꿔줘

				return (
					<div key={review.id}>
						<strong>{review.writerName}</strong>
						{review.likeCount >= 15 && <span>BEST</span>}
						{isEditing ? (
							<>
								<input
									value={editingContent}
									onChange={(e) => setEditingContent(e.target.value)}
								/>
								<button onClick={() => handleSave(review.id)}>저장</button>
							</>
						) : (
							<p>{review.content}</p>
						)}
						<p>{review.createdAt}</p>
						<p>좋아요 {review.likeCount}</p>
						<button onClick={() => handleLike(review.id)}>좋아요</button>
						{isMine && (
							<>
								<button onClick={() => handleEdit(review.id)}>수정</button>
								<button onClick={() => handleDelete(review.id)}>삭제</button>
							</>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Comments;
