// a | b | c ---> { a:V; b:V; c:V }
export type UnionToObj<K extends string, V = string> = {
  [P in keyof { K: K } as `${K}`]: V;
};
