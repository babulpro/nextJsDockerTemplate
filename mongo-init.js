// MongoDB initialization script
// This script runs when the MongoDB container first starts

print('Start #################################################################');

db = db.getSiblingDB('my-nextjs-db');

// Create a user for the application
db.createUser({
  user: 'nextjs-user',
  pwd: 'nextjs-password',
  roles: [
    {
      role: 'readWrite',
      db: 'my-nextjs-db',
    },
  ],
});

// Create initial collections (optional)
db.createCollection('users');
db.createCollection('posts');

// Insert sample data (optional)
db.users.insertMany([
  {
    email: 'admin@example.com',
    name: 'Admin User',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'user@example.com',
    name: 'Regular User',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('Database initialized successfully');
print('End #################################################################');
