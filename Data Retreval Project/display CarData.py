## UPracing database development test 1
## author: Todd Perry

import sqlite3 as lite
import sys
import time
import os


while True:
    try:
        con = lite.connect('UPR.db')

        with con:    
            
            cur = con.cursor()    
            cur.execute("SELECT * FROM CarData")

            rows = cur.fetchall()

            print("----UPR.db database printout----")
            for row in rows:
                print("Data Name: ", row[0])
                print("Data Value: ", row[1])
    except (Exception):
        print("something went wrong")
    time.sleep(0.2)
