import { handlers } from '@__tests__/server/handlers';
import { setupServer } from 'msw/node';

export const server = setupServer(...handlers);
