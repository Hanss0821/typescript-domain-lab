type User = {
  id: string;
  name: string;
};

type Activity = {
  id: string;
  name: string;
};

type Page<T> = {
  page: number;
  total: number;
  pageSize: number;
  data: T[];
};

function getFirstItem<T>(target: Page<T>) {
  return target.data[0];
}

const users: Page<User> = {
  page: 1,
  total: 10,
  pageSize: 10,
  data: [{ id: "1", name: "a" }],
};

const activities: Page<Activity> = {
  page: 1,
  total: 10,
  pageSize: 10,
  data: [{ id: "1", name: "Draw" }],
};

const firstUser = getFirstItem(users); // User | undefined
const firstActivity = getFirstItem(activities); // Activity | undefined
