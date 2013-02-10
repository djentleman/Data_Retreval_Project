#!/usr/bin/python
# -*- coding: utf-8 -*-

import sqlite3 as lite
import sys

try:
    con = lite.connect('UPR.db')

    cur = con.cursor()  

    # text dataName = eventID, REv, gear,  ..... , batteryT
    # int dataValue = , 5, 2, 6, 54, 7, ...., ???
    
    cur.executescript("""
        DROP TABLE IF EXISTS CarData;
        CREATE TABLE CarData(DataName TEXT, DataValue INT);
        INSERT INTO CarData VALUES('EventID', 5);
        INSERT INTO CarData VALUES('REv', 7);
        INSERT INTO CarData VALUES('gear', 3);
        INSERT INTO CarData VALUES('speed', 45);
        INSERT INTO CarData VALUES('FRrpm', 574);
        INSERT INTO CarData VALUES('FLrpm', 658);
        INSERT INTO CarData VALUES('RRrpm', 437);
        INSERT INTO CarData VALUES('RRrpm', 437);
        INSERT INTO CarData VALUES('RLrpm', 437);
        INSERT INTO CarData VALUES('GforceX', 2);
        INSERT INTO CarData VALUES('GforceY', 0);
        INSERT INTO CarData VALUES('AirTemp', 26);
        INSERT INTO CarData VALUES('Throttle', 78);
        INSERT INTO CarData VALUES('CoolentTemp', 41);
        INSERT INTO CarData VALUES('Battery', 79);
        INSERT INTO CarData VALUES('BatteryTemp', 56);
        """)
    print("Write To UPR.db Successful")

    con.commit()
    
except lite.Error, e:
    
    if con:
        con.rollback()
        
    print ("Error %s:" % e.args[0])
    sys.exit(1)
    
finally:
    
    if con:
        con.close() 
