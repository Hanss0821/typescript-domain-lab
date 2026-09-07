type IdleState = {
  state: "idle";
};
type LoadingState = {
  state: "loading";
};
type SuccessState<T> = {
  state: "success";
  data: T;
};
type ErrorState = {
  state: "error";
  error: {
    code: number;
    message: string;
  };
};
type RequestState<T> = IdleState | LoadingState | SuccessState<T> | ErrorState;

function renderState<T>(state: RequestState<T>): string {
  if (state.state === "success") {
    // 这里 state.data 应是 T
    return `Success ${state.data}`;
  } else if (state.state === "error") {
    // 这里只能碰 error
    return state.error.message;
  } else if (state.state === "idle") {
    // 这里不应有 data / error
    return "idle";
  } else if (state.state === "loading") {
    return "loading";
  }
  throw new Error("state is valid");
}
