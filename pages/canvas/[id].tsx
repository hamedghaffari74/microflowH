import Canvas from "containers/canvas";
import { wrapper } from "store";
import { getRunningQueriesThunk } from "store/apis";
import { getAllNodes, removeTestTriggers } from "store/apis/endpoints/nodes";
import { deleteAllTestWebhooks } from "store/apis/endpoints/webhooks";
import { getSpecificWorkflow } from "store/apis/endpoints/workflows";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      store.dispatch(getAllNodes.initiate());
      store.dispatch(removeTestTriggers.initiate());
      store.dispatch(deleteAllTestWebhooks.initiate());

      if (params?.id) {
        try {
          await store
            .dispatch(getSpecificWorkflow.initiate(params.id.toString()))
            .unwrap();
        } catch (error) {
          return { notFound: true };
        }
      }

      await Promise.all(store.dispatch(getRunningQueriesThunk()));

      return { props: {} };
    }
);

export default Canvas;
