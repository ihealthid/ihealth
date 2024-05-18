import { useGetUsersQuery } from "@/services/api/user";
import { Pagination } from "@mantine/core";

export const UserTablePaginator = () => {
  const { data } = useGetUsersQuery();
  const total = data?.total ?? 0;
  const pages = Math.ceil(total / 10);
  return <Pagination total={pages} />;
};
