import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Link from "components/link";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { selectAuthState, setAuthState } from "store/slices/auth";
import { wrapper } from "store";

// should use getStaticProps if this is something that doesn't change
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(setAuthState(false));
    return { props: { authState: false } };
  }
);

export default function Home() {
  const loggedIn = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();

  function handleLoginClick() {
    loggedIn ? dispatch(setAuthState(false)) : dispatch(setAuthState(true));
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>
          {loggedIn ? "User is Logged in" : "User is Logged out"}
        </Typography>
        <Button onClick={handleLoginClick}>
          {loggedIn ? "Logout" : "Login"}
        </Button>
        <Link href="/users" color="secondary">
          Go to the users page
        </Link>
      </Box>
    </Container>
  );
}
