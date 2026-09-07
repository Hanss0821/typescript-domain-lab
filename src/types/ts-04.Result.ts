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
  if (id === "1") {
    return {
      ok: true,
      value: {
        id,
        name: "a",
      },
    };
  }
  return {
    ok: false,
    error: {
      code: 500,
      message: "User does not exist",
    },
  };
}

const user1 = findUser("1");
// discriminated union（可辨识联合） 的设计：调用端必须先看判别字段，不能假设某次调用一定成功
// console.log(user1.value.name);
// 需要进一步收窄访问
if (user1.ok) {
  console.log(user1.value.name);
} else {
  console.log(user1.error.message);
}

function isObject(input: unknown): input is Record<string, unknown> {
  return typeof input === "object" && input !== null;
}
function isUser(value: unknown): value is User {
  if (!isObject(value)) return false;
  return typeof value.id === "string" && typeof value.name === "string";
}
function isSomeError(error: unknown): error is SomeError {
  if (!isObject(error)) return false;
  return typeof error.code === "number" && typeof error.messaage === "string";
}
const invalid = (message: string): Result<User, SomeError> => ({
  ok: false,
  error: { code: 400, message },
});

function parseUserResult(input: unknown): Result<User, SomeError> {
  let data: unknown = input;
  if (typeof input === "string") {
    try {
      data = JSON.parse(input);
    } catch (err) {
      return invalid("无效的 JSON 字符串");
    }
  }

  if (!isObject(data)) {
    return {
      ok: false,
      error: {
        code: 400,
        message: "no object",
      },
    };
  }
  if (data.ok === true) {
    if (isUser(data.value)) {
      return {
        ok: true,
        value: data.value,
      };
    }
  } else {
    if (isSomeError(data.error)) {
      return {
        ok: false,
        error: data.error,
      };
    }
  }
  return invalid("ok 不是 true/false");
}
