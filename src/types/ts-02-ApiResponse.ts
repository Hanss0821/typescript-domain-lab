type User = {
  id: string;
  name: string;
};

// type ApiResponse<T> = {
//   code: number;
//   message: string;
//   data?: T;
// };

// 联合类型判别状态是否包含data字段，会自动分发
type ApiResponse<T> =
  | {
      ok: true;
      code: 0;
      message: string;
      data: T;
    }
  | {
      ok: false;
      code: number;
      message: string;
    };

// declare function unwrap<T>(response: ApiResponse<T>): T;

export function unwrap<T>(response: ApiResponse<T>): T {
  if (!response.ok) {
    throw new Error(`${response.code}_${response.message}`);
  }
  return response.data;
}

const okUserResponse: ApiResponse<User> = {
  ok: true,
  code: 0,
  message: "success",
  data: { id: "u1", name: "Ada" },
};

const user = unwrap(okUserResponse);

const failUserResponse: ApiResponse<User> = {
  ok: false,
  code: 500,
  message: "server error",
};
//  @ts-expect-error 根据ok的状态判别
failUserResponse.data;
