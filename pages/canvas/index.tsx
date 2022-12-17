import Canvas from "containers/canvas";
import { wrapper } from "store";
import { getRunningQueriesThunk } from "store/apis";
import { getAllNodes, removeTestTriggers } from "store/apis/endpoints/nodes";
import { deleteAllTestWebhooks } from "store/apis/endpoints/webhooks";

// TODO: determine how often nodes change and do we need to persist them
export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(getAllNodes.initiate());
  store.dispatch(removeTestTriggers.initiate());
  store.dispatch(deleteAllTestWebhooks.initiate());
  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  return { props: { nodes: [], edges: [] } };
});

export default Canvas;
