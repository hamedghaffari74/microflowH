import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Link from "components/link";
import { wrapper } from "store";
import { getRunningQueriesThunk } from "store/apis";
import { getAllWorkflows, useGetAllWorkflowsQuery } from "store/apis/endpoints/workflows";
import UiButton from "components/uiButton";

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
   store.dispatch(getAllWorkflows.initiate());
   await Promise.all(store.dispatch(getRunningQueriesThunk()));

   return { props: {} };
});

export default function Home() {
   const { data: workflows } = useGetAllWorkflowsQuery();
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
            <Link href="/canvas" color="secondary">
               Go to the canvas page
            </Link>
            <Link href="/login" color="secondary">
               Go to the login page
            </Link>

            <Typography>All Workflows:</Typography>
            {workflows?.map((w) => (
               <Link key={w._id} href={`/canvas/${w.shortId}`}>
                  {w.name}
               </Link>
            ))}
         </Box>
         <Box
            sx={{
               my: 4,
               display: "flex",
               flexDirection: "row",
               justifyContent: "center",
               alignItems: "center",
               gap: "5px",
            }}
         >
            <UiButton variant="contained" label="Enabled" />
            <UiButton variant="contained" label="Disabled" disabled />
         </Box>
         <Box
            sx={{
               my: 4,
               display: "flex",
               flexDirection: "row",
               justifyContent: "center",
               alignItems: "center",
               gap: "5px",
            }}
         >
            <UiButton variant="outlined" label="Enabled" />
            <UiButton variant="outlined" label="Disabled" disabled />
         </Box>
         <Box
            sx={{
               my: 4,
               display: "flex",
               flexDirection: "row",
               justifyContent: "center",
               alignItems: "center",
               gap: "5px",
            }}
         >
            <UiButton variant="text" label="Enabled" />
            <UiButton variant="text" label="Disabled" disabled />
         </Box>
      </Container>
   );
}
