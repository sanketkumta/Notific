import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { AlertTriangle, X, ChevronDown, ChevronUp, Move, Trash2 } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { PriorityLevel } from '../types/notification';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 20px;
  width: 400px;
  height: 40vh;
  z-index: 500;
  pointer-events: none;
  overflow: visible;
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
  padding-bottom: 20px;
`;

const NotificationToast = styled.div<{
  priority: PriorityLevel;
  index: number;
  isRemoving: boolean;
}>`
  background: ${props => {
    switch (props.priority) {
      case PriorityLevel.CRITICAL:
        return '#999999';
      case PriorityLevel.HIGH:
        return '#b3b3b3';
      default:
        return '#cccccc';
    }
  }};
  color: #333333;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: all;
  width: 100%;
  position: relative;
  border: 1px solid #e0e0e0;

  ${props => props.isRemoving ? `
    animation: slideOutRight 0.4s ease-in-out forwards;

    @keyframes slideOutRight {
      0% {
        transform: translateX(0) scale(1);
        opacity: 1;
      }
      100% {
        transform: translateX(100%) scale(0.8);
        opacity: 0;
      }
    }
  ` : `
    animation: slideInFromBottom 0.6s ease-out;
    animation-delay: ${props.index * 0.1}s;
    animation-fill-mode: both;

    @keyframes slideInFromBottom {
      0% {
        transform: translateY(60px) scale(0.8);
        opacity: 0;
      }
      60% {
        transform: translateY(-8px) scale(1.05);
        opacity: 0.8;
      }
      100% {
        transform: translateY(0) scale(1);
        opacity: 1;
      }
    }
  `}
`;

const Content = styled.div`
  flex: 1;
  margin-right: 16px;
`;

const AppName = styled.div`
  font-size: 12px;
  color: #666666;
  margin-bottom: 4px;
  font-weight: 600;
`;

const Message = styled.div`
  font-size: 14px;
  line-height: 1.3;
  color: #333333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #666666;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
`;

const SeeMoreButton = styled.button`
  background: #e0e0e0;
  border: 1px solid #cccccc;
  color: #333333;
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: 8px;
  pointer-events: all;
`;

const SeeMoreText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SeeMoreCount = styled.span`
  font-size: 12px;
  color: #666666;
  margin-top: 2px;
`;

const SeeMoreTopButton = styled.button`
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: #333333;
  padding: 6px 14px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: fit-content;
  margin-bottom: 12px;
  pointer-events: all;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
  }
`;

const ExpandedSidebar = styled.div<{ isDragging: boolean }>`
  position: fixed;
  top: ${props => props.isDragging ? 'auto' : '80px'};
  right: ${props => props.isDragging ? 'auto' : '20px'};
  transform: ${props => props.isDragging ? 'none' : 'none'};
  width: 450px;
  max-height: calc(100vh - 100px);
  background: #f5f5f5;
  border: 1px solid #cccccc;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  cursor: ${props => props.isDragging ? 'grabbing' : 'default'};
`;

const SidebarHeader = styled.div`
  background: #e0e0e0;
  padding: 16px 20px;
  border-bottom: 1px solid #cccccc;
  border-radius: 16px 16px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: grab;
  user-select: none;

  &:active {
    cursor: grabbing;
  }
`;

const SidebarTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SidebarContent = styled.div`
  padding: 16px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SidebarNotification = styled.div<{ priority: PriorityLevel }>`
  background: ${props => {
    switch (props.priority) {
      case PriorityLevel.CRITICAL:
        return '#999999';
      case PriorityLevel.HIGH:
        return '#b3b3b3';
      default:
        return '#cccccc';
    }
  }};
  color: #333333;
  border-radius: 8px;
  padding: 12px 14px;
  border: 1px solid #b3b3b3;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ShowLessButton = styled.button`
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: #333333;
  padding: 6px 14px;
  margin: 16px;
  margin-top: 0;
  border-radius: 20px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: fit-content;
  align-self: center;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
  }
`;

const ClearAllButton = styled.button`
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: #666666;
  padding: 4px 10px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 10px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  white-space: nowrap;

  &:hover {
    background: rgba(255, 100, 100, 0.3);
    color: #ff3333;
    transform: translateY(-1px);
  }
