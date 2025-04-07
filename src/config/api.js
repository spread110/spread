// API and Socket.IO configuration
const apiConfig = {
  // Local development URLs
  // baseURL: 'http://localhost:5000/api',
  // socketURL: 'http://localhost:5000',
  
  // Production URLs (Render)
  baseURL: 'https://spread-backend.onrender.com/api',
  socketURL: 'https://spread-backend.onrender.com',
  
  timeout: 15000,
  useMockData: false, // Set to false to use the real backend
  
  // MongoDB configuration
  mongodb: {
    connectionString: 'mongodb://spreadnow4:RjRCKDUiHjAGCPw7@ac-gnsbh8b-shard-00-00.spu4tko.mongodb.net:27017,ac-gnsbh8b-shard-00-01.spu4tko.mongodb.net:27017,ac-gnsbh8b-shard-00-02.spu4tko.mongodb.net:27017/?replicaSet=atlas-lpsyvn-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Spread',
    database: 'spread',
    user: 'spreadnow4',
    // The password is securely stored in the connection string above
  }
};

export default apiConfig; 