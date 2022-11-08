import { useQuery } from 'h3';

const hello = async (req) => {
  const { name } = useQuery(req);
  return {
    data: `Hello ${name}`
  };
};

export { hello as default };
