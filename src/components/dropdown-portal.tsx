import { ReactNode, useEffect, useState, useRef } from 'react';
import PortalComponent from './portal-component';

interface DropdownPortalProps {
  children: ReactNode;
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLElement>;
  onClose: () => void;
  className?: string;
  align?: 'left' | 'right';
}

const DropdownPortal: React.FC<DropdownPortalProps> = ({
  children,
  isOpen,
  triggerRef,
  onClose,
  className = '',
  align = 'right'
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const updatePosition = () => {
        const triggerRect = triggerRef.current!.getBoundingClientRect();
        const scrollX = window.pageXOffset ?? document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset ?? document.documentElement.scrollTop;
        
        let left = triggerRect.left + scrollX;
        let top = triggerRect.bottom + scrollY + 4; // 4px margin
        
        // Align right edge of dropdown with right edge of trigger
        if (align === 'right' && dropdownRef.current) {
          const dropdownWidth = dropdownRef.current.offsetWidth ?? 120; // fallback width
          left = triggerRect.right + scrollX - dropdownWidth;
        }
        
        // Ensure dropdown doesn't go off-screen
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        if (left < 0) left = 0;
        if (left + (dropdownRef.current?.offsetWidth ?? 120) > viewportWidth) {
          left = viewportWidth - (dropdownRef.current?.offsetWidth ?? 120) - 10;
        }
        
        if (top + (dropdownRef.current?.offsetHeight ?? 100) > viewportHeight + scrollY) {
          top = triggerRect.top + scrollY - (dropdownRef.current?.offsetHeight ?? 100) - 4;
        }
        
        setPosition({ top, left });
      };
      
      updatePosition();
      
      // Update position on scroll/resize
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isOpen, triggerRef, align]);

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          onClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <PortalComponent>
      <div
        ref={dropdownRef}
        className={`dropdown-portal ${className}`}
        style={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          zIndex: 10000,
          pointerEvents: 'auto',
        }}
      >
        {children}
      </div>
    </PortalComponent>
  );
};

export default DropdownPortal; 