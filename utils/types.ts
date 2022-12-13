import { Node } from "reactflow";
import { INodeData } from "./interfaces";

export type User = {
  id: string;
  name: string;
};

export type HookData<T> = {
  data: T;
  isLoading: boolean;
  error?: Error;
};

export type CustomNode = Node<INodeData>;
