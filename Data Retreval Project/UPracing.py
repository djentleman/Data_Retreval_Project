## Car Data Retreval Project
## Author: Todd Perry
## Version 2.3
## new sensors are here!
## now with added bug fixes



##EventID
##Rev TEXT,
##Gear TEXT,
##Speed TEXT,
##RPM TEXT,
##FRrpm TEXT,
##FLrpm TEXT,
##RRrpm TEXT,
##RLrpm TEXT,
##Suspension1 TEXT,
##Suspension2 TEXT,
##Suspension3 TEXT,
##Suspension4 TEXT,
##GforceX TEXT,
##GforceY TEXT,
##AirTemp TEXT,
##Throttle TEXT,
##CoolentTemp TEXT,
##Battery TEXT,
##BatteryTemp TEXT,
##Lambda TEXT

## 21 pieces of data


import time # time.sleep is required
import pymysql # localhost database handling


class CarData:
    # the CarData class holds all the relevant data
    # and has a printout method

    # getters & setters not needed as python attributes not private to class

    def __init__(self, dataList):
        # the class attributes are defined from the dataList list
        # use one of these variables if you only need one var, as opposed to all


        self.dataList = dataList # array of all car data values, for DB
        self.nameList = ["Event ID", "Rev", "Gear", "Speed", "RPM", "Front Right RPM",
                        "Front Left RPM", "Rear Right RPM", "Rear Left RPM", "Suspension 1",
                        "Suspension 2", "Suspension 3", "Suspension 4", "G Force X", "G Force Y",
                        "Air Temprature", "Throttle", "Coolent Temprature", "Battery",
                        "Battery Temprature", "Lambda"] # array of all data names, for Printout

    def printOut(self):
        print("----Car Data Printout----")
        for i in range(21):
            print(self.nameList[i] + ": " + self.dataList[i])
        print("--------------------------")






def getTextFile():
    # open the file for reading
    # the name of the file may be subject to change
    try:
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
    except(Exception):
        print("File Not Found")
        return -1 #if -1 is returned, the program won't pass this stage



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
    # 21 is subject to change, depending on the number of sensors

    if len(dataList) != 21:
        print("Something Went Wrong. (Text File Wasn't Fully Populated)")
    else:
        # everything is going as planned
        # this following code may (almost definatley) need to be changed
        # as the sensors are different from last year
        carData = CarData(dataList)
        #carData.printOut()

        return carData

def buildInsertQuery(carData):
    # builds an INSERT query for SQL


    dataToAdd = "("

    for i in range(21): # loop through sensor data
        dataToAdd += "'" +  str(carData.dataList[i]) + "'"
        if i != 20:
            dataToAdd += ", "

    dataToAdd += ")"

    # next step: build the full query & return it

    query = "INSERT INTO CarStats VALUES" + dataToAdd

    #print(query)


    return query






def writeToDatabase(carData):
    # this function interprets the CarData object, and commits it to the
    # database 'UPR'
    try:
        conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='', db='upStatsAPP')
        cur = conn.cursor()

        cur.execute("DELETE FROM CarStats") #remove current data

        query = buildInsertQuery(carData)

        #print(query)

        cur.execute(query) #add new data

        conn.commit()


        cur.close()
        conn.close()

        print("Write To upStatsAPP.db Successful")

    except (Exception):

        print("Something Went Wrong. (Failed To Write To Database Successfully)")

def databaseSetup():
    try:
        conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='', db='test') # test DEFINATLEY exists
        cur = conn.cursor()

        cur.execute("CREATE DATABASE IF NOT EXISTS upStatsAPP") # DB name is now upStatsAPP

        cur.close()
        conn.close() # close test

        conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='', db='upStatsAPP') # test DEFINATLEY exists
        cur = conn.cursor() # open the 'newly created' upStatsAPP


        cur.execute("DROP TABLE IF EXISTS CarStats")
        cur.execute("CREATE TABLE IF NOT EXISTS CarStats(" +
                    "EventID TEXT, Rev TEXT, Gear TEXT, RPM TEXT, " +
                    "Speed TEXT,  FRrpm TEXT, FLrpm TEXT, " +
                    "RRrp TEXT, RLrpm TEXT, Suspension1 TEXT, " +
                    "Suspension2 TEXT, Suspension3 TEXT, Suspension4 TEXT, GForceX TEXT, " +
                    "GForceY TEXT, AirTemp TEXT, Throttle TEXT, " +
                    "CoolentTemp TEXT, Battery TEXT, BatteryTemp TEXT, " +
                    "Lambda TEXT)") #SQL query for table setup

        print("Database Reset Successful")

        cur.close()
        conn.close()
    except (Exception):
        print("Database Did Not Reset, Something Went Wrong")


def run():
    while True:
        rawData = -1 # init rawData
        while rawData == -1: # prevents crash after file not found error
            rawData = getTextFile()
        dataList = formatRawData(rawData)
        carData = assignVariables(dataList)
        #carData.printOut() # for debug
        writeToDatabase(carData)
        time.sleep(0.2) # wait time

# the cycle of operations:
    # get new sensor data
    # format that data
    # prepare for database write
    # write to database
    # repeat (delay between operations can be changed)

def menu():
      canLoop = True
      while canLoop == True:
          print("press 1 to set up database")
          print("press 2 to begin uploading to database")
          print("press 3 to exit")
          choice = eval(input(">>>"))
          if choice == 1:
              databaseSetup()
          elif choice == 2:
              run()
          elif choice == 3:
              canLoop = False

def dumpSystemInfo():
    print("#############################")
    print("#          UPracing         #")
    print("# Car Data Retreval Project #")
    print("#     Author: Todd Perry    #")
    print("#        Version 2.3        #")
    print("#############################")
    print("")
    print("NEW SENSORS ARE HERE!")
    print("NOW WITH ADDED BUGFIXES!!")
    print("")
    print("")


def main():
    dumpSystemInfo()
    menu()

main()

