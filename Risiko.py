#l'obiettivo di questo codice è calcolare le probabilità di vittoria di un attacco a Risiko, in base al numero di armate dei giocatori
import random

def probab(At,De):
    Vatt = 0 #numero vittorie attacco
    Vdif = 0 #numero vittorie difesa
    Armatt = 0 #numero armate finali attaccante
    Armdif = 0 #numero armate finali difensore
    n=0
    k=10000
    while n<k:
        a=At
        d=De
        while a>0 and d>0:
            Datt = [] #Lista dadi attacco
            Ddef = [] #Lista dadi difesa
            for i in range(0,min(3,a)):
                Datt.append(random.randint(1,6))
                Datt.sort()
                Datt.reverse()
            for i in range(0,min(3,d)):
                Ddef.append(random.randint(1,6))
                Ddef.sort()
                Ddef.reverse()
            for i in range(0,min(3,a,d)):
                if Datt[i]>Ddef[i]:
                    d-=1
                else:
                    a-=1
        if a==0:
            Vdif+=1
            Armdif+=d
        else:
            Vatt+=1
            Armatt+=a
        n+=1
    return [Vatt/k, Vdif/k, (At-Armatt/k), (De-Armdif/k)]

file = open("Risiko_probabilità.txt", "w")

for i in range(1,50):
    for j in range(1,50):
        lista=probab(i,j)
        for k in lista:
            file.writelines(str(k) + "\n")
        file.writelines("\n")

file.close()