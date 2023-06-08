import json


def find_name(member_list):
    names = []
    for member in member_list:
        names.append(member.name)
    return names

    
def save(data, filename):
    with open(filename, 'w') as json_file:
        json.dump(data, json_file)
