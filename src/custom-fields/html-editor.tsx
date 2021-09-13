import { FieldDescription, FieldProps } from "@camberi/firecms"
import { Typography } from "@material-ui/core"
import { convertFromRaw, convertToRaw, EditorState } from "draft-js"
import { useEffect, useState } from "react"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./style.css";

type RichTextEditorFieldProps = {}

export const RichTextEditorField = ({
  property,
  value,
  setValue,
  customProps,
  touched,
  error,
  isSubmitting,
  context,
  ...props
}: FieldProps<string, RichTextEditorFieldProps>) => {
  const [state, setState] = useState<EditorState>(EditorState.createEmpty());
  const onEditorStateChange = (editorState: EditorState) => {
    setState(editorState)
  }

  useEffect(() => {
    if (value) {
      const content = convertFromRaw(JSON.parse(value))
      const state = EditorState.createWithContent(content);
      setState(state)
      setValue(JSON.stringify(convertToRaw(state.getCurrentContent())))
    }
  }, [value, setValue])

  return (
    <div>
      <Typography color="textSecondary">{property.title}{property.validation?.required ? "*" : ""}</Typography>
      <Editor editorClassName="editor"
        editorState={state}
        onEditorStateChange={onEditorStateChange}
      />
      <FieldDescription property={property} />
    </div>
  )
}