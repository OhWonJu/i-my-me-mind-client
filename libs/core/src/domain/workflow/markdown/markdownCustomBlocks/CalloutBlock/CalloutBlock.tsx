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
    title: "기본",
    value: "default",
    icon: MdAutoAwesome,
    color: "#f9d02e",
    backgroundColor: {
      light: "transparent",
      dark: "transparent",
    },
  },
  {
    title: "경고",
    value: "warning",
    icon: MdError,
    color: "#e69819",
    backgroundColor: {
      light: "#fff6e6",
      dark: "#805d20",
    },
  },
  {
    title: "에러",
    value: "error",
    icon: MdCancel,
    color: "#d80d0d",
    backgroundColor: {
      light: "#ffe6e6",
      dark: "#802020",
    },
  },
  {
    title: "정보",
    value: "info",
    icon: MdInfo,
    color: "#507aff",
    backgroundColor: {
      light: "#e6ebff",
      dark: "#203380",
    },
  },
  {
    title: "성공",
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
    render: props => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const calloutType = calloutBlockTypes.find(
        type => type.value === props.block.props.type
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
              zIndex={9999}
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
                <Menu.Label>콜아웃 유형</Menu.Label>
                <Menu.Divider />
                {calloutBlockTypes.map(type => {
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

          <div ref={props.contentRef} className={style.inline_content} />
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
