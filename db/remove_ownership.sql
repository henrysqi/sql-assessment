UPDATE Vehicles 
SET ownerid = NULL
WHERE Vehicles.id = $2 AND ownerid = $1