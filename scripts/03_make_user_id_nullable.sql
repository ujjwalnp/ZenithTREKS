USE ram_himalayan_travels;

-- Drop the existing foreign key constraint
ALTER TABLE bookings DROP FOREIGN KEY bookings_ibfk_1;

-- Modify user_id to allow NULL values
ALTER TABLE bookings MODIFY COLUMN user_id INT NULL;

-- Re-add the foreign key constraint with ON DELETE CASCADE
ALTER TABLE bookings 
ADD CONSTRAINT bookings_ibfk_1 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

