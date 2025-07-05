import { Button, TextArea, TextField } from "@radix-ui/themes"

const NewTaskPage = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root placeholder="Title" />
      <TextArea placeholder="Description" />
      <TextField.Root placeholder="Deadline (YYYY-MM-DD)" />
      <TextField.Root placeholder="Project" />
      <Button>Submit New Task</Button>
    </div>
  )
}

export default NewTaskPage