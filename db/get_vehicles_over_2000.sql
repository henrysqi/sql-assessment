SELECT firstname, lastname
FROM Vehicles
JOIN Users on Vehicles.ownerId = Users.id
WHERE year > 2000
ORDER BY year desc