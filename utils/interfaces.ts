// These interfaces come from the server and component packages.
// Ideally, we would install the component packages, but alas
// For any other types and interfaces, please use the types file in utils

import EventEmitter from "events";

// Components
export type CommonType = string | number | boolean | undefined | null;
type ObjectId = string;

export interface ICommonObject {
  [key: string]: CommonType | ICommonObject | CommonType[] | ICommonObject[];
}

export interface IWebhookNodeExecutionData {
  data: INodeExecutionData;
  response?: any;
}

export interface INodeExecutionData {
  [key: string]: CommonType | CommonType[] | ICommonObject | ICommonObject[];
}
export interface INodeCredential {
  name: string;
  description?: string;
  version: number;
  credentials: INodeParams[];
}

export interface INodeParams {
  label: string;
  name: string;
  type: NodeParamsType;
  default?: CommonType | ICommonObject | ICommonObject[];
  description?: string;
  options?: Array<INodeOptionsValue>;
  array?: Array<INodeParams>;
  loadMethod?: string;
  loadFromDbCollections?: DbCollectionName[];
  optional?: boolean | INodeDisplay;
  show?: INodeDisplay;
  hide?: INodeDisplay;
  rows?: number;
  placeholder?: string;
}

export interface INodeProperties {
  label: string;
  name: string;
  type: NodeType;
  description?: string;
  version: number;
  icon?: string;
  category: string;
  incoming: number;
  outgoing: number;
}

export interface INodeData extends INodeProperties {
  emitEventKey?: string; // event emitter key for triggers

  actions?: ICommonObject;
  credentials?: ICommonObject;
  networks?: ICommonObject;
  inputParameters?: ICommonObject;
  outputResponses?: ICommonObject;

  loadMethod?: string; // method to load async options
  loadFromDbCollections?: DbCollectionName[]; // method to load async options

  req?: Request; // For webhook
  webhookEndpoint?: string; // For webhook
}

export interface INodeComponent extends INodeProperties {
  actions?: INodeParams[];
  credentials?: INodeParams[];
  networks?: INodeParams[];
  inputParameters?: INodeParams[];
  loadMethods?: {
    [key: string]: (
      nodeData: INodeData,
      dbCollection?: IDbCollection
    ) => Promise<INodeOptionsValue[]>;
  };
  webhookMethods?: {
    createWebhook: (
      nodeData: INodeData,
      webhookFullUrl: string
    ) => Promise<string | undefined>;
    deleteWebhook: (nodeData: INodeData, webhookId: string) => Promise<boolean>;
  };
  run?(nodeData: INodeData): Promise<INodeExecutionData[] | null>;
  runTrigger?(nodeData: INodeData): Promise<void>;
  removeTrigger?(nodeData: INodeData): Promise<void>;
  runWebhook?(nodeData: INodeData): Promise<IWebhookNodeExecutionData[] | null>;
}

export interface INodeDisplay {
  [key: string]: string[] | string;
}

export interface INodeOptionsValue {
  label: string;
  name: string;
  description?: string;
  parentGroup?: string;
  inputParameters?: string;
  exampleParameters?: string;
  outputResponse?: string;
  exampleResponse?: ICommonObject;
  show?: INodeDisplay;
  hide?: INodeDisplay;
  /*
   * Only used on credentialMethod option to hide registeredCredentials
   * For example: noAuth
   */
  hideRegisteredCredential?: boolean;
}

/**
 * Databases
 */
export interface IWorkflow {
  _id: ObjectId;
  shortId: string;
  name: string;
  flowData: string;
  deployed: boolean;
  updatedDate: Date;
  createdDate: Date;
}

export interface IExecution {
  _id: ObjectId;
  shortId: string;
  workflowShortId: string;
  executionData: string;
  state: ExecutionState;
  createdDate: Date;
  stoppedDate?: Date;
}

export interface ICredential {
  _id: ObjectId;
  name: string;
  nodeCredentialName: string;
  credentialData: string;
  updatedDate: Date;
  createdDate: Date;
}

export interface IWebhook {
  _id: ObjectId;
  workflowShortId: string;
  webhookEndpoint: string;
  httpMethod: WebhookMethod;
  webhookId: string;
  nodeId: string;
  updatedDate: Date;
  createdDate: Date;
}

export interface IContract {
  _id: ObjectId;
  name: string;
  abi: string;
  address: string;
  network: string;
  providerCredential: string;
  updatedDate: Date;
  createdDate: Date;
}

export interface IWallet {
  _id: ObjectId;
  name: string;
  address: string;
  network: string;
  providerCredential: string;
  walletCredential: string;
  updatedDate: Date;
  createdDate: Date;
}

