// Internal: unique element ids for the form controls. Not exported from the package.
let nextId = 0;
export const uid = (prefix: string) => `${prefix}-${++nextId}`;
