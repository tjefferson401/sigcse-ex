import time
x1 = time.time()

import random
c = create_canvas()

balls = []
ballsize = 300
for i in range(ballsize):
    x = random.randint(0, 400)
    y = random.randint(0, 400)
    balls.append({
        "objectId": c.create_oval(x, y, x + 10, y + 10),
        "dx": 3,
        "dy": 3,
        "x": x,
        "y": y
    })

x = 0
while x < 500:
    for i in range(ballsize):
        b = balls[i]
        if b["x"] >= 400 or b["x"] <= 0:
            b["dx"] = -1*b["dx"]
        if b["y"] >=400 or b["y"] <= 0:
            b["dy"] = -1*b["dy"]
        b["x"] += b["dx"]
        b["y"] += b["dy"]
        c.move(b["objectId"], b["dx"], b["dy"])
    x += 1
    time.sleep(0.01)
x2 = time.time()
print("TIME:", x2 - x1)
