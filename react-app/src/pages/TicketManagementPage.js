import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthUtils, ApiUtils, ValidationUtils, DateUtils, ToastUtils } from '../utils';

const TicketManagementPage = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium'
  });
  const [errors, setErrors] = useState({});
  
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    if (!AuthUtils.isAuthenticated()) {
      ToastUtils.error('Your session has expired. Please log in again.');
      navigate('/auth/login');
      return;
    }
    
    // Load tickets
    loadTickets();
  }, [navigate]);
  
  useEffect(() => {
    // Handle ticket ID parameter
    if (id) {
      loadTicket(id);
    } else {
      setTicket(null);
      setIsEditing(false);
      setIsCreating(false);
    }
  }, [id]);
  
  useEffect(() => {
    // Apply filter
    applyFilter();
  }, [tickets, filter]);
  
  const loadTickets = () => {
    try {
      const allTickets = ApiUtils.getTickets();
      setTickets(allTickets);
    } catch (error) {
      ToastUtils.error('Failed to load tickets. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const loadTicket = (ticketId) => {
    try {
      const ticketData = ApiUtils.getTicket(ticketId);
      if (ticketData) {
        setTicket(ticketData);
        setFormData({
          title: ticketData.title,
          description: ticketData.description || '',
          status: ticketData.status,
          priority: ticketData.priority || 'medium'
        });
      } else {
        ToastUtils.error('Ticket not found.');
        navigate('/tickets');
      }
    } catch (error) {
      ToastUtils.error('Failed to load ticket details. Please try again.');
      navigate('/tickets');
    }
  };
  
  const applyFilter = () => {
    if (filter === 'all') {
      setFilteredTickets(tickets);
    } else {
      setFilteredTickets(tickets.filter(ticket => ticket.status === filter));
    }
  };
  
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!ValidationUtils.isRequired(formData.title)) {
      newErrors.title = 'Title is required';
    }
    
    if (!ValidationUtils.isValidStatus(formData.status)) {
      newErrors.status = 'Please select a valid status';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      if (isCreating) {
        // Create new ticket
        const newTicket = ApiUtils.createTicket(formData);
        ToastUtils.success('Ticket created successfully!');
        navigate(`/tickets/${newTicket.id}`);
      } else if (isEditing && ticket) {
        // Update existing ticket
        ApiUtils.updateTicket(ticket.id, formData);
        ToastUtils.success('Ticket updated successfully!');
        setIsEditing(false);
        loadTicket(ticket.id);
      }
    } catch (error) {
      ToastUtils.error('An error occurred. Please try again.');
    }
  };
  
  const handleCreateClick = () => {
    setFormData({
      title: '',
      description: '',
      status: 'open',
      priority: 'medium'
    });
    setErrors({});
    setIsCreating(true);
    setIsEditing(false);
    setTicket(null);
    navigate('/tickets');
  };
  
  const handleEditClick = () => {
    setErrors({});
    setIsEditing(true);
    setIsCreating(false);
  };
  
  const handleCancelClick = () => {
    if (isCreating) {
      setIsCreating(false);
      setFormData({
        title: '',
        description: '',
        status: 'open',
        priority: 'medium'
      });
    } else if (isEditing) {
      setIsEditing(false);
      if (ticket) {
        loadTicket(ticket.id);
      }
    }
  };
  
  const handleDeleteClick = () => {
    if (ticket) {
      setIsDeleting(true);
    }
  };
  
  const confirmDelete = () => {
    if (ticket) {
      try {
        ApiUtils.deleteTicket(ticket.id);
        ToastUtils.success('Ticket deleted successfully!');
        navigate('/tickets');
      } catch (error) {
        ToastUtils.error('Failed to delete ticket. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  const cancelDelete = () => {
    setIsDeleting(false);
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'open':
        return 'badge-success';
      case 'in_progress':
        return 'badge-warning';
      case 'closed':
        return 'badge-gray';
      default:
        return 'badge-secondary';
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'open':
        return 'Open';
      case 'in_progress':
        return 'In Progress';
      case 'closed':
        return 'Closed';
      default:
        return status;
    }
  };
  
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'badge-danger';
      case 'medium':
        return 'badge-warning';
      case 'low':
        return 'badge-success';
      default:
        return 'badge-secondary';
    }
  };
  
  const user = AuthUtils.getSession();
  
  return (
    <div>
      {/* Navigation */}
      <nav style={{ 
        backgroundColor: 'var(--white)', 
        boxShadow: 'var(--shadow-md)',
        padding: '1rem 0',
        position: 'sticky',
        top: '0',
        zIndex: '100'
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Ticket Management</div>
            
            <ul style={{ 
              display: 'flex', 
              listStyle: 'none',
              margin: '0',
              padding: '0',
              alignItems: 'center'
            }}>
              <li style={{ marginRight: '1.5rem' }}>
                <Link to="/dashboard" style={{ 
                  color: 'var(--text-secondary)',
                  fontWeight: '500',
                  textDecoration: 'none'
                }}>Dashboard</Link>
              </li>
              <li style={{ marginRight: '1.5rem' }}>
                <Link to="/tickets" style={{ 
                  color: 'var(--primary-color)',
                  fontWeight: '500',
                  textDecoration: 'none'
                }}>Tickets</Link>
              </li>
              <li>
                <button onClick={() => { AuthUtils.clearSession(); navigate('/'); }} className="btn btn-danger btn-sm">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="container">
        {isLoading ? (
          <div style={{ textAlign: 'center', margin: '3rem 0' }}>
            <div style={{ 
              width: '3rem', 
              height: '3rem', 
              borderWidth: '0.3rem',
              borderStyle: 'solid',
              borderColor: 'rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.1) var(--primary-color)',
              borderRadius: '50%',
              display: 'inline-block',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ marginTop: '1rem' }}>Loading tickets...</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '1.5rem' 
            }}>
              <div>
                <h1>Ticket Management</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Manage and track all your tickets</p>
              </div>
              <button onClick={handleCreateClick} className="btn btn-primary">
                Create New Ticket
              </button>
            </div>
            
            {/* Create/Edit Form */}
            {(isCreating || isEditing) && (
              <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div className="card-header">
                  <h3 style={{ margin: '0' }}>{isCreating ? 'Create New Ticket' : 'Edit Ticket'}</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="title" className="form-label">Title *</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter ticket title"
                      />
                      {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter ticket description"
                        rows="4"
                      ></textarea>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ flex: '1' }}>
                        <div className="form-group">
                          <label htmlFor="status" className="form-label">Status *</label>
                          <select
                            id="status"
                            name="status"
                            className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                            value={formData.status}
                            onChange={handleInputChange}
                          >
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="closed">Closed</option>
                          </select>
                          {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                        </div>
                      </div>
                      
                      <div style={{ flex: '1' }}>
                        <div className="form-group">
                          <label htmlFor="priority" className="form-label">Priority</label>
                          <select
                            id="priority"
                            name="priority"
                            className="form-control"
                            value={formData.priority}
                            onChange={handleInputChange}
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                      <button type="submit" className="btn btn-primary">
                        {isCreating ? 'Create Ticket' : 'Update Ticket'}
                      </button>
                      <button type="button" onClick={handleCancelClick} className="btn btn-secondary">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {/* Ticket Detail View */}
            {ticket && !isCreating && !isEditing && (
              <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div className="card-header" style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}>
                  <h3 style={{ margin: '0' }}>Ticket Details</h3>
                  <div>
                    <button onClick={handleEditClick} className="btn btn-sm" style={{ 
                      backgroundColor: 'transparent', 
                      border: '1px solid var(--primary-color)',
                      color: 'var(--primary-color)',
                      marginRight: '0.5rem'
                    }}>
                      Edit
                    </button>
                    <button onClick={handleDeleteClick} className="btn btn-sm" style={{ 
                      backgroundColor: 'transparent', 
                      border: '1px solid var(--danger-color)',
                      color: 'var(--danger-color)'
                    }}>
                      Delete
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start', 
                    marginBottom: '1rem' 
                  }}>
                    <h4 style={{ margin: '0' }}>{ticket.title}</h4>
                    <div>
                      <span className={`badge ${getStatusBadgeClass(ticket.status)}`} style={{ marginRight: '0.5rem' }}>
                        {getStatusText(ticket.status)}
                      </span>
                      <span className={`badge ${getPriorityBadgeClass(ticket.priority)}`}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                      </span>
                    </div>
                  </div>
                  
                  {ticket.description && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h5>Description</h5>
                      <p>{ticket.description}</p>
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <div style={{ flex: '1', minWidth: '200px', marginBottom: '0.5rem' }}>
                      <strong>Created:</strong> {DateUtils.format(ticket.createdAt)}
                    </div>
                    <div style={{ flex: '1', minWidth: '200px', marginBottom: '0.5rem' }}>
                      <strong>Last Updated:</strong> {DateUtils.relativeTime(ticket.updatedAt)}
                    </div>
                    <div style={{ flex: '1', minWidth: '200px', marginBottom: '0.5rem' }}>
                      <strong>ID:</strong> #{ticket.id}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Delete Confirmation Modal */}
            {isDeleting && ticket && (
              <div className="card position-fixed" style={{ 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                zIndex: 1000,
                minWidth: '400px'
              }}>
                <div className="card-header">
                  <h3 style={{ margin: '0' }}>Confirm Delete</h3>
                </div>
                <div className="card-body">
                  <p>Are you sure you want to delete the ticket "{ticket.title}"? This action cannot be undone.</p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button onClick={cancelDelete} className="btn btn-secondary">
                      Cancel
                    </button>
                    <button onClick={confirmDelete} className="btn btn-danger">
                      Delete Ticket
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Tickets List */}
            <div className="card">
              <div className="card-header" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <h3 style={{ margin: '0' }}>Tickets</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div>
                    <label htmlFor="filter" className="form-label" style={{ margin: '0', marginRight: '0.5rem' }}>Filter:</label>
                    <select 
                      id="filter" 
                      className="form-control" 
                      style={{ 
                        display: 'inline-block',
                        width: 'auto',
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.875rem'
                      }}
                      value={filter}
                      onChange={handleFilterChange}
                    >
                      <option value="all">All Tickets</option>
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <span className="badge" style={{ backgroundColor: 'var(--secondary-color)', color: 'white' }}>
                    {filteredTickets.length} tickets
                  </span>
                </div>
              </div>
              
              <div className="card-body">
                {filteredTickets.length > 0 ? (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <th style={{ padding: '0.75rem', textAlign: 'left' }}>Title</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left' }}>Status</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left' }}>Priority</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left' }}>Last Updated</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTickets.map(ticket => (
                          <tr key={ticket.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '0.75rem' }}>
                              <div>
                                <strong>{ticket.title}</strong>
                              </div>
                            </td>
                            <td style={{ padding: '0.75rem' }}>
                              <span className={`badge ${getStatusBadgeClass(ticket.status)}`}>
                                {getStatusText(ticket.status)}
                              </span>
                            </td>
                            <td style={{ padding: '0.75rem' }}>
                              <span className={`badge ${getPriorityBadgeClass(ticket.priority)}`}>
                                {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                              </span>
                            </td>
                            <td style={{ padding: '0.75rem' }}>{DateUtils.relativeTime(ticket.updatedAt)}</td>
                            <td style={{ padding: '0.75rem' }}>
                              <Link 
                                to={`/tickets/${ticket.id}`} 
                                className="btn btn-sm"
                                style={{ 
                                  backgroundColor: 'transparent', 
                                  border: '1px solid var(--primary-color)',
                                  color: 'var(--primary-color)'
                                }}
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>No tickets found.</p>
                    <button onClick={handleCreateClick} className="btn btn-primary">
                      Create Your First Ticket
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default TicketManagementPage;