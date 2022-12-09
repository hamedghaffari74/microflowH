export type User = {
  id: string;
  name: string;
};

export type HookData<T> = {
  data: T;
  isLoading: boolean;
  error?: Error;
};
