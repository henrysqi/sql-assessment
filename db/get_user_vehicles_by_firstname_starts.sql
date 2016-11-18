SELECT *
FROM Vehicles
WHERE Vehicles.ownerId in (
  SELECT Users.id   
  FROM Users
  WHERE Users.firstname ILIKE concat($1::TEXT, '%')
)