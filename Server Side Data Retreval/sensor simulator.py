## Car Data Retreval Project
## Author: Todd Perry

## Simulation Of Sensors

import random
import time

def getStringToWrite():
    # init random number generator
    toWrite = ""
    for i in range(21):
        rand = random.randint(1, 100)
        toWrite = toWrite + str(rand) + ", "
    print(toWrite)
    return toWrite 
        

def writeToFile(strToWrite):
    outFile = open('CarData.txt', 'w') # open carData to write
    outFile.write(strToWrite)
    outFile.close()
    
    

def main():
    while True:
        strToWrite = getStringToWrite()
        writeToFile(strToWrite)
        time.sleep(0.01)


main()