`;

const IconContainer = styled.div<{ priority: PriorityLevel }>`
  margin-right: 12px;
`;

interface ActiveNotificationsProps {
  onOpenNotificationCenter: () => void;
}

export function AnimatedNotifications({ onOpenNotificationCenter }: ActiveNotificationsProps) {
  const { state, dispatch } = useNotification();
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const handleDismiss = (id: string) => {
    setRemovingIds(prev => new Set(prev).add(id));

    setTimeout(() => {
      dispatch({ type: 'DISMISS_NOTIFICATION', payload: id });
      setRemovingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 400);
  };

  const handleClearAll = () => {
    // Dismiss all notifications
    state.notifications.forEach(notification => {
      dispatch({ type: 'DISMISS_NOTIFICATION', payload: notification.id });
    });
    setIsExpanded(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (dragRef.current) {
      setIsDragging(true);
      const rect = dragRef.current.getBoundingClientRect();
      offsetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && dragRef.current) {
        const newX = e.clientX - offsetRef.current.x;
        const newY = e.clientY - offsetRef.current.y;
        
        // Boundary checks
        const maxX = window.innerWidth - dragRef.current.offsetWidth;
        const maxY = window.innerHeight - dragRef.current.offsetHeight;
        
        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (state.activeNotifications.length === 0) {
    return null;
  }

  const visibleNotifications = state.activeNotifications.slice(0, 6).reverse();
  const totalNotifications = state.notifications.filter(n => n.isVisible).length; // Total visible in notification center
  const remainingCount = totalNotifications - 6;
  const allNotifications = state.notifications.filter(n => n.isVisible);

  return (
    <>
      <Container>
        {visibleNotifications.map((notification, index) => (
          <NotificationToast
            key={notification.id}
            priority={notification.priority}
            index={index}
            isRemoving={removingIds.has(notification.id)}
          >
            {notification.priority === PriorityLevel.CRITICAL && (
              <IconContainer priority={notification.priority}>
                <AlertTriangle size={20} />
              </IconContainer>
            )}
            <Content>
              <AppName>{notification.app}</AppName>
              <Message>{notification.message}</Message>
            </Content>
            <CloseButton onClick={() => handleDismiss(notification.id)}>
              <X size={16} />
            </CloseButton>
          </NotificationToast>
        ))}

        {/* See More button - appears at TOP due to column-reverse */}
        {remainingCount > 0 && (
          <SeeMoreTopButton onClick={() => setIsExpanded(true)}>
            <span>See More</span>
            <ChevronDown size={14} />
            <span style={{ fontSize: '10px', color: '#666666' }}>+{remainingCount}</span>
          </SeeMoreTopButton>
        )}
      </Container>

      {/* Expanded draggable sidebar */}
      {isExpanded && (
        <ExpandedSidebar
          ref={dragRef}
          isDragging={isDragging}
          style={isDragging ? { left: position.x, top: position.y } : {}}
        >
          <SidebarHeader onMouseDown={handleMouseDown}>
            <SidebarTitle>
              <Move size={16} />
              All Notifications ({allNotifications.length})
            </SidebarTitle>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <ClearAllButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearAll();
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <Trash2 size={12} />
                Clear All
              </ClearAllButton>
              <X
                size={20}
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
                onMouseDown={(e) => e.stopPropagation()}
              />
            </div>
          </SidebarHeader>

          <SidebarContent>
            {allNotifications.map((notification) => (
              <SidebarNotification key={notification.id} priority={notification.priority}>
                {notification.priority === PriorityLevel.CRITICAL && (
                  <IconContainer priority={notification.priority}>
                    <AlertTriangle size={18} />
                  </IconContainer>
                )}
                <Content>
                  <AppName>{notification.app}</AppName>
                  <Message>{notification.message}</Message>
                </Content>
                <CloseButton onClick={() => handleDismiss(notification.id)}>
                  <X size={16} />
                </CloseButton>
              </SidebarNotification>
            ))}
          </SidebarContent>

          <ShowLessButton onClick={() => setIsExpanded(false)}>
            <ChevronUp size={18} />
            <span>Show Less</span>
          </ShowLessButton>
        </ExpandedSidebar>
      )}
    </>
  );
}
