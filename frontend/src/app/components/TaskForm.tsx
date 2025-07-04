"use client";

import useTask from "@/hooks/useTask";
import moment from "moment";
import { Form } from "radix-ui";

type Props = {
  id: string;
};

const TaskForm = ({ id }: Props) => {
  const task = useTask(parseInt(id));


  return (
    <Form.Root className="FormRoot">
      <Form.Field className="FormField" name="title">
        <div className="flex">
          <Form.Label className="FormLabel">Title</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter a title
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid title
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            value={task?.title}
            className="shadow appearance-none border rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="title"
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="FormField" name="description">
        <div className="flex">
          <Form.Label className="FormLabel">Description</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter a description
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid description
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            value={task?.description}
            className="shadow appearance-none border rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="description"
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="FormField" name="deadline">
        <div className="flex">
          <Form.Label className="FormLabel">Deadline</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter a deadline
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid deadline
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            value={moment(task?.deadline).format("YYYY-MM-DD")}
            className="shadow appearance-none border rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="description"
            required
          />
        </Form.Control>
      </Form.Field>
    </Form.Root>
  );
};

export default TaskForm;
