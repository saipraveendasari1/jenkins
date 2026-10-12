# sample-app/app.py
def add(a, b): return a + b
def subtract(a, b): return a - b
def multiply(a, b): return a * b
def divide(a, b):
    if b == 0: raise ValueError("Cannot divide by zero")
    return a / b

if __name__ == "__main__":
    print("DevOps Student Application Running Successfully!")
