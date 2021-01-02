import requests
from bs4 import BeautifulSoup
from bs4 import CData
from bs4.diagnose import diagnose
from time import sleep
import re

#Constants
SESSION_URL='https://efun.toronto.ca/TorontoFun/Activities/ActivitiesAdvSearch.asp?SectionId=119&SubSectionId=179'
START_URL='https://efun.toronto.ca/TorontoFun/Activities/ActivitiesAdvSearch.asp?ChangeRegistrationAvailable=True&BasicSearch=True&iDisplayStart=true'
BASE_URL='https://efun.toronto.ca/TorontoFun/Activities/'
DETAILS_URL='ActivitiesDetails.asp?'
DISPLAY_FILTER='iDisplayStart='

SEARCH_URL='ActivitiesAdvSearch.asp?'
RESET_PARAM='SearchReset=true'
COMPLEX_FILTER='FilterByComplex=true&ComplexId='


#Params
AID_PARAM='aid=18830'
COMPLEX_PARAM='&ComplexId='
DISPLAY_PARAM='&iDisplayStart='

session = requests.Session()
session_page = session.get(SESSION_URL)

ALL_RINKS=[]
ALL_BOOKINGS=[]


class Rink:
    def __init__(self, complexId, name):
        self.id = complexId
        self.name = name
    def __str__(self):
        return self.name + " | " + self.complexId

class RinkBooking:
    def __init__(self, facility, day, date, startTime, endTime, classes, available):
        self.facility = facility
        self.day = day
        self.date = date
        self.startTime = startTime
        self.endTime = endTime
        self.classes = classes
        self.available = available
    def __str__(self):
        return '{0}: {1} {2}: {3} - {4} | Classes: {5} Available: {6}'.format(self.facility, self.day, self.date, self.startTime, self.endTime, self.classes, self.available)

def addLocationFilter(complexId: int):
    pass

def addDateFilter(startDate, endDate):
    pass

def addTimeFilter(startTime, endTime):
    pass

def addDayFilter(day):
    pass

def getAllBookings():
    data = []
    for rink in getRinkInfo():
        data += getResultsByComplex(rink.id)
    return data

def getRinkInfo():
    data = []
    post_data = {'chkRegistrationAvailable': 'on', 'ajax': 'true'}
    start_page = session.post(START_URL, data=post_data)
    soup = BeautifulSoup(start_page.content, 'html.parser')
    for rinkData in soup.findAll("option")[1:]:
        rink = Rink(rinkData["value"], rinkData.getText().strip())
        data += [rink]
    return data

    
def getResultsByComplex(complexId: int) -> list:
    resultEnd = False
    data = []
    displayStart=0
    while not resultEnd:
        URL = BASE_URL + DETAILS_URL + AID_PARAM + COMPLEX_PARAM + str(complexId) + DISPLAY_PARAM + str(displayStart)
        page = session.get(URL)
        soup = BeautifulSoup(page.content, 'html.parser')
        content = BeautifulSoup(soup.find('data').find(text=lambda tag: isinstance(tag, CData)), features="lxml")
        for entry in content.body.findAll('tr'):
            if entry.find(headers="Barcode"):
                barCode = entry.find(headers="Barcode").getText().strip()
                day = entry.find(headers="Day").getText().strip()
                date = ''.join(entry.find(headers="Dates").getText().split()[:1])
                times = entry.find(headers="Times").getText().split()
                startTime = times[0]
                endTime = times[2]
                facilityInfo = list(filter(None, re.split('\r|\n', entry.find(headers="Complex").getText("\n"))))
                rink = facilityInfo[0].strip()
                facility = facilityInfo[1].strip()
                if (entry.find(headers="Complex").a):
                    facilityId = entry.find(headers="Complex").a['href'].split("=")[1]
                else:
                    facilityId = -1
                classes = int(entry.find(headers="Classes").getText().strip())
                available = int(entry.find(headers="Available").find('div').getText().strip())
                data += [RinkBooking(facility, day, date, startTime, endTime, classes, available)]
            else:
                resultEnd = True
        displayStart += 10
    return data

def main():
    global ALL_BOOKINGS
    global ALL_RINKS
    ALL_RINKS = getRinkInfo()
    ALL_BOOKINGS = getAllBookings()
    for booking in ALL_BOOKINGS:
        if booking.available > 5:
            print(booking)


if __name__ == "__main__":
    main()
    






    

'''
Reset Search Criteria: /ActivitiesAdvSearch.asp?SearchReset=true
Filter By Complex (GET): /ActivitiesAdvSearch.asp?FilterByComplex=true&ComplexId=23&GetCourses=true&BasicSearch=true&ActivityId=undefined&ajax=true&_=1609530654994

Advanced Filter (POST):
chkRegistrationAvailable=on
AllCatogerySubcatogerySelectedHintText=All categories/subcategories 
KeywordSearch
SuperDropDownFrom=dd-mm-yyyy
SuperDropDownFrom=0
SuperDropDownFrom=0
SuperDropDownFrom=0
DateRangeFrom
SuperDropDownTo=dd-mm-yyyy
SuperDropDownTo=0
SuperDropDownTo=0
SuperDropDownTo=0
DateRangeTo
DateFrom={DateFrom}
DateTo={DateTo}
chkWeekDay4=5
RegistrantAgeSearch
AgeSearch=Y
chkKeywordRegistrationAvailable
ajax=true
'''
