from math import exp
from numpy import random
from numpy import linalg
from numpy import argmax

R =[1,2,3,4,5,6,7]

input = [(3, True), (4, False)]

def multiplier(r):
    multipliers = []
    for ql in R:
        difference = abs(ql-r)
        if difference == 0:
            multipliers.append(1)
        elif difference == 1:
            multipliers.append(0.5)
        elif difference == 2:
            multipliers.append(0.3)
        elif difference == 3:
            multipliers.append(0.2)
        else:
            multipliers.append(0.1)
    return multipliers

def antiMultiplier(r):
    multipliers = []
    for ql in R:
        difference = abs(ql-r)
        if difference >= 4:
            multipliers.append(1)
        elif difference == 3:
            multipliers.append(0.7)
        elif difference == 2:
            multipliers.append(0.5)
        elif difference == 1:
            multipliers.append(0.2)
        else: #special case where ql == r.
            multipliers.append(0.1)
    return multipliers

def confidenceMultiplier(d):
    answers = [0, 0, 0, 0, 0, 0, 0]
    for q in d:
        if q[1]:
            answers[q[0]-1] += 1
        else:
            answers[q[0]-1] -= 1
    multipliers = []
    for a in answers:
        if a == 0:
            multipliers.append(0.1)
        else:
            multipliers.append(min(5, a)/5)
    return multipliers

def score(input, r, cms):
    ms = multiplier(r)
    ams = antiMultiplier(r)
    s = 0
    for q in input:
        if q[0] > r:
            if q[1]:
                s -= max(cms[q[0]-1],0.1) * ams[q[0]-1]
            else:
                s += max(-1*cms[q[0]-1], 0.1) * ms[q[0]-1]
        elif q[0] == r:
            if q[1]:
                s += max(cms[q[0]-1],0.1)
            else:
                s -= max(cms[q[0]-1],0.1)
        else:
            if q[1]:
                s += max(cms[q[0]-1],0.1) * ms[q[0]-1]
            else:
                s -= max(-1*cms[q[0]-1], 0.1) * ams[q[0]-1]
    return s

def exponential(input, r, cms):
    epsilon = 1
    sensitivity = 1
    return exp((epsilon*score(input, r, cms))/(2*sensitivity))

def select(input):
    if len(input) < 7:
        return random.randint(1,8)
    else:
        cms = confidenceMultiplier(input)
        ps = [exponential(input, r, cms) for r in R]
        ps = ps/linalg.norm(ps, ord=1)
        if ps[argmax(ps)] > 0.5:
            return (False, R[argmax(ps)])
        return (True, random.choice(R, 1, p=ps)[0])




#scores = []
#i1 = [(5, True),(1, True),(6, False),(1, True),(6, True),(7, False),(1, True),(4, True),(5, True),(4, True),(7, False),(6, False),(7, False),(5, True),(5, True),(6, False)]
#i2 = [(1, True),(1, True),(1, True),(1, True),(1, False),(1, False),(1, False)]
#i3 = [(1, True),(1, True),(1, True),(1, True),(1, False),(1, False),(1, False)]
#i4 = [(1, True),(1, True),(1, True),(1, True),(1, False),(1, False),(1, False)]

#cms = confidenceMultiplier(i1)
#scores = [score(i1, r, cms) for r in R]
#ps = [exponential(i1, r, cms) for r in R]
#ps = ps/linalg.norm(ps, ord=1)
#print(scores)
#print(ps)
#print(select(i1))