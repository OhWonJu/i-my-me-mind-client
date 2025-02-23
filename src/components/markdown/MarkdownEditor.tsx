"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {
  DefaultReactSuggestionItem,
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  useCreateBlockNote,
} from "@blocknote/react";
import {
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
  locales,
  PartialBlock,
} from "@blocknote/core";

import { BlockProps } from "@/types/appNode";

import {
  CalloutBlock,
  insertCallout,
  insertSeparator,
  SeparatorBlock,
} from "./markdownCustomBlocks";

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    callout: CalloutBlock,
    separator: SeparatorBlock,
  },
});

const getCustomSlashMenuItems = (
  editor: BlockNoteEditor
): DefaultReactSuggestionItem[] => [
  ...getDefaultReactSlashMenuItems(editor),
  insertCallout(editor),
  insertSeparator(editor),
];

const MarkdownEditor = ({
  block,
  value,
  editable,
  updateNodeBlockValue,
}: BlockProps) => {
  const [internalValue, setInternalValue] = useState(value);

  const { resolvedTheme } = useTheme();

  const editor = useCreateBlockNote({
    schema,
    initialContent: internalValue
      ? (JSON.parse(internalValue) as PartialBlock[])
      : undefined,
    dictionary: locales.ko,
    // uploadFile: handleUpload,
  });

  return (
    <BlockNoteView
      id={block.name}
      key={block.name}
      editor={editor}
      editable={editable}
      onChange={() =>
        setInternalValue(JSON.stringify(editor.document, null, 2))
      }
      onBlur={() =>
        updateNodeBlockValue(JSON.stringify(editor.document, null, 2))
      }
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      data-theming-css
      slashMenu={false}
    >
      <SuggestionMenuController
        triggerCharacter={"/"}
        getItems={async (query: any) =>
          // @ts-ignore
          filterSuggestionItems(getCustomSlashMenuItems(editor), query)
        }
      />
    </BlockNoteView>
  );
};

export default MarkdownEditor;
