// Common utility functions for all implementations

// Authentication utilities
const AuthUtils = {
  // Check if user is authenticated
  isAuthenticated: function() {
    return localStorage.getItem('ticketapp_session') !== null;
  },

  // Get current user session
  getSession: function() {
    const session = localStorage.getItem('ticketapp_session');
    return session ? JSON.parse(session) : null;
  },

  // Set user session
  setSession: function(user) {
    localStorage.setItem('ticketapp_session', JSON.stringify(user));
  },

  // Clear user session
  clearSession: function() {
    localStorage.removeItem('ticketapp_session');
  },

  // Mock authentication function
  authenticate: function(email, password) {
    // Mock user database
    const users = [
      { id: 1, name: 'Admin User', email: 'admin@example.com', password: 'password123' },
      { id: 2, name: 'Test User', email: 'test@example.com', password: 'test123' }
    ];

    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Don't store password in session
      const { password, ...userSession } = user;
      this.setSession(userSession);
      return { success: true, user: userSession };
    } else {
      return { success: false, message: 'Invalid email or password' };
    }
  },

  // Mock signup function
  signup: function(name, email, password) {
    // In a real app, this would make an API call
    // For demo purposes, we'll simulate a successful signup
    const newUser = {
      id: Date.now(), // Generate a simple ID
      name,
      email
    };
    
    this.setSession(newUser);
    return { success: true, user: newUser };
  },

  // Protect route - redirect to login if not authenticated
  protectRoute: function(redirectPath = '/auth/login') {
    if (!this.isAuthenticated()) {
      window.location.href = redirectPath;
      return false;
    }
    return true;
  }
};

// Toast notification utility
const ToastUtils = {
  show: function(message, type = 'success', duration = 5000) {
    // Remove existing toasts
    const existingContainer = document.querySelector('.toast-container');
    if (existingContainer) {
      existingContainer.remove();
    }

    // Create toast container
    const container = document.createElement('div');
    container.className = 'toast-container';

    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    // Create toast body
    const toastBody = document.createElement('div');
    toastBody.className = 'toast-body';
    toastBody.textContent = message;

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'toast-close';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => {
      container.remove();
    });

    // Assemble toast
    toast.appendChild(toastBody);
    toast.appendChild(closeButton);
    container.appendChild(toast);

    // Add to DOM
    document.body.appendChild(container);

    // Auto remove after duration
    setTimeout(() => {
      container.remove();
    }, duration);
  },

  success: function(message, duration) {
    this.show(message, 'success', duration);
  },

  error: function(message, duration) {
    this.show(message, 'error', duration);
  },

  warning: function(message, duration) {
    this.show(message, 'warning', duration);
  }
};

// Form validation utility
const ValidationUtils = {
  // Validate email format
  isValidEmail: function(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Validate required field
  isRequired: function(value) {
    return value !== null && value !== undefined && value.trim() !== '';
  },

  // Validate minimum length
  minLength: function(value, min) {
    return value.length >= min;
  },

  // Validate maximum length
  maxLength: function(value, max) {
    return value.length <= max;
  },

  // Validate ticket status
  isValidStatus: function(status) {
    return ['open', 'in_progress', 'closed'].includes(status);
  },

  // Show validation error
  showError: function(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.classList.add('is-invalid');
      
      // Find or create error message element
      let errorElement = field.nextElementSibling;
      if (!errorElement || !errorElement.classList.contains('invalid-feedback')) {
        errorElement = document.createElement('div');
        errorElement.className = 'invalid-feedback';
        field.parentNode.insertBefore(errorElement, field.nextSibling);
      }
      
      errorElement.textContent = message;
    }
  },

  // Clear validation error
  clearError: function(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.classList.remove('is-invalid');
      
      // Remove error message element if exists
      const errorElement = field.nextElementSibling;
      if (errorElement && errorElement.classList.contains('invalid-feedback')) {
        errorElement.remove();
      }
    }
  },

  // Clear all validation errors
  clearAllErrors: function() {
    const invalidFields = document.querySelectorAll('.is-invalid');
    invalidFields.forEach(field => {
      field.classList.remove('is-invalid');
      
      const errorElement = field.nextElementSibling;
      if (errorElement && errorElement.classList.contains('invalid-feedback')) {
        errorElement.remove();
      }
    });
  }
};

// API utility for mock data operations
const ApiUtils = {
  // Mock tickets data
  getTickets: function() {
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
  getTicket: function(id) {
    const tickets = this.getTickets();
    return tickets.find(ticket => ticket.id === parseInt(id));
  },

  // Create new ticket
  createTicket: function(ticket) {
    const tickets = this.getTickets();
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
  updateTicket: function(id, updates) {
    const tickets = this.getTickets();
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
  deleteTicket: function(id) {
    const tickets = this.getTickets();
    const filteredTickets = tickets.filter(ticket => ticket.id !== parseInt(id));
    
    if (filteredTickets.length === tickets.length) {
      return false; // No ticket was removed
    }
    
    localStorage.setItem('tickets', JSON.stringify(filteredTickets));
    return true;
  },

  // Get ticket statistics
  getTicketStats: function() {
    const tickets = this.getTickets();
    
    return {
      total: tickets.length,
      open: tickets.filter(ticket => ticket.status === 'open').length,
      inProgress: tickets.filter(ticket => ticket.status === 'in_progress').length,
      closed: tickets.filter(ticket => ticket.status === 'closed').length
    };
  }
};

// Format date utility
const DateUtils = {
  format: function(dateString, options = {}) {
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

  relativeTime: function(dateString) {
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
      return this.format(dateString);
    }
  }
};

// Export utilities for use in different modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    AuthUtils,
    ToastUtils,
    ValidationUtils,
    ApiUtils,
    DateUtils
  };
}