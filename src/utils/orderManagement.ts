// Order Management Utility - Sync between user and admin

export interface OrderStatus {
  id: string;
  trackingCode: string;
  status: 'pending' | 'processing' | 'review' | 'completed' | 'rejected';
  progress: number;
  operator?: string;
  notes?: string;
  updatedAt: string;
}

// Get all order statuses from localStorage
export function getAllOrderStatuses(): OrderStatus[] {
  const statuses: OrderStatus[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('order_status_')) {
      const status = JSON.parse(localStorage.getItem(key) || '{}');
      statuses.push(status);
    }
  }
  return statuses;
}

// Get status for a specific order
export function getOrderStatus(trackingCode: string): OrderStatus | null {
  const key = `order_status_${trackingCode}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// Update order status (called by admin)
export function updateOrderStatus(
  trackingCode: string,
  status: OrderStatus['status'],
  operator?: string,
  notes?: string
): void {
  const progressMap = {
    pending: 20,
    processing: 50,
    review: 75,
    completed: 100,
    rejected: 0,
  };

  const orderStatus: OrderStatus = {
    id: trackingCode,
    trackingCode,
    status,
    progress: progressMap[status],
    operator,
    notes,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(`order_status_${trackingCode}`, JSON.stringify(orderStatus));
  
  // Dispatch custom event for real-time updates
  window.dispatchEvent(new CustomEvent('orderStatusUpdated', { detail: orderStatus }));
}

// Listen for order status updates
export function onOrderStatusUpdate(callback: (status: OrderStatus) => void): () => void {
  const handler = (event: CustomEvent) => {
    callback(event.detail);
  };
  
  window.addEventListener('orderStatusUpdated', handler as EventListener);
  
  return () => {
    window.removeEventListener('orderStatusUpdated', handler as EventListener);
  };
}

// Initialize default status for new orders
export function initializeOrderStatus(trackingCode: string): void {
  const existing = getOrderStatus(trackingCode);
  if (!existing) {
    updateOrderStatus(trackingCode, 'pending');
  }
}

// Get status label in Persian
export function getStatusLabel(status: OrderStatus['status']): string {
  const labels = {
    pending: 'در انتظار بررسی',
    processing: 'در حال پردازش',
    review: 'در حال بررسی',
    completed: 'تکمیل شده',
    rejected: 'رد شده',
  };
  return labels[status];
}

// Get status color
export function getStatusColor(status: OrderStatus['status']): string {
  const colors = {
    pending: 'text-amber-600 bg-amber-50 border-amber-200',
    processing: 'text-blue-600 bg-blue-50 border-blue-200',
    review: 'text-purple-600 bg-purple-50 border-purple-200',
    completed: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    rejected: 'text-rose-600 bg-rose-50 border-rose-200',
  };
  return colors[status];
}
