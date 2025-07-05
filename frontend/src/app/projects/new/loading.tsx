import { Box } from "@radix-ui/themes";
import { Skeleton } from '@/app/components';

const LoadingNewProjectPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton />
    </Box>
  );
};

export default LoadingNewProjectPage;