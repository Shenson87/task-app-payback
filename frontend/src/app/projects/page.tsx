import { getProjects } from "@/services/projects";
import { Button, Table } from "@radix-ui/themes";
import moment from "moment";
import Link from "next/link";

const ProjectsPage = async () => {
  const projects = await getProjects();
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
          {projects?.map((project) => (
            <Table.Row key={project.id}>
              <Table.Cell>{project.title}</Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {moment(project.deadline).format("YYYY-MM-DD")}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default ProjectsPage;
