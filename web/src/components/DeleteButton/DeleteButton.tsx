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
          Are you sure about this?
        </AlertDialog.Title>
        <AlertDialog.Description className="AlertDialogDescription">
          On submit this task's gonna be deleted!
        </AlertDialog.Description>
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild>
            <button className="Button mauve">Cancel</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button
              className="Button red"
              onClick={() => {
                deleteTask(id);
              }}
            >
              Delete
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default AlertDialogDemo;
