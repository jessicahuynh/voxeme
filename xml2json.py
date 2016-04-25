# javascript doesn't let us iterate over the file structure
# so we have to run this script every time we want to turn the xml files to json
# from there, the json is loaded into mongodb in startup.js

# don't forget to pip install xmltodict

import os
import xmltodict, json

def to_xml(write_to,singular):
	path = 'voxml/'+write_to+'/'
	listing = os.listdir(path)
	with open('server/lib/'+write_to+'.js','w') as f1:
		f1.write(write_to+'= [')

		for file in listing:
			xml = open(path+file,'r').read()
			j = json.dumps(xmltodict.parse(xml))
			j = j[0:-1]
			j += ",'"+singular+"':'"+file[:-4]+"'}"
			print(j)
			
			f1.write(j+',')

		f1.write(']')
		
if __name__ == '__main__':
	to_xml('objects','name')
	#to_xml('events','event')
	to_xml('functions','function')
