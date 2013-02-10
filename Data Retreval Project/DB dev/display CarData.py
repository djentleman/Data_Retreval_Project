## UPracing database development test 1
## author: Todd Perry

import sqlite3 as lite
import sys


con = lite.connect('UPR.db')

with con:    
    
    cur = con.cursor()    
    cur.execute("SELECT * FROM CarData")

    rows = cur.fetchall()

    for row in rows:
        print (row)
