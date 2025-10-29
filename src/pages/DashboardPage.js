import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthUtils, ApiUtils, DateUtils, ToastUtils } from '../utils';
import Navigation from '../components/ui/Navigation';
import Footer from '../components/ui/Footer';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0
  });
  const [recentTickets, setRecentTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  const loadDashboardData = useCallback(() => {
    try {
      // Get ticket statistics
      const ticketStats = ApiUtils.getTicketStats();
      setStats(ticketStats);
      
      // Get recent tickets (last 5)
      const allTickets = ApiUtils.getTickets();
      const sortedTickets = [...allTickets].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setRecentTickets(sortedTickets.slice(0, 5));
    } catch (error) {
      ToastUtils.error('Failed to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuth = AuthUtils.isAuthenticated();
    const session = AuthUtils.getSession();
    console.log('Dashboard - Auth check:', { isAuth, session });
    
    if (!isAuth) {
      ToastUtils.error('Your session has expired. Please log in again.');
      navigate('/auth/login');
      return;
    }
    
    // Load dashboard data
    loadDashboardData();
  }, [navigate, loadDashboardData]);
  
  const getStatusBadgeClass = useCallback((status) => {
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
  }, []);
  
  const getStatusText = useCallback((status) => {
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
  }, []);
  
  const user = AuthUtils.getSession();
  
  return (
    <div>
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <div className="container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '1.5rem' 
        }}>
          <div>
            <h1>Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {user?.name}!</p>
          </div>
          <Link to="/tickets" className="btn btn-primary">
            Manage Tickets
          </Link>
        </div>
        
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
            <p style={{ marginTop: '1rem' }}>Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div className="card" style={{ textAlign: 'center' }}>
                <div className="card-body">
                  <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.total}</div>
                  <div style={{ color: 'var(--text-secondary)' }}>Total Tickets</div>
                </div>
              </div>
              
              <div className="card" style={{ textAlign: 'center' }}>
                <div className="card-body">
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-color)' }}>{stats.open}</div>
                  <div style={{ color: 'var(--text-secondary)' }}>Open Tickets</div>
                </div>
              </div>
              
              <div className="card" style={{ textAlign: 'center' }}>
                <div className="card-body">
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--warning-color)' }}>{stats.inProgress}</div>
                  <div style={{ color: 'var(--text-secondary)' }}>In Progress</div>
                </div>
              </div>
              
              <div className="card" style={{ textAlign: 'center' }}>
                <div className="card-body">
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--gray-color)' }}>{stats.closed}</div>
                  <div style={{ color: 'var(--text-secondary)' }}>Closed Tickets</div>
                </div>
              </div>
            </div>
            
            {/* Recent Tickets */}
            <div className="card">
              <div className="card-header" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <h3 style={{ margin: '0' }}>Recent Tickets</h3>
                <Link to="/tickets" className="btn btn-sm" style={{ 
                  backgroundColor: 'transparent', 
                  border: '1px solid var(--primary-color)',
                  color: 'var(--primary-color)'
                }}>
                  View All
                </Link>
              </div>
              
              <div className="card-body">
                {recentTickets.length > 0 ? (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <th style={{ padding: '0.75rem', textAlign: 'left' }}>Title</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left' }}>Status</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left' }}>Last Updated</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentTickets.map(ticket => (
                          <tr key={ticket.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '0.75rem' }}>
                              <div>
                                <strong>{ticket.title}</strong>
                                {ticket.priority === 'high' && (
                                  <span className="badge badge-danger" style={{ marginLeft: '0.5rem' }}>High Priority</span>
                                )}
                              </div>
                            </td>
                            <td style={{ padding: '0.75rem' }}>
                              <span className={`badge ${getStatusBadgeClass(ticket.status)}`}>
                                {getStatusText(ticket.status)}
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
                    <Link to="/tickets" className="btn btn-primary">
                      Create Your First Ticket
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      
      <Footer />
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;