import Canvas from "containers/canvas";
import "reactflow/dist/style.css";
import { wrapper } from "store";
import {
  getAllNodes,
  getRunningNodeQueries,
  removeTestTriggers,
} from "store/apis/nodes";
import { deleteAllTestWebhooks } from "store/apis/webhooks";

// TODO: determine how often nodes change and do we need to persist them
export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(getAllNodes.initiate());
  store.dispatch(removeTestTriggers.initiate());
  store.dispatch(deleteAllTestWebhooks.initiate());
  await Promise.all(store.dispatch(getRunningNodeQueries()));
  return { props: {} };
});

export default Canvas;
