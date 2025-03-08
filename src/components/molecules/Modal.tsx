import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  onClose?: () => void;
}

export const Modal = ({ title, children, actions, onClose }: Props) => (
  <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/80 backdrop-blur-sm text-white">
    <div className="bg-slate-800/90 m-4 p-6 rounded-lg w-full max-w-sm">
      <h3 className="mb-4 font-bold text-amber-500 text-xl">{title}</h3>
      <div className="mb-6">{children}</div>
      <div className="flex justify-evenly gap-3">
        {actions}
        {/* {onClose && (
          <button onClick={onClose} className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded">
            Cancelar
          </button>
        )} */}
      </div>
    </div>
  </div>
);
