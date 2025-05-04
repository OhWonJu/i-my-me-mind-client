"use client";

import { useState } from "react";

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

import { BlockProps } from "@imymemind/core/types/appNode";

import {
  CalloutBlock,
  insertCallout,
  insertSeparator,
  SeparatorBlock,
} from "./markdownCustomBlocks";
import { useWorkflowInfoContext } from "../_context/WorkflowInfoContext";

const { audio, video, file, ...remainingBlockSpecs } = defaultBlockSpecs;

const schema = BlockNoteSchema.create({
  blockSpecs: {
    // ...defaultBlockSpecs,
    ...remainingBlockSpecs,
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
  const { uploadHandler } = useWorkflowInfoContext();

  const [internalValue, setInternalValue] = useState(value);

  // @ts-ignore
  const handleUpload = async (file: File) => await uploadHandler(file);

  const editor = useCreateBlockNote({
    schema,
    //@ts-ignore
    initialContent: internalValue
      ? (JSON.parse(internalValue) as PartialBlock[])
      : undefined,
    dictionary: locales.ko,
    uploadFile: handleUpload,
  });

  return (
    <BlockNoteView
      id={block.name}
      key={block.name}
      editor={editor}
      editable={editable}
      onChange={() => {
        !editor.isFocused() && editor.focus();
        setInternalValue(JSON.stringify(editor.document, null, 2));
      }}
      onBlur={() =>
        updateNodeBlockValue(JSON.stringify(editor.document, null, 2))
      }
      // theme={resolvedTheme === "dark" ? "dark" : "light"}
      theme={"light"}
      data-theming-css
      slashMenu={false}
    >
      <SuggestionMenuController
        triggerCharacter={"/"}
        getItems={async query =>
          // @ts-ignore
          filterSuggestionItems(getCustomSlashMenuItems(editor), query)
        }
      />
    </BlockNoteView>
  );
};

export default MarkdownEditor;
