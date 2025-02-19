export interface Router {
  navigate: (path: string, searchParams?: URLSearchParams) => void;
}
