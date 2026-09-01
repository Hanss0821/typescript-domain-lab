type Result<T, E> =
  | {
      ok: true;
      value: T;
    }
  | {
      ok: false;
      error: E;
    };
type User = {
  id: string;
  name: string;
};
type SomeError = {
  code: number;
  message: string;
};

function findUser(id: string): Result<User, SomeError> {
  return {
    ok: true,
    value: {
      id: "1",
      name: "a",
    },
  };
}
