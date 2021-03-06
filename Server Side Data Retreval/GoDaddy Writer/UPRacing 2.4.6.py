## Car Data Retreval Project
## Author: Todd Perry
## Version 2.4.6
## new sensors are here!
## lots of threads!
## writes to goDaddy!



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
from threading import *

s = Semaphore() # global semaphore for concurrent parts

class WriterThread(Thread): # thread represented as an object
    # the idea is, if any thread takes longer to process than any other
    # thread in the system, it will switch, speeding up with process
    # and removing any gaps from uploading
    def __init__(self, name, fileName):
        Thread.__init__(self)
        self.fileName = fileName # where the thread will get data from
        self.name = name # name to distuinguish between in thread uploading
        
    def run(self):
        global s
        s.acquire()
        print("Thread", self.name, "Has Optimized For Uploading")
        s.release()
        while True:
            s.acquire()
            # critical section
            #print("Thread", self.name, "Has Uploaded")
            s.release()
            crashFlag = runWriter(self.fileName)
            if crashFlag:
                return
            time.sleep(0) # gives the cpu a break so other threads
            # get involved, and this program gets more control over
            # the program counter -> faster
        return

class DataCache:
    # the dataCache aggregates carData, and contains an array of current data
    # has a print method

    def __init__(self):
        # dataCache contains an arrat of carData, with a maximum size of 8

        blankCarData = CarData([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        self.currentData = blankCarData # the array (initializes empty)

        # the cashe is the only attribute


    def printOut(self):
            self.currentData.printOut()


    def addData(self, dataToAdd):
        # adds a new CarData to the cashe, dataToAdd is of type CarData
        self.currentData = dataToAdd



    def writeToDatabase(self):
        # writes all of the data to the database
        try:
            s.acquire()
            conn = pymysql.connect(host='upStatsAppV3.db.9980564.hostedresource.com', port=3306, user='upStatsAppV3', passwd='Southsea3#', db='upStatsAppV3')
            cur = conn.cursor()

            cur.execute("DELETE FROM carStats") #remove current data
            #self.printOut()

            if (self.currentData.isValid()):
                query = buildInsertQuery(self.currentData) # cycle through cashe
                cur.execute(query) #add new data
                conn.commit()


            cur.close()
            conn.close()

            print("Write To upStatsAPP.db Successful")
        except (Exception):
            print("Something Went Wrong. (Failed To Write To Database Successfully)")

        s.release()



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

    def isValid(self):
        valid = True
        for current in self.dataList:
            # all values have to be 0 in order to be invalid
            valid = valid and (current == 0)
        return not valid





def getTextFile(fileName):
    # open the file for reading
    # the name of the file may be subject to change
    try:
        inFile = open(fileName, "r")

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
        s.acquire()
        print("File Not Found")
        s.release()
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

def runWriter(fileName):
    dataCache = DataCache()
    rawData = getTextFile(fileName)
    if rawData == -1:
        return True # prevents crash after file not found error, false is crash flag
    dataList = formatRawData(rawData)
    carData = assignVariables(dataList)
    dataCache.addData(carData)
    dataCache.writeToDatabase()
    return False # crash flag is false

# the cycle of operations:
    # get new sensor data
    # format that data
    # prepare for database write
    # write to database
    # repeat (delay between operations can be changed)

def mkThreads(fileName):
    threads = []
    for i in range(5):
        t = WriterThread(i, fileName)
        t.start()
        threads.append(t)
    waitForInterrupt(threads)

def threadsAlive(threads):
    # check all threads, if any are alive - return true, else false
    alive = False
    for current in threads: # inner loop
        alive = alive or current.isAlive() # all threads must be dead
    return alive

def waitForInterrupt(threads):
    global s
    # waits for interrupt - then closes all threads
    while True: # outer loop
        # this has O(n^2) efficency, slows down other threads
        # to save on cpu use, checks occur every 5 seconds
        time.sleep(10)# timeout on outer loop
        if threadsAlive(threads) == False: ## if threads are dead OR user interrupt
            print("All Threads Dead")
            break
        s.acquire()
        print("Threads Are Alive")
        s.release()
    main()
    return

def menu(fileName):
      while True:
          print("press 1 to change the serial input file")
          print("press 2 to begin uploading to database")
          print("press 3 to exit")
          choice = str(input(">>>"))
          if choice == "1":
              fileName = getFileName()
          elif choice == "2":
              mkThreads(fileName)
              break
          elif choice == "3":
              exit()
          else:
              print("invalid input")

def dumpSystemInfo():
    print("#############################")
    print("#          UPracing         #")
    print("# Car Data Retreval Project #")
    print("#     Author: Todd Perry    #")
    print("#       Version 2.4.6       #")
    print("#############################")
    print("")

def getFileName():
    print("Enter The File Name Of The Serial Inputs:")
    fileName = input(">>>")
    ## possible regular expression check here
    print("Extracting and pushing data from", fileName)
    return fileName


def main():
    dumpSystemInfo()
    fileName = getFileName()
    menu(fileName)

main()
