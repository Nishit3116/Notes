# Database Setup Guide

## Prerequisites

- MySQL Server installed (version 5.7 or higher)
- MySQL client or MySQL Workbench
- Appropriate user permissions to create databases

## Database Schema Overview

The `quicknotes_auth_db` database contains two main tables:

### Users Table
- `user_id` - Primary key, auto-increment
- `name` - User's full name (max 100 characters)
- `email` - Unique email address (max 150 characters)
- `password_hash` - Hashed password (max 255 characters)
- `created_at` - Timestamp of user registration

### Notes Table
- `note_id` - Primary key, auto-increment
- `title` - Note title (max 100 characters)
- `content` - Note content (TEXT)
- `user_id` - Foreign key referencing users table
- `created_at` - Timestamp of note creation
- **Cascade Delete**: When a user is deleted, all their notes are automatically removed

## Setup Instructions

### Method 1: Using MySQL Command Line

1. **Start MySQL service** (if not running)
   ```bash
   # Windows
   net start MySQL80
   
   # Linux/Mac
   sudo systemctl start mysql
   ```

2. **Login to MySQL**
   ```bash
   mysql -u root -p
   ```

3. **Run the schema file**
   ```sql
   source path/to/database/schema.sql
   ```
   Or on Windows:
   ```sql
   source E:/odoo/Notes/quicknotes-auth/database/schema.sql
   ```

4. **Verify the setup**
   ```sql
   USE quicknotes_auth_db;
   SHOW TABLES;
   DESCRIBE users;
   DESCRIBE notes;
   ```

### Method 2: Using MySQL Direct Command

Run the schema file directly from the command line:

```bash
mysql -u root -p < database/schema.sql
```

### Method 3: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Go to **File → Open SQL Script**
4. Select `schema.sql`
5. Click the **Execute** button (lightning bolt icon)

## Database Configuration

Update your server configuration file with these credentials:

```javascript
// Example for Node.js
const dbConfig = {
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'quicknotes_auth_db'
};
```

## Security Notes

⚠️ **Important Security Practices:**

- Never store plain text passwords (use bcrypt or similar)
- Create a dedicated MySQL user for the application (don't use root)
- Grant only necessary privileges to the application user
- Use environment variables for database credentials
- Keep your MySQL server updated

### Creating a Dedicated User

```sql
CREATE USER 'quicknotes_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON quicknotes_auth_db.* TO 'quicknotes_user'@'localhost';
FLUSH PRIVILEGES;
```

## Troubleshooting

### Common Issues

**Error: Access denied**
- Check your MySQL username and password
- Ensure MySQL service is running

**Error: Database already exists**
- The schema uses `CREATE DATABASE IF NOT EXISTS`, so this shouldn't occur
- If needed, manually drop the database: `DROP DATABASE quicknotes_auth_db;`

**Error: Foreign key constraint fails**
- Ensure InnoDB engine is being used (default in MySQL 5.7+)
- Check that parent records exist before inserting child records

## Sample Data (Optional)

To populate the database with test data, run the provided sample dataset:

```bash
mysql -u root -p < database/sample_data.sql
```

Or from MySQL command line:
```sql
source E:/odoo/Notes/quicknotes-auth/database/sample_data.sql
```

This will create:
- 5 sample users
- 12 sample notes across different users

**Sample user credentials:**
- All users have the example password: `password123`
- Emails: john.doe@example.com, jane.smith@example.com, etc.

## Maintenance

### Backup Database
```bash
mysqldump -u root -p quicknotes_auth_db > backup.sql
```

### Restore Database
```bash
mysql -u root -p quicknotes_auth_db < backup.sql
```

## Next Steps

After setting up the database:
1. Configure your server to connect to this database
2. Implement user authentication endpoints
3. Implement CRUD operations for notes
4. Test all database operations
