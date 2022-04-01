import * as React from "react";
import axios from "axios";

export const useResource = (resourceUrl: string) => {
  const [resource, setResource] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      const response = await axios.get(resourceUrl);
      setResource(response.data);
    })();
  }, [resourceUrl]);

  return resource;
};
