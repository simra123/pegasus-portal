import React from 'react';
import { Editor } from '@tinymce/tinymce-react';


class Table extends React.Component {
	handleEditorChange = (content, editor) => {
		this.props.handleChange(content);
	};

	
	
	render() {
		return (
			<Editor
				initialValue={this.props.editorValue}
				init={{
					body_class: 'my_class',
					height: 500,
					width: '100%',
					selector: '#mytextarea',
					
					menubar: false,
					plugins: [
						
						'advlist autolink lists link image charmap print preview anchor',
						'searchreplace visualblocks code fullscreen',
						'insertdatetime media table paste code help wordcount'
					],
					toolbar:
						'undo redo | formatselect | bold italic backcolor | \
         			   alignleft aligncenter alignright alignjustify | \
          			  bullist numlist outdent indent | removeformat | table' ,
					menubar: 'insert'

				}}
				
				onEditorChange={this.handleEditorChange}
			/>
		);
	}
}

export default Table;
