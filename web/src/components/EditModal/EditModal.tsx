import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Pencil } from 'phosphor-react';
import { useState } from 'react';
import { ITodo } from '../../context/context';
import './styles.css';

interface Props {
  row: ITodo;
  updateTask: (task: ITodo, id: string) => void;
}

const DialogDemo = ({ row, updateTask }: Props) => {
  const [title, setTitle] = useState<string>(row.title);
  const [description, setDescription] = useState<string>(row.description);
  const [status, setStatus] = useState<number>(0);

  const handleSubmit = (id: string) => {
    const task = {
      id: '',
      title: title,
      description: description,
      status: status === 1 ? true : false,
    };
    updateTask(task, id);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button">
          <Pencil className="hover:text-[#65d9fe] cursor-pointer" size={32} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Editar task</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Preencha as informações que deseja editar
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="title">
              Title
            </label>
            <input
              className="Input"
              id="title"
              defaultValue={row.title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </fieldset>

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="status">
              Status
            </label>
            <select
              name="status"
              id="status"
              className="Select"
              defaultValue={0}
              onChange={(e) => {
                setStatus(Number(e.target.value));
              }}
            >
              <option value={1}>Completed</option>
              <option value={0}>Incomplete</option>
            </select>
          </fieldset>

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="description">
              Description
            </label>
            <textarea
              className="Textarea"
              id="description"
              defaultValue={row.description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </fieldset>
          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          >
            <Dialog.Close asChild>
              <button
                className="Button green"
                onClick={() => {
                  handleSubmit(row.id);
                }}
              >
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogDemo;
