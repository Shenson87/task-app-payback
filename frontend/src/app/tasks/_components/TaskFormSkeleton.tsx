import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

const TaskFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="15rem" />
      <Skeleton height="2rem" />
      <Skeleton height="2rem" />
    </Box>
  );
};

export default TaskFormSkeleton;
