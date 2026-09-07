type Event =
  | {
      state: "login";
      payload: {
        account: string;
        password: string;
      };
    }
  | {
      state: "logout";
      message: string;
    };
function assertNever(x: never): never {
  throw new Error(`unexpected value: ${JSON.stringify(x)}`);
}
function handleEvent(event: Event): string {
  switch (event.state) {
    case "login":
      return `please enter account and password`;
    case "logout":
      return "logout successed";
    default:
      return assertNever(event);
  }
}
