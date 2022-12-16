import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  OutlinedInput,
  DialogTitle,
} from "@mui/material";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: (name: string) => void;
  labels: {
    title: string;
    confirm: string;
    cancel: string;
  };
};

const SaveWorkflow: React.FC<Props> = ({
  open,
  labels,
  onCancel,
  onConfirm,
}) => {
  const [workflowName, setWorkflowName] = useState("");

  return open ? (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xs"
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ fontSize: "1rem" }} id="alert-dialog-title">
        {labels.title}
      </DialogTitle>
      <DialogContent>
        <OutlinedInput
          sx={{ mt: 1 }}
          id="workflow-name"
          type="text"
          fullWidth
          placeholder="My New Workflow"
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{labels.cancel}</Button>
        <Button
          disabled={!workflowName}
          variant="contained"
          onClick={() => onConfirm(workflowName)}
        >
          {labels.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
};

export default SaveWorkflow;
