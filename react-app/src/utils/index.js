// Utility functions for React app

// Authentication utilities
export const AuthUtils = {
  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem('ticketapp_session') !== null;
  },

  // Get current user session
  getSession: () => {
    const session = localStorage.getItem('ticketapp_session');
    return session ? JSON.parse(session) : null;
  },

  // Set user session
  setSession: (user) => {
    localStorage.setItem('ticketapp_session', JSON.stringify(user));
  },

  // Clear user session
  clearSession: () => {
    localStorage.removeItem('ticketapp_session');
  },

  // Mock authentication function
  authenticate: (email, password) => {
    // Mock user database
    const users = [
      { id: 1, name: 'Admin User', email: 'admin@example.com', password: 'password123' },
      { id: 2, name: 'Test User', email: 'test@example.com', password: 'test123' }
    ];

    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Don't store password in session
      const { password, ...userSession } = user;
      AuthUtils.setSession(userSession);
      return { success: true, user: userSession };
    } else {
      return { success: false, message: 'Invalid email or password' };
    }
  },

  // Mock signup function
  signup: (name, email, password) => {
    // In a real app, this would make an API call
    // For demo purposes, we'll simulate a successful signup
    const newUser = {
      id: Date.now(), // Generate a simple ID
      name,
      email
    };
    
    AuthUtils.setSession(newUser);
    return { success: true, user: newUser };
  }
};

// Toast notification utility
export const ToastUtils = {
  show: (message, type = 'success', duration = 5000) => {
    // Create custom event for toast
    const event = new CustomEvent('showToast', {
      detail: { message, type, duration }
    });
    document.dispatchEvent(event);
  },

  success: (message, duration) => {
    ToastUtils.show(message, 'success', duration);
  },

  error: (message, duration) => {
    ToastUtils.show(message, 'error', duration);
  },

  warning: (message, duration) => {
    ToastUtils.show(message, 'warning', duration);
  }
};

// Form validation utility
export const ValidationUtils = {
  // Validate email format
  isValidEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Validate required field
  isRequired: (value) => {
    return value !== null && value !== undefined && value.trim() !== '';
  },

  // Validate minimum length
  minLength: (value, min) => {
    return value.length >= min;
  },

  // Validate maximum length
  maxLength: (value, max) => {
    return value.length <= max;
  },

  // Validate ticket status
  isValidStatus: (status) => {
    return ['open', 'in_progress', 'closed'].includes(status);
  }
};

// API utility for mock data operations
export const ApiUtils = {
  // Mock tickets data
  getTickets: () => {
    // In a real app, this would fetch from an API
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    
    // If no tickets exist, create some sample data
    if (tickets.length === 0) {
      const sampleTickets = [
        {
          id: 1,
          title: 'Login page not responsive',
          description: 'The login page is not displaying correctly on mobile devices',
          status: 'open',
          priority: 'high',
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          updatedAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 2,
          title: 'Dashboard statistics loading slowly',
          description: 'The dashboard is taking more than 5 seconds to load statistics',
          status: 'in_progress',
          priority: 'medium',
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          updatedAt: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
        },
        {
          id: 3,
          title: 'User profile update issue',
          description: 'Users are unable to update their profile information',
          status: 'closed',
          priority: 'low',
          createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
          updatedAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        }
      ];
      
      localStorage.setItem('tickets', JSON.stringify(sampleTickets));
      return sampleTickets;
    }
    
    return tickets;
  },

  // Get ticket by ID
  getTicket: (id) => {
    const tickets = ApiUtils.getTickets();
    return tickets.find(ticket => ticket.id === parseInt(id));
  },

  // Create new ticket
  createTicket: (ticket) => {
    const tickets = ApiUtils.getTickets();
    const newTicket = {
      ...ticket,
      id: Date.now(), // Simple ID generation for demo
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    tickets.push(newTicket);
    localStorage.setItem('tickets', JSON.stringify(tickets));
    
    return newTicket;
  },

  // Update ticket
  updateTicket: (id, updates) => {
    const tickets = ApiUtils.getTickets();
    const ticketIndex = tickets.findIndex(ticket => ticket.id === parseInt(id));
    
    if (ticketIndex === -1) {
      return null;
    }
    
    tickets[ticketIndex] = {
      ...tickets[ticketIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('tickets', JSON.stringify(tickets));
    return tickets[ticketIndex];
  },

  // Delete ticket
  deleteTicket: (id) => {
    const tickets = ApiUtils.getTickets();
    const filteredTickets = tickets.filter(ticket => ticket.id !== parseInt(id));
    
    if (filteredTickets.length === tickets.length) {
      return false; // No ticket was removed
    }
    
    localStorage.setItem('tickets', JSON.stringify(filteredTickets));
    return true;
  },

  // Get ticket statistics
  getTicketStats: () => {
    const tickets = ApiUtils.getTickets();
    
    return {
      total: tickets.length,
      open: tickets.filter(ticket => ticket.status === 'open').length,
      inProgress: tickets.filter(ticket => ticket.status === 'in_progress').length,
      closed: tickets.filter(ticket => ticket.status === 'closed').length
    };
  }
};

// Format date utility
export const DateUtils = {
  format: (dateString, options = {}) => {
    const date = new Date(dateString);
    
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    return date.toLocaleDateString(undefined, mergedOptions);
  },

  relativeTime: (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);
    
    if (diffSec < 60) {
      return 'just now';
    } else if (diffMin < 60) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else if (diffHour < 24) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffDay < 7) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else {
      return DateUtils.format(dateString);
    }
  }
};