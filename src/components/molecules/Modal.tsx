import { useEffect } from 'react';
import { createRoot, Root } from 'react-dom/client';
import Swal from 'sweetalert2';

interface Props {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const Modal = ({ title, children, actions }: Props) => {
  useEffect(() => {
    const modalHtml = `
      <div id="swal-content"></div>
      <div id="swal-actions" class="flex justify-evenly gap-3 mt-4"></div>
    `;

    Swal.fire({
      title: `<h3 class="font-bold text-amber-500 text-xl">${title}</h3>`,
      html: modalHtml,
      background: '#1e293b',
      showConfirmButton: false,
      showCancelButton: false,
      customClass: {
        popup: 'rounded-lg p-6',
      },
      backdrop: `
        rgba(0, 0, 0, 0.8)
        backdrop-filter: blur(6px);
      `,
      allowOutsideClick: false,
    });

    const contentContainer = document.getElementById('swal-content');
    const actionsContainer = document.getElementById('swal-actions');

    let contentRoot: Root | null = null;
    let actionsRoot: Root | null = null;

    if (contentContainer) {
      contentRoot = createRoot(contentContainer);
      contentRoot.render(<>{children}</>);
    }
    if (actions && actionsContainer) {
      actionsRoot = createRoot(actionsContainer);
      actionsRoot.render(<>{actions}</>);
    }

    return () => {
      setTimeout(() => {
        if (contentRoot) contentRoot.unmount();
        if (actionsRoot) actionsRoot.unmount();
        Swal.close();
      }, 0); // 🔹 Evita desmontar en medio de otro renderizado
    };
  }, [title, children, actions]);

  return null;
};
