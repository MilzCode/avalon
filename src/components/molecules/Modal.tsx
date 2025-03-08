import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export const Modal = ({ title, children, actions }: Props) => (
  <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/80 backdrop-blur-sm text-white">
    <div className="bg-slate-800/90 m-4 p-6 rounded-lg w-full max-w-sm">
      <h3 className="mb-4 font-bold text-amber-500 text-center text-xl">{title}</h3>
      <div className="mb-6">{children}</div>
      <div className="flex justify-evenly gap-3">{actions}</div>
    </div>
  </div>
);
