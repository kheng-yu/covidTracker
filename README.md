# covidTracker
Team 02-2 Assignment for COMP90018


1. open the spring boot file in IDE and load the maven package

2. click run 

3. insert localhost:8080/api/ to call api
  for example : Get request: http://localhost:8080/api/sites

4. getCloseSites functions:
  for example : Get request: http://localhost:8080/api/getCloseSites
                      Request Body: {
                                     "latitude": -37.0519568,
                                      "longitude": 146.0894272
                                    }
                                    
 5.getUserExposureSites by ID function: to get user history sites which were close to exposure sites
   for example: Get request : http://localhost:8080/api/getExposureSitesByUser/001
                 return [
                            {
                                "id": "001",
                                "name": "jack",
                                "lat": -37.7672098,
                                "lng": 145.3023766,
                                "time": "2021-09-08T00:00:00.000+00:00"
                            }
                        ]

6. add user site history : to add the user site history
  for example : post request : http://localhost:8080/api/users
                     request body : 
                     {
                          "id": "002",
                          "name": "amy",
                           "lat": -37.7672098,
                          "lng": 145.3023766,
                          "time": "2021-09-08T00:00:00.000+00:00"
                      }
