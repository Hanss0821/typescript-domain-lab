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
  } else if (data.ok === false) {
    if (isSomeError(data.error)) {
      return {
        ok: false,
        error: data.error,
      };
    }
  }
  return invalid("ok 不是 true/false");
}

/**
 * 领域模型
 * 先写出“什么情况下，必须有什么、不能有什么”，再定义类型。
 * 比如查询用户：
  - 成功时，必须有用户信息，不能拿错误信息充数。
  - 失败时，必须有错误原因，不能假装查到了用户。
  实际建模时，依次问自己：
  1. 有哪些情况？ 成功、失败。
  2. 每种情况必须带什么？ 成功带用户，失败带错误。
  3. 哪些组合不合理？ 说成功却没有用户。
  4. 我的类型和入口检查，能不能拦住这些不合理的组合？
 */
