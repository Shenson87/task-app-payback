"use client";
import { createProject } from "@/services/projects";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectFormSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type ProjectForm = z.infer<typeof projectFormSchema>;

const NewProjectPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectForm>({
    resolver: zodResolver(projectFormSchema),
  });
  const [error, setError] = useState('');

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createProject(data);
      router.push("/projects");
      router.refresh();
    } catch (error) {
      console.log(error);
      setError("An error occurred while creating the project.");
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
        <ErrorMessage>{errors.deadline?.message}</ErrorMessage>
        <TextField.Root
          placeholder="Deadline (YYYY-MM-DD)"
          {...register("deadline")}
        />
        <Button>Submit New Project</Button>
      </form>
    </div>
  );
};

export default NewProjectPage;