// ** React Imports
import { useState } from "react";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
// ** Reactstrap Imports
import { Col, Label } from "reactstrap";
// ** Third Party Components

import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";

const TextEditor = ({ content, setContent }) => {
	// ** State
	return (
		<Editor
			editorState={content}
			onEditorStateChange={(data) => setContent(data)}
		/>
	);
};

export default TextEditor;
