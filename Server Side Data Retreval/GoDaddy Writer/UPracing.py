## Car Data Retreval Project
## Author: Todd Perry
## Version 2.4.1
## new sensors are here!
## now with advanced data casheing
## writes to goDaddy



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

class DataCashe:
    # the dataCashe aggregates carData, and contains an array of current data
    # has a print method

    def __init__(self):
        # dataCashe contains an arrat of carData, with a maximum size of 8

        blankCarData = CarData([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

        self.currentData = [blankCarData, blankCarData, blankCarData,
                            blankCarData, blankCarData, blankCarData,
                            blankCarData, blankCarData] # the array (initializes empty)

        # the cashe is the only attribute


    def printOut(self):
        # Iterates through the cashe, prints all
        if len(self.currentData) <= 0:
            print("No Data In Cashe")
        else:
            for index in range(len(self.currentData)):
                print("Car Data Object: " + str(index)) #title
                print() # new line
                self.currentData[index].printOut()


    def addData(self, dataToAdd):
        # adds a new CarData to the cashe, dataToAdd is of type CarData
        # 0 is newest item, 4 is oldest item



        for index in range(len(self.currentData) - 1, 0, -1):
            # start at len, end at 0
            # doesn't grow
            self.currentData[index] = self.currentData[index - 1] # shift up

        self.currentData[0] = dataToAdd



    def writeToDatabase(self):
        # writes all of the data to the database
        try:
            conn = pymysql.connect(host='upStatsAPPV2.db.9980564.hostedresource.com', port=3306, user='upStatsAPPV2', passwd='Southsea2#', db='upStatsAPPV2')
            cur = conn.cursor()

            cur.execute("DELETE FROM carStats") #remove current data

            for index in range(len(self.currentData)):
                query = buildInsertQuery(self.currentData[index]) # cycle through cashe
                cur.execute(query) #add new data
                conn.commit()


            cur.close()
            conn.close()

            print("Write To upStatsAPP.db Successful")

        except (Exception):

            print("Something Went Wrong. (Failed To Write To Database Successfully)")




class CarData:
    # the CarData class holds all the relevant data
    # and has a printout method

    # getters & setters not needed as python attributes not private to class

    def __init__(self, dataList):
        # the class attributes are defined from the dataList list
        # use one of these variables if you only need one var, as opposed to all


        self.dataList = dataList # array of all car data values, for DB
        self.nameList = ["Rev", "Gear", "Speed", "RPM", "Front Right RPM",
                        "Front Left RPM", "Rear Right RPM", "Rear Left RPM", "Suspension 1",
                        "Suspension 2", "Suspension 3", "Suspension 4", "G Force X", "G Force Y",
                        "Air Temprature", "Throttle", "Coolent Temprature", "Battery",
                        "Battery Temprature", "Lambda"] # array of all data names, for Printout

    def printOut(self):
        print("----Car Data Printout----")
        for i in range(20):
            print(str(self.nameList[i]) + ": " + str(self.dataList[i]))
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

    if len(dataList) != 20:
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

    for i in range(20): # loop through sensor data
        dataToAdd += "'" +  str(carData.dataList[i]) + "'"
        if i != 19:
            dataToAdd += ", "

    dataToAdd += ")"

    # next step: build the full query & return it

    query = "INSERT INTO carStats (Rev, Gear, Speed, RPM , FRrpm, FLrpm, RRrpm, RLrpm, Suspension1, Suspension2, Suspension3, Suspension4, GforceX, GforceY, AirTemp, Throttle, CoolentTemp, Battery, BatteryTemp, Lambda)VALUES" + dataToAdd

    #print(query)


    return query



def databaseSetup():
    try:
        conn = pymysql.connect(host='upStatsAPPV2.db.9980564.hostedresource.com', port=3306, user='upStatsAPPV2', passwd='Southsea2#', db='upStatsAPPV2') # test DEFINATLEY exists
        cur = conn.cursor()

        cur.execute("CREATE DATABASE IF NOT EXISTS upStatsAPP") # DB name is now upStatsAPP

        cur.close()
        conn.close() # close test

        conn = pymysql.connect(host='upStatsAPPV2.db.9980564.hostedresource.com', port=3306, user='upStatsAPPV2', passwd='Southsea2#', db='upStatsAPPV2') # test DEFINATLEY exists
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
    dataCashe = DataCashe()
    while True:
        rawData = -1 # init rawData
        while rawData == -1: # prevents crash after file not found error
            rawData = getTextFile()
        dataList = formatRawData(rawData)
        carData = assignVariables(dataList)
        dataCashe.addData(carData)
        dataCashe.writeToDatabase()
        #  time.sleep(0.2) # wait time

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
      exit()

def dumpSystemInfo():
    print("#############################")
    print("#          UPracing         #")
    print("# Car Data Retreval Project #")
    print("#     Author: Todd Perry    #")
    print("#       Version 2.4.1       #")
    print("#############################")
    print("")
    print("NEW SENSORS ARE HERE!")
    print("NOW WITH AN ADVANCED DATA CASHE!!")
    print("NOW WRITES TO GODADDY!!")
    print("")
    print("")


def main():
    dumpSystemInfo()
    menu()

main()

