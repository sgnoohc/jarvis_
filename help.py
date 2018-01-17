#!/usr/bin/python

f = open("note.js")
lines = f.readlines()
inblock = False
o = open("help.txt", "w")
for line in lines:
    if inblock:
        if line.strip() == "{":
            continue
        if line.strip() == "}":
            inblock = False
            continue
        o.write(line.strip().split("'")[1] + "\n")
    if line.find("var commands") != -1:
        inblock = True
