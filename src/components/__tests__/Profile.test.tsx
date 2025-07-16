import { render, screen } from '@testing-library/react';
import { Profile } from '../ui/Profile';

describe('Profile 컴포넌트', () => {
	const mockUser = {
		name: '오준택',
		email: 'rmsdnjsaos@gmail.com',
		imageUrl: '/profile.jpg',
	};

	it('사용자 이름과 이메일이 화면에 표시되어야 한다', () => {
		render(<Profile user={mockUser} />);

		expect(screen.getByText('오준택')).toBeInTheDocument();
		expect(screen.getByText('rmsdnjsaos@gmail.com')).toBeInTheDocument();
	});

	it('사용자 이미지가 렌더링되어야 한다', () => {
		render(<Profile user={mockUser} />);

		const img = screen.getByAltText('사용자 이미지') as HTMLImageElement;
		expect(img).toBeInTheDocument();
		expect(img.src).toContain('/profile.jpg');
	});

	it('사용자 정보가 없을 경우 fallback 메시지를 표시한다', () => {
		render(<Profile user={null} />);
		expect(screen.getByText('사용자 정보를 불러올 수 없습니다')).toBeInTheDocument();
	});
});