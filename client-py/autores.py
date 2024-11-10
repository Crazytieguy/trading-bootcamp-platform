import subprocess
import time
from datetime import datetime
import sys
import threading
import queue
import os
import re  # Added import for regular expressions

def enqueue_output(out, q):
    for line in iter(out.readline, ''):
        q.put(line)
    out.close()

def sanitize_filename(filename):
    # Replace any character that is not alphanumeric, period, dash, or underscore with an underscore
    return re.sub(r'[^A-Za-z0-9._-]', '_', filename)

def main():
    if len(sys.argv) < 2:
        sys.exit("Usage: python autores.py <command> [args...]")
    
    command = sys.argv[1:]
    
    # Create logs directory if it doesn't exist
    os.makedirs('logs', exist_ok=True)
    
    # Create log file with sanitized command name
    logfile_name = sanitize_filename('_'.join(command))[:80] + '.log'
    logfile = os.path.join('logs', logfile_name)
    
    while True:
        process = subprocess.Popen(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
            universal_newlines=True
        )
        
        q = queue.Queue()
        t = threading.Thread(target=enqueue_output, args=(process.stdout, q))
        t.daemon = True
        t.start()
        
        last_output_time = datetime.now()
        
        with open(logfile, 'a', buffering=1) as f:
            # Log the starting of the command
            msg = f"\nStarting command: {' '.join(command)}"
            f.write(msg + "\n")
            f.flush()
            while True:
                try:
                    line = q.get_nowait()
                except queue.Empty:
                    time.sleep(0.1)
                    if (datetime.now() - last_output_time).total_seconds() > 30:
                        msg = "\nNo output for 30 seconds. Restarting the process..."
                        f.write(msg + "\n")
                        f.flush()
                        print(msg)  # Only print the "no output" message to stdout
                        process.terminate()
                        process.wait()
                        msg = "Process stopped. Waiting 1 second before restarting..."
                        f.write(msg + "\n")
                        f.flush()
                        time.sleep(1)
                        break

                    if process.poll() is not None:
                        msg = "Process terminated."
                        f.write(msg + "\n")
                        f.flush()
                        break
                else:
                    f.write(line)
                    f.flush()
                    last_output_time = datetime.now()

if __name__ == "__main__":
    main()
