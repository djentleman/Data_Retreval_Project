## Car Data Retreval Project
## Author: Todd Perry

## Simulation Of Sensors
## more realistic

import random
import time

class SensorInfo():
    # array of car data
    def __init__(self):
        self.currentData = []
        for i in range(20):
            rand = random.randint(1, 100)
            self.currentData.append(rand)

    def regen(self):
        for i in range(20):
            randNo = random.randint(-5, 5)
            self.currentData[i] += randNo

    def convToString(self):
        printStr = str(self.currentData)
        copyStr = ""
        for char in printStr:
            if char != '[' and char != ']':
                copyStr += char
        printStr = copyStr
        print(printStr)
        return printStr

        
        
        
    

    

        

def writeToFile(strToWrite):
    outFile = open('CarData.txt', 'w') # open carData to write
    outFile.write(strToWrite)
    outFile.close()
    
    

def main():
    sim = SensorInfo()
    while True:
        sim.regen()
        strToWrite = sim.convToString()
        writeToFile(strToWrite)
        time.sleep(0.01)


main()

