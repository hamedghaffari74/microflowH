import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Link from "../components/link";

import { wrapper } from "store";
import {
  getRunningQueriesThunk,
  getUsers,
  useGetUsersQuery,
} from "store/slices/users";

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(getUsers.initiate());
  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  return { props: {} };
});

export default function Users() {
  const { isLoading, error, data } = useGetUsersQuery();

  return (
    <Container maxWidth="lg">
      <Typography>Fetching using RTK Query</Typography>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        data?.map((u) => (
          <Typography component="p" key={u.id}>
            {u.name}
          </Typography>
        ))
      )}
      <Link href={"/"}>
        <Typography component="p">Go home</Typography>
      </Link>
    </Container>
  );
}
