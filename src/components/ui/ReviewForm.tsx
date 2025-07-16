import { useState } from "react";

interface ReviewFormProps {
	isLoggedIn: boolean;
	onSubmit: (review: string) => void;
	onRequireLogin: () => void;
}

const ReviewForm = ({
	isLoggedIn,
	onSubmit,
	onRequireLogin,
}: ReviewFormProps) => {
	const [text, setText] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!text.trim()) return;

		if (isLoggedIn) {
			onSubmit(text);
			setText("");
		} else {
			onRequireLogin();
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<textarea
				placeholder="후기를 입력해주세요"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button type="submit">리뷰 작성</button>
		</form>
	);
};

export default ReviewForm;
