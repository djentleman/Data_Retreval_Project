## Car Data Retreval Project
## Author: Todd Perry


## Data To Be Handled:
## eventID,REv,gear,speed,FRrpm,FLrpm,
## RRrpm,RLrpm,GforseX,GforseY,airtemp,
## throttle,coolentTEMP,battery,batteryt

## 15 pieces of data


import time # time.sleep is required
import sqlite3 as lite # SQLite3 required for database handling
import sys # required for database handling


class CarData:
    # the CarData class holds all the relevant data
    # and has a printout method

    # getters & setters not needed as python attributes not private to class

    def __init__(self, dataList):
        # the class attributes are defined from the dataList list
        # use one of these variables if you only need one var, as opposed to all
        
        self.eventID = dataList[0]
        self.REv = dataList[1]
        self.gear = dataList[2]
        self.speed = dataList[3]
        self.FRrpm = dataList[4]
        self.FLrpm = dataList[5]
        self.RRrpm = dataList[6]
        self.RLrpm = dataList[7]
        self.GforceX = dataList[8]
        self.GforceY = dataList[9]
        self.airTemp = dataList[10]
        self.throttle = dataList[11]
        self.coolentTEMP = dataList[12]
        self.battery = dataList[13]
        self.batteryT = dataList[14]
        
        self.dataList = dataList # array of all car data values, for DB
        self.nameList = ["Event ID", "REv", "Gear", "Speed",
                         "FRrpm", "FLrpm", "RRrpm", "RLrpm",
                         "G-Force X", "G-Force Y", "Air Temp",
                         "Throttle", "Coolent Temp", "Battery",
                         "Battery Temp"] # array of all data names, for DB

    def printOut(self):
        print("----Car Data Printout----")
        print("Event ID: ", self.eventID)
        print("REv: ", self.REv)
        print("Gear: ", self.gear)
        print("Speed: ", self.speed)
        print("FR rpm: ", self.FRrpm)
        print("FL rpm: ", self.FLrpm)
        print("RR rpm: ", self.RRrpm)
        print("RL rpm: ", self.RLrpm)
        print("Gforce X: ", self.GforceX)
        print("Gforce Y: ", self.GforceY)
        print("Air Temprature: ", self.airTemp)
        print("Throttle: ", self.throttle)
        print("Coolent Temp: ", self.coolentTEMP)
        print("Battery: ", self.battery)
        print("Battery Temp: ", self.batteryT)
        print("--------------------------")



        


def getTextFile():
    # open the file for reading
    # the name of the file may be subject to change
    
    inFile = open("CarData.txt", "r")

    # read the entire text file, and concat it all into one string
    inFileText = ""

    for currentLine in inFile:
        # cycle through inFile, line by line
        # add the current line to inFileText
        
        inFileText += currentLine

        
    # inFileText now holds all of the data from the file, however the program
    # can easily be edited to accomidate for something different

    inFile.close()

    #return string for further formatting
    return inFileText



def formatRawData(rawData):
    # iterate through rawData, and remove commas
    # commas are likely to seperate the items of data in the text file
    # if there are no commas, this step will do nothing

    formattedData = ""
    # newData will hold the raw data after formatting

    for ch in rawData:
        # iterate through characters

        
        if ch != ",":

            # only copy is ch isn't a comma
            formattedData += ch

    # newData is now only seperated by spaces, allowing me to use
    # the string.split function, turning it into a list

    dataList = formattedData.split()

    return dataList

def assignVariables(dataList):
    # dataList should be 15 items long, if not something has gone wrong
    # 15 is subject to change, depending on the number of sensors

    if len(dataList) != 15:
        print("Something Went Wrong. (Text File Wasn't Fully Populated)")
    else:
        # everything is going as planned
        # this following code may (almost definatley) need to be changed
        # as the sensors are different from last year
        carData = CarData(dataList)
        # carData.printOut() OLD DEBUG

        return carData

def buildInsertQuery(nam, val):
    # builds an INSERT query for mySQL
    # nam = DataName, val = DataValue

    
    dataToAdd = "('" + str(nam) + "', " + str(val) + ")"
    # data to insert

    # next step: build the full query & return it

    query = "INSERT INTO CarData VALUES" + dataToAdd    

    return query
        
        



    
    

    

def writeToDatabase(carData):
    # this function interprets the CarData object, and commits it to the
    # database 'URP.db'

    try:
        con = lite.connect('UPR.db')

        cur = con.cursor()  

        # text dataName = eventID, REv, gear,  ..... , batteryT
        # text dataValue = , 5, 2, 6, 54, 7, ...., ???
        # text to accomodate for floats & othger unexpected
        # can be processed w/ javascript client side
        
        #cur.executescript("DROP TABLE IF EXISTS CarData")
        # wipe current database state

        #cur.executescript("CREATE TABLE CarData(DataName TEXT, DataValue TEXT)")
        # create clean database

        cur.executescript("DELETE FROM CarData")

        
        for index in range(15): # 15 = number of sensors
            query = buildInsertQuery(carData.nameList[index], carData.dataList[index]) # get query
            cur.executescript(query) # execute
        




        
        
        print("Write To UPR.db Successful")

        con.commit()
    
    except (Exception):
        
        print("Something Went Wrong. (Failed To Write To Database Successfully)")
        
    finally:
        
        if con:
            con.close() 


def main():
    while True:
        rawData = getTextFile()
        dataList = formatRawData(rawData)
        carData = assignVariables(dataList)
        writeToDatabase(carData)
        time.sleep(0.3) #delay between operations, can be changed
    




main()

