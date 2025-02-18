// @ts-expect-error The @fontsource package has no type declarations
import '@fontsource/roboto';

import './style.scss';
import { outlet, router } from '@config/router/router';

window.router = router;

const indexButton = document.createElement('button');
indexButton.setAttribute('type', 'button');
indexButton.innerHTML = 'Index';

indexButton.addEventListener('click', () => {
  router('/');
});

const contactUsButton = document.createElement('button');
contactUsButton.setAttribute('type', 'button');
contactUsButton.innerHTML = 'Contact us';

contactUsButton.addEventListener('click', () => {
  router('/contact-us');
});

const contactUsLink = document.createElement('a');
contactUsLink.setAttribute('href', '/contact-us');
contactUsLink.innerHTML = 'Contact us';
contactUsLink.addEventListener('click', function (event) {
  event.preventDefault();
  router(this.pathname);
});

document.body.appendChild(indexButton);
document.body.appendChild(contactUsButton);
document.body.appendChild(contactUsLink);
document.body.appendChild(outlet);
