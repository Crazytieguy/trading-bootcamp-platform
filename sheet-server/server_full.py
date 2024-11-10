import subprocess
import time
from datetime import datetime, timedelta
import selectors

while True:
    print("\nStarting update_spreadsheet_loop.py...")
    process = subprocess.Popen(
        ["python", "-u", "update_spreadsheet_loop.py"],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True
    )
    
    last_output_time = datetime.now()
    selector = selectors.DefaultSelector()
    selector.register(process.stdout, selectors.EVENT_READ)
    
    while True:
        events = selector.select(timeout=1)
        if events:
            for key, _ in events:
                line = key.fileobj.readline()
                if line:
                    print(line, end='')
                    last_output_time = datetime.now()
                else:
                    # EOF
                    break
        else:
            pass  # timeout

        # Check if no output for 10 seconds
        if (datetime.now() - last_output_time).total_seconds() > 10:
            print("\nNo output for 10 seconds. Restarting the process...")
            process.terminate()
            process.wait()
            print("Process stopped. Waiting 1 second before restarting...")
            time.sleep(1)
            break
