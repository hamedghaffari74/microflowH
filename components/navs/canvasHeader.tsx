import { Box, Button, Typography } from "@mui/material";

import SaveWorkflow from "components/dialogs/saveWorkflow";
import Link from "components/link";
import { useAppDispatch } from "hooks/reduxHooks";
import { useCallback, useState } from "react";
import { useReactFlow } from "reactflow";
import {
  useCreateNewWorkflowMutation,
  useUpdateWorkflowMutation,
} from "store/apis/endpoints/workflows";
import { removeDirty, setWorkflow } from "store/slices/canvas";

type Props = {
  existingFlowId?: string;
  existingFlowName?: string;
  newFlowName?: string;
  isDirty: boolean;
};

export default function CanvasHeader({
  existingFlowId: shortId,
  existingFlowName,
  newFlowName,
  isDirty,
}: Props) {
  const [openSaveDialog, setOpenSaveDialog] = useState(false);

  const dispatch = useAppDispatch();

  const [createWorkflow] = useCreateNewWorkflowMutation();
  const [updateWorkflow] = useUpdateWorkflowMutation();

  const rfInstance = useReactFlow();

  const handleSaveWorkflow = useCallback(
    async (name: string) => {
      if (!rfInstance) return;

      // prepare data
      const flowData = JSON.stringify(rfInstance.toObject());

      // save new flow
      try {
        if (!shortId) {
          const response = await createWorkflow({
            name,
            deployed: false,
            flowData,
          }).unwrap();

          // update this page with current workflow
          dispatch(setWorkflow(response.name));
        } else {
          // update existing workflow
          updateWorkflow({ shortId, name, flowData });
        }

        dispatch(removeDirty());
      } catch (error) {
        console.error(`Error occurred saving workflow: ${name}`, error);
      }
    },
    [createWorkflow, dispatch, rfInstance, shortId, updateWorkflow]
  );

  return (
    <>
      <Box
        height={80}
        border={1}
        display="flex"
        alignItems={"center"}
        px="20px"
      >
        <Typography>{existingFlowName || newFlowName}</Typography>
        <Button
          sx={{ marginX: "20px" }}
          onClick={() => setOpenSaveDialog(true)}
          disabled={!isDirty}
        >
          Save
        </Button>
        <Link href="/">Go Home</Link>
      </Box>
      <SaveWorkflow
        open={openSaveDialog}
        onCancel={() => setOpenSaveDialog(false)}
        onConfirm={(name) => {
          handleSaveWorkflow(name);
          setOpenSaveDialog(false);
        }}
        initialName={existingFlowName}
        labels={{
          title: `Save New Workflow`,
          cancel: "Cancel",
          confirm: "Save",
        }}
      />
    </>
  );
}
