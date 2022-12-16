import { wrapper } from "store";

import {
  getAllNodes,
  getRunningNodeQueries,
  removeTestTriggers,
} from "store/apis/nodes";
import { deleteAllTestWebhooks } from "store/apis/webhooks";
import { getSpecificWorkflow } from "store/apis/workflows";
import Canvas from "./index";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      store.dispatch(getAllNodes.initiate());
      store.dispatch(removeTestTriggers.initiate());
      store.dispatch(deleteAllTestWebhooks.initiate());

      if (params?.id) {
        store.dispatch(getSpecificWorkflow.initiate(params.id.toString()));
      }

      await Promise.all(store.dispatch(getRunningNodeQueries()));

      return { props: {} };
    }
);

export default Canvas;
