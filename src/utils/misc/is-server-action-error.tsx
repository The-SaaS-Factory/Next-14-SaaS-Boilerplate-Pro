export type ActionError = { error: string };
export type ServerActionResponse<T = {}> = ActionError | T | undefined;

export function isServerActionError(error: any): error is ActionError {
  return error && "error" in error && error.error;
}
