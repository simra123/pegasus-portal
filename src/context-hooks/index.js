import { createContext } from "react";

const globalState = {
	data: {},
};

const Data = createContext(globalState.data);

export { Data };
