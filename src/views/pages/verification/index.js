// ** React Imports
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";

// ** Roles Components
import Table from "./Table";

const Roles = () => {
  const location = useLocation(); // React Hook

  const [path,setPath] = useState('')

    useEffect(() => {
      if (location.pathname) {
        setPath(location.pathname);
      }
    }, [location]);

    return (
      <Fragment>
        {/* <h3>Roles List</h3>
    <p className='mb-2'>
        A role provides access to predefined menus and features depending on the assigned role to an administrator that
        can have access to what he needs.
    </p>
    <RoleCards /> */}
        <h3 className="mt-50">Verification of {path == "/apps/users/verify"? "Users" : path == "/apps/products/verify" ? "Products" : "Riders" }</h3>
        {/* <p className="mb-2">
        Find all of your company’s administrator accounts and their associate
        roles.
    </p> */}
        <div className="app-user-list">
          <Table path={path}/>
        </div>
      </Fragment>
    );
};

export default Roles;
