import { Skeleton } from "@/app/components";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";

const LoadingProjectsPage = () => {
  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/projects/new">New Project</Link>
        </Button>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Project Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Deadline
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {[1, 2, 3, 4, 5].map((project) => (
            <Table.Row key={project}>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingProjectsPage;
