import axios from "axios";
import ApiResolver from "../apis/ApiResolver";

class CoreHttpHandler {
	constructor() {
		this.apiEndpoint =
			"https://upload.its.com.pk/v1/upload";

		this.config = {
      		"xt-api-key": "cc6ab176-e84c-4684-85a6-dffe952715e3",
    };
	}

	beforeSend = (data) => {};

	afterSend = (data) => {};

	request(name, service, params, success, failure) {
		const resolvedApi = ApiResolver.resolve(name, service);

		const apiCall = { ...resolvedApi };

		let apiPath = `${this.apiEndpoint}`;

		if (params.key !== undefined && apiCall.method === "get") {
			apiPath = apiPath.replace(params.key, params.value);
		}

		if (
			params.key !== undefined &&
			(apiCall.method === "put" || apiCall.method === "post")
		) {
			apiPath = apiPath.replace(params.key, params.value);
		}

		if (apiCall.method === "put" && params) {
			apiPath = apiPath.replace(params.key, params.value);
		}

		//if (apiCall.method === 'post') this.config.headers['Content-Type'] = 'text/plain';

		const _config =  { headers: {  "xt-api-key": "cc6ab176-e84c-4684-85a6-dffe952715e3", } }

		const args = [apiPath];

		if (apiCall.method === "get") {
			args.push(_config);
		} else {
			if (apiCall.method === "put" || apiCall.method === "post") {
				if (params.params) {
					args.push(params.params);
				} else args.push(params);
			} else {
				args.push(params);
			}

			args.push(_config);
		}

		this.beforeSend(args);

		axios[apiCall.method]
			.apply(this, args)
			.then((result) => {
				success(result);
			})
			.catch((error) => {
				failure(error);
			});
	}
}

export default new CoreHttpHandler();
