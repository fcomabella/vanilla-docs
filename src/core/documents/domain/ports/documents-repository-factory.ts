import { DocumentsRepository } from './documents-repository';

export type DocumentsRepositoryFactory = (props: {
  fetchFn: (url: string) => Promise<unknown>;
}) => DocumentsRepository;
