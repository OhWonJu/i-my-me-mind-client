"use client";

import { BlockNoteEditor, insertOrUpdateBlock } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { Minus } from "lucide-react";

import style from "./separatorBlock.style.module.css";

const SeparatorBlock = createReactBlockSpec(
  {
    type: "separator",
    propSchema: {
      type: {
        default: "default",
      },
    },
    content: "none",
  },
  {
    render: (props) => {
      return (
        <div
          className={style.separator}
          data-callout-type={props.block.props.type}
        />
      );
    },
  }
);

const insertSeparator = (editor: BlockNoteEditor) => ({
  title: "구분선",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      //@ts-ignore
      type: "separator",
    });
  },
  aliases: ["---"],
  group: "기타",
  icon: <Minus size={20} />,
});

export { SeparatorBlock, insertSeparator };
