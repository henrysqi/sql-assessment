SELECT *
FROM Vehicles
WHERE Vehicles.ownerId in (
  SELECT Users.id 
  FROM Users
  WHERE Users.email = $1
)