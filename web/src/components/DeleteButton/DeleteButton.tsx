import * as AlertDialog from '@radix-ui/react-alert-dialog';
import './styles.css';
import { Trash } from 'phosphor-react';

type Props = {
  id: string;
  deleteTask: (id: string) => void;
};

const AlertDialogDemo = ({ id, deleteTask }: Props) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <Trash className="hover:text-red-700 cursor-pointer" size={32} />
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="AlertDialogOverlay" />
      <AlertDialog.Content className="AlertDialogContent">
        <AlertDialog.Title className="AlertDialogTitle">
          Você tem certeza?
        </AlertDialog.Title>
        <AlertDialog.Description className="AlertDialogDescription">
          Ao confirmar essa task será excluida!
        </AlertDialog.Description>
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild>
            <button className="Button mauve">Cancelar</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button
              className="Button red"
              onClick={() => {
                deleteTask(id);
              }}
            >
              Deletar
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default AlertDialogDemo;
