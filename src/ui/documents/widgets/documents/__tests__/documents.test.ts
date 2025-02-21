import { getDocumentsControllerMock } from '@__mocks__/container-mock';
import { PromiseMother } from '@__mocks__/promise-mother';
import { render } from '@__tests__/render';
import { Document } from '@ui/documents/models';
import { Documents } from '../documents';
import { screen, waitFor } from '@testing-library/dom';
import { DocumentsMother } from '@ui/documents/models/__mocks__/documents-mother';

describe('Documents widget', () => {
  it('Should display the loading status', async () => {
    const { promise, resolve } = PromiseMother<Array<Document>>();

    getDocumentsControllerMock.mockReturnValue(promise);

    render(Documents({ sort: 'name', view: 'list' }));

    expect(screen.getByText('Loading documents...')).toBeInTheDocument();

    resolve(DocumentsMother());

    await promise;
  });

  it('Should display the column title bar for the list view', async () => {
    const { promise, resolve } = PromiseMother<Array<Document>>();

    getDocumentsControllerMock.mockReturnValue(promise);

    render(Documents({ sort: 'name', view: 'list' }));

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Contributors')).toBeInTheDocument();
    expect(screen.getByText('Attachments')).toBeInTheDocument();

    resolve(DocumentsMother());

    await promise;
  });

  it('Should not display the column title bar for the grid view', async () => {
    const { promise, resolve } = PromiseMother<Array<Document>>();

    getDocumentsControllerMock.mockReturnValue(promise);

    render(Documents({ sort: 'name', view: 'grid' }));

    expect(screen.queryByText('Name')).not.toBeInTheDocument();
    expect(screen.queryByText('Contributors')).not.toBeInTheDocument();
    expect(screen.queryByText('Attachments')).not.toBeInTheDocument();

    resolve(DocumentsMother());

    await promise;
  });

  it('Should display the documents', async () => {
    const documents = DocumentsMother();
    const { promise, resolve } = PromiseMother<Array<Document>>();

    getDocumentsControllerMock.mockReturnValue(promise);

    render(Documents({ sort: 'name', view: 'list' }));

    resolve(documents);

    await waitFor(async () => {
      await Promise.all(
        documents.map((document) => {
          return expect(screen.getByText(document.name)).toBeInTheDocument();
        })
      );
    });
  });

  it('Should display the loading documents error', async () => {
    const { promise, reject } = PromiseMother<Array<Document>>();

    getDocumentsControllerMock.mockReturnValue(promise);

    render(Documents({ sort: 'name', view: 'list' }));

    reject(new Error('Error loading documents'));

    await waitFor(() =>
      expect(
        screen.getByText('There was an error loading documents')
      ).toBeInTheDocument()
    );
  });
});
