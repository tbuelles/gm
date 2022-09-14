import time
from datetime import datetime, date, timedelta
from youtube_api import *

def update_clock():
    day_label = time.strftime('%a') + ' ' + time.strftime('%x')
    hour = time.strftime('%I')
    minute = time.strftime('%M')
    second = time.strftime('%S')
    am_pm = time.strftime('%p')
    clock_label = hour + ':' + minute + ':' + second + ' ' + am_pm
    return clock_label, day_label

# Stopwatch

counter = 0
running = False
def counter_label(lbl):
    def count():
        if running:
            global counter
            if counter == 0:
                display = "Starting..."
            else:
                tt = timedelta(seconds=counter)
                display = str(tt)

            lbl.config(text=display)

            # label.after(arg1, arg2) delays by
            # first argument given in milliseconds
            # and then calls the function given as second argument.
            # Generally like here we need to call the
            # function in which it is present repeatedly.
            # Delays by 1000ms=1 seconds and call count again.
            lbl.after(1000, count)
            counter += 1

    # Triggering the start of the counter.
    count()

# start function of the stopwatch
def start(lbl):
    global running
    if running:
        return stop()
    running=True
    counter_label(lbl)
    start_button['state']='disabled'
    stop_button['state']='normal'
    reset_button['state']='normal'

# Stop function of the stopwatch
def stop():
    global running
    start_button['state']='normal'
    stop_button['state']='disabled'
    reset_button['state']='normal'
    running = False

# Reset function of the stopwatch
def reset(lbl):
    global counter
    counter = 0

    # If reset is pressed after pressing stop.
    if not running:
        reset_button['state']='disabled'
        lbl['text']='Press Enter to start'

    # If reset is pressed while the stopwatch is running.
    else:
        lbl['text']='Starting...'

def tagesschau():
    y = date.today() - timedelta(days=1) # Datetime object
    y_str = y.strftime('%d.%m.%Y')
    query = 'tagesschau 20:00 Uhr' + ', ' + y_str
    title, videoId = search_query(query, maxResults=1)[0]
    url = 'https://www.youtube.com/embed/' + videoId
    return (title, url)
