export interface Router {
  navigate: (path: string | URL, searchParams?: URLSearchParams) => void;
}
