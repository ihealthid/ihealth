export interface DisclosureAction {
  open: () => void;
  close: () => void;
}

export interface DisclosureActionOnEdit<T> {
  open: (id: T) => void;
  close: () => void;
}
