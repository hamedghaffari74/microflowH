// TODO: restyle
import styled from "@emotion/styled";
import { Add, CloseOutlined, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  ClickAwayListener,
  Divider,
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  OutlinedInput,
  Paper,
  Popper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import React, {
  DragEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Scrollbars } from "react-custom-scrollbars";

import { useAppSelector } from "hooks/reduxHooks";
import { AllNodesResponse } from "store/apis/endpoints/nodes";
import { selectCanvasState } from "store/slices/canvas";
import { imgLoader } from "utils/genericHelpers";
import { INode, ITriggerNode } from "utils/interfaces";

function a11yProps(index: number) {
  return {
    id: `nodes-tab-${index}`,
    "aria-controls": `nodes-tabpanel-${index}`,
  };
}

type Props = {
  nodesData: AllNodesResponse;
};

const AddNodes: React.FC<Props> = ({ nodesData }) => {
  const theme = useTheme();

  const [searchValue, setSearchValue] = useState("");
  const [nodes, setNodes] = useState<{ [key: string]: AllNodesResponse }>({});
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [categoryExpanded, setCategoryExpanded] = useState<{
    [key: string]: boolean;
  }>({});

  const anchorRef = useRef<HTMLDivElement>(null);
  const prevOpen = useRef(open);
  const ps = useRef<HTMLElement>();

  const { selectedNode: node } = useAppSelector(selectCanvasState);

  const handleTabChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: 0 | 1 | 2 | 3
  ) => {
    setTabValue(newValue);

    switch (newValue) {
      case 0:
        return groupByCategory(nodesData);
      case 1:
        return groupByCategory(
          nodesData.filter((nd) => nd.type.toLowerCase() === "trigger")
        );
      case 2:
        return groupByCategory(
          nodesData.filter((nd) => nd.type.toLowerCase() === "webhook")
        );
      case 3:
        return groupByCategory(
          nodesData.filter((nd) => nd.type.toLowerCase() === "action")
        );
    }
  };

  const filterSearch = (value: string) => {
    setSearchValue(value);
    setTimeout(() => {
      if (value) {
        const returnData = nodesData.filter((nd) =>
          nd.name.toLowerCase().includes(value.toLowerCase())
        );
        groupByCategory(returnData, true);
        setTabValue(0);
      } else if (value === "") {
        groupByCategory(nodesData);
      }
    }, 500);
  };

  const groupByCategory = (nodes: AllNodesResponse, isFilter = true) => {
    const accordionCategories: { [key: string]: any } = {};
    const result = nodes.reduce(function (r, a) {
      r[a.category] = r[a.category] || [];
      r[a.category].push(a);
      accordionCategories[a.category] = isFilter ? true : false;
      return r;
    }, Object.create(null));

    setNodes(result);
    setCategoryExpanded(accordionCategories);
  };

  const handleAccordionChange =
    (category: string) =>
    (event: SyntheticEvent<Element, Event>, isExpanded: boolean) => {
      const accordionCategories: { [key: string]: boolean } = {
        ...categoryExpanded,
      };
      accordionCategories[category] = isExpanded;
      setCategoryExpanded(accordionCategories);
    };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as Node | null)
    ) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const onDragStart = (event: DragEvent, node: INode | ITriggerNode) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(node));
    event.dataTransfer.effectAllowed = "move";
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef?.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (node) setOpen(false);
  }, [node]);

  useEffect(() => {
    if (nodesData) groupByCategory(nodesData);
  }, [nodesData]);

  return (
    <>
      {!open && (
        <Fab
          style={{
            position: "fixed",
            bottom: "unset",
            right: 40,
            top: 120,
            left: "unset",
            zIndex: 999,
          }}
          size="small"
          color="primary"
          aria-label="add"
          title="Add Node"
          onClick={handleToggle}
        >
          <Add />
        </Fab>
      )}
      <Popper
        open={open}
        role={undefined}
        transition
        disablePortal
        sx={{ zIndex: 1000, height: "calc(100vh - 80px)", width: 380 }}
        style={{
          position: "fixed",
          bottom: "unset",
          right: 0,
          top: 80,
          left: "unset",
        }}
      >
        {({ TransitionProps }) => (
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <div style={{ position: "relative", overflow: "auto" }}>
                <Box sx={{ p: 2 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <button style={{ marginRight: 10 }} onClick={handleToggle}>
                      <CloseOutlined />
                    </button>
                    <OutlinedInput
                      sx={{ width: "100%", pr: 1, pl: 2, my: 2 }}
                      id="input-search-node"
                      value={searchValue}
                      onChange={(e) => filterSearch(e.target.value)}
                      placeholder="Search nodes"
                      aria-describedby="search-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                    />
                  </div>
                </Box>
                <Tabs
                  variant="fullWidth"
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="nodes tabs"
                  sx={{ borderBottom: 1, borderColor: "#E3E4E5" }}
                >
                  <Tab key={0} label="All" {...a11yProps(0)} />
                  <Tab key={1} label="Trigger" {...a11yProps(1)} />
                  <Tab key={2} label="Webhook" {...a11yProps(2)} />
                  <Tab key={3} label="Action" {...a11yProps(3)} />
                </Tabs>
                <Scrollbars
                  style={{ width: "auto", height: "calc(100vh - 250px)" }}
                  autoHide
                  autoHideTimeout={1000}
                  autoHideDuration={200}
                >
                  <Box sx={{ p: 2, overflow: "hidden" }}>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 370,
                        py: 0,
                        borderRadius: "10px",
                        [theme.breakpoints.down("md")]: {
                          maxWidth: 370,
                        },
                        "& .MuiListItemSecondaryAction-root": {
                          top: 22,
                        },
                        "& .MuiDivider-root": {
                          my: 0,
                        },
                        "& .list-container": {
                          pl: 7,
                        },
                      }}
                    >
                      {Object.keys(nodes)
                        .sort()
                        .map((category) => (
                          <Accordion
                            expanded={categoryExpanded[category] || false}
                            onChange={handleAccordionChange(category)}
                            key={category}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMore />}
                              aria-controls={`nodes-accordian-${category}`}
                              id={`nodes-accordian-header-${category}`}
                            >
                              <Typography variant="h5">{category}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {nodes[category].map((node, index) => (
                                <div
                                  key={node.name}
                                  onDragStart={(event) =>
                                    onDragStart(event, node)
                                  }
                                  draggable
                                >
                                  <ListItemButton
                                    sx={{
                                      p: 0,
                                      cursor: "move",
                                    }}
                                  >
                                    <ListItem alignItems="center">
                                      <ListItemAvatar>
                                        <div
                                          style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: "50%",
                                            backgroundColor: "white",
                                          }}
                                        >
                                          <Image
                                            loader={imgLoader}
                                            width={50}
                                            height={50}
                                            alt={node.name}
                                            src={node.name}
                                          />
                                        </div>
                                      </ListItemAvatar>
                                      <ListItemText
                                        sx={{ ml: 1 }}
                                        primary={node.label}
                                        secondary={node.description}
                                      />
                                    </ListItem>
                                  </ListItemButton>
                                  {index ===
                                  nodes[category].length - 1 ? null : (
                                    <Divider />
                                  )}
                                </div>
                              ))}
                            </AccordionDetails>
                          </Accordion>
                        ))}
                    </List>
                  </Box>
                </Scrollbars>
              </div>
            </ClickAwayListener>
          </Paper>
        )}
      </Popper>
    </>
  );
};

export default AddNodes;

const StyledContainer = styled.div`
  height: 50%;
`;
