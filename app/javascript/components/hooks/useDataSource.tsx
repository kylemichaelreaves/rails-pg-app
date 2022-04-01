import * as React from "react";

export const useDataSource = (getResourceFunc: Function) => {
  const [resource, setResource] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const result = await getResourceFunc();
      setResource(result);
    })();
  }, [getResourceFunc]);

  return resource;
};
