import { ReactNode } from 'react';

interface Props {
  image: string;
  name: string;
  team?: string;
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Card = ({ image, name, team, children, onClick, className = '' }: Props) => (
  <button onClick={onClick} className={`flex flex-col items-center bg-slate-800/90 hover:bg-slate-700/90 p-4 rounded-lg transform transition-all hover:scale-105 ${className}`}>
    <div className="relative mb-3 w-full aspect-[2/3]">
      <img src={image} alt={name} className="shadow-lg rounded-lg w-full h-full object-cover" />
    </div>
    <span className="font-semibold text-amber-500 text-lg">{name}</span>
    {team && <span className="text-gray-400 text-sm">{team === 'good' ? 'Bien' : 'Mal'}</span>}
    {children}
  </button>
);
