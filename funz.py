import json
import time
perc = "C:\\Users\\giaco\\Desktop\\Token.json"

def find_name(member_list):
    names = []
    for member in member_list:
        names.append(member.name)
    return names

    
def save(data, filename):
    with open(filename, 'w') as json_file:
        json.dump(data, json_file)



def read_var(file, variable):
    with open(file, 'r') as f:
        dati = json.load(f)
    var = dati[variable]
    print(type(var))
    return var


def log(file, pers, dove, join):
    with open(file, 'a') as f:
        ora = time.strftime('%d %m %Y %H:%M:%S')
        if join:
            join = "join"
        elif join == False:
            join = "quit"
        else:
            join = "error"
        f.write(f"{ora};{pers};{dove};{join}\n")

    

if __name__ == '__main__':
    perc = "C:\\Users\\giaco\\Desktop\\Token.json"
    print(read_var(perc, "channel_id"))