/**
 * Types
 */
export type NodeType = "action" | "webhook" | "trigger";

export type DbCollectionName =
  | "Contract"
  | "Webhook"
  | "Workflow"
  | "Credential"
  | "Execution"
  | "Wallet";

export type NodeParamsType =
  | "asyncOptions"
  | "options"
  | "string"
  | "number"
  | "array"
  | "boolean"
  | "password"
  | "json"
  | "code"
  | "date"
  | "file"
  | "folder";

export type ExecutionState =
  | "INPROGRESS"
  | "FINISHED"
  | "ERROR"
  | "TERMINATED"
  | "TIMEOUT";

export type WebhookMethod = "GET" | "POST";

/**
 * Others
 */
export interface IWorkflowResponse extends IWorkflow {
  execution: IExecution;
  executionCount: number;
}

export interface INode extends INodeComponent {
  filePath: string;
}

export interface ITriggerNode extends EventEmitter, INodeComponent {
  filePath: string;
}

export interface IWebhookNode extends INodeComponent {
  filePath: string;
}

export interface IComponentNodesPool {
  [key: string]: INode | ITriggerNode;
}

export interface IActiveTestTriggerPool {
  [key: string]: INodeData;
}

export interface IActiveTestWebhookPool {
  [key: string]: {
    nodes: IReactFlowNode[];
    edges: IReactFlowEdge[];
    nodeData: INodeData;
    webhookNodeId: string;
    clientId: string;
    isTestWorkflow: boolean;
    webhookId?: string;
  };
}

export interface ICredentialBody {
  name: string;
  nodeCredentialName: string;
  credentialData: ICredentialDataDecrypted;
}

export interface ICredentialResponse {
  _id: ObjectId;
  name: string;
  credentialData: ICredentialDataDecrypted;
  nodeCredentialName: string;
  updatedDate: Date;
  createdDate: Date;
}

export type ICredentialDataDecrypted = ICommonObject;

export interface IComponentCredentialsPool {
  [key: string]: INodeCredential;
}

export interface IWalletResponse extends IWallet {
  balance: string;
}

export interface IVariableDict {
  [key: string]: string;
}

export interface INodeDependencies {
  [key: string]: number;
}

export interface INodeDirectedGraph {
  [key: string]: string[];
}

export interface IWorkflowExecutedData {
  nodeLabel: string;
  nodeId: string;
  data: INodeExecutionData[] | IWebhookNodeExecutionData[];
  status?: ExecutionState;
}

export interface ITestNodeBody {
  nodeId: string;
  nodes: IReactFlowNode[];
  edges: IReactFlowEdge[];
  clientId?: string;
}

export interface IDeployedWorkflowsPool {
  [key: string]: {
    emitEventKey?: string;
    abortController?: AbortController;
    workflowExecutedData?: IWorkflowExecutedData[];
  };
}

export interface IChildProcessMessage {
  key: string;
  value?: any;
}

export interface IReactFlowNode {
  id: string;
  position: {
    x: number;
    y: number;
  };
  type: string;
  data: INodeData;
  positionAbsolute: {
    x: number;
    y: number;
  };
  z: number;
  handleBounds: {
    source: any;
    target: any;
  };
  width: number;
  height: number;
  selected: boolean;
  dragging: boolean;
}

export interface IReactFlowEdge {
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
  type: string;
  id: string;
  data: {
    label: string;
  };
}

export interface IReactFlowObject {
  nodes: IReactFlowNode[];
  edges: IReactFlowEdge[];
  viewport: {
    x: number;
    y: number;
    zoom: number;
  };
}

export interface IRunWorkflowMessageValue {
  startingNodeIds: string[];
  componentNodes: IComponentNodesPool;
  reactFlowNodes: IReactFlowNode[];
  reactFlowEdges: IReactFlowEdge[];
  graph: INodeDirectedGraph;
  workflowExecutedData: IWorkflowExecutedData[];
}

export interface IContractRequestBody {
  credentials: ICommonObject;
  networks: ICommonObject;
  contractInfo: ICommonObject;
}

export interface IWalletRequestBody {
  name: string;
  network: string;
  providerCredential?: string;
  privateKey?: string;
}

export interface IOAuth2Response {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

export interface IExploredNode {
  [key: string]: {
    remainingLoop: number;
    lastSeenDepth: number;
  };
}

export interface INodeQueue {
  nodeId: string;
  depth: number;
}

export type ITestWorkflowBody = ITestNodeBody;
export type IDbCollection = {
  [key in DbCollectionName]: any[];
};
