import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import '@fontsource/material-icons/400.css';

import './style.scss';
import { outlet, createRouter } from '@config/router/router';
import { routes } from '@routes/routes';
import { Div } from '@ui/components/div';

createRouter(routes);

document.body.appendChild(outlet);

setTimeout(() => {
  document.body.appendChild(Div({ children: 'new node' }));
}, 3000);
