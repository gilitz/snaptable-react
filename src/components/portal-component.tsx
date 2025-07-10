import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  containerId?: string;
}

const PortalComponent: React.FC<PortalProps> = ({ children, containerId = 'portal-root' }) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Try to find existing container
    let containerElement = document.getElementById(containerId);
    
    // If it doesn't exist, create it
    if (!containerElement) {
      containerElement = document.createElement('div');
      containerElement.id = containerId;
      containerElement.style.position = 'absolute';
      containerElement.style.top = '0';
      containerElement.style.left = '0';
      containerElement.style.zIndex = '10000';
      containerElement.style.pointerEvents = 'none';
      document.body.appendChild(containerElement);
    }
    
    setContainer(containerElement);
    
    // Cleanup function
    return () => {
      // Only remove if it's empty and we created it
      if (containerElement && containerElement.children.length === 0 && containerElement.id === containerId) {
        document.body.removeChild(containerElement);
      }
    };
  }, [containerId]);

  if (!container) {
    return null;
  }

  return createPortal(children, container);
};

export default PortalComponent; 