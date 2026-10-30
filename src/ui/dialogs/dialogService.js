// Requests are queued so concurrent mutations never overwrite another dialog.
let requests = [];
const listeners = new Set();
const notify = () => listeners.forEach((listener) => listener());

/** Show a project dialog. Resolves true on confirmation, false on dismissal. */
export function showDialog(options) {
  return new Promise((resolve) => {
    requests = [...requests, { options, resolve }];
    notify();
  });
}

export const dialogStore = {
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: () => requests[0] ?? null,
  settle(request, confirmed) {
    if (requests[0] !== request) return;
    requests = requests.slice(1);
    request.resolve(confirmed);
    notify();
  },
};
