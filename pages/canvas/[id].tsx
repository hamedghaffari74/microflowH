import Canvas from "containers/canvas";
import { wrapper } from "store";
import { getRunningQueriesThunk } from "store/apis";
import { getAllNodes, removeTestTriggers } from "store/apis/endpoints/nodes";
import { deleteAllTestWebhooks } from "store/apis/endpoints/webhooks";
import { getSpecificWorkflow } from "store/apis/endpoints/workflows";
import { BACKEND_API_BASE_URL } from "utils/constants";
import { IWorkflowResponse } from "utils/interfaces";

export async function getStaticPaths() {
  // TODO: should get all workflows associated with account instead
  const flows = await (await fetch(BACKEND_API_BASE_URL + "workflows")).json();

  const paths = flows.map((f: IWorkflowResponse) => ({
    params: { id: f.shortId },
  }));

  return { paths, fallback: false };
}

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      store.dispatch(getAllNodes.initiate());
      store.dispatch(removeTestTriggers.initiate());
      store.dispatch(deleteAllTestWebhooks.initiate());
      store.dispatch(getSpecificWorkflow.initiate(params?.id as string));
      await Promise.all(store.dispatch(getRunningQueriesThunk()));

      return { props: {} };
    }
);

export default Canvas;
