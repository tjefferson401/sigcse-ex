import time
x1 = time.time()
import tkinter as tk
import random


# Create the main window

root = tk.Tk()
canvas = tk.Canvas(root, width=400, height=400)
canvas.pack()

# Create the balls
balls = []
ballsize = 200
for i in range(ballsize):
    x = random.randint(0, 400)
    y = random.randint(0, 400)
    balls.append({
        "objectId": canvas.create_oval(x, y, x + 10, y + 10), # create_oval is used to create a circle
        "dx": 3,
        "dy": 3,
        "x": x,
        "y": y
    })

x = 0

def animate():
    global x
    if x >= 500:
        root.destroy() # Close the window after 500 iterations
        return

    for b in balls:
        if b["x"] >= 400 or b["x"] <= 0:
            b["dx"] = -1*b["dx"]
        if b["y"] >= 400 or b["y"] <= 0:
            b["dy"] = -1*b["dy"]
        b["x"] += b["dx"]
        b["y"] += b["dy"]
        canvas.move(b["objectId"], b["dx"], b["dy"])

    x += 1
    root.after(10, animate)

animate()
root.mainloop()


x2 = time.time()

print(x2 - x1)
