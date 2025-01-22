"use client";

import {
  BlockNoteEditor,
  defaultProps,
  insertOrUpdateBlock,
} from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { Menu } from "@mantine/core";
import {
  MdCancel,
  MdCheckCircle,
  MdError,
  MdInfo,
  MdAutoAwesome,
} from "react-icons/md";

import style from "./calloutBlock.style.module.css";

export const calloutBlockTypes = [
  {
    title: "Default",
    value: "default",
    icon: MdAutoAwesome,
    color: "#f9d02e",
    backgroundColor: {
      light: "transparent",
      dark: "transparent",
    },
  },
  {
    title: "Warning",
    value: "warning",
    icon: MdError,
    color: "#e69819",
    backgroundColor: {
      light: "#fff6e6",
      dark: "#805d20",
    },
  },
  {
    title: "Error",
    value: "error",
    icon: MdCancel,
    color: "#d80d0d",
    backgroundColor: {
      light: "#ffe6e6",
      dark: "#802020",
    },
  },
  {
    title: "Info",
    value: "info",
    icon: MdInfo,
    color: "#507aff",
    backgroundColor: {
      light: "#e6ebff",
      dark: "#203380",
    },
  },
  {
    title: "Success",
    value: "success",
    icon: MdCheckCircle,
    color: "#0bc10b",
    backgroundColor: {
      light: "#e6ffe6",
      dark: "#208020",
    },
  },
] as const;

const CalloutBlock = createReactBlockSpec(
  {
    type: "callout",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      type: {
        default: "default",
        values: ["default", "warning", "error", "info", "success"],
      },
    },
    content: "inline",
  },
  {
    render: (props) => {
      const calloutType = calloutBlockTypes.find(
        (a) => a.value === props.block.props.type
      )!;
      const Icon = calloutType.icon;

      return (
        <div
          className={style.callout}
          data-callout-type={props.block.props.type}
        >
          <div className="flex h-full items-start pt-1">
            <Menu
              withinPortal={false}
              disabled={!props.editor.isEditable}
              zIndex={999999}
            >
              <Menu.Target>
                <div
                  className={style.callout_icon_wrapper}
                  contentEditable={false}
                >
                  <Icon
                    className={style.callout_icon}
                    data-callout-icon-type={props.block.props.type}
                    size={32}
                  />
                </div>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Callout Type</Menu.Label>
                <Menu.Divider />
                {calloutBlockTypes.map((type) => {
                  const ItemIcon = type.icon;

                  return (
                    <Menu.Item
                      key={type.value}
                      leftSection={
                        <ItemIcon
                          className={style.callout_icon}
                          data-callout-icon-type={type.value}
                        />
                      }
                      onClick={() =>
                        props.editor.updateBlock(props.block, {
                          type: "callout",
                          props: { type: type.value },
                        })
                      }
                    >
                      {type.title}
                    </Menu.Item>
                  );
                })}
              </Menu.Dropdown>
            </Menu>
          </div>

          <div className={style.inline_content} ref={props.contentRef} />
        </div>
      );
    },
  }
);

const insertCallout = (editor: BlockNoteEditor) => ({
  title: "콜아웃",
  subtext: "돋보이는 글을 작성하세요.",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      //@ts-ignore
      type: "callout",
    });
  },
  aliases: [
    "alert",
    "callout",
    "notification",
    "emphasize",
    "warning",
    "error",
    "info",
    "success",
  ],
  group: "기타",
  icon: <MdAutoAwesome size={20} />,
});

export { CalloutBlock, insertCallout };
