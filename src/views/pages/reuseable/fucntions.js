import ContentUploadHandler from "../../../http/services/ContentUploadHandler";

const Upload = async (fileData) => {
	const _data = new FormData();
	let responseData = "";
	_data.append("file", fileData, `${new Date().getTime()}_${fileData.name}`);
	return await ContentUploadHandler.request(
		"content",
		"upload",
		{
			params: _data,
		},
		(response) => {
			responseData = response;
			return response;
		},
		(err) => {
			console.log(err);
		}
	);
	return responseData;
};
export { Upload };
