"use client";
import { Spinner } from "@/app/components";
import ErrorMessage from "@/app/components/ErrorMessage";
import { taskFormSchema } from "@/app/validationSchemas";
import { createTask, putTask } from "@/services/tasks";
import { Project } from "@/types/project";
import { Task } from "@/types/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Select, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type TaskFormData = z.infer<typeof taskFormSchema>;

const TaskForm = ({ task, projects }: { task?: Task; projects: Project[] }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (task) {
        await putTask(task.id, data);
      } else {
        await createTask(data);
      }
      router.push("/tasks");
      router.refresh();
    } catch (error) {
      console.log(error);
      setError("An error occurred while creating the task.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextField.Root
          defaultValue={task?.title}
          placeholder="Title"
          {...register("title")}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={task?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.deadline?.message}</ErrorMessage>
        <TextField.Root
          defaultValue={moment(task?.deadline).format("YYYY-MM-DD")}
          placeholder="Deadline (YYYY-MM-DD)"
          {...register("deadline")}
        />
        <ErrorMessage>{errors.project_id?.message}</ErrorMessage>
        <div>
        <Controller
          name="project_id"
          control={control}
          render={({ field }) => (
            <Select.Root
              onValueChange={field.onChange}
              defaultValue={task?.project_id.toString()}
            >
              <Select.Trigger placeholder="Select a project" />
              <Select.Content>
                {projects?.map((project) => (
                  <Select.Item key={project.id} value={project.id.toString()}>
                    {project.title}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          )}
        />
        </div>
        <Button disabled={isSubmitting}>
          {task ? "Update Task" : "Submit Task"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;
