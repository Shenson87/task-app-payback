"use client";
import { createTask } from "@/services/tasks";
import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type TaskForm = z.infer<typeof taskFormSchema>;

const NewTaskPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<TaskForm>({
    resolver: zodResolver(taskFormSchema),
  });
  const [error, setError] = useState('');

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createTask(data);
      router.push("/tasks");
    } catch (error) {
      console.log(error);
      setError("An error occurred while creating the task.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextField.Root placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              placeholder="Description"
              {...field}
            />
          )}
        />
        <ErrorMessage>{errors.deadline?.message}</ErrorMessage>
        <TextField.Root
          placeholder="Deadline (YYYY-MM-DD)"
          {...register("deadline")}
        />
        <ErrorMessage>{errors.project_id?.message}</ErrorMessage>
        <TextField.Root placeholder="Project" {...register("project_id")} />
        <Button>Submit New Task</Button>
      </form>
    </div>
  );
};

export default NewTaskPage;
