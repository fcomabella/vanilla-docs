import { Router } from '@config/router/models/router';

export const navigateMock = vi.fn();

export const routerMock: Router = {
  navigate: navigateMock,
};
