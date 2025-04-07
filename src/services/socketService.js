import io from 'socket.io-client';
import authService from './authService';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.listeners = new Map();
  }

  // Initialize socket
  async init(serverUrl) {
    try {
      // Get auth token
      const token = await authService.getToken();
      
      // Create socket connection with auth token
      this.socket = io(serverUrl, {
        auth: {
          token
        },
        transports: ['websocket'],
        forceNew: true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: Infinity
      });

      // Setup connection listeners
      this.socket.on('connect', this.handleConnect.bind(this));
      this.socket.on('disconnect', this.handleDisconnect.bind(this));
      this.socket.on('connect_error', this.handleError.bind(this));
      
      return this.socket;
    } catch (error) {
      console.error('Socket initialization error:', error);
      throw error;
    }
  }

  // Connection handlers
  handleConnect() {
    console.log('Socket connected');
    this.isConnected = true;
  }

  handleDisconnect(reason) {
    console.log('Socket disconnected:', reason);
    this.isConnected = false;
  }

  handleError(error) {
    console.error('Socket connection error:', error);
    this.isConnected = false;
  }

  // Subscribe to event
  on(event, callback) {
    if (!this.socket) {
      throw new Error('Socket not initialized');
    }
    
    // Store callback reference for cleanup
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    
    this.listeners.get(event).add(callback);
    this.socket.on(event, callback);
    
    return () => this.off(event, callback);
  }

  // Remove event listener
  off(event, callback) {
    if (!this.socket) return;
    
    this.socket.off(event, callback);
    
    // Remove from stored listeners
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
      if (this.listeners.get(event).size === 0) {
        this.listeners.delete(event);
      }
    }
  }

  // Emit event
  emit(event, data) {
    if (!this.socket || !this.isConnected) {
      console.warn('Socket not connected, cannot emit:', event);
      return Promise.reject(new Error('Socket not connected'));
    }
    
    return new Promise((resolve, reject) => {
      this.socket.emit(event, data, (response) => {
        if (response && response.error) {
          reject(response.error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Disconnect socket
  disconnect() {
    if (this.socket) {
      // Remove all listeners
      this.listeners.forEach((callbacks, event) => {
        callbacks.forEach(callback => {
          this.socket.off(event, callback);
        });
      });
      
      this.listeners.clear();
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }
}

// Create singleton instance
const socketService = new SocketService();
export default socketService; 