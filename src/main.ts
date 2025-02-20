import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import '@fontsource/material-icons/400.css';

import './style.scss';
import { outlet, createRouter } from '@config/router/router';
import { routes } from '@routes/routes';

createRouter(routes);

document.body.appendChild(outlet);
