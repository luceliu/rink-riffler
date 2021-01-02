import efun
import json
from datetime import datetime
'''
Persist Data Returned from efun website between calls to avoid unecessary querying
Apply Filters as needed
'''
bookingsCache=dict()


def getBookings(complexIds: list, days: list, start: str, end: str, minSpots: int):
    allBookings = []
    if complexIds:
        for complexId in complexIds:
            if complexId in bookingsCache:
                complexBookings = bookingsCache[complexId]
                print("Returned from cache")
            else:
                complexBookings = efun.getResultsByComplex(complexId)
                bookingsCache[complexId] = complexBookings
                print("Got from website")
            allBookings += complexBookings
    else:
        return []
    filteredBookings = allBookings
    
    
    if days:
        days = list(map(lambda x:x.lower(), days))
        print("Filtering by days")
        filteredBookings = list(filter(lambda booking: (booking.day.lower() in days), filteredBookings))
    if start:
        startTime = datetime.strptime(start,'%I:%M%p')
        filteredBookings = list(filter(lambda booking: (datetime.strptime(booking.startTime,'%I:%M%p') >= startTime), filteredBookings))
    if end:
        endTime = datetime.strptime(end,'%I:%M%p')
        filteredBookings = list(filter(lambda booking: (datetime.strptime(booking.endTime,'%I:%M%p') <= endTime), filteredBookings))
    if minSpots:
        print("Filtering by spots")
        filteredBookings = list(filter(lambda booking: (booking.available > minSpots), filteredBookings))
    
    print (json.dumps([booking.__dict__ for booking in filteredBookings]))
    return filteredBookings
            
        
